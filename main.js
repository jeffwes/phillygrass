// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Mobile menu
const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".site-nav");
toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
});
nav.addEventListener("click", (e) => {
  if (e.target.tagName === "A") nav.classList.remove("open");
});

// Shows list: upcoming only, soonest first
const today = new Date().toISOString().slice(0, 10);
const upcoming = SHOWS.filter((s) => s.date >= today).sort((a, b) => a.date.localeCompare(b.date));
const list = document.getElementById("show-list");

if (upcoming.length === 0) {
  document.getElementById("no-shows").hidden = false;
}

for (const show of upcoming) {
  const d = new Date(show.date + "T12:00:00");
  const li = document.createElement("li");
  li.className = "show";
  li.innerHTML = `
    <div class="show-date">
      <span class="month">${d.toLocaleString("en-US", { month: "short" })}</span>
      <span class="day">${d.getDate()}</span>
    </div>
    <div class="show-info">
      <strong></strong>
      <span class="muted"></span>
    </div>`;
  li.querySelector("strong").textContent = show.venue;
  li.querySelector(".muted").textContent = `${show.city} · ${show.time}`;
  if (show.link) {
    const a = document.createElement("a");
    a.className = "button small";
    a.href = show.link;
    a.textContent = "Details";
    li.appendChild(a);
  }
  list.appendChild(li);
}
