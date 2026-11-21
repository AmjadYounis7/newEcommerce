import { products } from '../data/catalog';
import { useShop } from '../features/shop';
import { ProductCard } from '../components/ProductCard';
import { EmptyState } from '../components/EmptyState';

export function Wishlist() {
  const { wishlist } = useShop();
  const saved = products.filter((product) => wishlist.includes(product.id));
  return (
    <div className="wrap inner-page">
      <p className="eyebrow">
        <span className="dash" /> Saved supplies
      </p>
      <h1 className="page-title">
        Your wishlist<span className="accent">.</span>
      </h1>
      {saved.length ? (
        <div className="product-grid">
          {saved.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="Your wishlist is empty"
          detail="Tap the heart on any product to save it here for later."
          icon="heart"
        />
      )}
    </div>
  );
}
