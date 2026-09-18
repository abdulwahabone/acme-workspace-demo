/*
 * Invented orders for invented shops. There is no database behind the order
 * desk: this array is the whole data layer.
 */

export const statuses = ['Awaiting payment', 'Paid', 'Packing', 'Shipped', 'Refunded'];

export const orders = [
  {
    id: 'ACM-1042',
    customer: 'Bluefin Cafe',
    city: 'Sheffield',
    placed: '2026-09-15',
    channel: 'Web',
    status: 'Packing',
    lines: [
      { sku: 'UND-DUO', name: 'Undersink Duo', quantity: 1, unitPrice: 189 },
      { sku: 'CAS-6PK', name: 'Cascade Cartridges, six pack', quantity: 2, unitPrice: 42 },
    ],
    delivery: 0,
    address: ['Bluefin Cafe', '18 Fitzalan Yard', 'Sheffield S1 2HT'],
    note: 'Deliver before 10am, the kitchen is closed after that.',
    timeline: [
      { at: '15 Sep, 09:12', label: 'Order placed on the web shop' },
      { at: '15 Sep, 09:13', label: 'Payment captured' },
      { at: '16 Sep, 08:40', label: 'Picked, waiting on a courier slot' },
    ],
  },
  {
    id: 'ACM-1041',
    customer: 'Northgate Dental',
    city: 'Leeds',
    placed: '2026-09-15',
    channel: 'Phone',
    status: 'Paid',
    lines: [{ sku: 'TAP-CLP', name: 'Tap Clip', quantity: 4, unitPrice: 26 }],
    delivery: 3.95,
    address: ['Northgate Dental', '2 Northgate Road', 'Leeds LS2 8PQ'],
    note: 'Invoice to the practice, not the surgery.',
    timeline: [
      { at: '15 Sep, 14:02', label: 'Order taken by phone' },
      { at: '15 Sep, 14:20', label: 'Payment captured' },
    ],
  },
  {
    id: 'ACM-1040',
    customer: 'Willow Lane Bakery',
    city: 'Manchester',
    placed: '2026-09-14',
    channel: 'Web',
    status: 'Shipped',
    lines: [
      { sku: 'RIP-PIT', name: 'Ripple Pitcher', quantity: 2, unitPrice: 34 },
      { sku: 'CAS-6PK', name: 'Cascade Cartridges, six pack', quantity: 1, unitPrice: 42 },
    ],
    delivery: 0,
    address: ['Willow Lane Bakery', '77 Willow Lane', 'Manchester M4 1HN'],
    note: '',
    timeline: [
      { at: '14 Sep, 11:35', label: 'Order placed on the web shop' },
      { at: '14 Sep, 11:36', label: 'Payment captured' },
      { at: '15 Sep, 16:05', label: 'Shipped, tracking TT-4419-QQ' },
    ],
  },
  {
    id: 'ACM-1039',
    customer: 'Harbour View Studios',
    city: 'Hull',
    placed: '2026-09-13',
    channel: 'Web',
    status: 'Awaiting payment',
    lines: [{ sku: 'WHG-MAIN', name: 'Whole Home Guard', quantity: 1, unitPrice: 249 }],
    delivery: 0,
    address: ['Harbour View Studios', 'Unit 6, Dock Street', 'Hull HU1 3DZ'],
    note: 'Bank transfer promised for Friday.',
    timeline: [
      { at: '13 Sep, 17:48', label: 'Order placed on the web shop' },
      { at: '13 Sep, 17:49', label: 'Invoice emailed, awaiting transfer' },
    ],
  },
  {
    id: 'ACM-1038',
    customer: 'Pelham Row Guesthouse',
    city: 'York',
    placed: '2026-09-12',
    channel: 'Web',
    status: 'Shipped',
    lines: [{ sku: 'RIP-PIT', name: 'Ripple Pitcher', quantity: 6, unitPrice: 34 }],
    delivery: 0,
    address: ['Pelham Row Guesthouse', '4 Pelham Row', 'York YO1 9QL'],
    note: 'One jug per room, so six.',
    timeline: [
      { at: '12 Sep, 08:04', label: 'Order placed on the web shop' },
      { at: '12 Sep, 08:05', label: 'Payment captured' },
      { at: '12 Sep, 15:40', label: 'Shipped, tracking TT-4392-KB' },
    ],
  },
  {
    id: 'ACM-1037',
    customer: 'Ravenswood Allotments',
    city: 'Sheffield',
    placed: '2026-09-11',
    channel: 'Market stall',
    status: 'Refunded',
    lines: [{ sku: 'CAR-MIN', name: 'Carafe Mini', quantity: 3, unitPrice: 19 }],
    delivery: 3.95,
    address: ['Ravenswood Allotments', 'Site hut, Ravenswood Road', 'Sheffield S6 4AB'],
    note: 'Two carafes arrived chipped. Refunded in full.',
    timeline: [
      { at: '11 Sep, 10:20', label: 'Sold at the Sharrow market stall' },
      { at: '12 Sep, 09:15', label: 'Breakage reported' },
      { at: '12 Sep, 09:50', label: 'Refunded in full' },
    ],
  },
  {
    id: 'ACM-1036',
    customer: 'Old Mill Pottery',
    city: 'Derby',
    placed: '2026-09-10',
    channel: 'Web',
    status: 'Shipped',
    lines: [
      { sku: 'TAP-CLP', name: 'Tap Clip', quantity: 1, unitPrice: 26 },
      { sku: 'CAR-MIN', name: 'Carafe Mini', quantity: 2, unitPrice: 19 },
    ],
    delivery: 3.95,
    address: ['Old Mill Pottery', 'The Old Mill, Duffield Road', 'Derby DE22 1JH'],
    note: '',
    timeline: [
      { at: '10 Sep, 19:22', label: 'Order placed on the web shop' },
      { at: '10 Sep, 19:23', label: 'Payment captured' },
      { at: '11 Sep, 12:10', label: 'Shipped, tracking TT-4361-MD' },
    ],
  },
  {
    id: 'ACM-1035',
    customer: 'Greenhill Community Kitchen',
    city: 'Sheffield',
    placed: '2026-09-09',
    channel: 'Phone',
    status: 'Paid',
    lines: [
      { sku: 'UND-DUO', name: 'Undersink Duo', quantity: 2, unitPrice: 189 },
      { sku: 'CAS-6PK', name: 'Cascade Cartridges, six pack', quantity: 3, unitPrice: 42 },
    ],
    delivery: 0,
    address: ['Greenhill Community Kitchen', 'Greenhill Parkway', 'Sheffield S8 7TQ'],
    note: 'Fitting booked for the 24th.',
    timeline: [
      { at: '9 Sep, 13:11', label: 'Order taken by phone' },
      { at: '9 Sep, 13:40', label: 'Payment captured' },
    ],
  },
];

const money = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' });

export function formatMoney(amount) {
  return money.format(amount);
}

export function subtotalOf(order) {
  return order.lines.reduce((total, line) => total + line.unitPrice * line.quantity, 0);
}

export function totalOf(order) {
  return subtotalOf(order) + order.delivery;
}

export function itemCountOf(order) {
  return order.lines.reduce((total, line) => total + line.quantity, 0);
}

export function findOrder(id) {
  return orders.find((order) => order.id === id);
}

export function filterOrders({ status = 'All', query = '' } = {}) {
  const needle = query.trim().toLowerCase();
  return orders.filter((order) => {
    const statusMatches = status === 'All' || order.status === status;
    const queryMatches =
      needle === '' ||
      order.id.toLowerCase().includes(needle) ||
      order.customer.toLowerCase().includes(needle);
    return statusMatches && queryMatches;
  });
}
