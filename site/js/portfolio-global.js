/**
 * portfolio-global.js
 * Universal lifecycle & transition coordinator for Portfolio '26.
 * Ensures Work project thumbnails, Sandbox SVG title, videos, and page interactions
 * initialize seamlessly on both direct page load (F5) and Barba.js transitions.
 */

(function () {
  'use strict';

  // --- 1. PLAY PAGE: FIT SANDBOX TITLE ---
  function fitSandboxSvg(scope) {
    const root = scope || document;
    const svg = root.querySelector('#sandbox-svg');
    const text = root.querySelector('#sandbox-text');
    if (!svg || !text) return;

    function measureAndSet() {
      try {
        const bbox = text.getBBox();
        if (bbox && bbox.width > 0 && bbox.height > 0) {
          // Add 1px buffer to prevent any sub-pixel boundary clipping
          const pad = 0.5;
          svg.setAttribute(
            'viewBox',
            (bbox.x - pad) + ' ' + (bbox.y - pad) + ' ' + (bbox.width + pad * 2) + ' ' + (bbox.height + pad * 2)
          );
        }
      } catch (e) {
        // Fallback default viewBox
        svg.setAttribute('viewBox', '0 0 528 72');
      }
    }

    measureAndSet();

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () {
        measureAndSet();
        setTimeout(measureAndSet, 60);
        setTimeout(measureAndSet, 200);
      });
    }

    setTimeout(measureAndSet, 50);
    setTimeout(measureAndSet, 250);
  }

  // --- 2. WORK PAGE: PROJECT LIST & THUMBNAIL TRACKER ---
  function initWorkProjects(scope) {
    const root = scope || document;
    const content = root.querySelector('.services_home_content');
    const triggers = Array.from(root.querySelectorAll('[data-project-trigger]'));
    const imgWrap = root.querySelector('.work_projects_img-wrap');
    const imgItems = Array.from(root.querySelectorAll('.work_projects_img-item'));

    if (!content || !triggers.length || !imgWrap) return;

    let currentIndex = -1;

    function setProject(index, immediate) {
      const trigger = triggers[index];
      if (!trigger) return;
      currentIndex = index;

      const contentRect = content.getBoundingClientRect();
      const triggerRect = trigger.getBoundingClientRect();
      const targetY = (triggerRect.top - contentRect.top) + (triggerRect.height / 2);

      if (window.gsap) {
        gsap.killTweensOf(imgWrap);
        if (immediate) {
          gsap.set(imgWrap, { y: targetY });
        } else {
          gsap.to(imgWrap, {
            y: targetY,
            duration: 0.35,
            ease: 'power2.out',
            overwrite: 'auto'
          });
        }
      } else {
        imgWrap.style.transform = 'translateY(' + targetY + 'px)';
      }

      // Activate corresponding image thumbnail
      imgItems.forEach(function (item) {
        const itemIndex = parseInt(item.getAttribute('data-img-index'), 10);
        const img = item.querySelector('.work_projects_img');
        if (img) {
          if (itemIndex === index) {
            img.classList.add('is-active');
          } else {
            img.classList.remove('is-active');
          }
        }
      });

      // Highlight active title, dim siblings
      triggers.forEach(function (t, i) {
        if (i === index) {
          t.classList.add('is-active');
        } else {
          t.classList.remove('is-active');
        }
      });
    }

    // Attach hover & touch events
    triggers.forEach(function (trigger, idx) {
      trigger.removeEventListener('mouseenter', trigger._vkhEnter);
      trigger._vkhEnter = function () {
        setProject(idx, false);
      };
      trigger.addEventListener('mouseenter', trigger._vkhEnter);

      trigger.removeEventListener('touchstart', trigger._vkhTouch);
      trigger._vkhTouch = function () {
        setProject(idx, false);
      };
      trigger.addEventListener('touchstart', trigger._vkhTouch, { passive: true });
    });

    // Initial positioning & image activation
    setProject(0, true);
    setTimeout(function () { setProject(0, true); }, 60);
    setTimeout(function () { setProject(0, true); }, 200);
    setTimeout(function () { setProject(0, true); }, 500);
  }

  // --- 3. VIDEO ELEMENTS & REFRESH ---
  function initVideos(scope) {
    const root = scope || document;
    const videos = Array.from(root.querySelectorAll('video'));
    videos.forEach(function (v) {
      if (v.hasAttribute('autoplay') || v.getAttribute('data-video') === 'playpause') {
        v.muted = true;
        v.setAttribute('playsinline', '');
        const playPromise = v.play();
        if (playPromise !== undefined) {
          playPromise.catch(function () {
            // Autoplay policy fallback: ready on interaction
          });
        }
      }
    });
  }

  // --- 4. RETURN URL SESSION TRACKER ---
  function initReturnUrlTracking() {
    document.addEventListener('click', function (e) {
      const link = e.target.closest('a[href*="project-"]');
      if (link) {
        sessionStorage.setItem('portfolio_return_url', window.location.href);
      }
    });
  }

  // --- MASTER INITIALIZER FOR ANY CONTAINER / PAGE ---
  function initAllPageComponents(scope) {
    const root = scope || document;
    fitSandboxSvg(root);
    initWorkProjects(root);
    initVideos(root);

    // Refresh ScrollTrigger and Lenis if present
    if (window.ScrollTrigger) {
      ScrollTrigger.refresh();
    }
  }

  // Initial Run on Direct DOM Load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      initAllPageComponents();
      initReturnUrlTracking();
    });
  } else {
    initAllPageComponents();
    initReturnUrlTracking();
  }

  // Window Resize Hook
  window.addEventListener('resize', function () {
    fitSandboxSvg();
    initWorkProjects();
  });

  // --- BARBA.JS LIFECYCLE HOOKS ---
  function attachBarbaHooks() {
    if (!window.barba) return;

    window.barba.hooks.afterEnter(function (data) {
      const nextContainer = (data && data.next && data.next.container) || document.querySelector('[data-barba="container"]') || document.body;
      initAllPageComponents(nextContainer);
      setTimeout(function () { initAllPageComponents(nextContainer); }, 100);
      setTimeout(function () { initAllPageComponents(nextContainer); }, 350);
    });

    window.barba.hooks.after(function (data) {
      const nextContainer = (data && data.next && data.next.container) || document.querySelector('[data-barba="container"]') || document.body;
      initAllPageComponents(nextContainer);
    });
  }

  // Attach Barba hooks when Barba is ready
  if (window.barba) {
    attachBarbaHooks();
  } else {
    window.addEventListener('load', attachBarbaHooks);
    setTimeout(attachBarbaHooks, 300);
    setTimeout(attachBarbaHooks, 1000);
  }

  // Expose global helpers
  window.PortfolioApp = {
    initAll: initAllPageComponents,
    fitSandboxSvg: fitSandboxSvg,
    initWorkProjects: initWorkProjects
  };
})();
