/* Optional motion layer. Core navigation, dialogs, tabs, and downloads live in app.js. */
(() => {
  const { gsap, ScrollTrigger } = window;
  if (!gsap || !ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);

  const one = (selector, root = document) => root.querySelector(selector);
  const all = (selector, root = document) => [...root.querySelectorAll(selector)];
  const motion = { ease: 'power3.out', duration: 0.85, stagger: 0.11 };
  const revealed = new WeakSet();
  let media;

  function mount() {
    if (media) return;
    media = gsap.matchMedia();
    media.add({
      motion: '(prefers-reduced-motion: no-preference)',
      desktop: '(min-width: 1000px) and (min-height: 700px)',
    }, context => {
      if (!context.conditions.motion) return;
      const { desktop } = context.conditions;
      const listeners = new AbortController();
      const cleanups = [];
      const entrances = [];
      const listen = (element, type, handler) => element.addEventListener(type, handler, { signal: listeners.signal });
      document.documentElement.classList.add('motion-ready');

      // Create paused animations while leaving the initial HTML visible. Animate only
      // when it enters view; keyboard focus always completes the relevant entrance.
      function enter(trigger, targets, from = {}, options = {}) {
        if (!trigger || revealed.has(trigger)) return;
        const tween = gsap.fromTo(targets, { y: 24, opacity: 0, ...from }, {
          y: 0, yPercent: 0, opacity: 1, duration: motion.duration,
          ease: motion.ease, stagger: motion.stagger,
          ...options, paused: true, immediateRender: false,
        });
        entrances.push({ trigger, tween });
        ScrollTrigger.create({
          trigger, start: 'top 91%', once: true,
          onEnter: () => { revealed.add(trigger); tween.play(); },
        });
      }
      listen(document, 'focusin', event => {
        // Pointer focus must not move its target between pointerdown and click.
        if (!event.target.matches(':focus-visible')) return;
        entrances.forEach(({ trigger, tween }) => {
          if (trigger.contains(event.target)) { revealed.add(trigger); tween.progress(1); }
        });
      });

      // The campaign images and text are visible immediately. The carousel
      // owns its crossfade; no competing hero entrance or scroll transform.
      const cue = gsap.to('.scroll-cue > span', { y: 5, duration: 0.7, ease: 'sine.inOut', repeat: 5, yoyo: true, paused: true });
      ScrollTrigger.create({ trigger: '.hero', start: 'top bottom', end: 'bottom top', onEnter: () => cue.play(), onLeave: () => cue.pause(), onEnterBack: () => cue.play(), onLeaveBack: () => cue.pause() });

      all('.section-heading, .expertise-copy, .faq > div:first-child').filter(element => !element.closest('.applications')).forEach(element => {
        enter(element, [...element.children], { y: 22 }, { stagger: 0.1 });
      });
      if (desktop) {
        enter(one('.product-grid'), '.product', { y: 0 }, { stagger: 0.14 });
      } else {
        all('.product').forEach(product => enter(product, product, { y: 0 }));
      }
      enter(one('.about'), '#about-title .text-line', { y: 0, yPercent: 110 }, { duration: 1.05, stagger: 0.17 });
      enter(one('.about-body > div'), '.about-body > div > *', { y: 18 }, { stagger: 0.1 });
      enter(one('.customer-list'), '.customer-list > li', { y: 12 }, { stagger: 0.08 });
      all('.company-photo').forEach(photo => enter(photo, photo, { y: 18 }, { duration: 0.95 }));
      enter(one('.contact'), '#contact-title .word', { y: 0, yPercent: 110 }, { duration: 0.8, stagger: 0.045 });
      enter(one('.contact-content'), '.contact .eyebrow, .contact .button', { y: 16 }, { delay: 0.15 });
      enter(one('.contact-ring'), '.contact-ring', { y: 0, scale: 0.92 }, { scale: 1, duration: 1.2 });
      if (desktop) {
        gsap.to('.about', { '--about-shift': '-28px', ease: 'none', scrollTrigger: { trigger: '.about', start: 'top bottom', end: 'bottom top', scrub: 0.7 } });
      }
      gsap.fromTo('.contact-ring', { rotation: -20 }, { rotation: 18, ease: 'none', scrollTrigger: { trigger: '.contact', start: 'top bottom', end: 'bottom top', scrub: 0.8 } });

      engineeringTimeline();
      setupAccordions(listen, cleanups);


      const refresh = () => ScrollTrigger.refresh();
      if (document.readyState !== 'complete') listen(window, 'load', refresh);
      ScrollTrigger.refresh();

      return () => {
        listeners.abort();
        cleanups.forEach(cleanup => cleanup());
        document.documentElement.classList.remove('motion-ready');
      };
    });
  }

  function engineeringTimeline() {
    const diagram = one('.engineering-visual');
    const rings = all('.draw-ring', diagram);
    const lines = all('.draw-connector', diagram);
    const fills = all('.layer-fill', diagram);
    const labels = all('.layer-label', diagram);
    const dots = all('.connector-dot', diagram);
    const notes = all('.layer-note:not(.complete)', diagram);
    const complete = one('.layer-note.complete', diagram);
    const strokes = [...rings, ...lines, one('.draw-hub', diagram)];
    // Read SVG geometry once; scroll frames update only stroke offsets and transforms.
    strokes.forEach(stroke => {
      const length = stroke.getTotalLength();
      gsap.set(stroke, { strokeDasharray: length, strokeDashoffset: length });
    });
    gsap.set(fills, { opacity: 0 });
    gsap.set([...labels, ...dots], { opacity: 0 });
    const timeline = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: { id: 'engineering-story', trigger: diagram, start: 'top 78%', end: 'center 42%', scrub: 0.45, invalidateOnRefresh: true },
    });
    timeline.to(complete, { opacity: 0, duration: 0.1 }, 0)
      .fromTo('.diagram-axis, .index-ring', { opacity: 0 }, { opacity: 1, duration: 0.5 }, 0)
      .to('.index-ring', { rotation: 20, svgOrigin: '245 225', duration: 4.4 }, 0);
    rings.forEach((ring, index) => {
      const start = 0.25 + index * 1.15;
      timeline.to(ring, { strokeDashoffset: 0, duration: 0.75 }, start)
        .to(fills[index], { opacity: 1, duration: 0.4 }, start + 0.2)
        .to(lines[index], { strokeDashoffset: 0, duration: 0.55 }, start + 0.3)
        .to([dots[index], labels[index]], { opacity: 1, duration: 0.25 }, start + 0.65)
        .fromTo(notes[index], { opacity: 0, y: 7 }, { opacity: 1, y: 0, duration: 0.25 }, start + 0.1)
        .to(notes[index], { opacity: 0, y: -5, duration: 0.2 }, start + 1.05)
        .to(fills[index], { opacity: 0.35, duration: 0.3 }, start + 1.02);
    });
    timeline.to('.draw-hub', { strokeDashoffset: 0, duration: 0.45 }, 2.9)
      .to(complete, { opacity: 1, duration: 0.35 }, 3.8)
      .to(rings, { stroke: '#b8d9ed', duration: 0.35 }, 3.9);
  }

  function setupAccordions(listen, cleanups) {
    all('.faq details').forEach(details => {
      const summary = one('summary', details);
      let animation;
      let requestedOpen = details.open;
      const settle = () => {
        details.open = requestedOpen;
        details.classList.remove('is-closing');
        details.style.removeProperty('height');
        details.style.removeProperty('overflow');
      };
      listen(summary, 'click', event => {
        event.preventDefault();
        const startHeight = details.getBoundingClientRect().height;
        animation?.cancel();
        requestedOpen = !requestedOpen;
        details.classList.toggle('is-closing', !requestedOpen);
        details.open = true;
        details.style.height = 'auto';
        const style = getComputedStyle(details);
        const borderHeight = parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);
        const endHeight = requestedOpen ? details.getBoundingClientRect().height : summary.getBoundingClientRect().height + borderHeight;
        details.style.overflow = 'hidden';
        animation = details.animate([{ height: `${startHeight}px` }, { height: `${endHeight}px` }], { duration: 320, easing: 'cubic-bezier(.22,.72,.18,1)' });
        animation.onfinish = () => { animation = null; settle(); ScrollTrigger.refresh(true); };
      });
      cleanups.push(() => { animation?.cancel(); settle(); });
    });
  }

  function unmount() { media?.revert(); media = null; }
  function safelyMount() {
    try { mount(); }
    catch (error) { unmount(); console.error('NUTECH motion enhancement could not start:', error); }
  }
  // Restore styles/listeners on preference changes and browser history lifecycle.
  window.addEventListener('pagehide', unmount);
  window.addEventListener('pageshow', safelyMount);
  safelyMount();
})();
