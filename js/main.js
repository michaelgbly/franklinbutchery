/* ============================================================
   THE FRANKLIN BUTCHERY — Main JavaScript
   Version 3.0 — Multi-Page GoDaddy Build
   ============================================================ */

(function() {
  'use strict';

  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ══════════════════════════════════════
     HERO SLIDER (only runs if hero exists)
     ══════════════════════════════════════ */
  var heroEl = document.querySelector('.tfb-hero');
  if (heroEl) {
    var slides     = heroEl.querySelectorAll('.tfb-hero__slide');
    var dots       = heroEl.querySelectorAll('.tfb-hero__dot');
    var prevBtn    = heroEl.querySelector('.tfb-hero__arrow--prev');
    var nextBtn    = heroEl.querySelector('.tfb-hero__arrow--next');
    var current    = 0;
    var total      = slides.length;
    var autoTimer  = null;
    var AUTO_DELAY = 7000;

    function goToSlide(n) {
      slides[current].classList.remove('tfb-active');
      dots[current].classList.remove('tfb-active');
      dots[current].setAttribute('aria-selected', 'false');
      current = ((n % total) + total) % total;
      slides[current].classList.add('tfb-active');
      dots[current].classList.add('tfb-active');
      dots[current].setAttribute('aria-selected', 'true');
    }

    function nextSlide() { goToSlide(current + 1); }
    function prevSlide() { goToSlide(current - 1); }

    function startAuto() {
      if (prefersReduced) return;
      stopAuto();
      autoTimer = setInterval(nextSlide, AUTO_DELAY);
    }
    function stopAuto() {
      if (autoTimer) { clearInterval(autoTimer); autoTimer = null; }
    }

    if (nextBtn) nextBtn.addEventListener('click', function() { stopAuto(); nextSlide(); startAuto(); });
    if (prevBtn) prevBtn.addEventListener('click', function() { stopAuto(); prevSlide(); startAuto(); });

    dots.forEach(function(dot, i) {
      dot.addEventListener('click', function() { stopAuto(); goToSlide(i); startAuto(); });
    });

    heroEl.addEventListener('keydown', function(e) {
      if (e.key === 'ArrowLeft')  { stopAuto(); prevSlide(); startAuto(); }
      if (e.key === 'ArrowRight') { stopAuto(); nextSlide(); startAuto(); }
    });

    /* Touch / swipe */
    (function() {
      var startX = 0, startY = 0, tracking = false;
      heroEl.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        tracking = true;
      }, { passive: true });
      heroEl.addEventListener('touchend', function(e) {
        if (!tracking) return;
        tracking = false;
        var dx = e.changedTouches[0].clientX - startX;
        var dy = e.changedTouches[0].clientY - startY;
        if (Math.abs(dx) < 40 || Math.abs(dy) > Math.abs(dx)) return;
        stopAuto();
        if (dx < 0) nextSlide(); else prevSlide();
        startAuto();
      }, { passive: true });
    })();

    startAuto();
  }

  /* ══════════════════════════════════════
     LAZY IMAGE FADE-IN
     ══════════════════════════════════════ */
  if (!prefersReduced) {
    document.querySelectorAll('img[loading="lazy"]').forEach(function(img) {
      if (img.complete) {
        img.classList.add('tfb-loaded');
      } else {
        img.addEventListener('load', function() {
          img.classList.add('tfb-loaded');
        });
      }
    });
  }

  /* ══════════════════════════════════════
     SCROLL REVEAL (IntersectionObserver)
     ══════════════════════════════════════ */
  var revealEls = document.querySelectorAll('.tfb-reveal');
  if (!prefersReduced && 'IntersectionObserver' in window) {
    var revealObs = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('tfb-visible');
          revealObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

    revealEls.forEach(function(el) { revealObs.observe(el); });
  } else {
    revealEls.forEach(function(el) { el.classList.add('tfb-visible'); });
  }

  /* ══════════════════════════════════════
     SMOOTH SCROLL FOR ANCHOR LINKS
     ══════════════════════════════════════ */
  document.querySelectorAll('a[href^="#"]').forEach(function(link) {
    link.addEventListener('click', function(e) {
      var href = this.getAttribute('href');
      if (href === '#') return;
      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        var offset = 64;
        var y = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: y, behavior: prefersReduced ? 'auto' : 'smooth' });
      }
    });
  });

  /* ══════════════════════════════════════
     SCROLL PROGRESS BAR
     ══════════════════════════════════════ */
  var progressBar = document.getElementById('tfb-scroll-progress');
  if (progressBar && !prefersReduced) {
    var ticking = false;
    window.addEventListener('scroll', function() {
      if (!ticking) {
        requestAnimationFrame(function() {
          var scrollTop  = window.pageYOffset || document.documentElement.scrollTop;
          var docHeight  = document.documentElement.scrollHeight - window.innerHeight;
          var pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
          progressBar.style.width = Math.min(pct, 100) + '%';
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /* ══════════════════════════════════════
     HAMBURGER MENU TOGGLE
     ══════════════════════════════════════ */
  var nav = document.getElementById('tfb-mini-nav');
  var hamburger = nav ? nav.querySelector('.tfb-hamburger') : null;
  var overlay = document.querySelector('.tfb-nav-overlay');

  function toggleNav() {
    if (!nav) return;
    var isOpen = nav.classList.toggle('tfb-nav-open');
    hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    if (overlay) overlay.classList.toggle('tfb-active', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  function closeNav() {
    if (!nav || !nav.classList.contains('tfb-nav-open')) return;
    nav.classList.remove('tfb-nav-open');
    if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
    if (overlay) overlay.classList.remove('tfb-active');
    document.body.style.overflow = '';
  }

  if (hamburger) {
    hamburger.addEventListener('click', toggleNav);
  }
  if (overlay) {
    overlay.addEventListener('click', closeNav);
  }

  /* Close drawer when a nav link or drawer CTA is clicked */
  document.querySelectorAll('#tfb-mini-nav .tfb-nav-pill, #tfb-mini-nav .tfb-nav-drawer-cta').forEach(function(pill) {
    pill.addEventListener('click', closeNav);
  });

  /* Close drawer on Escape key */
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeNav();
  });

  /* Close drawer if window resizes above tablet breakpoint */
  window.addEventListener('resize', function() {
    if (window.innerWidth > 1023) closeNav();
  });

  /* ══════════════════════════════════════
     ACTIVE NAV PILL HIGHLIGHT
     ══════════════════════════════════════ */
  var pills = document.querySelectorAll('#tfb-mini-nav .tfb-nav-pill');

  pills.forEach(function(pill) {
    pill.addEventListener('click', function() {
      pills.forEach(function(p) { p.classList.remove('active'); });
      pill.classList.add('active');
    });
  });

  /* ── Seafood Tabs ── */
  var seafoodTabs = document.querySelectorAll('.tfb-seafood-tab');
  seafoodTabs.forEach(function(tab) {
    tab.addEventListener('click', function() {
      seafoodTabs.forEach(function(t) { t.classList.remove('active'); });
      tab.classList.add('active');
      var panels = document.querySelectorAll('.tfb-seafood-panel');
      panels.forEach(function(p) { p.classList.remove('active'); });
      var target = document.getElementById('tfb-panel-' + tab.getAttribute('data-tab'));
      if (target) target.classList.add('active');
    });
  });

  /* ── Butcher Case Tabs ── */
  var butcherTabs = document.querySelectorAll('.tfb-butcher-tab');
  butcherTabs.forEach(function(tab) {
    tab.addEventListener('click', function() {
      butcherTabs.forEach(function(t) { t.classList.remove('active'); });
      tab.classList.add('active');
      var panels = document.querySelectorAll('.tfb-butcher-panel');
      panels.forEach(function(p) { p.classList.remove('active'); });
      var target = document.getElementById('tfb-panel-' + tab.getAttribute('data-tab'));
      if (target) target.classList.add('active');
    });
  });

  /* ── Merch Tabs ── */
  var merchTabs = document.querySelectorAll('.tfb-merch-tab');
  merchTabs.forEach(function(tab) {
    tab.addEventListener('click', function() {
      merchTabs.forEach(function(t) { t.classList.remove('active'); });
      tab.classList.add('active');
      var panels = document.querySelectorAll('.tfb-merch-panel');
      panels.forEach(function(p) { p.classList.remove('active'); });
      var target = document.getElementById('tfb-panel-' + tab.getAttribute('data-tab'));
      if (target) target.classList.add('active');
    });
  });

  /* ── Beer & Wine Tabs ── */
  var bwTabs = document.querySelectorAll('.tfb-bw-tab');
  bwTabs.forEach(function(tab) {
    tab.addEventListener('click', function() {
      bwTabs.forEach(function(t) { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      var panels = document.querySelectorAll('.tfb-bw-panel');
      panels.forEach(function(p) { p.classList.remove('active'); });
      var target = document.getElementById('tfb-panel-' + tab.getAttribute('data-tab'));
      if (target) target.classList.add('active');
    });
  });

  /* ── Contact Form Submission ── */
  var contactForm = document.getElementById('tfb-contact-form');
  var successMsg = document.getElementById('tfb-form-success');

  if (contactForm && successMsg) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      var submitBtn = contactForm.querySelector('.tfb-contact-submit');
      var originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending\u2026';
      submitBtn.disabled = true;

      var formData = new FormData(contactForm);

      fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      }).then(function(response) {
        if (response.ok) {
          contactForm.style.display = 'none';
          successMsg.classList.add('tfb-active');
          window.scrollTo({
            top: successMsg.getBoundingClientRect().top + window.pageYOffset - 120,
            behavior: prefersReduced ? 'auto' : 'smooth'
          });
        } else {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
          alert('Something went wrong. Please try again or email us directly at family@franklinbutchery.com');
        }
      }).catch(function() {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        alert('Something went wrong. Please try again or email us directly at family@franklinbutchery.com');
      });
    });
  }

  /* ── Events Inquiry Slide-Out Panel ── */
  var inquireBtn   = document.getElementById('tfb-inquire-open');
  var inquiryPanel = document.getElementById('tfb-inquiry-panel');
  var inquiryOver  = document.getElementById('tfb-inquiry-overlay');
  var inquiryClose = document.getElementById('tfb-inquiry-close');
  var inquiryDone  = document.getElementById('tfb-inquiry-done');
  var inquiryForm  = document.getElementById('tfb-inquiry-form');
  var inquiryWrap  = document.getElementById('tfb-inquiry-form-wrap');
  var inquirySucc  = document.getElementById('tfb-inquiry-success');

  function openInquiry() {
    if (!inquiryPanel) return;
    inquiryPanel.classList.add('tfb-active');
    if (inquiryOver) inquiryOver.classList.add('tfb-active');
    document.body.style.overflow = 'hidden';
  }

  function closeInquiry() {
    if (!inquiryPanel) return;
    inquiryPanel.classList.remove('tfb-active');
    if (inquiryOver) inquiryOver.classList.remove('tfb-active');
    document.body.style.overflow = '';
  }

  function resetInquiry() {
    closeInquiry();
    if (inquiryForm) { inquiryForm.reset(); inquiryForm.style.display = ''; }
    if (inquiryWrap) inquiryWrap.style.display = '';
    if (inquirySucc) inquirySucc.classList.remove('tfb-active');
    var btn = inquiryForm ? inquiryForm.querySelector('.tfb-inquiry-submit') : null;
    if (btn) { btn.textContent = 'Send Inquiry'; btn.disabled = false; }
  }

  if (inquireBtn)   inquireBtn.addEventListener('click', openInquiry);
  if (inquiryClose) inquiryClose.addEventListener('click', closeInquiry);
  if (inquiryDone)  inquiryDone.addEventListener('click', resetInquiry);
  if (inquiryOver)  inquiryOver.addEventListener('click', closeInquiry);

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && inquiryPanel && inquiryPanel.classList.contains('tfb-active')) {
      closeInquiry();
    }
  });

  if (inquiryForm && inquiryWrap && inquirySucc) {
    inquiryForm.addEventListener('submit', function(e) {
      e.preventDefault();
      var submitBtn = inquiryForm.querySelector('.tfb-inquiry-submit');
      var originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending\u2026';
      submitBtn.disabled = true;

      var formData = new FormData(inquiryForm);

      fetch(inquiryForm.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      }).then(function(response) {
        if (response.ok) {
          inquiryWrap.style.display = 'none';
          inquirySucc.classList.add('tfb-active');
        } else {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
          alert('Something went wrong. Please try again or email us directly at family@franklinbutchery.com');
        }
      }).catch(function() {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        alert('Something went wrong. Please try again or email us directly at family@franklinbutchery.com');
      });
    });
  }

  /* ══════════════════════════════════════
     ACTIVE NAV PILL — highlights current page
     ══════════════════════════════════════ */
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  var navPills = document.querySelectorAll('#tfb-mini-nav .tfb-nav-pill');
  navPills.forEach(function(pill) {
    if (pill.getAttribute('href') === currentPage) {
      pill.classList.add('active');
    }
  });

  // ── Footer Mailchimp JSONP Subscribe ──
  var footerForm = document.getElementById('tfb-footer-subscribe');
  if (footerForm) {
    footerForm.addEventListener('submit', function(e) {
      e.preventDefault();
      var emailInput = footerForm.querySelector('input[name="EMAIL"]');
      var email = emailInput.value.trim();
      if (!email) return;

      var successEl = document.getElementById('tfb-email-success');
      var errorEl   = document.getElementById('tfb-email-error');
      var btn       = footerForm.querySelector('.tfb-footer__email-btn');

      // Reset states
      successEl.style.display = 'none';
      errorEl.style.display   = 'none';
      btn.textContent = '...';

      // Build JSONP URL
      var baseUrl = footerForm.action;
      var url = baseUrl + '&EMAIL=' + encodeURIComponent(email);

      // JSONP callback
      window.tfbMailchimpCB = function(data) {
        if (data.result === 'success') {
          footerForm.style.display = 'none';
          successEl.style.display  = 'block';
          successEl.textContent    = 'You\u2019re in! Thanks for subscribing.';
        } else {
          var msg = data.msg || 'Something went wrong. Please try again.';
          if (msg.indexOf('already subscribed') > -1) {
            footerForm.style.display = 'none';
            successEl.style.display  = 'block';
            successEl.textContent    = 'You\u2019re already on the list!';
          } else {
            errorEl.style.display = 'block';
            errorEl.textContent   = msg.replace(/<[^>]*>/g, '');
            btn.textContent = 'Join';
          }
        }
        var s = document.getElementById('tfb-mc-jsonp');
        if (s) s.parentNode.removeChild(s);
      };

      var old = document.getElementById('tfb-mc-jsonp');
      if (old) old.parentNode.removeChild(old);
      var script  = document.createElement('script');
      script.id   = 'tfb-mc-jsonp';
      script.src  = url;
      document.body.appendChild(script);
    });
  }

})();
