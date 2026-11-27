const motion = matchMedia('(prefers-reduced-motion: reduce)');
const hero = document.querySelector('#hero-visual');
const desktop = matchMedia('(min-width: 1024px)');
const search = document.querySelector('#search');
const query = document.querySelector('#query');
const accessibleQuery = document.querySelector('#query-accessible');
const result = document.querySelector('#result');
const queries = [
  ['Find founder events in Miami this month', 'Founder Coffee', 'Thu, Dec 10 · Miami, FL', 'Business', '10'],
  ['Find commercial brokers in Austin, Texas', 'Maya Torres', 'Commercial broker · Austin, TX', 'Person', 'MT'],
  ['Find leadership wellness workshops in Miami', 'Mindful Leadership Workshop', 'Sat, Dec 12 · Miami, FL', 'Wellness', '12']
];
const row = (title, detail, tag = '', icon = '') =>
  '<div class="row">' + (icon ? '<span class="marker">' + icon + '</span>' : '') +
  '<div><strong>' + title + '</strong><small>' + detail + '</small></div>' +
  (tag ? '<span class="tag">' + tag + '</span>' : '') + '</div>';
const qr = '<div class="qr" role="img" aria-label="Illustrative QR pattern"><i class="px"></i><i class="px"></i><i class="px"></i><i class="px"></i><i class="px"></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i class="px"></i><i class="px"></i><i class="px"></i><i class="px"></i><i class="px"></i><i class="px"></i><i></i><i></i><i></i><i class="px"></i><i></i><i class="px"></i><i></i><i></i><i class="px"></i><i class="px"></i><i class="px"></i><i class="px"></i><i></i><i></i><i></i><i class="px"></i><i class="px"></i><i></i><i class="px"></i><i></i><i class="px"></i><i class="px"></i><i class="px"></i><i class="px"></i><i class="px"></i><i></i><i></i><i class="px"></i><i class="px"></i><i></i><i class="px"></i><i></i><i class="px"></i><i class="px"></i><i></i><i></i><i></i><i class="px"></i><i class="px"></i><i></i><i class="px"></i><i class="px"></i><i></i><i class="px"></i><i class="px"></i><i class="px"></i><i></i><i></i><i></i><i class="px"></i><i class="px"></i><i class="px"></i><i class="px"></i><i class="px"></i><i class="px"></i><i class="px"></i><i></i><i class="px"></i><i class="px"></i><i class="px"></i><i class="px"></i><i class="px"></i><i class="px"></i><i class="px"></i><i class="px"></i><i class="px"></i><i class="px"></i><i class="px"></i><i></i><i class="px"></i><i></i><i></i><i></i><i></i><i></i><i class="px"></i><i class="px"></i><i></i><i></i><i></i><i class="px"></i><i></i><i></i><i class="px"></i><i class="px"></i><i class="px"></i><i></i><i></i><i class="px"></i><i></i><i></i><i class="px"></i><i class="px"></i><i></i><i class="px"></i><i class="px"></i><i class="px"></i><i class="px"></i><i class="px"></i><i></i><i class="px"></i><i class="px"></i><i></i><i></i><i class="px"></i><i class="px"></i><i class="px"></i><i></i><i class="px"></i><i></i><i class="px"></i><i></i><i></i><i class="px"></i><i></i><i class="px"></i><i></i><i class="px"></i><i class="px"></i><i class="px"></i><i></i><i></i><i class="px"></i><i></i><i class="px"></i><i></i><i class="px"></i><i class="px"></i><i></i><i></i><i></i><i class="px"></i><i class="px"></i><i class="px"></i><i class="px"></i><i></i><i class="px"></i><i class="px"></i><i class="px"></i><i></i><i class="px"></i><i class="px"></i><i></i><i class="px"></i><i class="px"></i><i></i><i></i><i class="px"></i><i></i><i class="px"></i><i class="px"></i><i class="px"></i><i></i><i class="px"></i><i class="px"></i><i class="px"></i><i></i><i class="px"></i><i></i><i class="px"></i><i></i><i></i><i></i><i class="px"></i><i class="px"></i><i></i><i class="px"></i><i></i><i class="px"></i><i class="px"></i><i class="px"></i><i class="px"></i><i></i><i class="px"></i><i></i><i></i><i></i><i class="px"></i><i></i><i></i><i class="px"></i><i class="px"></i><i class="px"></i><i></i><i></i><i class="px"></i><i class="px"></i><i class="px"></i><i class="px"></i><i class="px"></i><i class="px"></i><i></i><i class="px"></i><i class="px"></i><i class="px"></i><i></i><i class="px"></i><i class="px"></i><i></i><i class="px"></i><i class="px"></i><i></i><i></i><i class="px"></i><i></i><i></i><i></i><i class="px"></i><i class="px"></i><i></i><i></i><i></i><i class="px"></i><i></i><i></i><i class="px"></i><i></i><i></i><i class="px"></i><i></i><i class="px"></i><i></i><i class="px"></i><i></i><i class="px"></i><i></i><i class="px"></i><i class="px"></i><i></i><i class="px"></i><i></i><i class="px"></i><i></i><i></i><i class="px"></i><i class="px"></i><i class="px"></i><i class="px"></i><i></i><i></i><i></i><i class="px"></i><i class="px"></i><i></i><i class="px"></i><i></i><i class="px"></i><i class="px"></i><i class="px"></i><i></i><i></i><i class="px"></i><i class="px"></i><i class="px"></i><i class="px"></i><i class="px"></i><i class="px"></i><i class="px"></i><i class="px"></i><i></i><i></i><i></i><i class="px"></i><i class="px"></i><i></i><i class="px"></i><i class="px"></i><i class="px"></i><i class="px"></i><i class="px"></i><i class="px"></i></div>';
const card = (variant, name, title) =>
  '<div class="cardface ' + variant + '"><div class="person"><span class="avatar">AM</span><div><strong>' +
  name + '</strong><small>' + title + '</small></div></div>' + qr + '</div>';
