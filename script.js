const bars = document.querySelectorAll(".bar-fill");
const state = [];
bars.forEach(function (bar, i) {
  const target = parseInt(bar.getAttribute("data-target"));
  state[i] = {
    current: Math.random() * target,
    direction: Math.random() > 0.5 ? 1 : -1,
    speed: 0.2 + Math.random() * 0.8,
    locked: false,
    target: target,
  };
});
function animate() {
  bars.forEach(function (bar, i) {
    if (state[i].locked) return;

    state[i].current += state[i].direction * state[i].speed;

    if (state[i].current >= 100) {
      state[i].direction = -1;
    } else if (state[i].current <= 0) {
      state[i].direction = 1;
    }

    bar.style.width = state[i].current + "%";
  });

  requestAnimationFrame(animate);
}
animate();
function toggleLock(skillItem) {
  const bar = skillItem.querySelector(".bar-fill");
  const name = skillItem.querySelector(".skill-name");
  const allSkillItems = Array.from(document.querySelectorAll("#skills li"));
  const index = allSkillItems.indexOf(skillItem);

  if (index === -1) return;

  if (!state[index].locked) {
    state[index].locked = true;
    state[index].current = state[index].target;
    bar.style.width = state[index].target + "%";
    name.classList.add("locked");
  } else {
    state[index].locked = false;
    name.classList.remove("locked");
  }
}
var allCards = ["c1", "c2", "c3"];

function toggle(id) {
  var card = document.getElementById(id);
  var isOpen = card.classList.contains("open");
  closeAll();
  if (!isOpen) {
    card.classList.add("open");
    allCards.forEach(function (cid) {
      if (cid !== id) {
        document.getElementById(cid).classList.add("hidden");
      }
    });
  }
}

function closeAll() {
  allCards.forEach(function (cid) {
    document.getElementById(cid).classList.remove("open");
    document.getElementById(cid).classList.remove("hidden");
  });
}
// ---- PROJECTS SLIDER ----

var currentSlide = 0;
var allSlides = [];

function initSlider() {
  allSlides = Array.from(document.querySelectorAll(".slide"));
  updateDots();
  updateSlider();

  // Drag support
  var wrapper = document.getElementById("slidesWrapper");
  var startX = 0;

  wrapper.addEventListener("mousedown", function (e) {
    startX = e.clientX;
  });

  wrapper.addEventListener("mouseup", function (e) {
    var diff = startX - e.clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  });
}

function updateDots() {
  var dotsContainer = document.getElementById("progressDots");
  dotsContainer.innerHTML = "";
  allSlides.forEach(function (_, i) {
    var dot = document.createElement("div");
    dot.className = "progress-dot" + (i === currentSlide ? " active" : "");
    dotsContainer.appendChild(dot);
  });
  document.getElementById("totalNum").textContent = allSlides.length;
}

function updateSlider() {
  var wrapper = document.getElementById("slidesWrapper");
  wrapper.style.transform = "translateX(-" + currentSlide * 100 + "%)";
  document.querySelectorAll(".progress-dot").forEach(function (d, i) {
    d.classList.toggle("active", i === currentSlide);
  });
  document.getElementById("currentNum").textContent = currentSlide + 1;
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % allSlides.length;
  updateSlider();
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + allSlides.length) % allSlides.length;
  updateSlider();
}

initSlider();
const backToTopBtn = document.getElementById("backToTop");

window.addEventListener("scroll", function () {
  if (window.scrollY > 250) {
    backToTopBtn.classList.add("show");
  } else {
    backToTopBtn.classList.remove("show");
  }
});

backToTopBtn.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
