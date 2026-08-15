/* Chalk tagline: pick up the eraser or the chalk from the tray and use them.

   The banner's <img> is swapped for a <canvas> of the same picture so strokes can
   be wiped out of it (and chalked back in). With JS off the <img> simply stays.

   The tray on the ledge doubles as the tool rack, and only one copy of a tool is
   ever visible — the one on the ledge, or the one in your hand:

     hover the ledge eraser   pick it up (or put it back, if already holding it)
     hover the ledge chalk    pick it up  — the other tool returns to the ledge
     move onto the tagline    picks up whatever you used last, if hand is empty
     leave the banner         sets the tool down on the ledge where you left

   The eraser only erases; the chalk only puts back what was erased. Neither one
   draws anything the tagline did not already have.

   Mouse and pen only — on a touch screen a "hover" is a scroll, and wiping the
   banner every time someone swipes the page would be a nuisance. */
(function () {
  var ERASER_W = 44;    /* the whole tray eraser, bevel included, in CSS px */
  var ERASER_H = 16.5;  /* same block as the cursor drawn in CSS */
  var CHALK_W = 26;     /* the chalk tip is finer than the eraser */
  var CHALK_H = 7;
  var STEP = 6;         /* max gap between stamps when the pointer moves fast */
  var DOCK_PAD = 5;     /* the tray tools are small; forgive a few px */
  var FADE_WAIT = 2000; /* quiet time before the chalk starts coming back */
  var FADE_MS = 900;    /* how long the fade itself takes */

  function init(img) {
    var masthead = img.closest ? img.closest('.masthead') : null;
    var tray = document.querySelector('.chalk-tray-deco');
    var dockEraser = tray && tray.querySelector('.tray-eraser');
    var dockChalk = tray && tray.querySelector('.tray-chalk');
    if (!masthead || !dockEraser || !dockChalk) return;

    var canvas = document.createElement('canvas');
    canvas.className = img.className;
    /* the image carries the tagline's words, so the canvas has to say them too */
    canvas.setAttribute('role', 'img');
    canvas.setAttribute('aria-label', img.alt);
    img.parentNode.insertBefore(canvas, img);
    img.style.display = 'none';

    var ctx = canvas.getContext('2d');
    var w = 0, h = 0, ready = false;
    var tool = null;      /* null | 'eraser' | 'chalk' — what is in hand now */
    var lastTool = 'eraser';   /* what you reached for last, for when you come back */
    var inDock = null;    /* which dock the pointer is inside right now */
    var last = null;
    var fadeTimer = null, fading = false, fadeFrom = 0, faded = 0;
    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');

    function layout() {
      var r = canvas.getBoundingClientRect();
      if (!r.width) return false;
      var dpr = window.devicePixelRatio || 1;
      w = r.width;
      /* height comes from the picture's own proportions — a canvas has no
         intrinsic size to inherit, so height:auto would leave it 150px tall */
      h = w * img.naturalHeight / img.naturalWidth;
      canvas.style.height = h + 'px';
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(img, 0, 0, w, h);
      ready = true;
      return true;
    }

    /* --- the tool in hand --------------------------------------------- */

    function setTool(next) {
      if (tool === next) return;
      tool = next;
      if (next) lastTool = next;
      last = null;
      masthead.classList.toggle('tool-eraser', tool === 'eraser');
      masthead.classList.toggle('tool-chalk', tool === 'chalk');
      /* a tool in hand is a tool missing from the ledge */
      dockEraser.classList.toggle('tool-in-hand', tool === 'eraser');
      dockChalk.classList.toggle('tool-in-hand', tool === 'chalk');
    }

    function hits(el, e) {
      var r = el.getBoundingClientRect();
      return e.clientX >= r.left - DOCK_PAD && e.clientX <= r.right + DOCK_PAD &&
             e.clientY >= r.top - DOCK_PAD && e.clientY <= r.bottom + DOCK_PAD;
    }

    /* --- marking the board -------------------------------------------- */

    function stamp(x, y) {
      var sw = tool === 'chalk' ? CHALK_W : ERASER_W;
      var sh = tool === 'chalk' ? CHALK_H : ERASER_H;
      var left = x - sw / 2, top = y - sh / 2;
      if (tool === 'eraser') {
        stopFade();   /* still wiping — restart the clock */
        ctx.globalCompositeOperation = 'destination-out';
        ctx.fillStyle = '#000';
        ctx.fillRect(left, top, sw, sh);
        ctx.globalCompositeOperation = 'source-over';
        scheduleFade();
      } else {
        /* chalk puts back the original picture, and only within this patch */
        ctx.save();
        ctx.beginPath();
        ctx.rect(left, top, sw, sh);
        ctx.clip();
        ctx.drawImage(img, 0, 0, w, h);
        ctx.restore();
      }
    }

    /* --- the chalk writing itself back in ------------------------------ */

    /* Two seconds after the last wipe, the tagline fades back. Each frame draws
       the original over what is on the canvas at just enough alpha to move the
       total to where the curve says it should be — untouched chalk is already
       opaque, so only the erased parts visibly come back. */
    function fadeStep(now) {
      if (!fading) return;
      var p = Math.min((now - fadeFrom) / FADE_MS, 1);
      var step = (p - faded) / (1 - faded);
      if (step > 0) {
        ctx.globalAlpha = step;
        ctx.drawImage(img, 0, 0, w, h);
        ctx.globalAlpha = 1;
      }
      faded = p;
      if (p < 1) requestAnimationFrame(fadeStep);
      else { fading = false; ctx.drawImage(img, 0, 0, w, h); }   /* land exactly */
    }

    function stopFade() {
      fading = false;
      clearTimeout(fadeTimer);
    }

    function scheduleFade() {
      stopFade();
      fadeTimer = setTimeout(function () {
        if (reduceMotion && reduceMotion.matches) {
          ctx.drawImage(img, 0, 0, w, h);   /* no animation if motion is unwelcome */
          return;
        }
        faded = 0;
        fading = true;
        fadeFrom = performance.now();
        requestAnimationFrame(fadeStep);
      }, FADE_WAIT);
    }

    /* stamp along the path, so a quick flick leaves a continuous band */
    function sweep(x, y) {
      if (last) {
        var dx = x - last.x, dy = y - last.y;
        var steps = Math.ceil(Math.sqrt(dx * dx + dy * dy) / STEP);
        for (var i = 1; i < steps; i++) stamp(last.x + dx * i / steps, last.y + dy * i / steps);
      }
      stamp(x, y);
      last = { x: x, y: y };
    }

    /* --- pointer ------------------------------------------------------- */

    masthead.addEventListener('pointermove', function (e) {
      if (e.pointerType === 'touch' || !ready) return;

      /* the tray docks act on entry only, so resting on one doesn't flicker
         between picking the tool up and putting it down */
      var dock = hits(dockEraser, e) ? 'eraser' : (hits(dockChalk, e) ? 'chalk' : null);
      if (dock !== inDock) {
        inDock = dock;
        if (dock === 'eraser') setTool(tool === 'eraser' ? null : 'eraser');
        else if (dock === 'chalk') setTool(tool === 'chalk' ? null : 'chalk');
      }
      if (dock) { last = null; return; }

      var r = canvas.getBoundingClientRect();
      var x = e.clientX - r.left, y = e.clientY - r.top;
      var over = x >= 0 && y >= 0 && x <= r.width && y <= r.height;
      if (!over) { last = null; return; }

      /* reaching the tagline with an empty hand picks up whatever you used last */
      if (!tool) setTool(lastTool);
      sweep(x, y);
    });

    /* Put a tool down on the ledge below wherever the pointer left the banner —
       you set it down where you stopped, not back in its original spot. The tray
       is 1 SVG unit per px, so the shift is a plain translate. */
    function dropAt(which, clientX) {
      var g = which === 'chalk' ? dockChalk : dockEraser;
      g.removeAttribute('transform');            /* measure from its home spot */
      var r = g.getBoundingClientRect();
      var board = masthead.getBoundingClientRect();
      var half = r.width / 2;
      var target = Math.min(Math.max(clientX, board.left + half), board.right - half);
      var dx = target - (r.left + half);
      g.setAttribute('transform', 'translate(' + dx.toFixed(1) + ' 0)');
    }

    masthead.addEventListener('pointerleave', function (e) {
      inDock = null;
      if (tool) dropAt(tool, e.clientX);
      setTool(null);      /* out of your hand, down on the ledge */
    });

    var resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(layout, 150);
    });

    if (!layout()) {
      /* layout still settling — try once more on the next frame */
      requestAnimationFrame(layout);
    }
  }

  function start() {
    var img = document.querySelector('img.chalk-tagline');
    if (!img || !window.PointerEvent || !document.createElement('canvas').getContext) return;
    if (img.complete && img.naturalWidth) init(img);
    else img.addEventListener('load', function () { init(img); });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
}());
