// =======================
// 1️⃣ Guest Map (UUID -> Name)
// =======================
const guestList = {
  "abc123": "លោក សុខ ដារ៉ា",
  "def456": "លោកស្រី ចាន់ ស្រីពៅ",
  "ghi789": "Mr. John Smith",
  "wedding001": "លោក វ៉ាន់ ណារ៉ា",
  "vip888": "អ្នកគ្រូ ស្រី លីណា"
};

//  Define global variables
const groomName = "ចាន់​ តុលា";
const brideName = "សួន សោភា";
const weddingDate = new Date("Feb 22, 2026 11:00:00");

// Khmer translations
const khmerWeekdays = ["អាទិត្យ","ច័ន្ទ","អង្គារ","ពុធ","ព្រហស្បតិ៍","សុក្រ","សៅរ៍"];
const khmerMonths = ["មករា","កុម្ភៈ","មិនា","មេសា","ឧសភា","មិថុនា","កក្កដា","សីហា","កញ្ញា","តុលា","វិច្ឆិកា","ធ្នូ"];
const khmerDigits = ["០","១","២","៣","៤","៥","៦","៧","៨","៩"];


// Convert English number to Khmer digits
function toKhmerNumber(num, pad = 0) {
  let str = String(num).padStart(pad, "0"); // pad with leading zeros if needed
  return str.split("").map(d => khmerDigits[d] || d).join("");
}

// 2️⃣ Inject into HTML
function showCoupleNames() {
  const groomEl = document.querySelector(".groom-name");
  const brideEl = document.querySelector(".bride-name");

  if (groomEl) groomEl.textContent = groomName;
  if (brideEl) brideEl.textContent = brideName;
}

// 3️⃣ Call the function
showCoupleNames();
function showText(content, className) {
  const text = document.querySelector(className);
  text.textContent = content
}

function getKhmerWeddingDate() {
  const weekday = khmerWeekdays[weddingDate.getDay()];
  const day = toKhmerNumber(weddingDate.getDate());
  const month = khmerMonths[weddingDate.getMonth()];
  const year = toKhmerNumber(weddingDate.getFullYear());

  let hours = weddingDate.getHours();
  let minutes = weddingDate.getMinutes();

  const ampm = hours >= 12 ? "ល្ងាច" : "ព្រឹក";
  hours = hours % 12 || 12;

  // Convert hours and minutes to Khmer digits with padding
  const khmerHours = toKhmerNumber(hours);
  const khmerMinutes = toKhmerNumber(minutes, 2); // pad to 2 digits

  return `ថ្ងៃ${weekday}, ${day} ${month} ឆ្នាំ​ ${year} វេលាម៉ោង ${khmerHours}:${khmerMinutes} ${ampm}`;
}

// Inject into HTML
const eventEl = document.querySelector(".event_date");
if (eventEl) eventEl.textContent = getKhmerWeddingDate();


// =======================
// 2️⃣ Get Guest ID from URL
// =======================
function getGuestId() {
  const params = new URLSearchParams(window.location.search);
  const queryId = params.get("id");
  if (queryId) return queryId;

  const pathId = window.location.pathname.replace("/", "");
  return pathId || null;
}

// =======================
// 3️⃣ Display Guest Name
// =======================
function showGuestName() {
  const guestId = getGuestId();
  const guestElement = document.querySelector(".guest_name");
  if (!guestElement) return;

  const guestName = guestList[guestId] || "ភ្ញៀវកិត្តិយស";
  guestElement.innerHTML = `
    សូមគោរពអញ្ជើញ<br>
    <strong>${guestName}</strong>
  `;
}
showGuestName();

// =======================
// 4️⃣ Scroll Animation (fade-in)
// =======================
const faders = document.querySelectorAll(".fade-in");
const appearOptions = { threshold: 0.3 };

const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      observer.unobserve(entry.target);
    }
  });
}, appearOptions);

faders.forEach(fader => appearOnScroll.observe(fader));

// =======================
// 5️⃣ Countdown Timer
// =======================

function updateTimer() {
  const now = Date.now();
  const distance = weddingDate.getTime() - now;

  if (distance <= 0) {
    clearInterval(timer);
    document.getElementById("timer").innerHTML = "ថ្ងៃពិសេសបានមកដល់ 💍";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("timer").innerHTML = `
    <div class="time-item">${days}<span>ថ្ងៃ</span></div>
    <div class="time-item">${hours}<span>ម៉ោង</span></div>
    <div class="time-item">${minutes}<span>នាទី</span></div>
    <div class="time-item">${seconds}<span>វិនាទី</span></div>
  `;
}

const timer = setInterval(updateTimer, 1000);
updateTimer(); // Initialize immediately

// =======================
// 6️⃣ Gallery
// =======================
const galleryImages = [
  "gallery/photo1.jpg",
  "gallery/photo2.jpg",
  "gallery/photo3.jpg",
  "gallery/photo4.jpg",
  "gallery/photo5.jpg",
  "gallery/photo6.jpg"
];

const galleryGrid = document.getElementById("galleryGrid");

function createGalleryItem(src) {
  const div = document.createElement("div");
  div.classList.add("gallery-item");
  div.innerHTML = `<img src="${src}" alt="Wedding Photo">`;
  div.addEventListener("click", () => openLightbox(src));
  return div;
}

galleryImages.forEach(src => galleryGrid.appendChild(createGalleryItem(src)));

// =======================
// 7️⃣ Lightbox
// =======================
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const closeLightbox = document.getElementById("closeLightbox");

function openLightbox(src) {
  lightbox.style.display = "flex";
  lightboxImg.src = src;
}

function closeLightboxFn() {
  lightbox.style.display = "none";
}

closeLightbox.addEventListener("click", closeLightboxFn);
lightbox.addEventListener("click", e => {
  if (e.target === lightbox) closeLightboxFn();
});

// =======================
// 8️⃣ RSVP Form Submission
// =======================
const scriptURL = "https://script.google.com/macros/s/AKfycbx2jj9z4g1ZMAZi2t35qa-lMtE0s29QxENs_IbBNrdequZVXtz1bfvXJUIrZJgMcXPGZQ/exec";
const rsvpForm = document.getElementById("rsvpForm");
const successMessage = document.getElementById("rsvpSuccess");

rsvpForm.addEventListener("submit", async e => {
  e.preventDefault();

  const formData = {
    name: document.getElementById("name").value.trim(),
    email: document.getElementById("email").value.trim(),
    phone: document.getElementById("phone").value.trim(),
    guests: document.getElementById("guests").value.trim(),
    attendance: document.querySelector('input[name="attendance"]:checked')?.value || "",
    message: document.getElementById("message").value.trim()
  };

  // Simple validation
  if (!formData.name || !formData.email || !formData.attendance) {
    alert("សូមបំពេញព័ត៌មានទាំងអស់ដែលចាំបាច់!");
    return;
  }

  try {
    await fetch(scriptURL, {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify(formData)
    });

    rsvpForm.reset();
    successMessage.style.display = "block";
    successMessage.innerHTML = "សូមអរគុណ! យើងបានផ្ញើ QR Code ទៅកាន់ Email របស់អ្នកហើយ។";
  } catch (err) {
    console.error("RSVP Error:", err);
    alert("មានបញ្ហាក្នុងការផ្ញើ RSVP, សូមព្យាយាមម្តងទៀត។");
  }
});
