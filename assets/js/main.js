/* =======================================================================
   ████  RENDER LOGIC + INTERACTIONS  ████
   Reads the content arrays from assets/js/data.js (loaded first).
   You usually don't need to touch this file.
   ======================================================================= */
const $ = (s)=>document.querySelector(s);
/* safe setters — never throw if an element is missing (e.g. cached/old HTML) */
const setHTML = (sel, html)=>{ const el = $(sel); if(el) el.innerHTML = html; };
const setText = (sel, txt)=>{ const el = $(sel); if(el) el.textContent = txt; };

/* experience as a medallion architecture (raw → silver → gold → platinum)
   Skills flow IN as input chips, the layer refines them, a data product flows OUT.
   The metallic tint + animation timings are passed per-layer as CSS variables. */
const MEDAL_COLOR = { Bronze:"#c1773c", Silver:"#9aa7b2", Gold:"#d6a526", Platinum:"var(--accent)" };
const MEDAL_CYCLE = 6; /* seconds — must match the keyframe durations in styles.css */
(function renderMedallion(){
  const host = $("#medallion");
  if(!host) return;
  const step = MEDAL_CYCLE / LAYERS.length;
  host.innerHTML = `<span class="spine-packet" aria-hidden="true"></span>` + LAYERS.map((L,i)=>{
    const metal  = MEDAL_COLOR[L.tier] || "var(--accent)";
    const mdelay = (0.6 + i*step).toFixed(2) + "s";   /* when the packet reaches this node */
    const ri     = (i*0.12).toFixed(2) + "s";          /* entrance stagger */
    const vars   = `--metal:${metal};--mdelay:${mdelay};--ri:${ri}`;
    return `
    <article class="layer" style="${vars}">
      <div class="medal"><b>${L.tier}</b></div>
      <div class="layer-body">
        <div class="layer-head">
          <div class="company">${L.company}</div>
          <div class="role">${L.role}</div>
          <div class="when">${L.when}</div>
        </div>
        <span class="layer-tag">${L.layer} layer</span>
        <p class="layer-desc">${L.desc}</p>
        <div class="pipeline">
          <div class="io io-input">
            <span class="io-label">Skills in</span>
            <div class="chips">${L.stack.map(s=>`<span class="chip">${s}</span>`).join("")}</div>
          </div>
          <div class="conduit" aria-hidden="true"></div>
          <div class="io io-output">
            <span class="io-label">Data product out</span>
            ${L.output.link
              ? `<a class="out-card" href="#proj-${L.output.link}" aria-label="Jump to the ${L.output.title} project">
                   <div class="out-title">${L.output.title}</div>
                   <div class="out-meta">${L.output.meta}</div>
                   <span class="out-cta">View project →</span>
                 </a>`
              : `<div class="out-card">
                   <div class="out-title">${L.output.title}</div>
                   <div class="out-meta">${L.output.meta}</div>
                 </div>`}
          </div>
        </div>
      </div>
    </article>`;
  }).join("");
})();

/* projects */
setHTML("#projectList", PROJECTS.map(p=>`
  <article class="proj"${p.id ? ` id="proj-${p.id}"` : ""}>
    <div>
      <div class="when">${p.when}</div>
      <h3>${p.title}</h3>
      <p>${p.desc}</p>
      <div class="ptags">${p.tags.map(t=>`<span>${t}</span>`).join("")}</div>
    </div>
    <div class="proj-meta">
      ${p.role ? `<span class="role">${p.role}</span>` : ""}
      ${p.team ? `<span class="team">${p.team}</span>` : ""}
    </div>
  </article>`).join(""));

/* stats */
setHTML("#statStrip", STATS.map(s=>`
  <div class="stat"><div class="num">${s.num}</div><div class="lbl">${s.lbl}</div></div>`).join(""));

/* skills as a floating graph: each group is a node, faint edges link the
   nearest nodes and follow them as they drift; hover focuses a node */
