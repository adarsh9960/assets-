

(function() {
  
  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });
  });
  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle, .faq-item .faq-header').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  // Initialize particles.js with custom configuration
  if (typeof tsParticles !== 'undefined') {
    tsParticles.load("tsparticles", {
      fullScreen: { enable: true }, // ✅ this enables full screen canvas
      background: { color: "#000000" },
      fpsLimit: 60,
      interactivity: {
        detectsOn: "canvas",
        events: {
          onHover: {
            enable: true,
            mode: "repulse"
          },
          onClick: {
            enable: true,
            mode: "push"
          },
          resize: true
        },
        modes: {
          repulse: {
            distance: 100,
            duration: 0.4
          },
          push: {
            quantity: 4
          }
        }
      },
      particles: {
        number: {
          value: 100,
          density: {
            enable: true,
            area: 800
          }
        },
        color: {
          value: "#22ffffff"
        },
        shape: {
          type: "circle"
        },
        opacity: {
          value: 0.5,
          random: true
        },
        size: {
          value: { min: 1, max: 4 }
        },
        links: {
          enable: true,
          distance: 120,
          color: "#00bfff",
          opacity: 0.3,
          width: 1
        },
        move: {
          enable: true,
          speed: 1.5,
          direction: "none",
          outModes: "bounce",
          attract: {
            enable: false
          }
        }
      }
    });
  }
})();

// Function to handle the payment process
// eslint-disable-next-line no-unused-vars
function pay1999() {
    const amount = 199900;

    var options = {
      key: "rzp_live_OG8VXjQeYUOqSc",
      amount: amount,
      currency: "INR",
      name: "ITZ Adarsh",
      description: "Donation / Support",
      image: "https://itzadarsh.co.in/logo.png",
      handler: function (response) {
          window.location.href = "U2FsdGVkX1+J1aH2bGztC5fsAjK0gwZpI9KHcxTxYzY.html?pid=" + response.razorpay_payment_id;
      },
      prefill: { name: "User" },
      theme: { color: "#000000ff" }
    };

    var rzp = new Razorpay(options);
    rzp.open();
}

function pay4999() {
    const amount = 499900;

    var options = {
      key: "rzp_live_OG8VXjQeYUOqSc",
      amount: amount,
      currency: "INR",
      name: "ITZ Adarsh",
      description: "Service Payment",
      image: "https://itzadarsh.co.in/logo.png",
      handler: function (response) {
          window.location.href = "U2FsdGVkX1+J1aH2bGztC5fsAjK0gwZpI9KHcxTxYzY.html?pid=" + response.razorpay_payment_id;
      },
      prefill: { name: "User" },
      theme: { color: "#000000ff" }
    };

    var rzp = new Razorpay(options);
    rzp.open();
}

function pay6999() {
    const amount = 699900;

    var options = {
      key: "rzp_live_OG8VXjQeYUOqSc",
      amount: amount,
      currency: "INR",
      name: "ITZ Adarsh",
      description: "Service Payment",
      image: "https://itzadarsh.co.in/logo.png",
      handler: function (response) {
          window.location.href = "U2FsdGVkX1+J1aH2bGztC5fsAjK0gwZpI9KHcxTxYzY.html?pid=" + response.razorpay_payment_id;
      },
      prefill: { name: "user" },
      theme: { color: "#000000ff" }
    };

    var rzp = new Razorpay(options);
    rzp.open();
}

function pay8999() {
    const amount = 899900;

    var options = {
      key: "rzp_live_OG8VXjQeYUOqSc",
      amount: amount,
      currency: "INR",
      name: "ITZ Adarsh",
      description: "Service Payment",
      image: "https://itzadarsh.co.in/logo.png",
      handler: function (response) {
          window.location.href = "U2FsdGVkX1+J1aH2bGztC5fsAjK0gwZpI9KHcxTxYzY.html?pid=" + response.razorpay_payment_id;
      },
      prefill: { name: "username" },
      theme: { color: "#000000ff" }
    };

    var rzp = new Razorpay(options);
    rzp.open();
}

function payCustom(event) {
    event.preventDefault();
    let amountInput = document.getElementById("amount").value;
    let amount = parseFloat(amountInput);

    if (isNaN(amount) || amount < 10) {
      alert("Amount should be ₹10 or more.");
      return;
    }

    let amountInPaise = Math.round(amount * 100);

    var options = {
      key: "rzp_live_OG8VXjQeYUOqSc",
      amount: amountInPaise,
      currency: "INR",
      name: "ITZ Adarsh",
      description: "Support Payment",
      image: "https://itzadarsh.co.in/logo.png",
      handler: function (response) {
        alert("Payment Successful! ID: " + response.razorpay_payment_id);
      },
      prefill: { name: "User" },
      theme: { color: "#d1fffbff" }
    };

    var rzp = new Razorpay(options);
    rzp.open();
}
