/* ============================================================
   VIKHYATKAUSHIK hero wordmark — WebGL flowmap distortion
   Ported from Awesome.agency's hero logo effect.
   - Center text rendered in "Animo" (same as TAKING IN THE WORLD)
   - Flowmap -> UV warp -> chromatic aberration -> motion blur
   - Velocity integration is frame-rate normalized
   - RAF pauses when hero is off-screen
   - Drives the boot preloader + navbar tagline swap
   ============================================================ */
(function () {
  "use strict";

  var SECTION_SELECTOR = ".vkh_hero";
  var CONTAINER_ATTR = "[data-vkh-webgl]";
  var CANVAS_CLASS = "vkh_canvas_distortion";
  var WORDMARK_TEXT = "VIKHYATKAUSHIK";
  var FONT_STACK = '"Animo", Arial, sans-serif';
  var TRACKING = "-0.045em"; // tighter tracking -> bigger glyphs at full width

  /* Tuned toward Awesome's fluid, stretchy feel */
  var CONFIG = {
    falloff: 0.24,
    alpha: 0.97,
    dissipation: 0.972,
    distortionStrength: 0.105,
    chromaticAberration: 0.003,
    chromaticSpread: 1,
    velocityScale: 0.85,
    velocityDamping: 0.88,
    mouseRadius: 0.18,
    motionBlurStrength: 0.35,
    motionBlurDecay: 0.88,
    motionBlurThreshold: 0.5,
    opacity: 0.85
  };

  var INK_COLOR = { r: 0x08 / 255, g: 0x08 / 255, b: 0x07 / 255 };

  /* Aberration fringe tints - clean and vivid, warm-leaning to suit the gradient */
  var FRINGE_R = [1.0, 0.28, 0.15];  // coral red
  var FRINGE_G = [0.20, 0.68, 0.42]; // deep green (kept subtle)
  var FRINGE_B = [0.25, 0.55, 1.0];  // azure blue

  /* ============================ BOOT / PRELOADER ============================ */

  var bootState = { progress: 0, target: 0, start: 0, done: false, fonts: false, texture: false, frame: false };

  function preloaderEl() { return document.getElementById("vkh_preloader"); }

  function lockScroll() {
    var el = preloaderEl();
    if (el && !document.body.classList.contains("vkh-boot-done")) {
      document.body.style.overflow = "hidden";
    }
  }

  function bumpBoot(p) { bootState.target = Math.max(bootState.target, p); }

  function finishBoot() {
    if (bootState.done) return;
    bootState.done = true;
    var elapsed = performance.now() - bootState.start;
    var wait = Math.max(0, 900 - elapsed); // minimum display time
    setTimeout(function () {
      document.body.classList.add("vkh-boot-done");
      document.body.style.overflow = "";
      bumpBoot(1);
      var el = preloaderEl();
      if (el) setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 1000);
    }, wait);
  }

  function drivePreloader() {
    var el = preloaderEl();
    bootState.start = performance.now();
    lockScroll();
    if (!el) { finishBoot(); return; }
    var line = el.querySelector(".vkh_preloader_line span");
    var count = el.querySelector(".vkh_preloader_count");
    var last = performance.now();
    function tick(now) {
      if (bootState.done && !el.parentNode) return;
      var dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      // ease current progress toward target
      bootState.progress += (bootState.target - bootState.progress) * Math.min(1, dt * 6);
      if (bootState.target >= 1) bootState.progress += (1 - bootState.progress) * Math.min(1, dt * 4);
      var p = Math.max(0, Math.min(1, bootState.progress));
      if (line) line.style.transform = "scaleX(" + p + ")";
      if (count) count.textContent = String(Math.round(p * 100)).padStart(2, "0");
        if (p >= 0.99 && !bootState.done) finishBoot();
        requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
    // hard failsafe: never hang on the preloader
    setTimeout(finishBoot, 4000);
  }

  /* ============================ NAVBAR TAGLINE SWAP ============================ */
  var navSwapInitialized = false;
  function updateNavSwap() {
    var hero = document.querySelector(SECTION_SELECTOR);
    if (!hero) {
      document.body.classList.remove("vkh-nav-inhero");
      return;
    }
    var inHero = window.scrollY < hero.offsetHeight * 0.7;
    document.body.classList.toggle("vkh-nav-inhero", inHero);
  }

  function initNavSwap() {
    updateNavSwap();
    if (navSwapInitialized) return;
    navSwapInitialized = true;
    var ticking = false;
    function onScrollResize() {
      if (!ticking) { ticking = true; requestAnimationFrame(function() { ticking = false; updateNavSwap(); }); }
    }
    window.addEventListener("scroll", onScrollResize, { passive: true });
    window.addEventListener("resize", onScrollResize);
  }

  /* ============================ WEBGL EFFECT ============================ */

  function init(scope) {
    var root = scope || document;
    var section = root.querySelector(SECTION_SELECTOR);
    if (!section && root.matches && root.matches(SECTION_SELECTOR)) {
      section = root;
    }
    var container = section && section.querySelector(CONTAINER_ATTR);
    var canvas = section && section.querySelector("." + CANVAS_CLASS);

    if (!section || !container || !canvas) { finishBoot(); return; }
    if (section.hasAttribute("data-vkh-bound")) return;
    section.setAttribute("data-vkh-bound", "true");

    if (typeof THREE === "undefined") {
      section.classList.add("vkh_no_webgl");
      finishBoot();
      return;
    }

    if (activeCleanup) {
      try { activeCleanup(); } catch (e) {}
      activeCleanup = null;
    }

    try {
      activeCleanup = buildEffect(section, container, canvas);
    } catch (err) {
      console.warn("[vkh-hero] WebGL effect failed, falling back to static text:", err);
      section.classList.add("vkh_no_webgl");
      finishBoot();
    }
  }


  var activeCleanup = null;

  function buildEffect(section, container, canvas) {
    


    /* ---------- Config ---------- */
    var w = {};
    for (var key in CONFIG) w[key] = CONFIG[key];

    /* ---------- Shaders (from Awesome app.js) ---------- */

    // Flowmap pass: accumulates mouse velocity into a texture
    var flowmapFragment = `
      uniform vec2 uMouse;
      uniform vec2 uVelocity;
      uniform vec2 uResolution;
      uniform float uFalloff;
      uniform float uAlpha;
      uniform float uDissipation;
      uniform float uAspect;
      uniform sampler2D uTexture;

      varying vec2 vUv;

      void main() {
          vec2 uv = vUv;

          // Get previous flowmap state
          vec4 color = texture2D(uTexture, uv);

          // Apply dissipation (fading)
          color.rgb *= uDissipation;

          // Calculate mouse influence
          vec2 cursor = uMouse;

          // Correct for aspect ratio
          vec2 aspectUv = uv;
          aspectUv.x *= uAspect;
          cursor.x *= uAspect;

          float dist = distance(aspectUv, cursor);
          float influence = 1.0 - smoothstep(0.0, uFalloff, dist);

          vec2 velocityContribution = vec2(uVelocity.x, -uVelocity.y) * influence * uAlpha;
          color.rg += velocityContribution;

          // Store velocity magnitude in blue channel
          color.b = length(color.rg) * 2.0;

          gl_FragColor = color;
      }
    `;

    // Distortion pass: flow warp + RGB split + motion blur.
    // Dark ink on light page: splits the ALPHA channel per offset and tints
    // fringes with palette-matched colors (same geometry as Awesome).
    // Flow is aspect-corrected so horizontal and vertical strokes distort
    // with equal pixel strength (uv y-units are taller than x-units).
    var distortionFragment = `
      uniform sampler2D uLogo;
      uniform sampler2D uFlowmap;
      uniform sampler2D uPreviousFrame;
      uniform vec3 uInkColor;
      uniform vec3 uTintR;
      uniform vec3 uTintG;
      uniform vec3 uTintB;
      uniform float uAspect;
      uniform float uOpacity;
      uniform float uDistortionStrength;
      uniform float uChromaticAberration;
      uniform float uChromaticSpread;
      uniform float uMotionBlurStrength;
      uniform float uMotionBlurDecay;
      uniform float uMotionBlurThreshold;
      uniform bool uIsFirstFrame;

      varying vec2 vUv;
      varying vec2 vImageUv; // Pre-calculated in vertex shader

      precision mediump float;

      void main() {
          vec2 uv = vUv;

          // Single flowmap sample
          vec3 flowRaw = texture2D(uFlowmap, uv).rgb;

          // Aspect-correct the flow so pixel displacement is isotropic
          vec2 flow = flowRaw.rg * vec2(1.0, uAspect);
          float flowMagnitude = length(flow);

          // Base distorted UV
          vec2 distortedImageUv = vImageUv + flow * uDistortionStrength * 0.5;

          // Chromatic aberration amount driven by flow magnitude
          float aberration = flowRaw.b * uChromaticAberration;
          vec2 flowDir = flowMagnitude > 0.001 ? normalize(flow) : vec2(0.0);

          // Calculate chromatic offsets: red/blue oppose along the flow,
          // green sits between them (slightly off-axis, damped) so it never
          // dominates - perpendicular green would fringe on BOTH sides.
          vec2 redOffset = flowDir * aberration * uChromaticSpread;
          vec2 blueOffset = -redOffset;
          vec2 greenOffset = -redOffset * 0.45 + vec2(-flowDir.y, flowDir.x) * aberration * uChromaticSpread * 0.18;

          // Sample the alpha mask separately per channel offset
          vec2 redUv = distortedImageUv + redOffset;
          vec2 greenUv = distortedImageUv + greenOffset;
          vec2 blueUv = distortedImageUv + blueOffset;

          bool redInBounds = (redUv.x >= 0.0 && redUv.x <= 1.0 && redUv.y >= 0.0 && redUv.y <= 1.0);
          bool greenInBounds = (greenUv.x >= 0.0 && greenUv.x <= 1.0 && greenUv.y >= 0.0 && greenUv.y <= 1.0);
          bool blueInBounds = (blueUv.x >= 0.0 && blueUv.x <= 1.0 && blueUv.y >= 0.0 && blueUv.y <= 1.0);
          bool centerInBounds = (distortedImageUv.x >= 0.0 && distortedImageUv.x <= 1.0 && distortedImageUv.y >= 0.0 && distortedImageUv.y <= 1.0);

          // Early exit if completely out of bounds
          if (!redInBounds && !greenInBounds && !blueInBounds && !centerInBounds) {
              gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
              return;
          }

          float rA = redInBounds ? texture2D(uLogo, redUv).a : 0.0;
          float gA = greenInBounds ? texture2D(uLogo, greenUv).a : 0.0;
          float bA = blueInBounds ? texture2D(uLogo, blueUv).a : 0.0;
          float cA = centerInBounds ? texture2D(uLogo, distortedImageUv).a : 0.0;

          float alpha = max(max(rA, gA), max(bA, cA));

          // Early exit if no valid alpha
          if (alpha < 0.01) {
              gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
              return;
          }

          // Clean vivid ghost fringes (max-blend keeps hues from muddying
          // where offsets overlap); green's alpha is damped so it stays an
          // accent. Ink core where all three cover.
          vec3 fringe = max(max(rA * uTintR, gA * 0.55 * uTintG), bA * uTintB);
          float core = min(min(rA, gA), min(bA, cA));
          vec3 color = mix(fringe, uInkColor, core);

          vec4 currentColor = vec4(color, alpha);

          // Fast motion blur (only if needed)
          if (!uIsFirstFrame && flowMagnitude > uMotionBlurThreshold) {
              vec4 previousColor = texture2D(uPreviousFrame, uv);
              float blurAmount = min(flowMagnitude * uMotionBlurStrength, 0.7);
              currentColor.rgb = mix(currentColor.rgb, previousColor.rgb, blurAmount * uMotionBlurDecay);
          }

          gl_FragColor = vec4(currentColor.rgb, currentColor.a * uOpacity);
      }
    `;

    // Vertex shader with pre-calculated image UV
    var distortionVertex = `
      uniform vec2 uImageScale;
      uniform vec2 uImageOffset;

      varying vec2 vUv;
      varying vec2 vImageUv;

      void main() {
          vUv = uv;

          // Pre-calculate image UV in vertex shader (huge performance gain)
          vec2 centeredUv = (uv - 0.5) / uImageScale + uImageOffset;
          vImageUv = centeredUv + 0.5;

          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    // Simple vertex shader for the flowmap pass
    var simpleVertex = `
      varying vec2 vUv;

      void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    /* ---------- Wordmark texture: tight-cropped, tracked-in name ----------
       Mobile (<=767px) renders two stacked lines: VIKHYAT / KAUSHIK. */
    var wordmarkMode = null; // null = not drawn yet, else boolean twoLine

    function drawWordmark(twoLine) {
      var fontSize = 400;
      var pad = 8;
      var lines = twoLine ? ["VIKHYAT", "KAUSHIK"] : [WORDMARK_TEXT];
      var measure = document.createElement("canvas").getContext("2d");
      measure.font = "400 " + fontSize + "px " + FONT_STACK;
      if ("letterSpacing" in measure) measure.letterSpacing = TRACKING;

      var maxW = 0, ascent = 0, descent = 0;
      for (var i = 0; i < lines.length; i++) {
        var m = measure.measureText(lines[i]);
        var lw = m.actualBoundingBoxLeft !== undefined ? m.actualBoundingBoxLeft + m.actualBoundingBoxRight : m.width;
        if (lw > maxW) maxW = lw;
        if (m.actualBoundingBoxAscent !== undefined) {
          ascent = Math.max(ascent, m.actualBoundingBoxAscent);
          descent = Math.max(descent, m.actualBoundingBoxDescent);
        }
      }
      if (!ascent) { ascent = fontSize * 0.36; descent = fontSize * 0.09; }

      var lineStep = Math.round(fontSize * (twoLine ? 0.86 : 0.98));
      var maxTextureSize = 8192;
      var cw = Math.min(Math.ceil(maxW) + pad * 2, maxTextureSize);
      var ch = Math.ceil(ascent + lineStep * (lines.length - 1) + descent) + pad * 2;

      var cv = document.createElement("canvas");
      cv.width = cw;
      cv.height = ch;
      var ctx = cv.getContext("2d");
      ctx.clearRect(0, 0, cw, ch);
      ctx.font = "400 " + fontSize + "px " + FONT_STACK;
      if ("letterSpacing" in ctx) ctx.letterSpacing = TRACKING;
      ctx.textAlign = "center";
      ctx.textBaseline = "alphabetic";
      ctx.fillStyle = "#ffffff"; // white mask; tinted to ink inside shader
      for (var j = 0; j < lines.length; j++) {
        ctx.fillText(lines[j], cw / 2, pad + ascent + lineStep * j);
      }
      return cv;
    }

    function loadFont() {
      var timeout = new Promise(function (resolve) { setTimeout(resolve, 2500); });
      var load;
      if (document.fonts && document.fonts.load) {
        load = document.fonts.load('400 100px "Animo"').then(function () {
          return document.fonts.ready;
        }).catch(function () {});
      } else {
        load = Promise.resolve();
      }
      return Promise.race([load, timeout]);
    }

    /* ---------- Three.js scene ---------- */
    var scene = new THREE.Scene();
    var camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    var renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: false,
      preserveDrawingBuffer: false,
      dither: true,
      powerPreference: "high-performance"
    });
    renderer.setClearColor(0, 0);

    // Mouse state
    var mouse = {
      current: new THREE.Vector2(-1, -1),
      target: new THREE.Vector2(-1, -1),
      velocity: new THREE.Vector2(0, 0),
      lastPosition: new THREE.Vector2(-1, -1),
      smoothVelocity: new THREE.Vector2(0, 0)
    };

    var flowTargetA, flowTargetB, frameTargetA, frameTargetB;
    var flowMaterial, distortionMaterial, mesh, texture;
    var ready = false, isFirstFrame = true;
    var renderRaf = null;
    var containerRO = null;
    var inView = true, lastFrameTime = 0;

    function createRenderTarget(w, h) {
      var type = renderer.capabilities.isWebGL2 ? THREE.HalfFloatType : THREE.UnsignedByteType;
      return new THREE.WebGLRenderTarget(w, h, {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBAFormat,
        type: type,
        colorSpace: THREE.SRGBColorSpace
      });
    }

    function onTexture(cv) {
      texture = new THREE.CanvasTexture(cv);
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.wrapS = THREE.ClampToEdgeWrapping;
      texture.wrapT = THREE.ClampToEdgeWrapping;
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.needsUpdate = true;

      flowTargetA = createRenderTarget(192, 192);
      flowTargetB = createRenderTarget(192, 192);

      var fw = Math.max(1, Math.min(container.clientWidth || 512, 512));
      var fh = Math.max(1, Math.min(container.clientHeight || 512, 512));
      frameTargetA = createRenderTarget(fw, fh);
      frameTargetB = createRenderTarget(fw, fh);

      createMaterials();
      resize();

      mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), flowMaterial);
      bindEvents();

      ready = true;
      bootState.texture = true;
      bumpBoot(0.8);
      requestRenderLoop();
    }

    function createMaterials() {
      flowMaterial = new THREE.ShaderMaterial({
        vertexShader: simpleVertex,
        fragmentShader: flowmapFragment,
        uniforms: {
          uMouse: { value: mouse.current.clone() },
          uVelocity: { value: mouse.velocity.clone() },
          uResolution: { value: new THREE.Vector2() },
          uFalloff: { value: w.falloff },
          uAlpha: { value: w.alpha },
          uDissipation: { value: w.dissipation },
          uAspect: { value: 1 },
          uTexture: { value: null }
        }
      });

      distortionMaterial = new THREE.ShaderMaterial({
        vertexShader: distortionVertex,
        fragmentShader: distortionFragment,
        uniforms: {
          uLogo: { value: texture },
          uFlowmap: { value: null },
          uPreviousFrame: { value: null },
          uInkColor: { value: new THREE.Vector3(INK_COLOR.r, INK_COLOR.g, INK_COLOR.b) },
          uTintR: { value: new THREE.Vector3(FRINGE_R[0], FRINGE_R[1], FRINGE_R[2]) },
          uTintG: { value: new THREE.Vector3(FRINGE_G[0], FRINGE_G[1], FRINGE_G[2]) },
          uTintB: { value: new THREE.Vector3(FRINGE_B[0], FRINGE_B[1], FRINGE_B[2]) },
          uAspect: { value: 1 },
          uOpacity: { value: w.opacity },
          uImageScale: { value: new THREE.Vector2(1, 1) },
          uImageOffset: { value: new THREE.Vector2(0, 0) },
          uDistortionStrength: { value: w.distortionStrength },
          uChromaticAberration: { value: w.chromaticAberration },
          uChromaticSpread: { value: w.chromaticSpread },
          uMotionBlurStrength: { value: w.motionBlurStrength },
          uMotionBlurDecay: { value: w.motionBlurDecay },
          uMotionBlurThreshold: { value: w.motionBlurThreshold },
          uIsFirstFrame: { value: true }
        },
        transparent: true
      });
    }

    /* ---------- Events: window-level with hit-testing ---------- */
    var pointerInside = false;

    function toContainerPoint(clientX, clientY) {
      var rect = container.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return null;
      return {
        x: (clientX - rect.left) / rect.width,
        y: 1 - (clientY - rect.top) / rect.height,
        inside: clientX >= rect.left && clientX <= rect.right && clientY >= rect.top && clientY <= rect.bottom
      };
    }

    function snapTo(x, y) {
      mouse.current.set(x, y);
      mouse.target.set(x, y);
      mouse.lastPosition.set(x, y);
      mouse.velocity.set(0, 0);
      mouse.smoothVelocity.set(0, 0);
    }

    function onPointerMove(clientX, clientY) {
      var p = toContainerPoint(clientX, clientY);
      if (!p) return;
      if (!p.inside) {
        if (pointerInside) {
          pointerInside = false;
          mouse.target.set(-1, -1);
        }
        return;
      }
      if (!pointerInside) {
        pointerInside = true;
        snapTo(p.x, p.y);
      }
      mouse.target.set(p.x, p.y);
    }

    function onWindowMouseMove(e) { onPointerMove(e.clientX, e.clientY); }
    function onWindowTouchStart(e) { if (e.touches.length > 0) onPointerMove(e.touches[0].clientX, e.touches[0].clientY); }
    function onWindowTouchMove(e) { if (e.touches.length > 0) onPointerMove(e.touches[0].clientX, e.touches[0].clientY); }
    function onWindowTouchEnd() { pointerInside = false; mouse.target.set(-1, -1); }

    function bindEvents() {
      window.addEventListener("mousemove", onWindowMouseMove);
      window.addEventListener("touchstart", onWindowTouchStart, { passive: true });
      window.addEventListener("touchmove", onWindowTouchMove, { passive: true });
      window.addEventListener("touchend", onWindowTouchEnd, { passive: true });
      window.addEventListener("resize", resize);
      containerRO = new ResizeObserver(function() { if (container.clientWidth > 0 && container.clientHeight > 0) resize(); });
      containerRO.observe(container);
      // Pause rendering when the hero scrolls out of view
      if ("IntersectionObserver" in window) {
        new IntersectionObserver(function (entries) {
          inView = entries[0].isIntersecting;
        }, { rootMargin: "10% 0px" }).observe(section);
      }
    }

    /* ---------- Frame-rate normalized velocity ---------- */
    function updateVelocity(dt) {
      var f = Math.min(dt / 16.666, 2); // normalize to 60fps steps
      var mix = function (k) { return 1 - Math.pow(1 - k, f); };
      mouse.lastPosition.copy(mouse.current);
      mouse.current.lerp(mouse.target, mix(0.7));
      var dx = mouse.current.x - mouse.lastPosition.x;
      var dy = mouse.current.y - mouse.lastPosition.y;
      var delta = new THREE.Vector2(dx, dy);
      delta.multiplyScalar(80);
      mouse.velocity.lerp(delta, mix(0.6));
      mouse.smoothVelocity.lerp(mouse.velocity, mix(0.3));
      mouse.velocity.multiplyScalar(Math.pow(w.velocityDamping, f));
    }

    /* ---------- Resize / contain-fit (wide texture = full-width fit) ---------- */
    function resize() {
      // Switch wordmark layout (1 line <-> 2 lines) at the mobile breakpoint
      var wantTwo = window.matchMedia("(max-width:767px)").matches;
      if (texture && wordmarkMode !== null && wantTwo !== wordmarkMode) {
        wordmarkMode = wantTwo;
        texture.image = drawWordmark(wantTwo);
        texture.needsUpdate = true;
      }
      if (texture && wantTwo) {
        // size the bottom band exactly to the two-line texture
        container.style.aspectRatio = (texture.image.width / texture.image.height).toFixed(4);
      } else if (container.style.aspectRatio) {
        container.style.aspectRatio = "";
      }

      var cw = container.clientWidth, chh = container.clientHeight;
      renderer.setSize(cw, chh);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      var aspect = cw / chh;

      if (flowMaterial) {
        flowMaterial.uniforms.uResolution.value.set(cw, chh);
        flowMaterial.uniforms.uAspect.value = aspect;
      }
      if (distortionMaterial) {
        distortionMaterial.uniforms.uAspect.value = aspect;
        updateImageScale(cw, chh);
      }
      if (frameTargetA && frameTargetB) {
        var bw = Math.min(cw, 512), bh = Math.min(chh, 512);
        frameTargetA.setSize(bw, bh);
        frameTargetB.setSize(bw, bh);
      }
    }

    function updateImageScale(vw, vh) {
      if (!texture) return;
      var iw = texture.image.width, ih = texture.image.height;
      var imageAspect = iw / ih, viewportAspect = vw / vh, sx, sy;
      if (imageAspect > viewportAspect) { sy = viewportAspect / imageAspect; sx = 1; }
      else { sx = imageAspect / viewportAspect; sy = 1; }
      distortionMaterial.uniforms.uImageScale.value.set(sx, sy);
      distortionMaterial.uniforms.uImageOffset.value.set(0, 0);
    }

    /* ---------- Render loop ---------- */
    function renderFrame(now) {
      if (!ready) return;
      if (!inView || document.hidden) { lastFrameTime = now; return; }
      var cw = container.clientWidth, chh = container.clientHeight;
      if (cw === 0 || chh === 0) { lastFrameTime = now; return; }
      
      var currentW = Math.floor(renderer.domElement.width / renderer.getPixelRatio());
      var currentH = Math.floor(renderer.domElement.height / renderer.getPixelRatio());
      if (cw !== currentW || chh !== currentH) {
          resize();
      }

      var dt = lastFrameTime ? Math.min(now - lastFrameTime, 50) : 16.666;
      lastFrameTime = now;

      updateVelocity(dt);

      flowMaterial.uniforms.uMouse.value.copy(mouse.current);
      flowMaterial.uniforms.uVelocity.value.copy(mouse.smoothVelocity);
      flowMaterial.uniforms.uVelocity.value.multiplyScalar(w.velocityScale);

      mesh.material = flowMaterial;
      flowMaterial.uniforms.uTexture.value = flowTargetB.texture;
      renderer.setRenderTarget(flowTargetA);
      renderer.render(mesh, camera);

      mesh.material = distortionMaterial;
      distortionMaterial.uniforms.uFlowmap.value = flowTargetA.texture;
      distortionMaterial.uniforms.uPreviousFrame.value = frameTargetB.texture;
      distortionMaterial.uniforms.uIsFirstFrame.value = isFirstFrame;

      renderer.setRenderTarget(frameTargetA);
      renderer.render(mesh, camera);
      renderer.setRenderTarget(null);
      
      renderer.render(mesh, camera);

      


      // Ping-pong swaps
      var t = flowTargetA; flowTargetA = flowTargetB; flowTargetB = t;
      t = frameTargetA; frameTargetA = frameTargetB; frameTargetB = t;

      if (isFirstFrame) {
        isFirstFrame = false;
        canvas.classList.add("is-ready");
        section.classList.add("vkh_webgl_ready");
        bootState.frame = true;
        bumpBoot(1);
      }
    }

    function requestRenderLoop() {
      function loop(now) {
        renderFrame(now);
        renderRaf = requestAnimationFrame(loop);
      }
      renderRaf = requestAnimationFrame(loop);
    }

    /* ---------- Debug hook ---------- */
    window.__vkhDebug = function () {
      return {
        ready: ready,
        inView: inView,
        pointerInside: pointerInside,
        current: mouse.current.toArray(),
        target: mouse.target.toArray(),
        velocity: mouse.velocity.toArray(),
        smoothVelocity: mouse.smoothVelocity.toArray()
      };
    };

    /* ---------- Boot ---------- */
    loadFont().then(function () {
      bootState.fonts = true;
      bumpBoot(0.45);
      wordmarkMode = window.matchMedia("(max-width:767px)").matches;
      onTexture(drawWordmark(wordmarkMode));
    });

    /* ---------- Cleanup (for Barba page swaps) ---------- */
    return function cleanup() {
      ready = false;
      if (renderRaf) cancelAnimationFrame(renderRaf);
      window.removeEventListener("mousemove", onWindowMouseMove);
      window.removeEventListener("touchstart", onWindowTouchStart);
      window.removeEventListener("touchmove", onWindowTouchMove);
      window.removeEventListener("touchend", onWindowTouchEnd);
      window.removeEventListener("resize", resize);
        if (containerRO) containerRO.disconnect();
      delete window.__vkhDebug;
      try {
        if (flowTargetA) flowTargetA.dispose();
        if (flowTargetB) flowTargetB.dispose();
        if (frameTargetA) frameTargetA.dispose();
        if (frameTargetB) frameTargetB.dispose();
        if (texture) texture.dispose();
        if (flowMaterial) flowMaterial.dispose();
        if (distortionMaterial) distortionMaterial.dispose();
        if (mesh && mesh.geometry) mesh.geometry.dispose();
        renderer.dispose();
      } catch (e) {}
    };
  }

  /* ============================ START ============================ */

  window.initVikHero = function(scope) {
    init(scope);
    initNavSwap();
  };

  function boot() {
    var start = function () {
      init();
      initNavSwap();
      drivePreloader();
    };
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", start);
    } else {
      start();
    }
  }

  boot();
})();








