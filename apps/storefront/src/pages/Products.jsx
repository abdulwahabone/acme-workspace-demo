import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useCart } from '../cart.jsx';
import { categories, formatPrice, products } from '../catalog.js';
import { ProductArt } from '../components/art.jsx';

const FREE_DELIVERY_OVER = 40;

/** One badge per card, and stock always wins over the delivery nudge. */
function badgeFor(product) {
  if (product.stock === 0) {
    return { label: 'Out of stock', variant: 'out' };
  }
  if (product.stock <= 3) {
    return { label: `Only ${product.stock} left`, variant: 'low' };
  }
  if (product.price >= FREE_DELIVERY_OVER) {
    return { label: 'Free delivery', variant: 'delivery' };
  }
  return null;
}

export default function Products() {
  const [category, setCategory] = useState('All');
  const { addItem } = useCart();

  const shown = category === 'All' ? products : products.filter((p) => p.category === category);

  return (
    <section className="page">
      <header className="page__head">
        <h1 className="page__title">Filters and refills</h1>
        <p className="page__lead">
          Six things, all in stock in Sheffield unless the card says otherwise.
        </p>
      </header>

      <div className="filter-bar" role="group" aria-label="Filter by category">
        {categories.map((name) => (
          <button
            key={name}
            type="button"
            className={`chip${category === name ? ' chip--active' : ''}`}
            aria-pressed={category === name}
            onClick={() => setCategory(name)}
          >
            {name}
          </button>
        ))}
      </div>

      <p className="result-count">
        {shown.length} {shown.length === 1 ? 'product' : 'products'}
      </p>

      <ul className="card-grid">
        {shown.map((product) => {
          const badge = badgeFor(product);

          return (
          <li key={product.id} className="card">
            <Link className="card__art" to={`/products/${product.id}`}>
              <ProductArt kind={product.art} />
              {badge && <span className={`card__badge card__badge--${badge.variant}`}>{badge.label}</span>}
            </Link>

            <div className="card__body">
              <h2 className="card__name">
                <Link className="card__link" to={`/products/${product.id}`}>
                  {product.name}
                </Link>
              </h2>
              <p className="card__tagline">{product.tagline}</p>
              <p className="card__price">
                {formatPrice(product.price)}
                <span className="card__category">{product.category}</span>
              </p>
            </div>

            <div className="card__footer">
              <button
                type="button"
                className="button button--primary button--block"
                disabled={product.stock === 0}
                onClick={() => addItem(product)}
              >
                {product.stock === 0 ? 'Out of stock' : 'Add to basket'}
              </button>
            </div>
          </li>
          );
        })}
      </ul>
    </section>
  );
}