(function renderSkillGraph(){
  const host = $("#skillGraph"); if(!host) return;
  const SVGNS = "http://www.w3.org/2000/svg";
  host.innerHTML =
    `<svg class="graph-edges" aria-hidden="true"></svg>` +
    SKILLS.map((s,i)=>{
      const dur   = (8 + (i % 5) * 1.1).toFixed(1) + "s";
      const delay = (-(i * 1.3)).toFixed(1) + "s";
      return `<div class="node" style="--fdur:${dur};--fdelay:${delay}">
        <div class="node-card">
          <div class="node-inner">
            <h4>${s.group}</h4>
            <ul>${s.items.map(it=>`<li>${it}</li>`).join("")}</ul>
          </div>
        </div>
      </div>`;
    }).join("");

  const svg    = host.querySelector(".graph-edges");
  const nodes  = [...host.querySelectorAll(".node")];
  const cards  = nodes.map(n=>n.querySelector(".node-card"));
  const inners = nodes.map(n=>n.querySelector(".node-inner"));
  let edges = [];

  /* size each node to a circle whose diameter contains its content */
  function sizeCircles(){
    cards.forEach((card,i)=>{
      card.style.width = card.style.height = "";   /* release, then measure content */
      const d = Math.ceil(Math.hypot(inners[i].offsetWidth, inners[i].offsetHeight)) + 12;
      card.style.width = card.style.height = d + "px";
    });
  }
  sizeCircles();

  const centers = ()=>{
    const hb = host.getBoundingClientRect();
    return nodes.map(n=>{ const b = n.getBoundingClientRect();
      return { x: b.left - hb.left + b.width/2, y: b.top - hb.top + b.height/2 }; });
  };
  /* topology computed once from base positions: each node → its 2 nearest */
  function rebuild(){
    const c = centers(); edges = []; const seen = new Set();
    c.forEach((p,i)=>{
      c.map((q,j)=>({ j, d: Math.hypot(p.x-q.x, p.y-q.y) }))
       .filter(o=>o.j!==i).sort((a,b)=>a.d-b.d).slice(0,2)
       .forEach(o=>{ const k = i<o.j ? `${i}-${o.j}` : `${o.j}-${i}`;
         if(!seen.has(k)){ seen.add(k); edges.push([i,o.j]); } });
    });
    while(svg.firstChild) svg.removeChild(svg.firstChild);
    edges.forEach(()=>{ const l = document.createElementNS(SVGNS,"line"); l.setAttribute("class","edge"); svg.appendChild(l); });
  }
  function draw(){
    const hb = host.getBoundingClientRect();
    svg.setAttribute("viewBox", `0 0 ${hb.width} ${hb.height}`);
    const c = centers(), lines = svg.children;
    edges.forEach((e,k)=>{ const l = lines[k]; if(!l) return;
      l.setAttribute("x1", c[e[0]].x); l.setAttribute("y1", c[e[0]].y);
      l.setAttribute("x2", c[e[1]].x); l.setAttribute("y2", c[e[1]].y); });
  }

  const reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  let raf = null, running = false;
  const loop  = ()=>{ draw(); raf = requestAnimationFrame(loop); };
  const start = ()=>{ if(!running && !reduce){ running = true; loop(); } };
  const stop  = ()=>{ running = false; if(raf) cancelAnimationFrame(raf); };

  const refresh = ()=>{ sizeCircles(); rebuild(); draw(); };
  requestAnimationFrame(()=>requestAnimationFrame(refresh)); /* after first layout */
  window.addEventListener("load", refresh);                  /* after fonts settle  */
  window.addEventListener("resize", refresh);

  /* only animate the edges while the graph is on screen */
  new IntersectionObserver(es=>es.forEach(e=> e.isIntersecting ? start() : stop()),
    { threshold:.04 }).observe(host);
})();

/* stack marquee (doubled for seamless loop) */
setHTML("#stackTrack", STACK.concat(STACK).map(s=>
  `<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${s}.svg" alt="" loading="lazy">`).join(""));

/* year */
setText("#yr", new Date().getFullYear());

/* ---- theme toggle (remembers choice; degrades gracefully) -------- */
const root = document.documentElement, tBtn = $("#themeBtn");
let theme = "dark";
try { theme = localStorage.getItem("theme") || "dark"; } catch(e){}
function applyTheme(t){
  root.setAttribute("data-theme", t);
  if(tBtn) tBtn.textContent = t === "dark" ? "☾" : "☀";
  try { localStorage.setItem("theme", t); } catch(e){}
}
applyTheme(theme);
if(tBtn) tBtn.addEventListener("click", ()=> applyTheme(root.getAttribute("data-theme")==="dark"?"light":"dark"));

/* ---- contact form → opens email app (no backend needed) ---------- */
const contactForm = $("#contactForm");
if(contactForm) contactForm.addEventListener("submit", (e)=>{
  e.preventDefault();
  const name = $("#cf-name").value, email = $("#cf-email").value, msg = $("#cf-msg").value;
  const to = "nirajkmr007@gmail.com";
  const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
  const body = encodeURIComponent(`${msg}\n\n— ${name} (${email})`);
  window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
});

/* ---- reveal on scroll -------------------------------------------- */
const io = new IntersectionObserver((entries)=>{
  entries.forEach(en=>{ if(en.isIntersecting){ en.target.classList.add("in"); io.unobserve(en.target);} });
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>io.observe(el));
