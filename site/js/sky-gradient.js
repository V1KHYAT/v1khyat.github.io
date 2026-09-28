(function() {
  var TONES = {"main":[0.7176470588235294,0.7411764705882353,0.788235294117647],"low":[0.34901960784313724,0.3843137254901961,0.45098039215686275],"mid":[0.5490196078431373,0.5803921568627451,0.6431372549019608],"high":[0.9098039215686274,0.9176470588235294,0.9333333333333333]};
  var VERTEX_SHADER = "attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}";
  var FRAGMENT_SHADER = "precision highp float;\nuniform vec2 u_res;\nuniform float u_t;\nuniform vec3 u_main;\nuniform vec3 u_low;\nuniform vec3 u_mid;\nuniform vec3 u_high;\nuniform float u_wind;\nuniform float u_warp;\nuniform float u_nscale;\nuniform sampler2D u_noise;\n\nconst float FBM_STRENGTH = 0.912;\nconst float BLUR_RADIUS = 1.2673;\nconst float ZOOM = 0.3971;\nconst float GRAIN_SCALE = 2.5;\nconst float GRAIN_STRENGTH = 0.014;\n\nvec3 burn(vec3 base, vec3 blend, float op){\n  return max(base + blend - vec3(1.0), vec3(0.0))*op + base*(1.0-op);\n}\nfloat rand2(vec2 n){ return fract(sin(dot(n, vec2(12.9898, 4.1414)))*43758.5453); }\nfloat noise2(vec2 p){\n  vec2 ip = floor(p); vec2 u = fract(p);\n  u = u*u*(3.0-2.0*u);\n  float m = mix(mix(rand2(ip), rand2(ip+vec2(1.,0.)), u.x), mix(rand2(ip+vec2(0.,1.)), rand2(ip+vec2(1.,1.)), u.x), u.y);\n  return m*m;\n}\nfloat fbm4(vec2 x){\n  float v = 0.0; float a = 0.5;\n  vec2 shift = vec2(100.0);\n  mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));\n  for (int i = 0; i < 4; i++) { v += a*noise2(x); x = rot*x*2.0 + shift; a *= 0.5; }\n  return v;\n}\nvec4 permute4(vec4 x){ return mod((x*34.0 + 1.0)*x, 289.0); }\nvec4 tisqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314*r; }\nvec3 fade3(vec3 t){ return t*t*t*(t*(t*6.0-15.0)+10.0); }\nfloat cnoise(vec3 P){\n  vec3 Pi0 = floor(P); vec3 Pi1 = Pi0 + vec3(1.0);\n  Pi0 = mod(Pi0, 289.0); Pi1 = mod(Pi1, 289.0);\n  vec3 Pf0 = fract(P); vec3 Pf1 = Pf0 - vec3(1.0);\n  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);\n  vec4 iy = vec4(Pi0.yy, Pi1.yy);\n  vec4 iz0 = vec4(Pi0.z); vec4 iz1 = vec4(Pi1.z);\n  vec4 ixy = permute4(permute4(ix) + iy);\n  vec4 ixy0 = permute4(ixy + iz0); vec4 ixy1 = permute4(ixy + iz1);\n  vec4 gx0 = ixy0/7.0; vec4 gy0 = fract(floor(gx0)/7.0) - 0.5; gx0 = fract(gx0);\n  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0); vec4 sz0 = step(gz0, vec4(0.0));\n  gx0 -= sz0*(step(vec4(0.0), gx0) - 0.5); gy0 -= sz0*(step(vec4(0.0), gy0) - 0.5);\n  vec4 gx1 = ixy1/7.0; vec4 gy1 = fract(floor(gx1)/7.0) - 0.5; gx1 = fract(gx1);\n  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1); vec4 sz1 = step(gz1, vec4(0.0));\n  gx1 -= sz1*(step(vec4(0.0), gx1) - 0.5); gy1 -= sz1*(step(vec4(0.0), gy1) - 0.5);\n  vec3 g000 = vec3(gx0.x, gy0.x, gz0.x); vec3 g100 = vec3(gx0.y, gy0.y, gz0.y);\n  vec3 g010 = vec3(gx0.z, gy0.z, gz0.z); vec3 g110 = vec3(gx0.w, gy0.w, gz0.w);\n  vec3 g001 = vec3(gx1.x, gy1.x, gz1.x); vec3 g101 = vec3(gx1.y, gy1.y, gz1.y);\n  vec3 g011 = vec3(gx1.z, gy1.z, gz1.z); vec3 g111 = vec3(gx1.w, gy1.w, gz1.w);\n  vec4 n0 = tisqrt(vec4(dot(g000,g000), dot(g010,g010), dot(g100,g100), dot(g110,g110)));\n  g000 *= n0.x; g010 *= n0.y; g100 *= n0.z; g110 *= n0.w;\n  vec4 n1 = tisqrt(vec4(dot(g001,g001), dot(g011,g011), dot(g101,g101), dot(g111,g111)));\n  g001 *= n1.x; g011 *= n1.y; g101 *= n1.z; g111 *= n1.w;\n  float n000 = dot(g000, Pf0); float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));\n  float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z)); float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));\n  float n001 = dot(g001, vec3(Pf0.xy, Pf1.z)); float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));\n  float n011 = dot(g011, vec3(Pf0.x, Pf1.yz)); float n111 = dot(g111, Pf1);\n  vec3 fx = fade3(Pf0);\n  vec4 nz = mix(vec4(n000,n100,n010,n110), vec4(n001,n101,n011,n111), fx.z);\n  vec2 ny = mix(nz.xy, nz.zw, fx.y);\n  return 2.2*mix(ny.x, ny.y, fx.x);\n}\nuniform vec2 u_dirv;\nvoid main(){\n  vec2 st = gl_FragCoord.xy/u_res - 0.5;\n  st.x *= u_res.x/u_res.y;\n  st = mat2(u_dirv.x, u_dirv.y, -u_dirv.y, u_dirv.x)*st;\n  float time = u_t*0.85;\n  vec2 uv = st*(1.0/(2.0*ZOOM)) + 0.5;\n  float noiseX = cnoise(vec3(uv*u_nscale + vec2(0.0, 74.8572), time*0.3));\n  float noiseY = cnoise(vec3(uv*u_nscale + vec2(203.91282, 10.0), time*0.3));\n  uv += vec2(noiseX*2.0, noiseY)*u_warp;\n  float noiseA = cnoise(vec3(uv*18.0 + vec2(344.91282, 0.0), time*0.3))\n               + cnoise(vec3(uv*39.6 + vec2(723.937, 0.0), time*0.4))*0.5;\n  uv += noiseA*0.02;\n  uv.y -= 0.09;\n  float xf = (sin(time) + 1.0)*0.5;\n  vec2 texUv = uv*GRAIN_SCALE;\n  float d0 = mix(texture2D(u_noise, texUv).r - 0.5, texture2D(u_noise, vec2(texUv.x, 1.0-texUv.y)).g - 0.5, xf)*GRAIN_STRENGTH;\n  texUv += vec2(63.861, 368.937);\n  float d1 = mix(texture2D(u_noise, texUv).r - 0.5, texture2D(u_noise, vec2(texUv.x, 1.0-texUv.y)).g - 0.5, xf)*GRAIN_STRENGTH;\n  texUv += vec2(453.163, 1649.808);\n  float d3 = mix(texture2D(u_noise, texUv).r - 0.5, texture2D(u_noise, vec2(texUv.x, 1.0-texUv.y)).g - 0.5, xf)*GRAIN_STRENGTH;\n  uv += d0;\n  vec2 stF = uv*u_nscale;\n  vec2 q = vec2(fbm4(stF*0.5 + u_wind*time));\n  vec2 r = vec2(fbm4(stF + q + vec2(0.3, 9.2) + 0.15*time), fbm4(stF + q + vec2(8.3, 0.8) + 0.126*time));\n  float fv = fbm4(stF + r - q);\n  float full = (fv + 0.6*fv*fv + 0.7*fv + 0.5)*0.5;\n  full = pow(full, 0.55)*FBM_STRENGTH;\n  float blurR = BLUR_RADIUS*1.5;\n  vec2 uvA = uv + vec2((full-0.5)*1.2) + vec2(0.0, 0.025) + d0;\n  float snA = noise2(uvA*2.0 + vec2(0.0, time*0.5))*3.0;\n  float lA = pow(smoothstep(snA - 1.2*blurR, snA + 1.2*blurR, (uvA.y - 0.5)*5.0 + 0.5), 0.8);\n  vec2 uvB = uv + vec2((full-0.5)*0.85) + vec2(0.0, 0.025) + d1;\n  float snB = noise2(uvB*4.0 + vec2(293.0, time))*2.8;\n  float lB = pow(smoothstep(snB - 0.9*blurR, snB + 0.9*blurR, (uvB.y - 0.6)*5.0 + 0.5), 0.9);\n  vec2 uvC = uv + vec2((full-0.5)*1.1) + d3;\n  float snC = noise2(uvC*6.0 + vec2(153.0, time*1.2))*2.6;\n  float lC = smoothstep(snC - 0.7*blurR, snC + 0.7*blurR, (uvC.y - 0.9)*6.0 + 0.5);\n  vec3 col = burn(u_main, u_low, 1.0 - lA);\n  col = burn(col, mix(u_main, u_mid, 1.0 - lB), lA);\n  col = mix(col, mix(u_main, u_high, 1.0 - lC), lA*lB);\n  gl_FragColor = vec4(col, 1.0);\n}";
  
  var DEFAULT_SPEED = 30;
  var START_T = 108.42354559999495;
  var SCALE = 52;
  var DISTORTION = 62;
  var SWIRL = 58;
  var DIRECTION = 0;
  var FLOW_SPEED_RATE = 1.2;
  var MAX_WIDTH = 2560;

  function compile(gl, kind, source) {
    var shader = gl.createShader(kind);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error(gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  }

  function initSky() {
    var canvas = document.querySelector('.hero_canvas_item');
    if (!canvas) return;
    
    // Setup wrapper styling
    var wrap = canvas.parentElement;
    if (wrap) {
        wrap.style.background = 'linear-gradient(180deg, #E8EAEE, #B7BDC9, #8C94A4, #596273)';
        wrap.style.position = 'relative'; // ensure wrapper is relative
    }
    
    // Setup canvas styling
    canvas.style.position = 'absolute';
    canvas.style.inset = '0';
    canvas.style.display = 'block';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '0';
    
    // Add grain overlay
    var grain = document.createElement('div');
    grain.style.position = 'absolute';
    grain.style.inset = '0';
    grain.style.pointerEvents = 'none';
    grain.style.backgroundSize = '256px 256px';
    grain.style.imageRendering = 'pixelated';
    grain.style.mixBlendMode = 'overlay';
    grain.style.opacity = '0.06'; // GRAIN = 12 -> 12/200 = 0.06
    
    var tile = document.createElement('canvas');
    tile.width = tile.height = 256;
    var ctx = tile.getContext('2d');
    var imgData = ctx.createImageData(256, 256);
    for (var i = 0; i < imgData.data.length; i += 4) {
      var val = Math.round((Math.random() + Math.random()) * 127.5);
      imgData.data[i] = imgData.data[i+1] = imgData.data[i+2] = val;
      imgData.data[i+3] = 255;
    }
    ctx.putImageData(imgData, 0, 0);
    grain.style.backgroundImage = 'url(' + tile.toDataURL() + ')';
    
    if (wrap) wrap.appendChild(grain);

    var gl = canvas.getContext('webgl', { alpha: false, antialias: false }) || canvas.getContext('experimental-webgl', { alpha: false, antialias: false });
    if (!gl) return;

    var vertex = compile(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    var fragment = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    var program = gl.createProgram();
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.bindAttribLocation(program, 0, 'p');
    gl.linkProgram(program);
    gl.useProgram(program);

    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

    var texture = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    var noise = new Uint8Array(256 * 256 * 4);
    for (var i = 0; i < 256 * 256; i++) {
      var val = (Math.random() * 256) | 0;
      noise[i*4] = noise[i*4+1] = noise[i*4+2] = val;
      noise[i*4+3] = 255;
    }
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 256, 256, 0, gl.RGBA, gl.UNSIGNED_BYTE, noise);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.uniform1i(gl.getUniformLocation(program, 'u_noise'), 0);
    
    gl.uniform3fv(gl.getUniformLocation(program, 'u_main'), TONES.main);
    gl.uniform3fv(gl.getUniformLocation(program, 'u_low'), TONES.low);
    gl.uniform3fv(gl.getUniformLocation(program, 'u_mid'), TONES.mid);
    gl.uniform3fv(gl.getUniformLocation(program, 'u_high'), TONES.high);
    gl.uniform1f(gl.getUniformLocation(program, 'u_nscale'), 0.35 + SCALE / 100 * 1.15);
    gl.uniform1f(gl.getUniformLocation(program, 'u_warp'), DISTORTION / 100 * 0.47);
    gl.uniform1f(gl.getUniformLocation(program, 'u_wind'), SWIRL / 100 * 0.36);
    var angle = (DIRECTION % 4) * Math.PI / 2;
    gl.uniform2f(gl.getUniformLocation(program, 'u_dirv'), Math.cos(angle), Math.sin(angle));

    var u_res = gl.getUniformLocation(program, 'u_res');
    var u_t = gl.getUniformLocation(program, 'u_t');

    var t = START_T;
    var last = performance.now();

    function resize() {
      var rect = canvas.parentElement ? canvas.parentElement.getBoundingClientRect() : canvas.getBoundingClientRect();
      var dpr = Math.min(3, window.devicePixelRatio || 1);
      var scale = Math.min(1, MAX_WIDTH / Math.max(1, rect.width * dpr));
      var w = Math.max(1, Math.round(rect.width * dpr * scale));
      var h = Math.max(1, Math.round(rect.height * dpr * scale));
      if (canvas.width !== w) canvas.width = w;
      if (canvas.height !== h) canvas.height = h;
      
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(u_res, canvas.width, canvas.height);
    }
    
    window.addEventListener('resize', resize);
    resize();

    function tick(now) {
      var dt = (now - last) / 1000;
      last = now;
      t += Math.min(0.05, dt) * (DEFAULT_SPEED / 100) * FLOW_SPEED_RATE;
      
      gl.uniform1f(u_t, t);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSky);
  } else {
    initSky();
  }
})();
