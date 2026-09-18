/*
 * The whole template layer: tagged template strings and two page shells.
 * No template engine, so what you read here is what the browser receives.
 */

export function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

const head = (title) => `
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(title)} — Acme Water order desk</title>
    <link rel="stylesheet" href="/tokens.css" />
    <link rel="stylesheet" href="/styles.css" />`;

const sidebarLinks = [
  { href: '/orders', label: 'Orders', ready: true },
  { label: 'Customers', ready: false },
  { label: 'Stock', ready: false },
  { label: 'Refunds', ready: false },
];

function sidebar(active) {
  const items = sidebarLinks
    .map((link) => {
      if (!link.ready) {
        return `<li class="nav__item nav__item--soon">${escapeHtml(link.label)}<span class="nav__tag">soon</span></li>`;
      }
      const current = link.href === active ? ' nav__link--current' : '';
      return `<li class="nav__item"><a class="nav__link${current}" href="${link.href}">${escapeHtml(link.label)}</a></li>`;
    })
    .join('\n          ');

  return `<aside class="sidebar">
        <div class="sidebar__brand">
          <span class="sidebar__mark">AW</span>
          <span>
            <strong class="sidebar__name">Acme Water</strong>
            <span class="sidebar__role">Order desk</span>
          </span>
        </div>
        <nav aria-label="Sections">
          <ul class="nav">
          ${items}
          </ul>
        </nav>
        <p class="sidebar__foot">Demo data only. Nothing here is a real order.</p>
      </aside>`;
}

/** The signed-in shell: sidebar on the left, topbar and content on the right. */
export function layout({ title, active, heading, actions = '', body }) {
  return `<!doctype html>
<html lang="en">
  <head>${head(title)}
  </head>
  <body class="desk">
    <div class="shell">
      ${sidebar(active)}
      <div class="content">
        <header class="topbar">
          <h1 class="topbar__title">${escapeHtml(heading)}</h1>
          <div class="topbar__actions">${actions}</div>
        </header>
        <main class="main">
${body}
        </main>
      </div>
    </div>
  </body>
</html>
`;
}

/** The signed-out shell: one centred card, no navigation to get lost in. */
export function authLayout({ title, body }) {
  return `<!doctype html>
<html lang="en">
  <head>${head(title)}
  </head>
  <body class="auth">
    <main class="auth__panel">
${body}
    </main>
  </body>
</html>
`;
}

const statusClasses = {
  'Awaiting payment': 'pill--waiting',
  Paid: 'pill--paid',
  Packing: 'pill--packing',
  Shipped: 'pill--shipped',
  Refunded: 'pill--refunded',
};

export function statusPill(status) {
  const variant = statusClasses[status] ?? 'pill--paid';
  return `<span class="pill ${variant}">${escapeHtml(status)}</span>`;
}
