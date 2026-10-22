/* Portfolio logic — all content comes from data.js (PORTFOLIO) */
const P = PORTFOLIO;
const $ = (id) => document.getElementById(id);

/** tiny safe element builder (uses textContent, never innerHTML) */
function el(tag, props = {}, ...children) {
  const node = document.createElement(tag);
  Object.entries(props).forEach(([k, v]) => {
    if (k === "class") node.className = v;
    else if (k === "text") node.textContent = v;
    else node.setAttribute(k, v);
  });
  children.forEach((c) => c && node.append(c));
  return node;
}
const repoUrl = (p) => `https://github.com/${P.github}/${p.repo}`;

/* ---------- Personal details ---------- */
function renderProfile() {
  document.title = `${P.name} — Portfolio`;
  $("logoName").textContent = P.name.split(" ")[0];
  $("heroName").textContent = P.name;
  $("footName").textContent = P.name;
  $("tagline").textContent = P.tagline;
  $("intro").textContent = P.intro;
  $("year").textContent = new Date().getFullYear();
  $("githubBtn").href = `https://github.com/${P.github}`;

  const img = $("photo");
  img.src = P.photo;
  img.onerror = () => {
    img.hidden = true;
    $("initials").textContent = P.name.trim()[0].toUpperCase();
    $("initials").hidden = false;
  };

  P.about.forEach((t) => $("aboutText").append(el("p", { text: t })));
  P.education.forEach((e) =>
    $("education").append(
      el("div", { class: "edu-item" }, el("strong", { text: e.title }), el("span", { text: `${e.place} • ${e.period}` }))
    )
  );

  Object.entries(P.skills).forEach(([group, list]) => {
    const tags = el("div", { class: "tags" });
    list.forEach((s) => tags.append(el("span", { class: "tag", text: s })));
    $("skillsGrid").append(el("div", { class: "card reveal" }, el("h3", { class: "mono", text: group }), tags));
  });

  const contacts = [
    ["Email", P.email, `mailto:${P.email}`],
    ["GitHub", `github.com/${P.github}`, `https://github.com/${P.github}`],
    P.linkedin ? ["LinkedIn", P.linkedin.replace(/^https?:\/\//, ""), P.linkedin] : null,
    ["Location", P.location, null],
  ].filter(Boolean);
  contacts.forEach(([label, text, href]) => {
    const body = href ? el("a", { href, target: "_blank", rel: "noopener", text }) : el("p", { text });
    $("contactGrid").append(el("div", { class: "card reveal" }, el("h3", { class: "mono", text: label }), body));
  });
}

/* ---------- Projects: render + search + filter ---------- */
let activeTech = "All";

function projectCard(p) {
  const tags = el("div", { class: "tags" });
  p.tech.forEach((t) => tags.append(el("span", { class: "tag", text: t })));
  const links = el("div", { class: "links" }, el("a", { class: "btn", href: repoUrl(p), target: "_blank", rel: "noopener", text: "GitHub Repo ↗" }));
  if (p.live) links.append(el("a", { class: "btn primary", href: p.live, target: "_blank", rel: "noopener", text: "Live App ↗" }));
  return el("article", { class: "card project" }, el("h3", { text: p.title }), el("p", { text: p.description }), tags, links);
}

function applyFilters() {
  const q = $("search").value.trim().toLowerCase();
  const grid = $("projectsGrid");
  grid.replaceChildren();
  const list = P.projects.filter((p) => {
    const haystack = [p.title, p.description, ...p.tech].join(" ").toLowerCase();
    const matchesText = !q || haystack.includes(q);
    const matchesTech = activeTech === "All" || p.tech.includes(activeTech);
    return matchesText && matchesTech;
  });
  list.forEach((p) => grid.append(projectCard(p)));
  $("empty").hidden = list.length > 0;
  $("count").textContent = `showing ${list.length} of ${P.projects.length} projects`;
}

function renderChips() {
  const techs = ["All", ...new Set(P.projects.flatMap((p) => p.tech))];
  techs.forEach((t) => {
    const chip = el("button", { class: "chip" + (t === "All" ? " active" : ""), type: "button", text: t });
    chip.addEventListener("click", () => {
      activeTech = t;
      document.querySelectorAll(".chip").forEach((c) => c.classList.toggle("active", c === chip));
      applyFilters();
    });
    $("chips").append(chip);
  });
}

/* ---------- Theme toggle ---------- */
function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  $("themeBtn").textContent = theme === "dark" ? "🌙" : "☀️";
  try { localStorage.setItem("theme", theme); } catch (e) {}
}

/* ---------- Mobile menu ---------- */
function initMenu() {
  const btn = $("menuBtn"), nav = $("navLinks");
  btn.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    btn.setAttribute("aria-expanded", open);
  });
  nav.addEventListener("click", (e) => {
    if (e.target.tagName === "A") { nav.classList.remove("open"); btn.setAttribute("aria-expanded", false); }
  });
}

/* ---------- Chatbot ---------- */
const history = []; // [{role:'user'|'model', text}]
const SUGGESTIONS = ["Who are you?", "What are your skills?", "What projects have you completed?", "Explain your Python programs", "How does the reading list work?", "Where is your GitHub?"];

function addMsg(text, cls) {
  const m = el("div", { class: `msg ${cls}`, text });
  $("chatLog").append(m);
  $("chatLog").scrollTop = $("chatLog").scrollHeight;
  return m;
}

async function ask(question) {
  addMsg(question, "user");
  const typing = addMsg("Typing…", "bot");
  $("sendBtn").disabled = true;
  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: question, history: history.slice(-6) }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data.reply) throw new Error(data.error || `Request failed (${res.status})`);
    typing.textContent = data.reply;
    history.push({ role: "user", text: question }, { role: "model", text: data.reply });
  } catch (err) {
    typing.textContent = "Sorry, I couldn't get a response right now. Please check your internet connection and try again in a moment.";
    typing.classList.add("error");
    console.error("Chat error:", err);
  } finally {
    $("sendBtn").disabled = false;
    $("chatLog").scrollTop = $("chatLog").scrollHeight;
  }
}

function initChat() {
  SUGGESTIONS.forEach((s) => {
    const b = el("button", { class: "chip", type: "button", text: s });
    b.addEventListener("click", () => ask(s));
    $("suggest").append(b);
  });
  $("chatForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const q = $("chatInput").value.trim();
    if (!q) return;
    $("chatInput").value = "";
    ask(q);
  });
}

/* ---------- Scroll reveal ---------- */
function initReveal() {
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.isIntersecting && (e.target.classList.add("in"), io.unobserve(e.target))),
    { threshold: 0.12 }
  );
  document.querySelectorAll(".reveal").forEach((n) => io.observe(n));
}

/* ---------- Init ---------- */
renderProfile();
renderChips();
applyFilters();
$("search").addEventListener("input", applyFilters);
setTheme(document.documentElement.dataset.theme || "dark");
$("themeBtn").addEventListener("click", () => setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark"));
initMenu();
initChat();
initReveal();

// Warn in console if placeholders are left
if (JSON.stringify(P).includes("YOUR_")) console.warn("data.js still contains YOUR_ placeholders — replace them before submitting.");
