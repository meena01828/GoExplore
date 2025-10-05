const menuBtn = document.querySelector(".menu-btn");
const navigation = document.querySelector(".navigation");
const navLinks = document.querySelectorAll(".navigation-items a");

// Toggle menu open/close
menuBtn.addEventListener("click", () => {
  menuBtn.classList.toggle("active");
  navigation.classList.toggle("active");
});

// Auto-close menu when a link is clicked
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    menuBtn.classList.remove("active");
    navigation.classList.remove("active");
  });
});

// JS for video slider navigation
const btns = document.querySelectorAll(".nav-btn");
const slides = document.querySelectorAll(".video-slide");
const contents = document.querySelectorAll(".content");

var sliderNav = function(manual){
  btns.forEach((btn) => btn.classList.remove("active"));
  slides.forEach((slide) => slide.classList.remove("active"));
  contents.forEach((content) => content.classList.remove("active"));

  btns[manual].classList.add("active");
  slides[manual].classList.add("active");
  contents[manual].classList.add("active");
}

btns.forEach((btn, i) => {
  btn.addEventListener("click", () => sliderNav(i));
});

// Navigation for Explore, Gallery, Contact
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".navigation-items a");
  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (href && href.endsWith(".html")) {
        e.preventDefault();
        window.location.href = href;
      }
    });
  });
});
