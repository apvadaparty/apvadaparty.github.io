/* Pin the identity panel below the masthead.

   style.css parks .profile at `top: var(--masthead-clear, 144px)`. The 144px
   fallback only matches reality when the masthead is one row tall; as soon as
   the nav wraps to a second line the banner grows, the panel starts out lower
   than 144px, and it visibly slides up before pinning.

   So measure the masthead and set --masthead-clear to its real height. The
   panel then pins immediately at every window size. With JS off the fallback
   still applies, so nothing breaks — the panel just travels a little first. */
(function () {
  var masthead = document.querySelector('.masthead');
  var main = document.querySelector('main.home, main.with-profile');
  if (!masthead || !main) return;

  function setClearance() {
    /* The panel rests at (masthead height + main's top margin). Pin it at
       exactly that, so it is already pinned at scroll 0 and never travels.
       Using the masthead height alone would leave it the margin's worth of
       slide before it caught. */
    var h = masthead.getBoundingClientRect().height;
    var gap = parseFloat(getComputedStyle(main).marginTop) || 0;
    document.documentElement.style.setProperty('--masthead-clear', Math.round(h + gap) + 'px');
  }

  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(setClearance, 150);
  });

  setClearance();
  /* the chalk tagline is an image; the banner's height is only final once it
     has loaded, so re-measure then */
  window.addEventListener('load', setClearance);
}());
