import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { useCart } from '../cart.jsx';
import { findProduct, formatPrice } from '../catalog.js';
import { ProductArt } from '../components/art.jsx';

export default function Product() {
  const { productId } = useParams();
  const product = findProduct(productId);
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <section className="page page--narrow">
        <h1 className="page__title">We do not make that one</h1>
        <p className="page__lead">
          There is no product with the code <code>{productId}</code>.
        </p>
        <Link className="button button--primary" to="/products">
          Back to the filters
        </Link>
      </section>
    );
  }

  const soldOut = product.stock === 0;

  function handleAdd() {
    addItem(product, quantity);
    setAdded(true);
  }

  return (
    <section className="page">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link to="/products">Filters</Link>
        <span aria-hidden="true">/</span>
        <span>{product.name}</span>
      </nav>

      <div className="detail">
        <div className={`detail__art detail__art--${product.art}`}>
          <ProductArt kind={product.art} />
        </div>

        <div className="detail__panel">
          <p className="detail__category">{product.category}</p>
          <h1 className="detail__name">{product.name}</h1>
          <p className="detail__tagline">{product.tagline}</p>
          <p className="detail__price">{formatPrice(product.price)}</p>

          <p className={`stock stock--${soldOut ? 'out' : 'in'}`}>
            {soldOut
              ? 'Out of stock, back in about three weeks'
              : `In stock, ${product.stock} ready to post`}
          </p>

          <div className="buy">
            <label className="buy__label" htmlFor="quantity">
              Quantity
            </label>
            <select
              id="quantity"
              className="buy__select"
              value={quantity}
              disabled={soldOut}
              onChange={(event) => setQuantity(Number(event.target.value))}
            >
              {[1, 2, 3, 4, 5].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
            <button
              type="button"
              className="button button--primary"
              disabled={soldOut}
              onClick={handleAdd}
            >
              Add to basket
            </button>
          </div>

          {added && (
            <p className="buy__confirmation" role="status">
              Added. <Link to="/cart">Go to the basket</Link>
            </p>
          )}

          <p className="detail__description">{product.description}</p>
        </div>
      </div>

      <div className="detail__more">
        <section>
          <h2 className="detail__subtitle">Specification</h2>
          <dl className="spec-list">
            {product.specs.map((spec) => (
              <div key={spec.label} className="spec-list__row">
                <dt>{spec.label}</dt>
                <dd>{spec.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section>
          <h2 className="detail__subtitle">In the box</h2>
          <ul className="box-list">
            {product.inTheBox.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="detail__aside">
            Cartridges last about {product.cartridgeMonths} months in a two person house.
          </p>
        </section>
      </div>
    </section>
  );
}
