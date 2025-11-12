// Custom Cursor
document.addEventListener("DOMContentLoaded", function () {
  const cursor = document.querySelector(".custom-cursor");
  const cursorDot = document.querySelector(".cursor-dot");
  const cursorCircle = document.querySelector(".cursor-circle");

  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;

  // Only enable on desktop
  if (window.innerWidth > 768) {
    // Update cursor position on mouse move
    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    // Smooth cursor animation with premium easing
    function animateCursor() {
      // Smooth interpolation for premium feel (lower value = smoother)
      const easeFactor = 0.15;
      cursorX += (mouseX - cursorX) * easeFactor;
      cursorY += (mouseY - cursorY) * easeFactor;

      cursor.style.left = cursorX + "px";
      cursor.style.top = cursorY + "px";

      requestAnimationFrame(animateCursor);
    }

    animateCursor();

    // Hover effects on interactive elements
    const interactiveElements = document.querySelectorAll(
      "a, button, input, textarea, .cta-button, .submit-button"
    );

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        cursorCircle.style.width = "50px";
        cursorCircle.style.height = "50px";
        cursorCircle.style.opacity = "0.8";
      });

      el.addEventListener("mouseleave", () => {
        cursorCircle.style.width = "40px";
        cursorCircle.style.height = "40px";
        cursorCircle.style.opacity = "1";
      });
    });
  }
});

// Typewriter Effect
document.addEventListener("DOMContentLoaded", function () {
  const typewriterText = document.getElementById("typewriter-text");
  const phrases = [
    "Building Trust.",
    "Delivering Value.",
    "Creating Opportunities.",
    "Securing Futures.",
  ];

  let currentPhraseIndex = 0;
  let currentCharIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100; // ms per character
  let pauseBeforeDelete = 1000; // 1 second
  let pauseBeforeType = 1000; // 1 second

  function typeWriter() {
    const currentPhrase = phrases[currentPhraseIndex];

    if (!isDeleting && currentCharIndex < currentPhrase.length) {
      // Typing forward
      typewriterText.textContent = currentPhrase.substring(
        0,
        currentCharIndex + 1
      );
      currentCharIndex++;
      typingSpeed = 80 + Math.random() * 40; // Random speed between 80-120ms
      setTimeout(typeWriter, typingSpeed);
    } else if (!isDeleting && currentCharIndex === currentPhrase.length) {
      // Finished typing, pause before deleting
      isDeleting = true;
      setTimeout(typeWriter, pauseBeforeDelete);
    } else if (isDeleting && currentCharIndex > 0) {
      // Deleting backward
      typewriterText.textContent = currentPhrase.substring(
        0,
        currentCharIndex - 1
      );
      currentCharIndex--;
      typingSpeed = 50; // Faster when deleting
      setTimeout(typeWriter, typingSpeed);
    } else if (isDeleting && currentCharIndex === 0) {
      // Finished deleting, move to next phrase
      isDeleting = false;
      currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
      setTimeout(typeWriter, pauseBeforeType);
    }
  }

  // Start the typewriter effect
  typeWriter();
});

// Hero Image Slideshow
document.addEventListener("DOMContentLoaded", function () {
  // Hero slideshow functionality
  const heroSlides = document.querySelectorAll(".hero-slide");
  let currentSlide = 0;
  const slideInterval = 5000; // Change image every 5 seconds (5000ms)

  if (heroSlides.length > 1) {
    function nextSlide() {
      // Remove active class from current slide
      heroSlides[currentSlide].classList.remove("active");

      // Move to next slide
      currentSlide = (currentSlide + 1) % heroSlides.length;

      // Add active class to new slide
      heroSlides[currentSlide].classList.add("active");
    }

    // Start the slideshow
    setInterval(nextSlide, slideInterval);
  }
});

