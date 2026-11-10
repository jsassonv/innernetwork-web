/* Hosted events pages: shared pieces (the event-mail function's address, Spanish, escaping, the event's facts). */
(function () {
  var FN = "https://dwfuvfcjptvycqyedetb.supabase.co/functions/v1/event-mail";
  var SPANISH = /^es\b/i.test(navigator.language || "");
  var ES = {
    "Loading…": "Cargando…", "Going": "Voy", "Maybe": "Quizás", "Can't go": "No puedo", "invited you": "te invitó",
    "Zoom in": "Acercar", "Zoom out": "Alejar", "When": "Cuándo", "Where": "Dónde", "Hosted by": "Organiza", "Details": "Detalles", "What to know": "Lo que debes saber",
    "Your answer": "Tu respuesta", "Add to calendar": "Agregar al calendario", "Text me reminders": "Envíenme recordatorios por mensaje de texto",
    "Mobile phone": "Teléfono móvil", "Save": "Guardar", "Saved.": "Guardado.", "Sending…": "Enviando…",
    "You're going. See you there.": "Vas a ir. Nos vemos allí.", "Thanks, we let the host know.": "Gracias, se lo avisamos al anfitrión.",
    "You're on the waitlist. We'll email you if a spot opens.": "Estás en la lista de espera. Te escribiremos si se libera un lugar.",
    "This event is full.": "Este evento está lleno.", "That didn't work. Please try again.": "No funcionó. Inténtalo de nuevo.",
    "Too many tries. Please wait a few minutes.": "Demasiados intentos. Espera unos minutos.",
    "You won't get more emails about this event.": "No recibirás más correos sobre este evento.",
    "Confirmed. Thank you.": "Confirmado. Gracias.", "This page isn't available.": "Esta página no está disponible.",
    "Register": "Registrarme", "Get tickets": "Comprar entradas", "First name": "Nombre", "Last name": "Apellido", "Email": "Correo electrónico",
    "Phone (optional)": "Teléfono (opcional)", "Company (optional)": "Empresa (opcional)", "Job title (optional)": "Cargo (opcional)",
    "spots left": "lugares disponibles", "Join the waitlist": "Unirme a la lista de espera",
    "consent": "Acepto compartir estos datos con los anfitriones de este evento. Inner Network los guarda solo para este evento. ",
    "sms": "Envíenme recordatorios de este evento por mensaje de texto. Pueden aplicar tarifas de mensajes. Responde STOP para dejar de recibirlos.",
    "Privacy Policy": "Política de Privacidad", "Please tick the box to agree.": "Marca la casilla para aceptar.",
    "Please enter your name and email.": "Escribe tu nombre y correo electrónico.", "Online": "En línea", "Cancellation policy": "Política de cancelación",
    "Headcount": "Asistentes", "people": "personas", "Send request": "Enviar solicitud", "What would you like to request?": "¿Qué te gustaría solicitar?",
    "Topic": "Tema", "Tell them more (optional)": "Cuéntales más (opcional)", "Preferred dates and times (up to 3)": "Fechas y horas preferidas (hasta 3)",
    "Request sent. You'll get an email when they answer.": "Solicitud enviada. Recibirás un correo cuando respondan.",
    "Request a meeting": "Solicitar una reunión", "minutes": "minutos", "Answer this invitation": "Responde esta invitación",
    "This event has ended.": "Este evento ya terminó.",
    "Invitation": "Invitación", "Event": "Evento",
    "Tickets": "Entradas", "Quantity": "Cantidad", "Sold out": "Agotadas", "left": "disponibles", "Total": "Total",
    "Continue to payment": "Continuar al pago", "Confirming your payment…": "Confirmando tu pago…",
    "Payment received. Your confirmation is on its way by email.": "Pago recibido. Tu confirmación va en camino por correo.",
    "Ticket sales aren't available yet.": "La venta de entradas aún no está disponible.",
    "We couldn't confirm the payment yet. Check your email in a few minutes.": "Aún no pudimos confirmar el pago. Revisa tu correo en unos minutos.",
    "Free": "Gratis", "Donation": "Donación", "Your amount": "Tu monto", "Suggested": "Sugerido", "at least": "mínimo",
    "Get my ticket": "Obtener mi entrada", "Not available yet": "Aún no disponible",
    "You're in. Your confirmation is on its way by email.": "Ya estás dentro. Tu confirmación va en camino por correo.",
    "Please enter an amount.": "Escribe un monto.", "Ages": "Edades", "All ages": "Todas las edades", "Parking": "Estacionamiento",
    "Location": "Ubicación", "Open in Google Maps": "Abrir en Google Maps", "Map": "Mapa", "Hosted by": "Organizado por"
  };
  var EN = {
    consent: "I agree to share these details with this event's hosts. Inner Network keeps them only for this event. ",
    sms: "Text me reminders about this event. Message rates may apply. Reply STOP to opt out."
  };
  function t(k) { return (SPANISH ? ES[k] : EN[k]) || k; }
  /** Spanish when the visitor's browser is Spanish or the event (or request type) was made in Spanish. */
  function setLang(l) {
    SPANISH = SPANISH || l === "es";
    document.documentElement.lang = SPANISH ? "es" : "en";
    if (window.HOSTED) window.HOSTED.SPANISH = SPANISH;
    if (SPANISH) {
      var parts = document.title.split(" · ");
      if (ES[parts[0]]) document.title = ES[parts[0]] + " · " + parts.slice(1).join(" · ");
      var st = document.querySelector("#main > p.status");
      if (st && ES[st.textContent]) st.textContent = ES[st.textContent];
    }
  }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  var ICON = {
    cal: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
    person: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>',
    id: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="12" r="2.5"/><path d="M14 10h4M14 14h4"/></svg>',
    people: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.6-3.4 3.2-5.2 6.5-5.2s5.9 1.8 6.5 5.2M16 5.6a3.4 3.4 0 0 1 0 6.4M18 14.9c1.9.6 3.1 2.2 3.5 5.1"/></svg>'
  };
  function hostNames(h) { h = (h || []).filter(Boolean); return h.length <= 1 ? (h[0] || "") : h.slice(0, -1).join(", ") + (SPANISH ? " y " : " and ") + h[h.length - 1]; }
  function https(u) { return typeof u === "string" && /^https:\/\/[^\s<>"]+$/.test(u) ? u : ""; }
  function accent(e) { var a = /^#[0-9A-Fa-f]{6}$/.test(e.accent_hex) ? e.accent_hex : "#B08D57"; document.documentElement.style.setProperty("--accent", a); return a; }

  /** The flyer (or a colored panel with the name) and the facts list. */
  function flyer(e) {
    return https(e.cover_url) ? '<img class="flyer" src="' + esc(e.cover_url) + '" alt="">'
      : '<div class="flyer none" style="background:' + esc(accent(e)) + '">' + esc(e.name) + '</div>';
  }
  /** Who it's by (2059): the organization for a company event, else the hosts. */
  function hostedBy(e) {
    var o = e.organizer;
    if (o && o.kind === "company" && o.name) return o.name;
    return hostNames(e.hosts);
  }
  function facts(e) {
    var online = https(e.online_url), age = e.age_restriction === "18" || e.age_restriction === "21" ? e.age_restriction + "+" : "";
    return '<ul class="facts">' +
      '<li>' + ICON.cal + '<span><strong>' + esc(e.when.date) + '</strong>' + (e.when.time ? '<small>' + esc(e.when.time) + '</small>' : '') + '</span></li>' +
      (e.place ? '<li>' + ICON.pin + '<span><strong>' + esc(e.venue_name || e.place) + '</strong>' + (e.venue_address && e.venue_name ? '<small>' + esc(e.venue_address) + '</small>' : '') +
        (online ? '<small><a href="' + esc(online) + '" target="_blank" rel="noopener noreferrer">' + esc(online.replace(/^https:\/\//, "")) + '</a></small>' : '') + '</span></li>' : '') +
      (hostedBy(e) ? '<li>' + ICON.person + '<span><small>' + t("Hosted by") + '</small><strong>' + esc(hostedBy(e)) + '</strong></span></li>' : '') +
      (age ? '<li>' + ICON.id + '<span><small>' + t("Ages") + '</small><strong>' + age + '</strong></span></li>' : '') +
      (e.headcount ? '<li>' + ICON.people + '<span><small>' + t("Headcount") + '</small><strong>' + esc(e.headcount) + ' ' + t("people") + '</strong></span></li>' : '') +
      '</ul>';
  }
  /** The map picture with + / - buttons in its corner: the server signs one picture per zoom level; the buttons swap between them. */
  function mapBox(e, map) {
    var z = e.map_zooms, levels = z && z.levels && z.levels.length > 1 ? z.levels.filter(function (l) { return https(l.url); }) : [];
    var idx = 0;
    for (var i = 0; i < levels.length; i++) if (levels[i].z === z.start) idx = i;
    var img = '<img class="map" src="' + esc(levels.length ? levels[idx].url : map) + '" alt="' + t("Map") + '" loading="lazy" onerror="this.remove()">';
    if (levels.length < 2) return img;
    return '<div class="mapbox" data-i="' + idx + '" data-urls="' + esc(JSON.stringify(levels.map(function (l) { return l.url; }))) + '">' + img +
      '<div class="mapzoom"><button type="button" data-zoom="1" aria-label="' + t("Zoom in") + '" title="' + t("Zoom in") + '">+</button>' +
      '<button type="button" data-zoom="-1" aria-label="' + t("Zoom out") + '" title="' + t("Zoom out") + '">\u2212</button></div></div>';
  }
  document.addEventListener("click", function (ev) {
    var b = ev.target.closest && ev.target.closest(".mapzoom button");
    if (!b) return;
    var box = b.closest(".mapbox"), urls;
    try { urls = JSON.parse(box.getAttribute("data-urls")); } catch (x) { return; }
    var i = Math.max(0, Math.min(urls.length - 1, Number(box.getAttribute("data-i")) + Number(b.getAttribute("data-zoom"))));
    box.setAttribute("data-i", String(i));
    var img = box.querySelector("img"); if (img) img.src = urls[i];
    var btns = box.querySelectorAll(".mapzoom button");
    btns[0].disabled = i >= urls.length - 1; btns[1].disabled = i <= 0;
  });
  /** The map square and parking (2059). The map link is signed by the server; no Google key on the page. */
  function where(e) {
    var map = https(e.map_url), addr = [e.venue_name, e.venue_address].filter(Boolean).join(", ");
    var gm = addr ? "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(addr) : "";
    return (map || e.parking_info ? '<section class="panel"><h2>' + t("Location") + '</h2>' +
      (map ? mapBox(e, map) : '') +
      (addr ? '<p class="text">' + esc(e.place_kind === "city" ? e.venue_address || addr : addr) + (gm ? ' <a href="' + esc(gm) + '" target="_blank" rel="noopener noreferrer">' + t("Open in Google Maps") + '</a>' : '') + '</p>' : '') +
      (e.parking_info ? '<p class="text" style="margin-top:10px"><strong>' + t("Parking") + ':</strong> ' + esc(e.parking_info) + '</p>' : '') +
      '</section>' : '');
  }
  function details(e) {
    return where(e) + (e.description ? '<section class="panel"><h2>' + t("Details") + '</h2><p class="text">' + esc(e.description) + '</p></section>' : '') +
      (e.requirements ? '<section class="panel"><h2>' + t("What to know") + '</h2><p class="text">' + esc(e.requirements) + '</p>' +
        (e.cancellation_policy ? '<p class="note" style="margin-top:10px">' + t("Cancellation policy") + ': ' + esc(e.cancellation_policy) + '</p>' : '') + '</section>' : '');
  }
  function post(query, body) {
    return fetch(FN + query, { method: "POST", headers: { "Content-Type": "text/plain" }, body: JSON.stringify(body || {}) })
      .then(function (r) { return r.json().then(function (b) { return { ok: r.ok, status: r.status, body: b }; }); });
  }
  /** Tickets sold in Inner Network (step F): the tickets function sits next to event-mail. */
  var TK = FN.replace(/event-mail$/, "tickets");
  function tget(path) { return fetch(TK + path).then(function (r) { return r.json().then(function (b) { return { ok: r.ok, status: r.status, body: b }; }); }); }
  function tpost(path, body) {
    return fetch(TK + path, { method: "POST", headers: { "Content-Type": "text/plain" }, body: JSON.stringify(body || {}) })
      .then(function (r) { return r.json().then(function (b) { return { ok: r.ok, status: r.status, body: b }; }); });
  }
  /** $25, or $25.50 (US dollars). */
  function money(cents) { var d = cents / 100; return "$" + (cents % 100 ? d.toFixed(2) : String(d)); }
  function get(query) {
    // ?lang=es asks the function for Spanish dates; the answer says which language the page should use.
    return fetch(FN + query + (SPANISH ? "&lang=es" : "")).then(function (r) {
      return r.json().then(function (b) {
        if (b) setLang(b.lang || (b.event && b.event.lang));
        return { ok: r.ok, status: r.status, body: b };
      });
    });
  }
  function fail(msg) { var m = document.getElementById("main"); m.innerHTML = '<p class="status">' + esc(msg || t("This page isn't available.")) + '</p>'; }

  window.HOSTED = { FN: FN, t: t, esc: esc, flyer: flyer, facts: facts, details: details, post: post, get: get, fail: fail, hostNames: hostNames, accent: accent, SPANISH: SPANISH,
    tget: tget, tpost: tpost, money: money };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", function () { setLang(); }); else setLang();
})();
