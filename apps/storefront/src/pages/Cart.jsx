import { Link } from 'react-router-dom';

import { useCart } from '../cart.jsx';
import { formatPrice } from '../catalog.js';

const DELIVERY = 3.95;
const FREE_DELIVERY_OVER = 40;

export default function Cart() {
  const { lines, setQuantity, removeItem, subtotal } = useCart();
  const delivery = subtotal >= FREE_DELIVERY_OVER ? 0 : DELIVERY;

  return (
    <section className="page">
      <header className="page__head">
        <h1 className="page__title">Your basket</h1>
        <p className="page__lead">Nothing is charged. This shop is a demo.</p>
      </header>

      <div className="basket">
        <table className="basket__table">
          <thead>
            <tr>
              <th scope="col">Item</th>
              <th scope="col">Quantity</th>
              <th scope="col">Price</th>
              <th scope="col">
                <span className="visually-hidden">Remove</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {lines.map((line) => (
              <tr key={line.id}>
                <td>
                  <Link className="basket__name" to={`/products/${line.id}`}>
                    {line.name}
                  </Link>
                </td>
                <td>
                  <div className="stepper">
                    <button
                      type="button"
                      className="stepper__button"
                      aria-label={`One fewer ${line.name}`}
                      onClick={() => setQuantity(line.id, line.quantity - 1)}
                    >
                      &minus;
                    </button>
                    <span className="stepper__value">{line.quantity}</span>
                    <button
                      type="button"
                      className="stepper__button"
                      aria-label={`One more ${line.name}`}
                      onClick={() => setQuantity(line.id, line.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className="basket__price">{formatPrice(line.price * line.quantity)}</td>
                <td>
                  <button
                    type="button"
                    className="link-button"
                    onClick={() => removeItem(line.id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <aside className="summary">
          <h2 className="summary__title">Summary</h2>
          <dl className="summary__rows">
            <div className="summary__row">
              <dt>Subtotal</dt>
              <dd>{formatPrice(subtotal)}</dd>
            </div>
            <div className="summary__row">
              <dt>Delivery</dt>
              <dd>{delivery === 0 ? 'Free' : formatPrice(delivery)}</dd>
            </div>
            <div className="summary__row summary__row--total">
              <dt>Total</dt>
              <dd>{formatPrice(subtotal + delivery)}</dd>
            </div>
          </dl>
          <button type="button" className="button button--primary button--block" disabled>
            Checkout
          </button>
          <p className="summary__note">
            Checkout is switched off. Add £{FREE_DELIVERY_OVER} of filters for free delivery.
          </p>
        </aside>
      </div>
    </section>
  );
}
