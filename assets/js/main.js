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

/* certifications band — a verifiable card per credential (links out to the
   issuer's credential page; cards without a url render without a Verify link) */
setHTML("#certBand", CERTS.map(c=>{
  const seal = `<span class="cert-seal" aria-hidden="true">✓</span>`;
  const text = `<span class="cert-text">
      <span class="cert-name">${c.name}</span>
      <span class="cert-sub">${c.track ? c.track + " · " : ""}${c.issuer}</span>
    </span>`;
  return c.url
    ? `<a class="cert" href="${c.url}" target="_blank" rel="noopener" aria-label="Verify ${c.name} credential">
         ${seal}${text}<span class="cert-verify">Verify ↗</span>
       </a>`
    : `<div class="cert">${seal}${text}</div>`;
}).join(""));

/* hero project crown — a draggable 3D ring of pinned repos.
   Cards are billboards projected onto a circle: front card is largest/clearest,
   back cards recede and dim. Drag (mouse/touch) rotates in any direction;
   it carries momentum and idles with a slow auto-spin. Click opens the repo. */
(function projectCrown(){
  const stage = $("#projectRing");
  if(!stage || typeof PINNED === "undefined") return;
  const SVGNS = "http://www.w3.org/2000/svg";
  const svg = stage.querySelector(".mesh-lines");

  const cards = PINNED.map(p=>{
    const a = document.createElement("a");
    a.className = "pcard";
    a.href = p.url; a.target = "_blank"; a.rel = "noopener";
    a.setAttribute("aria-label", `${p.name} on GitHub`);
    a.innerHTML =
      `<span class="pcard-top"><span class="pcard-lang">${p.lang||"Repo"}</span><span class="pcard-arrow">↗</span></span>
       <span class="pcard-name">${p.name}</span>
       <span class="pcard-desc">${p.desc||""}</span>`;
    stage.appendChild(a);
    return a;
  });
  const N = cards.length;

  const edges = [], spokes = [];
  for(let i=0;i<N;i++){
    const e = document.createElementNS(SVGNS,"line"); e.setAttribute("class","mesh-edge"); svg.appendChild(e); edges.push(e);
    const s = document.createElementNS(SVGNS,"line"); s.setAttribute("class","mesh-spoke"); svg.appendChild(s); spokes.push(s);
  }

  const reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  let ry = 0, rx = 0.42, vy = 0, vx = 0;
  let dragging = false, lastX = 0, lastY = 0, moved = 0;
  let W = 0, H = 0, cx = 0, cy = 0, R = 140, D = 340, frontIdx = -1, raf = null, running = false;

  function measure(){
    W = stage.clientWidth; H = stage.clientHeight; cx = W/2; cy = H/2;
    R = Math.min(W, H) * 0.44; D = R * 2.5;
    svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
  }

  function place(){
    let maxZ = -1e9, fi = -1;
    const px = [], py = [];
    for(let i=0;i<N;i++){
      const a = (i/N)*Math.PI*2 + ry;
      const x = Math.sin(a)*R, z0 = Math.cos(a)*R;
      const y =  -z0*Math.sin(rx);          /* tilt around X */
      const z =   z0*Math.cos(rx);
      const s = D/(D - z);
      const sx = cx + x*s, sy = cy + y*s;
      px[i] = sx; py[i] = sy;
      const c = cards[i];
      c.style.transform = `translate(${sx}px,${sy}px) translate(-50%,-50%) scale(${s.toFixed(3)})`;
      c.style.zIndex = Math.round(500 + z);
      c.style.opacity = (0.4 + 0.6*((z + R)/(2*R))).toFixed(2);
      if(z > maxZ){ maxZ = z; fi = i; }
    }
    if(fi !== frontIdx){
      if(frontIdx >= 0) cards[frontIdx].classList.remove("is-front");
      cards[fi].classList.add("is-front"); frontIdx = fi;
    }
    for(let i=0;i<N;i++){
      const j = (i+1)%N;
      edges[i].setAttribute("x1",px[i]); edges[i].setAttribute("y1",py[i]);
      edges[i].setAttribute("x2",px[j]); edges[i].setAttribute("y2",py[j]);
      spokes[i].setAttribute("x1",cx);   spokes[i].setAttribute("y1",cy);
      spokes[i].setAttribute("x2",px[i]); spokes[i].setAttribute("y2",py[i]);
    }
  }

  function frame(){
    if(!dragging){
      ry += vy; rx += vx;
      vy *= 0.94; vx *= 0.94;
      if(Math.abs(vx) < 0.0006) vx = 0;
      if(Math.abs(vy) < 0.0009){ vy = 0; if(!reduce) ry += 0.0024; }  /* idle auto-spin */
    }
    rx = Math.max(-0.7, Math.min(0.7, rx));
    place();
    raf = requestAnimationFrame(frame);
  }
  function start(){ if(!running){ running = true; frame(); } }
  function stop(){ running = false; if(raf) cancelAnimationFrame(raf); }

  /* drag to rotate in any direction */
  stage.addEventListener("pointerdown", e=>{
    dragging = true; moved = 0; lastX = e.clientX; lastY = e.clientY;
    try { stage.setPointerCapture(e.pointerId); } catch(_){}
  });
  stage.addEventListener("pointermove", e=>{
    if(!dragging) return;
    const dx = e.clientX - lastX, dy = e.clientY - lastY;
    lastX = e.clientX; lastY = e.clientY; moved += Math.abs(dx) + Math.abs(dy);
    ry += dx*0.0085; rx += dy*0.006;
    vy = Math.max(-0.08, Math.min(0.08, dx*0.0085));
    vx = Math.max(-0.05, Math.min(0.05, dy*0.006));
  });
  function endDrag(e){ if(!dragging) return; dragging = false; try { stage.releasePointerCapture(e.pointerId); } catch(_){} }
  stage.addEventListener("pointerup", endDrag);
  stage.addEventListener("pointercancel", endDrag);
  /* suppress the click that follows a real drag so it doesn't open a repo */
  stage.addEventListener("click", e=>{ if(moved > 6){ e.preventDefault(); e.stopPropagation(); } }, true);

  measure(); place();
  window.addEventListener("resize", ()=>{ measure(); place(); });
  new IntersectionObserver(es=>es.forEach(e=> e.isIntersecting ? start() : stop()), {threshold:.02}).observe(stage);
})();

/* year */
setText("#yr", new Date().getFullYear());

/* visitor counter — free, no-backend hit counter (Abacus). Counts once per
   browser session so refreshes don't inflate it; stays hidden if it fails. */
(function visitorCounter(){
  const wrap = $("#visits"), num = $("#visitsNum");
  if(!wrap || !num) return;
  const NS = "nirajkmr007-portfolio", KEY = "visits";
  let firstThisSession = true;
  try { firstThisSession = !sessionStorage.getItem("counted"); } catch(e){}
  const verb = firstThisSession ? "hit" : "get";
  fetch(`https://abacus.jasoncameron.dev/${verb}/${NS}/${KEY}`)
    .then(r => r.ok ? r.json() : Promise.reject(r.status))
    .then(d => {
      if(d && typeof d.value === "number"){
        num.textContent = d.value.toLocaleString();
        wrap.removeAttribute("hidden");
        try { sessionStorage.setItem("counted", "1"); } catch(e){}
      }
    })
    .catch(()=>{ /* service unreachable → leave the counter hidden */ });
})();

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
