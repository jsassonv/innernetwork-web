/* Hosted events pages: shared pieces (the event-mail function's address, Spanish, escaping, the event's facts). */
(function () {
  var FN = "https://dwfuvfcjptvycqyedetb.supabase.co/functions/v1/event-mail";
  var SPANISH = /^es\b/i.test(navigator.language || "");
  var ES = {
    "Loading…": "Cargando…", "Going": "Voy", "Maybe": "Quizás", "Can't go": "No puedo", "invited you": "te invitó",
    "When": "Cuándo", "Where": "Dónde", "Hosted by": "Organiza", "Details": "Detalles", "What to know": "Lo que debes saber",
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
    "This event has ended.": "Este evento ya terminó."
  };
  var EN = {
    consent: "I agree to share these details with this event's hosts. Inner Network keeps them only for this event. ",
    sms: "Text me reminders about this event. Message rates may apply. Reply STOP to opt out."
  };
  function t(k) { return (SPANISH ? ES[k] : EN[k]) || k; }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  var ICON = {
    cal: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
    person: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>',
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
  function facts(e) {
    var online = https(e.online_url);
    return '<ul class="facts">' +
      '<li>' + ICON.cal + '<span><strong>' + esc(e.when.date) + '</strong><small>' + esc(e.when.time) + '</small></span></li>' +
      (e.place ? '<li>' + ICON.pin + '<span><strong>' + esc(e.venue_name || e.place) + '</strong>' + (e.venue_address && e.venue_name ? '<small>' + esc(e.venue_address) + '</small>' : '') +
        (online ? '<small><a href="' + esc(online) + '" target="_blank" rel="noopener noreferrer">' + esc(online.replace(/^https:\/\//, "")) + '</a></small>' : '') + '</span></li>' : '') +
      (e.hosts && e.hosts.length ? '<li>' + ICON.person + '<span><small>' + t("Hosted by") + '</small><strong>' + esc(hostNames(e.hosts)) + '</strong></span></li>' : '') +
      (e.headcount ? '<li>' + ICON.people + '<span><small>' + t("Headcount") + '</small><strong>' + esc(e.headcount) + ' ' + t("people") + '</strong></span></li>' : '') +
      '</ul>';
  }
  function details(e) {
    return (e.description ? '<section class="panel"><h2>' + t("Details") + '</h2><p class="text">' + esc(e.description) + '</p></section>' : '') +
      (e.requirements ? '<section class="panel"><h2>' + t("What to know") + '</h2><p class="text">' + esc(e.requirements) + '</p>' +
        (e.cancellation_policy ? '<p class="note" style="margin-top:10px">' + t("Cancellation policy") + ': ' + esc(e.cancellation_policy) + '</p>' : '') + '</section>' : '');
  }
  function post(query, body) {
    return fetch(FN + query, { method: "POST", headers: { "Content-Type": "text/plain" }, body: JSON.stringify(body || {}) })
      .then(function (r) { return r.json().then(function (b) { return { ok: r.ok, status: r.status, body: b }; }); });
  }
  function get(query) { return fetch(FN + query).then(function (r) { return r.json().then(function (b) { return { ok: r.ok, status: r.status, body: b }; }); }); }
  function fail(msg) { var m = document.getElementById("main"); m.innerHTML = '<p class="status">' + esc(msg || t("This page isn't available.")) + '</p>'; }

  document.documentElement.lang = SPANISH ? "es" : "en";
  window.HOSTED = { FN: FN, t: t, esc: esc, flyer: flyer, facts: facts, details: details, post: post, get: get, fail: fail, hostNames: hostNames, accent: accent, SPANISH: SPANISH };
})();
