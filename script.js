// ---- SKILL BARS ----
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

// ---- EXPERIENCE ACCORDION ----
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
  var wrapper = document.getElementById("slidesWrapper");

  // Clone all slides and add at end
  allSlides.forEach(function (slide) {
    var clone = slide.cloneNode(true);
    clone.classList.add("clone");
    wrapper.appendChild(clone);
  });

  updateDots();
  updateSlider(false);

  // Drag support
  var startX = 0;
  wrapper.addEventListener("mousedown", function (e) {
    startX = e.clientX;
  });
  wrapper.addEventListener("mouseup", function (e) {
    var diff = startX - e.clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
  });
  var touchStartX = 0;

  wrapper.addEventListener(
    "touchstart",
    function (e) {
      touchStartX = e.changedTouches[0].clientX;
    },
    { passive: true },
  );

  wrapper.addEventListener("touchend", function (e) {
    var touchEndX = e.changedTouches[0].clientX;
    var diff = touchStartX - touchEndX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) nextSlide();
      else prevSlide();
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

function updateSlider(instant) {
  var wrapper = document.getElementById("slidesWrapper");
  var total = allSlides.length;
  if (instant) {
    wrapper.style.transition = "none";
  } else {
    wrapper.style.transition = "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
  }
  wrapper.style.transform = "translateX(-" + currentSlide * 100 + "%)";
  var displaySlide = currentSlide % total;
  document.querySelectorAll(".progress-dot").forEach(function (d, i) {
    d.classList.toggle("active", i === displaySlide);
  });
  document.getElementById("currentNum").textContent = displaySlide + 1;
}

function nextSlide() {
  stopAllVideos();
  var wrapper = document.getElementById("slidesWrapper");
  var total = allSlides.length;
  currentSlide++;

  wrapper.style.transition = "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
  wrapper.style.transform = "translateX(-" + currentSlide * 100 + "%)";

  var displaySlide = currentSlide % total;
  document.querySelectorAll(".progress-dot").forEach(function (d, i) {
    d.classList.toggle("active", i === displaySlide);
  });
  document.getElementById("currentNum").textContent = displaySlide + 1;

  if (currentSlide >= total) {
    setTimeout(function () {
      wrapper.style.transition = "none";
      currentSlide = 0;
      wrapper.style.transform = "translateX(0%)";
    }, 600);
  }
}

function prevSlide() {
  stopAllVideos();
  var wrapper = document.getElementById("slidesWrapper");
  var total = allSlides.length;

  if (currentSlide <= 0) {
    wrapper.style.transition = "none";
    currentSlide = total;
    wrapper.style.transform = "translateX(-" + currentSlide * 100 + "%)";

    setTimeout(function () {
      wrapper.style.transition = "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
      currentSlide = total - 1;
      wrapper.style.transform = "translateX(-" + currentSlide * 100 + "%)";
      document.querySelectorAll(".progress-dot").forEach(function (d, i) {
        d.classList.toggle("active", i === currentSlide % total);
      });
      document.getElementById("currentNum").textContent =
        (currentSlide % total) + 1;
    }, 20);
    return;
  }

  currentSlide--;
  wrapper.style.transition = "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
  wrapper.style.transform = "translateX(-" + currentSlide * 100 + "%)";

  var displaySlide = currentSlide % total;
  document.querySelectorAll(".progress-dot").forEach(function (d, i) {
    d.classList.toggle("active", i === displaySlide);
  });
  document.getElementById("currentNum").textContent = displaySlide + 1;
}
function stopAllVideos() {
  var iframes = document.querySelectorAll(".slide iframe");
  iframes.forEach(function (iframe) {
    var src = iframe.src;
    iframe.src = "";
    iframe.src = src;
  });
}

document.addEventListener("DOMContentLoaded", function () {
  initSlider();
});
