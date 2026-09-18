import {
  formatMoney,
  itemCountOf,
  statuses,
  subtotalOf,
  totalOf,
} from './orders.js';
import { authLayout, escapeHtml, layout, statusPill } from './templates.js';

const dateFormat = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
});

function formatDate(iso) {
  return dateFormat.format(new Date(`${iso}T00:00:00Z`));
}

export function signInPage({ email = '' } = {}) {
  return authLayout({
    title: 'Sign in',
    body: `      <div class="auth__brand">
        <span class="sidebar__mark">AW</span>
        <span class="auth__title">Acme Water order desk</span>
      </div>
      <p class="auth__lead">
        Sign in to see today's orders. This is a demo: any address and any
        password will get you in, and nothing is stored.
      </p>
      <form class="form" method="post" action="/sign-in">
        <div class="field">
          <label class="field__label" for="email">Work email</label>
          <input
            class="field__input"
            id="email"
            name="email"
            type="email"
            value="${escapeHtml(email)}"
            placeholder="you@acmewater.example"
            autocomplete="username"
            required
          />
        </div>
        <div class="field">
          <label class="field__label" for="password">Password</label>
          <input
            class="field__input"
            id="password"
            name="password"
            type="password"
            placeholder="anything at all"
            autocomplete="current-password"
            required
          />
          <p class="field__hint">Any value is accepted. There is no account behind this form.</p>
        </div>
        <button class="btn btn--primary btn--block" type="submit">Sign in</button>
      </form>
      <p class="auth__foot">Trouble signing in? There is nothing to fix; it is a demo.</p>`,
  });
}

export function ordersPage({ shown, status, query }) {
  const value = shown.reduce((total, order) => total + totalOf(order), 0);

  const options = ['All', ...statuses]
    .map(
      (name) =>
        `<option value="${escapeHtml(name)}"${name === status ? ' selected' : ''}>${escapeHtml(name)}</option>`,
    )
    .join('\n              ');

  const rows = shown
    .map(
      (order) => `            <tr>
              <td><a class="table__link" href="/orders/${encodeURIComponent(order.id)}">${escapeHtml(order.id)}</a></td>
              <td>
                <span class="table__strong">${escapeHtml(order.customer)}</span>
                <span class="table__sub">${escapeHtml(order.city)}</span>
              </td>
              <td>${escapeHtml(formatDate(order.placed))}</td>
              <td>${escapeHtml(order.channel)}</td>
              <td class="table__number">${itemCountOf(order)}</td>
              <td class="table__number">${escapeHtml(formatMoney(totalOf(order)))}</td>
              <td>${statusPill(order.status)}</td>
            </tr>`,
    )
    .join('\n');

  const empty = `            <tr>
              <td class="table__empty" colspan="7">
                <strong>No orders match that filter.</strong>
                <span>Try another status, or <a href="/orders">clear the filter</a>.</span>
              </td>
            </tr>`;

  return layout({
    title: 'Orders',
    active: '/orders',
    heading: 'Orders',
    actions: '<a class="btn btn--quiet" href="/sign-in">Sign out</a>',
    body: `          <div class="stat-row">
            <div class="stat">
              <span class="stat__label">Orders shown</span>
              <span class="stat__value">${shown.length}</span>
            </div>
            <div class="stat">
              <span class="stat__label">Value</span>
              <span class="stat__value">${escapeHtml(formatMoney(value))}</span>
            </div>
            <div class="stat">
              <span class="stat__label">Oldest open</span>
              <span class="stat__value">ACM-1039</span>
            </div>
          </div>

          <form class="filters" method="get" action="/orders">
            <div class="field field--inline">
              <label class="field__label" for="status">Status</label>
              <select class="field__input" id="status" name="status">
              ${options}
              </select>
            </div>
            <div class="field field--inline field--grow">
              <label class="field__label" for="q">Order or customer</label>
              <input
                class="field__input"
                id="q"
                name="q"
                type="search"
                value="${escapeHtml(query)}"
                placeholder="ACM-1042 or Bluefin"
              />
            </div>
            <button class="btn btn--primary" type="submit">Filter</button>
            <a class="btn btn--quiet" href="/orders">Clear</a>
          </form>

          <table class="table">
            <thead>
              <tr>
                <th scope="col">Order</th>
                <th scope="col">Customer</th>
                <th scope="col">Placed</th>
                <th scope="col">Channel</th>
                <th scope="col" class="table__number">Items</th>
                <th scope="col" class="table__number">Total</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
${shown.length === 0 ? empty : rows}
            </tbody>
          </table>`,
  });
}

