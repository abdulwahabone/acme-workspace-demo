import { Link, NavLink, Route, Routes } from 'react-router-dom';

import { CartProvider, useCart } from './cart.jsx';
import { Logo } from './components/art.jsx';
import Home from './pages/Home.jsx';
import Products from './pages/Products.jsx';
import Product from './pages/Product.jsx';
import Cart from './pages/Cart.jsx';

function Header() {
  const { count } = useCart();

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link className="brand" to="/">
          <Logo />
          <span className="brand__name">Acme Water</span>
        </Link>

        <nav className="site-nav" aria-label="Main">
          <NavLink className="site-nav__link" to="/" end>
            Home
          </NavLink>
          <NavLink className="site-nav__link" to="/products">
            Filters
          </NavLink>
        </nav>

        <Link className="cart-button" to="/cart">
          Basket
          <span className="cart-button__count">{count}</span>
        </Link>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <p className="site-footer__note">
          Acme Water is a fictional shop. Nothing here can be ordered and no payment is taken.
        </p>
        <ul className="site-footer__links">
          <li>
            <Link to="/products">All filters</Link>
          </li>
          <li>
            <Link to="/cart">Basket</Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <CartProvider>
      <div className="app">
        <Header />
        <main className="site-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:productId" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
}

function NotFound() {
  return (
    <section className="page page--narrow">
      <h1 className="page__title">That page has drained away</h1>
      <p className="page__lead">The link you followed does not match anything in the shop.</p>
      <Link className="button button--primary" to="/products">
        Back to the filters
      </Link>
    </section>
  );
}