const metric = (n, label, tone = '') => '<div class="dash-metric ' + tone + '"><b>' + n + '</b><small>' + label + '</small></div>';
const chart = (labels, values) => '<div class="report-bars">' + labels.map((label,i) =>
  '<div><small>' + label + '</small><span style="--bar:' + (100 * values[i] / Math.max(...values)) + '%"></span><b>' + values[i] + '</b></div>').join('') + '</div>';
const initial = key => document.querySelector('[data-demo="' + key + '"]').innerHTML;
const report = (label, groups, values) => '<strong>' + label + '</strong>' + chart(groups, values);
const demos = {
  cardInsights: [initial('cardInsights'), '<div class="dash-metrics">' + metric(184,'Card views') + metric(62,'Contact saves','mint') + metric(87,'Link taps','blue') + '</div>' +
    chart(['QR','Link','NFC'],[94,57,33]) + row('Maya Torres','Card viewer · opted in','QR','MT')],
  teams: [initial('teams'), row('Digital card template','Partnerships and Sales','Locked','01') + row('Company email signature','All departments','Active','02') +
    row('Virtual background','Sales department','Locked','03'), row('API keys','Manage integration credentials','','01') + row('Webhooks','Send activity to your systems','','02') + row('SCIM','Automate user provisioning','','03')],
  roi: [initial('roi'), report('Opportunities by organizer',['Forum','Council','Guild'],[6,4,2]), report('Follow-ups by event category',['Business','Wellness'],[14,8])],
  events: ['<div class="cal-demo"><div class="cal-title"><strong>December 2026</strong><small>Miami, FL</small></div><div class="cal-days"><span class="">7</span><span class="">8</span><span class="">9</span><span class="hit">10</span><span class="">11</span><span class="hit">12</span><span class="">13</span><span class="">14</span><span class="hit">15</span><span class="">16</span><span class="">17</span><span class="">18</span><span class="">19</span><span class="">20</span></div></div><div class="row"><span class=marker>10</span><div><strong>Founder Coffee</strong><small>Thu, Dec 10 · 8:30 AM</small></div><span class=tag>Business</span></div><div class="row"><span class=marker>12</span><div><strong>Mindful Leadership Workshop</strong><small>Sat, Dec 12 · 10:00 AM</small></div><span class=tag>Wellness</span></div><div class="row"><span class=marker>15</span><div><strong>Design & Development Roundtable</strong><small>Tue, Dec 15 · 5:30 PM</small></div><span class=tag>Business</span></div>', '<div class="row"><span class=marker>10</span><div><strong>Founder Coffee</strong><small>Thu, Dec 10 · 8:30 AM</small></div><span class=tag>Business</span></div><div class="row"><span class=marker>12</span><div><strong>Mindful Leadership Workshop</strong><small>Sat, Dec 12 · 10:00 AM</small></div><span class=tag>Wellness</span></div><div class="row"><span class=marker>15</span><div><strong>Design & Development Roundtable</strong><small>Tue, Dec 15 · 5:30 PM</small></div><span class=tag>Business</span></div>', '<div class="map" role="img" aria-label="Illustrative street map of Miami"><div class="grid-map"></div><div class="water"></div><span class="maplabel">MIDTOWN</span><span class="maplabel ml2">DOWNTOWN</span><i class="pin pin1"></i><i class="pin pin2"></i><i class="pin pin3"></i></div>', row('Founder Coffee', 'Saved to My Radar · Thu, Dec 10', 'Saved', '10') +
    row('Mindful Leadership Workshop', 'Shared by Maya · Sat, Dec 12', 'Shared', '12')],
  cards: [card('', 'Alex Morgan', 'Partnerships Director'), card('alt', 'Alex Morgan', 'Business & wellness events'),
    card('alt', 'Alex Morgan', 'Dirección de alianzas')],
  crm: [document.querySelector('[data-demo="crm"]').innerHTML,
    row('Send recap to Maya', 'Venue partnership', 'Due tomorrow', '01') + row('Confirm venue shortlist', 'Workshop series', 'Upcoming', '02'),
    row('Sample architecture studio', '2 contacts · 1 open deal', '', 'AS') + row('Sample venue group', '3 contacts · 2 open deals', '', 'VG'),
    row('New leads', 'This month', '8', '01') + row('Deals won', 'This month', '2', '02')]
};
function refreshPanel(element, markup) {
  element.classList.remove('enter');
  element.innerHTML = markup;
  if (motion.matches) return;
  requestAnimationFrame(() => element.classList.add('enter'));
}
let current = 0;
let animation = 0;
let hasPlayed = false;
function playSearch(index, animate) {
  current = index;
  const run = ++animation;
  const [phrase, ...match] = queries[index];
  const show = () => {
    query.textContent = phrase;
    accessibleQuery.textContent = phrase;
    refreshPanel(result, row(...match));
  };
  if (!animate || motion.matches) {
    show();
    return;
  }
  result.style.minHeight = result.offsetHeight + 'px';
  result.innerHTML = '';
  const started = performance.now();
  function type(now) {
    if (animation !== run) return;
    if (motion.matches || now - started >= phrase.length * 22) {
      show();
      return;
    }
    query.textContent = phrase.slice(0, Math.floor((now - started) / 22));
    requestAnimationFrame(type);
  }
  requestAnimationFrame(type);
}
for (const group of document.querySelectorAll('.tabs')) {
  group.addEventListener('click', (event) => {
    const button = event.target.closest('button');
    if (!button) return;
    const index = Number(button.dataset.state);
    group.querySelector('[aria-pressed="true"]').setAttribute('aria-pressed', 'false');
    button.setAttribute('aria-pressed', 'true');
    if (group.closest('#search')) {
      hasPlayed = true;
      playSearch(index, true);
    } else {
      const target = group.closest('.mock').querySelector('[data-demo]');
      refreshPanel(target, demos[target.dataset.demo][index]);
    }
  });
}
document.querySelector('#replay').addEventListener('click', () => {
  hasPlayed = true;
  playSearch(current, true);
});
if ('IntersectionObserver' in window) {
  const reveal = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('active');
      reveal.unobserve(entry.target);
    }
  }, { threshold: .13 });
  document.querySelectorAll('.reveal,.feature-visual,.bars,.wave').forEach(el => reveal.observe(el));
  const dashboard = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('animated');
      dashboard.unobserve(entry.target);
    }
  }, { threshold: .30 });
  document.querySelectorAll('.report-bars,.dash-metrics').forEach(el => dashboard.observe(el));
  const smart = new IntersectionObserver((entries) => {
    if (!entries.some(entry => entry.isIntersecting)) return;
    if (!hasPlayed && !motion.matches) playSearch(0, true);
    hasPlayed = true;
    smart.disconnect();
  }, { threshold: .55 });
  smart.observe(search.querySelector('.mock'));
}
let scheduled = false;
function updateHero() {
  scheduled = false;
  if (!desktop.matches || motion.matches) {
    hero.style.removeProperty('--hero-scale');
    hero.style.removeProperty('--hero-y');
    return;
  }
  const progress = Math.max(0, Math.min(window.scrollY / 360, 1));
  hero.style.setProperty('--hero-scale', 1 + progress * .065);
  hero.style.setProperty('--hero-y', progress * 12 + 'px');
}
window.addEventListener('scroll', () => {
  if (scheduled) return;
  scheduled = true;
  requestAnimationFrame(updateHero);
}, { passive: true });
motion.addEventListener('change', updateHero);
desktop.addEventListener('change', updateHero);
updateHero();
const menu = document.querySelector('.mobile-nav');
menu.addEventListener('click', (event) => {
  if (event.target.closest('a')) menu.open = false;
});
menu.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    menu.open = false;
    menu.querySelector('summary').focus();
  }
});
