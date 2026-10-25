
const audio = document.getElementById("birthdaySong");
const soundToggle = document.getElementById("soundToggle");
const audioStatus = document.getElementById("audioStatus");

let songStarted = false;

async function playBirthdaySong() {
  try {
    await audio.play();
    songStarted = true;

    soundToggle.textContent = "♫ إيقاف الصوت";
    audioStatus.textContent = "الأغنية شغّالة 🎶";
  } catch (error) {
    console.log("تعذّر التشغيل التلقائي:", error);
    soundToggle.textContent = "♫ شغّلي فطومة";
    audioStatus.textContent = "اضغطي في أي مكان لتشغيل الأغنية 🎵";
  }
}

// المحاولة الأولى عند فتح الموقع
window.addEventListener("load", () => {
  playBirthdaySong();
});

// لو المتصفح منع التشغيل، نحاول بعد أول تفاعل من المستخدم
function startSongOnInteraction() {
  if (!songStarted) {
    playBirthdaySong();
  }
}

document.addEventListener("click", startSongOnInteraction, {
  once: true
});

document.addEventListener("keydown", startSongOnInteraction, {
  once: true
});

// زر التحكم في الأغنية
soundToggle.addEventListener("click", async () => {
  if (audio.paused) {
    await playBirthdaySong();
  } else {
    audio.pause();
    songStarted = false;

    soundToggle.textContent = "♫ تشغيل الصوت";
    audioStatus.textContent = "الأغنية متوقفة مؤقتًا";
  }
});


// تصفية الصور حسب الفئة
const filters = document.querySelectorAll(".filter");
const cards = document.querySelectorAll(".photo-card");
filters.forEach(button => button.addEventListener("click", () => {
  filters.forEach(item => item.classList.remove("active"));
  button.classList.add("active");
  const selected = button.dataset.filter;
  cards.forEach(card => {
    card.hidden = selected !== "all" && card.dataset.category !== selected;
  });
}));

// فتح الصور بحجم كبير
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxCaption = document.getElementById("lightboxCaption");
cards.forEach(card => card.addEventListener("click", () => {
  const img = card.querySelector("img");
  lightboxImage.src = card.dataset.full;
  lightboxCaption.textContent = card.querySelector("span").textContent;
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
}));
function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = "";
}
document.getElementById("lightboxClose").addEventListener("click", closeLightbox);
lightbox.addEventListener("click", event => { if (event.target === lightbox) closeLightbox(); });

// فتح الرسالة والاحتفال
const letterPaper = document.getElementById("letterPaper");
document.getElementById("openLetter").addEventListener("click", () => {
  letterPaper.classList.add("open");
  letterPaper.setAttribute("aria-hidden", "false");
  document.getElementById("openLetter").style.visibility = "hidden";
  launchConfetti();
});
document.getElementById("closeLetter").addEventListener("click", () => {
  letterPaper.classList.remove("open");
  letterPaper.setAttribute("aria-hidden", "true");
  document.getElementById("openLetter").style.visibility = "visible";
});

function launchConfetti() {
  const layer = document.getElementById("confettiLayer");
  const colors = ["#ff78b7", "#f7c5dc", "#fff0e9", "#b63875", "#ffd166"];
  for (let i = 0; i < 75; i++) {
    const piece = document.createElement("i");
    piece.className = "confetti";
    piece.style.left = Math.random() * 100 + "%";
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDelay = Math.random() * 1.2 + "s";
    piece.style.transform = `rotate(${Math.random() * 180}deg)`;
    layer.appendChild(piece);
    setTimeout(() => piece.remove(), 4500);
  }
}

// كونفيتي خفيف عند الضغط على اسم فطومة
document.querySelector(".hero h1").addEventListener("click", launchConfetti);
