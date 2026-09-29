// ======================================
// JACE REAL ESTATE - WEBSITE JAVASCRIPT
// ======================================


// ======================================
// NAVIGATION
// ======================================

const navbar = document.getElementById("navbar");

if (navbar) {
  window.addEventListener("scroll", () => {

    if (window.scrollY > 40) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

  });
}


// ======================================
// MOBILE MENU
// ======================================

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {

  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  document.querySelectorAll(".nav-links a").forEach((link) => {

    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
    });

  });

}


// ======================================
// SMOOTH SCROLL
// ======================================

document.querySelectorAll('a[href^="#"]').forEach((link) => {

  link.addEventListener("click", function (event) {

    const targetId = this.getAttribute("href");

    if (!targetId || targetId === "#") {
      return;
    }

    const target = document.querySelector(targetId);

    if (target) {

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    }

  });

});


// ======================================
// SCROLL REVEAL ANIMATIONS
// ======================================

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {

  const revealObserver = new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          entry.target.classList.add("visible");

          revealObserver.unobserve(entry.target);

        }

      });

    },
    {
      threshold: 0.12
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });

} else {

  // Fallback for older browsers
  revealElements.forEach((element) => {
    element.classList.add("visible");
  });

}


// ======================================
// CONTACT FORM + FORMSPREE
// ======================================

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if (contactForm) {

  contactForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const submitButton =
      contactForm.querySelector(".submit-button");


    // ==================================
    // CHECK FORM ELEMENTS
    // ==================================

    if (!formMessage || !submitButton) {

      console.error(
        "Form message or submit button not found."
      );

      return;
    }


    // ==================================
    // GET FORM VALUES
    // ==================================

    const name =
      document.getElementById("name")?.value.trim();

    const email =
      document.getElementById("email")?.value.trim();

    const phone =
      document.getElementById("phone")?.value.trim();

    const interest =
      document.getElementById("interest")?.value;

    const location =
      document.getElementById("locationInput")?.value.trim();

    const message =
      document.getElementById("message")?.value.trim();


    // ==================================
    // REQUIRED FIELD CHECK
    // ==================================

    if (
      !name ||
      !email ||
      !phone ||
      !interest ||
      !location ||
      !message
    ) {

      formMessage.textContent =
        "Please complete all required fields.";

      formMessage.style.color =
        "#d8a0a0";

      return;
    }


    // ==================================
    // EMAIL VALIDATION
    // ==================================

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {

      formMessage.textContent =
        "Please enter a valid email address.";

      formMessage.style.color =
        "#d8a0a0";

      return;
    }


    // ==================================
    // SHOW SENDING
    // ==================================

    submitButton.disabled = true;

    submitButton.innerHTML =
      "SENDING...";

    formMessage.textContent =
      "Sending your request...";

    formMessage.style.color =
      "#c8a96b";


    // ==================================
    // CREATE FORM DATA
    // ==================================

    const formData =
      new FormData(contactForm);


    // ==================================
    // SEND TO FORMSPREE
    // ==================================

    try {

      const response = await fetch(
        contactForm.action,
        {
          method: "POST",
          body: formData,
          headers: {
            "Accept": "application/json"
          }
        }
      );


      // ==================================
      // READ FORMSPREE RESPONSE
      // ==================================

      let data = {};

      try {

        data = await response.json();

      } catch (jsonError) {

        console.log(
          "Formspree did not return JSON."
        );

      }


      console.log(
        "Formspree status:",
        response.status
      );

      console.log(
        "Formspree response:",
        data
      );


      // ==================================
      // SUCCESS
      // ==================================

      if (response.ok) {

        formMessage.textContent =
          "Thank you. Your request has been received. Our team will get back to you shortly.";

        formMessage.style.color =
          "#c8a96b";

        contactForm.reset();

      }


      // ==================================
      // FORMSPREE ERROR
      // ==================================

      else {

        let errorText =
          "Form submission failed.";

        if (
          data &&
          data.errors &&
          Array.isArray(data.errors) &&
          data.errors.length > 0
        ) {

          errorText =
            data.errors
              .map((error) => error.message)
              .join(" ");

        }

        else if (
          data &&
          data.error
        ) {

          errorText =
            data.error;

        }

        else if (
          data &&
          data.message
        ) {

          errorText =
            data.message;

        }

        formMessage.textContent =
          errorText;

        formMessage.style.color =
          "#d8a0a0";

        console.error(
          "Formspree submission failed:",
          data
        );

      }

    }


    // ==================================
    // CONNECTION ERROR
    // ==================================

    catch (error) {

      console.error(
        "Formspree connection error:",
        error
      );

      formMessage.textContent =
        "Unable to connect to the form service. Please check your internet connection and try again.";

      formMessage.style.color =
        "#d8a0a0";

    }


    // ==================================
    // RESTORE BUTTON
    // ==================================

    submitButton.disabled = false;

    submitButton.innerHTML =
      'Submit Request <span>→</span>';

  });

}