// Contact Form Handler
document.addEventListener("DOMContentLoaded", function () {
  // EmailJS service configuration
  // Replace these with your EmailJS Service ID, Template ID, and Public Key
  const serviceID = "service_4nfpr59";
  const templateID = "template_un36xg4";
  const publicKey = "ZihMcJybaI7btmewX";

  // Initialize EmailJS
  emailjs.init(publicKey);

  const contactForm = document.getElementById("contactForm");
  const formMessage = document.getElementById("formMessage");
  const submitBtn = document.getElementById("submitBtn");

  // Function to show messages
  function showMessage(text, type) {
    formMessage.textContent = text;
    formMessage.className = "form-message " + type;
    formMessage.style.display = "block";

    // Hide message after 5 seconds
    setTimeout(function () {
      formMessage.style.display = "none";
    }, 5000);
  }

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form values
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    // Validate form
    if (!name || !email || !message) {
      showMessage("Please fill in all fields.", "error");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showMessage("Please enter a valid email address.", "error");
      return;
    }

    // Disable submit button and show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    // Prepare template parameters
    const templateParams = {
      name: name,
      email: email,
      message: message,
      to_name: "V6 Developerss",
    };

    // Send email using EmailJS
    emailjs.send(serviceID, templateID, templateParams).then(
      function (response) {
        // Success
        showMessage(
          "Thank you! Your message has been sent successfully. We'll get back to you soon.",
          "success"
        );
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = "Send Message";
      },
      function (error) {
        // Error
        console.error("EmailJS Error:", error);
        showMessage(
          "Sorry, there was an error sending your message. Please try again later or contact us directly.",
          "error"
        );
        submitBtn.disabled = false;
        submitBtn.textContent = "Send Message";
      }
    );
  });
});

// Project Modal Handler
document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("projectModal");
  const modalImage = document.getElementById("modalProjectImage");
  const modalTitle = document.getElementById("modalProjectName");
  const closeBtn = document.querySelector(".modal-close-btn");
  const viewButtons = document.querySelectorAll(".project-view-btn");
  const projectCards = document.querySelectorAll(".project-card");

  // Detect if device is mobile
  function isMobileDevice() {
    return window.innerWidth <= 768;
  }

  // Function to open modal
  function openModal(imageSrc, projectName) {
    modalImage.src = imageSrc;
    modalImage.alt = projectName;
    modalTitle.textContent = projectName;
    modal.classList.add("active");
    document.body.style.overflow = "hidden"; // Prevent background scrolling
  }

  // Function to close modal
  function closeModal() {
    modal.classList.remove("active");
    document.body.style.overflow = ""; // Restore scrolling
  }

  // Handle project card clicks on mobile devices
  projectCards.forEach((card) => {
    card.addEventListener("click", function (e) {
      // Only handle on mobile devices
      if (!isMobileDevice()) {
        return;
      }

      // Don't trigger if clicking the view button itself or overlay
      if (
        e.target.classList.contains("project-view-btn") ||
        e.target.closest(".project-view-btn") ||
        e.target.closest(".project-overlay")
      ) {
        return;
      }

      // Remove active class from all cards
      projectCards.forEach((c) => c.classList.remove("active"));

      // Toggle active class on clicked card
      if (this.classList.contains("active")) {
        this.classList.remove("active");
      } else {
        this.classList.add("active");
      }
    });
  });

  // Handle window resize to update behavior
  let resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      // If switching from mobile to desktop, remove active classes
      if (!isMobileDevice()) {
        projectCards.forEach((card) => card.classList.remove("active"));
      }
    }, 250);
  });

  // Close active card when clicking outside on mobile
  if (isMobileDevice()) {
    document.addEventListener("click", function (e) {
      if (!isMobileDevice()) return;

      // Check if click is outside all project cards
      const clickedCard = e.target.closest(".project-card");
      if (!clickedCard) {
        projectCards.forEach((card) => card.classList.remove("active"));
      }
    });
  }

  // Add click event to all view buttons
  viewButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.stopPropagation(); // Prevent card click event
      const imageSrc = this.getAttribute("data-image");
      const projectName = this.getAttribute("data-name");
      openModal(imageSrc, projectName);

      // On mobile, remove active class after opening modal
      if (isMobileDevice()) {
        const card = this.closest(".project-card");
        if (card) {
          setTimeout(() => {
            card.classList.remove("active");
          }, 300);
        }
      }
    });
  });

  // Close modal when close button is clicked
  closeBtn.addEventListener("click", closeModal);

  // Close modal when overlay is clicked
  const modalOverlay = document.querySelector(".modal-overlay");
  modalOverlay.addEventListener("click", closeModal);

  // Close modal with Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeModal();
    }
  });

  // Prevent modal from closing when clicking inside modal container
  const modalContainer = document.querySelector(".modal-container");
  modalContainer.addEventListener("click", function (e) {
    e.stopPropagation();
  });
});
