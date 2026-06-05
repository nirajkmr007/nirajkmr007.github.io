/* =======================================================================
   ████  RENDER LOGIC + INTERACTIONS  ████
   Reads the content arrays from assets/js/data.js (loaded first).
   You usually don't need to touch this file.
   ======================================================================= */
const $ = (s)=>document.querySelector(s);

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
    <div class="medal" style="${vars}"><b>${L.tier}</b></div>
    <article class="layer-body" style="${vars}">
      <div class="layer-head">
        <div>
          <div class="company">${L.company}</div>
          <div class="role">${L.role}</div>
        </div>
        <div class="when">${L.when}</div>
      </div>
      <span class="layer-tag">${L.layer} layer</span>
      <p class="layer-desc">${L.desc}</p>
      <div class="pipeline">
        <div class="io io-input">
          <span class="io-label">Skills in →</span>
          <div class="chips">${L.stack.map(s=>`<span class="chip">${s}</span>`).join("")}</div>
        </div>
        <div class="conduit" aria-hidden="true"></div>
        <div class="io io-output">
          <span class="io-label">→ Data product out</span>
          <div class="out-card">
            <div class="out-title">${L.output.title}</div>
            <div class="out-meta">${L.output.meta}</div>
          </div>
        </div>
      </div>
    </article>`;
  }).join("");
})();

/* projects */
$("#projectList").innerHTML = PROJECTS.map(p=>`
  <article class="proj">
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
  </article>`).join("");

/* stats */
$("#statStrip").innerHTML = STATS.map(s=>`
  <div class="stat"><div class="num">${s.num}</div><div class="lbl">${s.lbl}</div></div>`).join("");

/* skills */
$("#skillList").innerHTML = SKILLS.map(s=>`
  <div class="skill-card"><h4>${s.group}</h4>
    <ul>${s.items.map(i=>`<li>${i}</li>`).join("")}</ul></div>`).join("");

/* stack marquee (doubled for seamless loop) */
const icons = STACK.concat(STACK).map(s=>
  `<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${s}.svg" alt="" loading="lazy">`).join("");
$("#stackTrack").innerHTML = icons;

/* year */
$("#yr").textContent = new Date().getFullYear();

/* ---- theme toggle (remembers choice; degrades gracefully) -------- */
const root = document.documentElement, tBtn = $("#themeBtn");
let theme = "dark";
try { theme = localStorage.getItem("theme") || "dark"; } catch(e){}
function applyTheme(t){
  root.setAttribute("data-theme", t);
  tBtn.textContent = t === "dark" ? "☾" : "☀";
  try { localStorage.setItem("theme", t); } catch(e){}
}
applyTheme(theme);
tBtn.addEventListener("click", ()=> applyTheme(root.getAttribute("data-theme")==="dark"?"light":"dark"));

/* ---- contact form → opens email app (no backend needed) ---------- */
$("#contactForm").addEventListener("submit", (e)=>{
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
