import { useEffect, useRef, useState } from 'react';
import { Link, Outlet, useLocation, useNavigationType } from 'react-router-dom';
import { useShop } from '../features/shop';
import { Icon } from './Icon';

function Brand() {
  return (
    <Link to="/" className="brand" aria-label="Pip & Paw home">
      <span className="brand-icon">
        <Icon name="paw" size={28} />
      </span>
      <span>
        Pip <i>&amp;</i> Paw<small>Pet Supply Co.</small>
      </span>
    </Link>
  );
}

export function Layout() {
  const { cart, wishlist } = useShop();
  const quantity = cart.reduce((total, line) => total + line.quantity, 0);
  const { pathname, search } = useLocation();
  const pet = new URLSearchParams(search).get('pet');
  const [open, setOpen] = useState(false);
  const main = useRef<HTMLElement>(null);
  const lastPath = useRef(pathname);
  const navigation = useNavigationType();

  useEffect(() => {
    setOpen(false);
    if (lastPath.current !== pathname) {
      lastPath.current = pathname;
      main.current?.focus({ preventScroll: true });
      if (navigation !== 'POP') window.scrollTo(0, 0);
    }
    const page =
      pathname === '/'
        ? 'Pet Supply Co.'
        : pathname.slice(1).replace(/^./, (c) => c.toUpperCase());
    document.title = `Pip & Paw | ${page}`;
  }, [pathname, search, navigation]);

  const links = [
    { to: '/', text: 'Home', active: pathname === '/' },
    {
      to: '/products',
      text: 'Shop all',
      active: pathname === '/products' && !pet,
    },
    {
      to: '/products?pet=Dogs',
      text: 'For dogs',
      active: pathname === '/products' && pet === 'Dogs',
    },
    {
      to: '/products?pet=Cats',
      text: 'For cats',
      active: pathname === '/products' && pet === 'Cats',
    },
  ];
  return (
    <>
      <a
        className="skip"
        href="#main-content"
        onClick={(event) => {
          event.preventDefault();
          main.current?.focus();
        }}
      >
        Skip to content
      </a>
      <div className="notice">
        <Icon name="truck" size={16} /> Free delivery on orders $60 and up
      </div>
      <header className="header">
        <div className="wrap header-inner">
          <Brand />
          <nav
            id="main-nav"
            aria-label="Main navigation"
            className={open ? 'nav is-open' : 'nav'}
          >
            {links.map((link) => (
              <Link
                key={link.text}
                to={link.to}
                aria-current={link.active ? 'page' : undefined}
                onClick={() => setOpen(false)}
              >
                {link.text}
              </Link>
            ))}
          </nav>
          <div className="actions">
            <Link
              to="/wishlist"
              className="action"
              aria-label={`Wishlist, ${wishlist.length} saved`}
            >
              <Icon name="heart" />
              <span>{wishlist.length}</span>
            </Link>
            <Link
              to="/cart"
              className="action"
              aria-label={`Cart, ${quantity} ${quantity === 1 ? 'item' : 'items'}`}
            >
              <Icon name="bag" />
              <span>{quantity}</span>
            </Link>
            <button
              type="button"
              className="menu icon-button"
              aria-label={open ? 'Close navigation' : 'Open navigation'}
              aria-expanded={open}
              aria-controls="main-nav"
              onClick={() => setOpen(!open)}
            >
              <Icon name={open ? 'close' : 'menu'} />
            </button>
          </div>
        </div>
      </header>
      <main id="main-content" ref={main} tabIndex={-1}>
        <Outlet />
      </main>
      <footer>
        <div className="wrap footer-inner">
          <Brand />
          <span className="footer-note">
            Everyday supplies for dogs &amp; cats.
          </span>
          <nav aria-label="Footer">
            <Link to="/products">Shop all</Link>
            <Link to="/wishlist">Wishlist</Link>
            <Link to="/cart">Cart</Link>
          </nav>
        </div>
      </footer>
    </>
  );
}
