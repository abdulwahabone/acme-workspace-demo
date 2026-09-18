/*
 * The whole shop. Invented products, invented prices, no back end: the list
 * below is the only source of product data in the app.
 */

export const products = [
  {
    id: 'ripple-pitcher',
    name: 'Ripple Pitcher',
    category: 'Jugs',
    art: 'pitcher',
    tagline: 'A 2.4 litre jug that fits a fridge door shelf.',
    price: 34,
    stock: 18,
    cartridgeMonths: 2,
    description:
      'The Ripple sits in the fridge door and filters as you pour, so there is no waiting for a tank to drain. The lid comes off in one piece for washing and the cartridge clicks in without tools.',
    specs: [
      { label: 'Capacity', value: '2.4 litres' },
      { label: 'Cartridge life', value: '150 litres, about 2 months' },
      { label: 'Filters', value: 'Chlorine, sediment, limescale' },
      { label: 'Materials', value: 'Recycled copolyester, no BPA' },
    ],
    inTheBox: ['Ripple jug and lid', 'One Cascade cartridge', 'Fridge label with change date'],
  },
  {
    id: 'tap-clip',
    name: 'Tap Clip',
    category: 'Taps',
    art: 'tap',
    tagline: 'Clips onto a standard kitchen tap in about a minute.',
    price: 26,
    stock: 3,
    cartridgeMonths: 3,
    description:
      'A small housing that clamps to the spout and switches between filtered and unfiltered water. It fits taps between 16 and 24 mm, which covers most kitchen mixers.',
    specs: [
      { label: 'Fits', value: 'Spouts 16 mm to 24 mm' },
      { label: 'Flow', value: '1.6 litres per minute' },
      { label: 'Cartridge life', value: '400 litres, about 3 months' },
      { label: 'Fitting', value: 'Hand tight, no plumber' },
    ],
    inTheBox: ['Tap Clip housing', 'Two rubber collars', 'One Cascade Mini cartridge'],
  },
  {
    id: 'undersink-duo',
    name: 'Undersink Duo',
    category: 'Undersink',
    art: 'undersink',
    tagline: 'Two stages under the counter, one dedicated tap.',
    price: 189,
    stock: 6,
    cartridgeMonths: 12,
    description:
      'A sediment stage and a carbon block stage feed a separate drinking tap, so the main mixer keeps full pressure. Designed for cafes and busy kitchens that get through a lot of water.',
    specs: [
      { label: 'Stages', value: 'Sediment 5 micron, carbon block 0.5 micron' },
      { label: 'Cartridge life', value: '6,000 litres, about 12 months' },
      { label: 'Tap', value: 'Brushed steel, 35 mm hole' },
      { label: 'Fitting', value: 'Push fit, 15 minutes' },
    ],
    inTheBox: ['Two filter housings', 'Drinking tap and hoses', 'Wall bracket and screws'],
  },
  {
    id: 'carafe-mini',
    name: 'Carafe Mini',
    category: 'Jugs',
    art: 'carafe',
    tagline: 'A one litre carafe for a desk or a small table.',
    price: 19,
    stock: 0,
    cartridgeMonths: 2,
    description:
      'The smallest thing we make. One litre of filtered water, a cork lid, and a shape that does not look out of place on a dinner table.',
    specs: [
      { label: 'Capacity', value: '1 litre' },
      { label: 'Cartridge life', value: '100 litres, about 2 months' },
      { label: 'Materials', value: 'Borosilicate glass, cork' },
      { label: 'Dishwasher', value: 'Glass yes, lid no' },
    ],
    inTheBox: ['Carafe and cork lid', 'One Cascade Mini cartridge'],
  },
  {
    id: 'cascade-cartridges',
    name: 'Cascade Cartridges, six pack',
    category: 'Refills',
    art: 'cartridge',
    tagline: 'A year of refills for the Ripple Pitcher.',
    price: 42,
    stock: 64,
    cartridgeMonths: 2,
    description:
      'Six Cascade cartridges in recyclable card, no plastic tray. Fits the Ripple Pitcher; the Carafe Mini and the Tap Clip take the Mini instead.',
    specs: [
      { label: 'Pack size', value: 'Six cartridges' },
      { label: 'Fits', value: 'Ripple Pitcher' },
      { label: 'Life each', value: '150 litres, about 2 months' },
      { label: 'Packaging', value: 'Card, recyclable' },
    ],
    inTheBox: ['Six cartridges', 'Six fridge labels'],
  },
  {
    id: 'whole-home-guard',
    name: 'Whole Home Guard',
    category: 'Undersink',
    art: 'guard',
    tagline: 'Limescale protection for the incoming main.',
    price: 249,
    stock: 4,
    cartridgeMonths: 24,
    description:
      'Fits on the rising main and treats every outlet in the house. Aimed at hard water areas where kettles and boilers scale up within months.',
    specs: [
      { label: 'Fits', value: '15 mm and 22 mm main' },
      { label: 'Cartridge life', value: 'About 24 months' },
      { label: 'Treats', value: 'Limescale, sediment' },
      { label: 'Fitting', value: 'Plumber recommended' },
    ],
    inTheBox: ['Guard body and bracket', 'One scale cartridge', 'Isolation valves'],
  },
];

export const categories = ['All', 'Jugs', 'Taps', 'Undersink', 'Refills'];

export function findProduct(id) {
  return products.find((product) => product.id === id);
}

const priceFormat = new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'GBP',
  minimumFractionDigits: 2,
});

export function formatPrice(amount) {
  return priceFormat.format(amount);
}