export function orderDetailPage(order) {
  const lines = order.lines
    .map(
      (line) => `            <tr>
              <td class="table__mono">${escapeHtml(line.sku)}</td>
              <td class="table__strong">${escapeHtml(line.name)}</td>
              <td class="table__number">${line.quantity}</td>
              <td class="table__number">${escapeHtml(formatMoney(line.unitPrice))}</td>
              <td class="table__number">${escapeHtml(formatMoney(line.unitPrice * line.quantity))}</td>
            </tr>`,
    )
    .join('\n');

  const timeline = order.timeline
    .map(
      (event) => `              <li class="timeline__item">
                <span class="timeline__at">${escapeHtml(event.at)}</span>
                <span class="timeline__label">${escapeHtml(event.label)}</span>
              </li>`,
    )
    .join('\n');

  const note = order.note
    ? `          <div class="callout">
            <strong class="callout__title">Note from the customer</strong>
            <p class="callout__body">${escapeHtml(order.note)}</p>
          </div>`
    : `          <div class="callout callout--quiet">
            <strong class="callout__title">No note</strong>
            <p class="callout__body">The customer did not leave delivery instructions.</p>
          </div>`;

  return layout({
    title: `Order ${order.id}`,
    active: '/orders',
    heading: `Order ${order.id}`,
    actions: `<a class="btn btn--quiet" href="/orders">Back to orders</a>
            <button class="btn btn--primary" type="button" disabled>Mark as shipped</button>`,
    body: `          <div class="detail-head">
            <div>
              <span class="detail-head__customer">${escapeHtml(order.customer)}</span>
              <span class="detail-head__meta">${escapeHtml(order.channel)} order, placed ${escapeHtml(formatDate(order.placed))}</span>
            </div>
            ${statusPill(order.status)}
          </div>

          <div class="stat-row">
            <div class="stat">
              <span class="stat__label">Items</span>
              <span class="stat__value">${itemCountOf(order)}</span>
            </div>
            <div class="stat">
              <span class="stat__label">Goods</span>
              <span class="stat__value">${escapeHtml(formatMoney(subtotalOf(order)))}</span>
            </div>
            <div class="stat">
              <span class="stat__label">Delivery</span>
              <span class="stat__value">${order.delivery === 0 ? 'Free' : escapeHtml(formatMoney(order.delivery))}</span>
            </div>
            <div class="stat stat--total">
              <span class="stat__label">Total</span>
              <span class="stat__value">${escapeHtml(formatMoney(totalOf(order)))}</span>
            </div>
          </div>

          <table class="table">
            <thead>
              <tr>
                <th scope="col">SKU</th>
                <th scope="col">Product</th>
                <th scope="col" class="table__number">Qty</th>
                <th scope="col" class="table__number">Unit</th>
                <th scope="col" class="table__number">Line</th>
              </tr>
            </thead>
            <tbody>
${lines}
            </tbody>
          </table>

          <div class="panels">
            <section class="panel">
              <h2 class="panel__title">History</h2>
              <ol class="timeline">
${timeline}
              </ol>
            </section>

            <section class="panel">
              <h2 class="panel__title">Deliver to</h2>
              <address class="address">${order.address.map((line) => escapeHtml(line)).join('<br />')}</address>
${note}
            </section>
          </div>`,
  });
}

export function notFoundPage(path) {
  return layout({
    title: 'Not found',
    active: '/orders',
    heading: 'Not found',
    actions: '<a class="btn btn--quiet" href="/orders">Back to orders</a>',
    body: `          <div class="callout">
            <strong class="callout__title">Nothing at ${escapeHtml(path)}</strong>
            <p class="callout__body">The order desk has three pages: sign in, orders, and one order.</p>
          </div>`,
  });
}
