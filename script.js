function submitForm(event) {
  // Prevent the form from submitting immediately to show the confirmation message
  event.preventDefault();

  // Show confirmation message in the message box
  document.getElementById("responseMessage").innerHTML =
    '<p style="text-align:center; color:#27ae60;">Thanks for your message! 💌</p>';

  // Submit the form after a short delay
  setTimeout(function () {
    // Submit the form using Formspree
    document.getElementById("contactForm").submit();
  }, 2000); // Wait 2 seconds before submitting
}

// FAQ toggle functionality
const faqs = document.querySelectorAll(".faq-item h3");
faqs.forEach((q) => {
  q.addEventListener("click", () => {
    const answer = q.nextElementSibling;
    answer.style.display = answer.style.display === "block" ? "none" : "block";
  });
});

// Mobile menu toggle
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("main-nav");

// Mobile menu toggle
menuToggle.addEventListener("click", () => {
  const isMenuActive = mainNav.classList.contains("active");

  // Toggle the menu
  mainNav.classList.toggle("active");
  menuToggle.textContent = isMenuActive ? "☰ " : "✕";

  // Toggle body class to prevent scrolling when menu is open
  document.body.classList.toggle("menu-open", !isMenuActive);
});

// Close menu when a link is clicked
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", function () {
    if (window.innerWidth <= 768) {
      mainNav.classList.remove("active");
      menuToggle.textContent = "☰ ";
      document.body.classList.remove("menu-open");
    }
  });
});

// Enhanced smooth scrolling for navigation links
document.querySelectorAll(".nav-link").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    // Remove active class from all links
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.classList.remove("active");
    });

    // Add active class to clicked link
    this.classList.add("active");

    // Get the target section
    const targetId = this.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    // Calculate position with offset for header
    const headerHeight = document.querySelector("header").offsetHeight;
    const targetPosition =
      targetSection.getBoundingClientRect().top +
      window.pageYOffset -
      headerHeight;

    // Smooth scroll to target
    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });

    // Close mobile menu if open
    if (window.innerWidth <= 768) {
      mainNav.classList.remove("active");
      menuToggle.textContent = "☰ ";
    }
  });
});

// Scroll animation for sections
const sections = document.querySelectorAll("section");

function checkSections() {
  const triggerBottom = window.innerHeight * 0.8;
  const triggerTop = window.innerHeight * 0.2;

  sections.forEach((section) => {
    const sectionTop = section.getBoundingClientRect().top;
    const sectionBottom = section.getBoundingClientRect().bottom;

    // Add visible class when section enters viewport from bottom
    if (sectionTop < triggerBottom && sectionTop > -100) {
      section.classList.add("visible");
      section.classList.remove("hidden");
    }
    // Reset animation when section is out of viewport
    else if (sectionTop >= triggerBottom || sectionBottom <= triggerTop) {
      section.classList.remove("visible");
      section.classList.add("hidden");
    }
  });
}

// Check sections on load
window.addEventListener("load", checkSections);

// Check sections on scroll
window.addEventListener("scroll", checkSections);

// Set active nav link based on scroll position
window.addEventListener("scroll", function () {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    const headerHeight = document.querySelector("header").offsetHeight;

    if (pageYOffset >= sectionTop - headerHeight - 10) {
      current = section.getAttribute("id");
    }
  });

  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// Handle resize events
window.addEventListener("resize", function () {
  if (window.innerWidth > 768 && mainNav.classList.contains("active")) {
    mainNav.classList.remove("active");
    menuToggle.textContent = "☰ ";
  }
});
