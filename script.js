// ===== WedElegence — booking logic =====
const STORAGE_KEY = "wedelegence_bookings";

// Navbar background on scroll
const nav = document.getElementById("nav");
window.addEventListener("scroll", () => nav.classList.toggle("scrolled", window.scrollY > 60));

// Mobile menu
const navLinks = document.getElementById("navLinks");
document.getElementById("menuBtn").addEventListener("click", () => navLinks.classList.toggle("open"));
navLinks.querySelectorAll("a").forEach(a => a.addEventListener("click", () => navLinks.classList.remove("open")));

// Footer year + earliest selectable date = today
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("dateInput").min = new Date().toISOString().split("T")[0];

// If an image fails to load, hide it so the soft gradient behind shows instead
document.querySelectorAll("img").forEach(img => img.addEventListener("error", () => (img.style.visibility = "hidden")));

// "Book" on a service card → tick that service and scroll to the form
document.querySelectorAll(".book-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const service = btn.closest(".card").dataset.service;
    document.querySelectorAll('input[name="services"]').forEach(cb => {
      if (cb.value === service) cb.checked = true;
    });
    document.getElementById("booking").scrollIntoView({ behavior: "smooth" });
  });
});

// "Choose package" → select package and scroll to the form
document.querySelectorAll(".pkg-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.getElementById("packageSelect").value = btn.dataset.pkg;
    document.getElementById("booking").scrollIntoView({ behavior: "smooth" });
  });
});

// ----- Storage helpers -----
function loadBookings() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
  catch { return []; }
}
function saveBookings(list) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(list)); } catch { /* storage unavailable */ }
}

// ----- Render "My Bookings" -----
function renderBookings() {
  const list = loadBookings();
  const ul = document.getElementById("bookingList");
  if (!list.length) { ul.innerHTML = '<li class="empty">No bookings yet.</li>'; return; }
  ul.innerHTML = "";
  list.slice().reverse().forEach(b => {
    const li = document.createElement("li");
    const date = new Date(b.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
    li.innerHTML = `
      <button class="del" title="Remove" data-id="${b.id}">×</button>
      <strong></strong>
      <span class="svc"></span><br/>
      📅 ${date} · 👥 ${b.guests} guests<br/>
      <span class="muted small">Ref: ${b.id}</span>`;
    li.querySelector("strong").textContent = b.name;
    li.querySelector(".svc").textContent = [b.package, ...b.services].filter(Boolean).join(" · ");
    ul.appendChild(li);
  });
  ul.querySelectorAll(".del").forEach(btn => btn.addEventListener("click", () => {
    saveBookings(loadBookings().filter(b => b.id !== btn.dataset.id));
    renderBookings();
  }));
}

// ----- Form submit -----
const form = document.getElementById("bookingForm");
const errorEl = document.getElementById("formError");

form.addEventListener("submit", e => {
  e.preventDefault();
  const data = new FormData(form);
  const services = data.getAll("services");
  const pkg = data.get("package");

  if (!form.checkValidity()) {
    errorEl.textContent = "Please fill in your name, a valid phone, email, date and guest count.";
    form.reportValidity();
    return;
  }
  if (!services.length && !pkg) {
    errorEl.textContent = "Pick at least one service or a package.";
    return;
  }
  errorEl.textContent = "";

  const booking = {
    id: "WE" + Date.now().toString().slice(-6),
    name: data.get("name").trim(),
    phone: data.get("phone").trim(),
    email: data.get("email").trim(),
    date: data.get("date"),
    guests: data.get("guests"),
    location: data.get("location").trim(),
    services,
    package: pkg,
    notes: data.get("notes").trim(),
    createdAt: new Date().toISOString()
  };

  const list = loadBookings();
  list.push(booking);
  saveBookings(list);
  renderBookings();
  form.reset();

  document.getElementById("modalText").textContent =
    `Thank you, ${booking.name}! Your reference is ${booking.id}. Our team will call you within 24 hours to confirm.`;
  document.getElementById("modal").classList.add("open");
});

document.getElementById("modalClose").addEventListener("click", () =>
  document.getElementById("modal").classList.remove("open"));

// ----- Scroll reveal -----
const observer = new IntersectionObserver(entries => {
  entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add("visible"); observer.unobserve(en.target); } });
}, { threshold: 0.12 });
document.querySelectorAll(".card, .package, .section-head, .gallery img, .booking-form, .my-bookings")
  .forEach(el => { el.classList.add("reveal"); observer.observe(el); });

renderBookings();
