import { Route, Routes } from 'react-router-dom';
import { ShopProvider } from './features/shop';
import { Layout } from './components/Layout';
import { EmptyState } from './components/EmptyState';
import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { Cart } from './pages/Cart';
import { Wishlist } from './pages/Wishlist';
import { Checkout } from './pages/Checkout';

export default function App() {
  return (
    <ShopProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="cart" element={<Cart />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="checkout" element={<Checkout />} />
          <Route
            path="*"
            element={
              <div className="wrap inner-page">
                <h1 className="page-title">Page not found.</h1>
                <EmptyState
                  title="Looking for supplies?"
                  detail="Browse the shop to find your way back."
                  icon="paw"
                />
              </div>
            }
          />
        </Route>
      </Routes>
    </ShopProvider>
  );
}
