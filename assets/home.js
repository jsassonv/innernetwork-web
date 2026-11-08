/* innernetwork.app home page: motion and the small sample demos. Everything here is decoration on top of content that
   is already readable without JavaScript. All people, companies and events are made-up samples. */
(function () {
  "use strict";
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var hover = window.matchMedia("(hover: hover)").matches;
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function ic(n) { return '<svg class="ic" aria-hidden="true"><use href="#i-' + n + '"/></svg>'; }

  /* ---------- nav ---------- */
  var nav = $("#nav");
  function onScrollNav() { nav.classList.toggle("scrolled", window.scrollY > 8); }
  onScrollNav();
  var mm = $("#mmbtn"), mnav = $("#mnav");
  mm.addEventListener("click", function () {
    var open = mnav.hidden;
    mnav.hidden = !open;
    mm.setAttribute("aria-expanded", String(open));
    mm.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    mm.innerHTML = ic(open ? "x" : "menu");
  });
  $$("a", mnav).forEach(function (a) { a.addEventListener("click", function () { mnav.hidden = true; mm.setAttribute("aria-expanded", "false"); mm.innerHTML = ic("menu"); }); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !mnav.hidden) { mm.click(); mm.focus(); } });

  // Highlight the section you are in.
  var navLinks = $$(".nav ul a");
  var sections = navLinks.map(function (a) { return $(a.getAttribute("href")); }).filter(Boolean);
  if ("IntersectionObserver" in window) {
    var secObs = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) navLinks.forEach(function (a) { a.classList.toggle("on", a.getAttribute("href") === "#" + e.target.id); });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { secObs.observe(s); });
  }

  /* ---------- hero ---------- */
  var hero = $(".hero");
  setTimeout(function () { hero.classList.add("ready"); }, 40);
  // The door opens when you can see it (right away on desktop, after a little scroll on phones).
  var doorEl = $("#door");
  if ("IntersectionObserver" in window) {
    var dio = new IntersectionObserver(function (es) { if (es[0].isIntersecting) { doorEl.classList.add("go"); dio.disconnect(); } }, { threshold: .35 });
    dio.observe(doorEl);
  } else doorEl.classList.add("go");

  // Rotating last word with a hand-drawn underline.
  var rot = $("#rot"), words = $$("span", rot), path = $("path", rot), wi = 0;
  function draw() { path.classList.remove("draw"); void path.getBBox; path.getBoundingClientRect(); path.classList.add("draw"); }
  setTimeout(draw, 900);
  if (!reduce) setInterval(function () {
    if (document.hidden) return;
    var cur = words[wi]; wi = (wi + 1) % words.length; var nxt = words[wi];
    cur.classList.remove("on"); cur.classList.add("out");
    nxt.classList.remove("out"); nxt.classList.add("on");
    setTimeout(function () { cur.classList.remove("out"); }, 700);
    draw();
  }, 3200);

  // Toast cycles through people you just met; the event card gets saved.
  var people = [["Ana Ruiz added to My network", "Met at the design awards"], ["Marcus Bell saved your card", "Brickell CRE Mixer"], ["Priya Shah added to My network", "Tagged Prospect"], ["Daniel Okafor shared his details", "Follow up Monday"]];
  var tt = $("#toastTxt"), pi = 0;
  if (!reduce) setInterval(function () {
    if (document.hidden) return;
    tt.classList.add("swap");
    setTimeout(function () { pi = (pi + 1) % people.length; tt.innerHTML = esc(people[pi][0]) + "<small>" + esc(people[pi][1]) + "</small>"; tt.classList.remove("swap"); }, 380);
  }, 3600);
  var hs = $("#heroStar");
  (function waitDoor() {
    if (!doorEl.classList.contains("go") && !reduce) return setTimeout(waitDoor, 300);
    setTimeout(function () { hs.setAttribute("aria-pressed", "true"); hs.classList.add("pulse"); }, reduce ? 0 : 3000);
  })();

  // Gentle parallax on the doorway scene (mouse on desktop, scroll everywhere).
  var door = $("#door"), layers = $$(".layer", door);
  var mx = 0, my = 0;
  if (hover && !reduce) {
    hero.addEventListener("pointermove", function (e) {
      var r = door.getBoundingClientRect();
      mx = (e.clientX - (r.left + r.width / 2)) / r.width; my = (e.clientY - (r.top + r.height / 2)) / r.height;
      paintDoor();
    });
    hero.addEventListener("pointerleave", function () { mx = 0; my = 0; paintDoor(); });
  }
  function paintDoor() {
    // Scroll drift only on wide screens, and only a little, so the floating pieces never cover the card.
    var sy = window.innerWidth > 1000 ? Math.min(window.scrollY, 600) / 5 : 0;
    layers.forEach(function (l) {
      var d = +l.getAttribute("data-depth");
      l.style.transform = "translate3d(" + (mx * d).toFixed(1) + "px," + (my * d - sy * d / 90).toFixed(1) + "px,0)";
    });
  }

  /* ---------- roles strip ---------- */
  var roles = ["Developers", "General contractors", "Architects", "Engineers", "Lenders", "Brokers", "Property managers", "Attorneys", "Subcontractors", "Restoration", "Interior designers", "Investors"];
  var tints = ["#EBD8B0", "#D3E0CC", "#F4D6C9", "#D5DCEC"];
  function strip(list) {
    var h = list.map(function (r, i) { return '<span class="role"><i style="background:' + tints[i % 4] + '"></i>' + esc(r) + "</span>"; }).join("");
    return h + h.replace(/class="role"/g, 'class="role" aria-hidden="true"');
  }
  $("#m1").innerHTML = strip(roles);
  $("#m2").innerHTML = strip(roles.slice(6).concat(roles.slice(0, 6)));

  /* ---------- events demo ---------- */
  var EV = [
    { id: 1, dow: "Thu", d: 12, m: "Nov", t: "Brickell Commercial Real Estate Mixer", meta: "6:00 PM, Brickell", org: "South Florida CRE Network", oi: "S", oc: "#4B7357", price: "$25", you: true },
    { id: 2, dow: "Tue", d: 17, m: "Nov", t: "Energy Code Update for Design Professionals", meta: "8:30 AM, Fort Lauderdale", org: "Coastal Design Council", oi: "C", oc: "#A6483A", price: "", you: true },
    { id: 3, dow: "Thu", d: 19, m: "Nov", t: "Builders Breakfast: 2027 Permitting Outlook", meta: "7:30 AM, Doral", org: "Miami Builders Forum", oi: "M", oc: "#8C6D3F", price: "$40", you: false },
    { id: 4, dow: "Mon", d: 24, m: "Nov", t: "Property Managers Roundtable", meta: "12:00 PM, Coral Gables", org: "Bayside Property Network", oi: "B", oc: "#4E5670", price: "", you: true }
  ];
  var saved = { 3: true }, evTab = "up";
  var evlist = $("#evlist");
  function renderEv(animate) {
    var rows = EV.filter(function (e) { return evTab === "up" || (evTab === "you" ? e.you : saved[e.id]); }).slice(0, 3);
    evlist.innerHTML = rows.length ? rows.map(function (e) {
      var sv = !!saved[e.id];
      return '<div class="ev"><div class="dt"><small>' + e.dow + "</small><b>" + e.d + "</b><em>" + e.m + "</em></div>" +
        '<div style="min-width:0"><h5>' + esc(e.t) + '</h5><div class="meta">' + esc(e.meta) + '</div><div class="org"><span class="oa" style="background:' + e.oc + '">' + e.oi + "</span>" + esc(e.org) + "</div></div>" +
        '<div class="ea">' + (e.price ? '<span class="price">' + e.price + "</span>" : "") +
        '<button class="star" type="button" data-star="' + e.id + '" aria-pressed="' + sv + '" aria-label="' + (sv ? "Unsave " : "Save ") + esc(e.t) + '">' + ic("star") + "</button></div></div>";
    }).join("") : '<p style="padding:18px;text-align:center;color:var(--navy-7)">Save an event with the star and it shows up here.</p>';
    if (animate) { evlist.classList.remove("enter"); void evlist.offsetWidth; evlist.classList.add("enter"); }
  }
  renderEv(false);
  $("#evseg").addEventListener("click", function (e) {
    var b = e.target.closest("button"); if (!b) return;
    evTab = b.getAttribute("data-t");
    $$("button", this).forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
    renderEv(true);
  });
  evlist.addEventListener("click", function (e) {
    var b = e.target.closest("[data-star]"); if (!b) return;
    var id = +b.getAttribute("data-star"); saved[id] = !saved[id];
    if (evTab === "saved") renderEv(true); else { b.setAttribute("aria-pressed", String(!!saved[id])); b.classList.remove("pulse"); void b.offsetWidth; b.classList.add("pulse"); }
  });

  // Typing AI search.
  var phrases = ["architects in Miami", "who can finance my condo project", "free events this week", "general contractors near Doral"];
  var typed = $("#typed"), srch = $("#srch"), ph = 0, ch = 0, del = false, typingOn = false;
  function tick() {
    if (!typingOn || document.hidden) { setTimeout(tick, 600); return; }
    var p = phrases[ph];
    if (!del) { ch++; typed.textContent = p.slice(0, ch); srch.classList.add("live"); if (ch === p.length) { del = true; setTimeout(tick, 1700); return; } }
    else { ch--; typed.textContent = p.slice(0, ch); if (ch === 0) { del = false; ph = (ph + 1) % phrases.length; srch.classList.remove("live"); setTimeout(tick, 500); return; } }
    setTimeout(tick, del ? 28 : 60 + Math.random() * 50);
  }
  if (reduce) typed.textContent = phrases[0]; else tick();

  /* ---------- card demo ---------- */
  var SW = [["Navy", "#2F354A", "#FAF8F2"], ["Sand", "#F3E9D2", "#1B1F2B"], ["Brass", "#8C6D3F", "#FFFFFF"], ["Sage", "#4B7357", "#FFFFFF"], ["Terracotta", "#A6483A", "#FFFFFF"], ["Midnight", "#1B1F2B", "#FAF8F2"]];
  var dc = $("#democard"), swEl = $("#sw"), swi = 0;
  dc.innerHTML = '<div class="bcard" id="bc"><div class="who"><div class="av">AM</div><div><h4>Alex Moreno</h4><div class="t">Project Executive, Brickell Builders</div></div></div>' +
    '<div class="rows"><div>alex@brickellbuilders.example</div><div>(305) 555-0142</div><div>brickellbuilders.example</div></div><div class="bt"><span>Save contact</span><span>Connect</span></div></div>';
  var bc = $("#bc");
  function paintCard() { var s = SW[swi]; bc.style.background = s[1]; bc.style.color = s[2]; $$("button", swEl).forEach(function (b, i) { b.setAttribute("aria-pressed", String(i === swi)); }); }
  swEl.innerHTML = SW.map(function (s, i) { return '<button type="button" style="background:' + s[1] + '" aria-label="' + s[0] + '" aria-pressed="false" data-i="' + i + '"></button>'; }).join("");
  paintCard();
  var userPicked = false;
  swEl.addEventListener("click", function (e) { var b = e.target.closest("button"); if (!b) return; userPicked = true; swi = +b.getAttribute("data-i"); paintCard(); });
  var cardOn = false;
  if (!reduce) setInterval(function () { if (!cardOn || userPicked || document.hidden) return; swi = (swi + 1) % SW.length; paintCard(); }, 2400);
  var cw = $("#cardwrap");
  if (hover && !reduce) {
    cw.addEventListener("pointermove", function (e) { var r = cw.getBoundingClientRect(); bc.style.setProperty("--ry", ((e.clientX - r.left) / r.width - .5) * 14 + "deg"); bc.style.setProperty("--rx", -((e.clientY - r.top) / r.height - .5) * 12 + "deg"); });
    cw.addEventListener("pointerleave", function () { bc.style.setProperty("--ry", "0deg"); bc.style.setProperty("--rx", "0deg"); });
  }

  /* ---------- contacts demo ---------- */
  var CT = [
    { n: "Ana Ruiz", i: "AR", c: "#2F354A", t: "Senior Architect", co: "Ruiz Studio", tag: "Partner", note: "Met at the design awards. Wants to talk about the Wynwood mixed-use bid." },
    { n: "Marcus Bell", i: "MB", c: "#4E5670", t: "General Contractor", co: "Bellwork Construction", tag: "Vendor", note: "" },
    { n: "Priya Shah", i: "PS", c: "#4B7357", t: "Loan Officer", co: "Harbor Commercial Bank", tag: "Prospect", note: "Pre-approval for the condo project. Send the updated budget." },
    { n: "Daniel Okafor", i: "DO", c: "#8C6D3F", t: "Real Estate Developer", co: "Okafor Development", tag: "Customer", note: "Looking for a GC and architect team for a Broward townhome site." }
  ];
  var tagSel = "All", tagsEl = $("#tags"), ctEl = $("#contacts");
  var TAGS = ["All", "Partner", "Prospect", "Customer", "Vendor"];
  function renderCt(animate) {
    tagsEl.innerHTML = TAGS.map(function (t) { return '<button class="chip" type="button" aria-pressed="' + (t === tagSel) + '">' + t + "</button>"; }).join("");
    ctEl.innerHTML = CT.filter(function (c) { return tagSel === "All" || c.tag === tagSel; }).map(function (c) {
      return '<div class="crow"><span class="av2" style="background:' + c.c + '">' + c.i + '</span><div class="nm">' + esc(c.n) + "<small>" + esc(c.t) + ", " + esc(c.co) + '</small></div><span class="tg ' + c.tag + '">' + c.tag + "</span>" +
        (c.note ? '<div class="no">' + esc(c.note) + "</div>" : "") + "</div>";
    }).join("");
    if (animate) { ctEl.classList.remove("enter"); void ctEl.offsetWidth; ctEl.classList.add("enter"); }
  }
  renderCt(false);
  var tagAuto = 0, tagUser = false, ctOn = false;
  tagsEl.addEventListener("click", function (e) { var b = e.target.closest("button"); if (!b) return; tagUser = true; tagSel = b.textContent; renderCt(true); });
  if (!reduce) setInterval(function () { if (!ctOn || tagUser || document.hidden) return; tagAuto = (tagAuto + 1) % TAGS.length; tagSel = TAGS[tagAuto]; renderCt(true); }, 2600);

  /* ---------- share tiles ---------- */
  var copy = $("#copybtn");
  copy.addEventListener("click", function () { copy.textContent = "Copied"; setTimeout(function () { copy.textContent = "Copy"; }, 1800); });
  function drawQr() {
    var cv = $("#qr"); if (!cv || !window.QRCodeLib) return;
    var q = new window.QRCodeLib.QRCode(-1, window.QRCodeLib.ErrorCorrectLevel.M); q.addData("https://innernetwork.app"); q.make();
    var n = q.getModuleCount(), g = cv.getContext("2d"), s = Math.floor(128 / (n + 2)), off = Math.floor((128 - s * n) / 2);
    g.fillStyle = "#FFFDF8"; g.fillRect(0, 0, 128, 128);
    var cells = [];
    for (var r = 0; r < n; r++) for (var c = 0; c < n; c++) if (q.isDark(r, c)) cells.push([r, c]);
    g.fillStyle = "#1B1F2B";
    if (reduce) { cells.forEach(function (p) { g.fillRect(off + p[1] * s, off + p[0] * s, s, s); }); return; }
    var k = 0, per = Math.ceil(cells.length / 40);
    (function step() {
      for (var j = 0; j < per && k < cells.length; j++, k++) g.fillRect(off + cells[k][1] * s, off + cells[k][0] * s, s, s);
      if (k < cells.length) requestAnimationFrame(step); else $("#qrbox").classList.add("scanning");
    })();
  }

  /* ---------- reveal on scroll + section triggers ---------- */
  var rv = $$(".rv");
  if ("IntersectionObserver" in window && !reduce) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add("in");
        if (e.target.classList.contains("fc")) setTimeout(function () { e.target.classList.add("settled"); }, 950);
        io.unobserve(e.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: .08 });
    rv.forEach(function (el) { io.observe(el); });
    var once = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target;
        if (el.id === "srch") typingOn = true;
        if (el.id === "democard") cardOn = true;
        if (el.id === "contacts") ctOn = true;
        if (el.id === "qrbox") drawQr();
        if (el.classList.contains("shc")) el.classList.add("go");
        once.unobserve(el);
      });
    }, { threshold: .4 });
    ["#srch", "#democard", "#contacts", "#qrbox"].forEach(function (s) { once.observe($(s)); });
    $$(".shc").forEach(function (s) { once.observe(s); });
  } else {
    rv.forEach(function (el) { el.classList.add("in"); });
    $$(".shc").forEach(function (s) { s.classList.add("go"); });
    typingOn = true; cardOn = true; ctOn = true;
    window.addEventListener("load", drawQr);
  }
  if (document.readyState === "complete") { if (reduce) drawQr(); } else if (reduce) window.addEventListener("load", drawQr);

  /* ---------- scroll-driven: the room opens up, cards stack, steps fill ---------- */
  var room = $("#room"), roomImg = room && $("img", room);
  var fcs = $$(".fc"), rail = $("#steps .rail i"), steps = $("#steps"), fin = $("#fin");
  var wide = window.matchMedia("(min-width: 1001px)");
  var ticking = false;
  function frame() {
    ticking = false;
    var vh = window.innerHeight;
    onScrollNav();
    if (reduce) return;
    paintDoor();
    // Room: from 90% to full size as it comes up the screen, picture drifts slower than the page.
    if (room) {
      var r = room.getBoundingClientRect();
      var p = Math.min(1, Math.max(0, (vh - r.top) / (vh * .9)));
      room.style.setProperty("--s", (0.9 + 0.1 * p).toFixed(4));
      roomImg.style.setProperty("--py", ((r.top - vh / 2) * -0.08).toFixed(1) + "px");
    }
    // Stacking cards: each card shrinks a little as the next one slides over it.
    if (wide.matches) {
      fcs.forEach(function (c, i) {
        var next = fcs[i + 1];
        if (!next) { c.style.setProperty("--k", 1); return; }
        var nt = next.getBoundingClientRect().top, ct = c.getBoundingClientRect().top;
        var cover = Math.min(1, Math.max(0, 1 - (nt - ct) / c.offsetHeight));
        c.style.setProperty("--k", (1 - cover * 0.06).toFixed(4));
      });
    } else fcs.forEach(function (c) { c.style.setProperty("--k", 1); });
    // How it works rail.
    if (steps && rail) {
      var s = steps.getBoundingClientRect();
      rail.parentNode.style.setProperty("--p", Math.min(1, Math.max(0, (vh * .8 - s.top) / (s.height * .9))).toFixed(3));
    }
    if (fin && fin.getBoundingClientRect().top < vh * .85) fin.classList.add("in");
  }
  window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }, { passive: true });
  window.addEventListener("resize", frame);
  frame();
  if (reduce && fin) fin.classList.add("in");
})();
