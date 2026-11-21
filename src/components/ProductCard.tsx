import { useEffect, useState } from 'react';
import { imageUrl, type Product } from '../data/catalog';
import { useShop } from '../features/shop';
import { money } from '../utils/money';
import { Icon } from './Icon';

export function ProductCard({ product }: { product: Product }) {
  const { wishlist, dispatch } = useShop();
  const saved = wishlist.includes(product.id);
  const [adds, setAdds] = useState(0);
  useEffect(() => {
    if (!adds) return;
    const timeout = window.setTimeout(() => setAdds(0), 1400);
    return () => window.clearTimeout(timeout);
  }, [adds]);
  return (
    <article className="product-card" aria-label={product.name}>
      <div className="product-photo">
        <img
          src={imageUrl(product)}
          alt={`${product.name}, ${product.detail}`}
          loading="lazy"
          width="414"
          height="414"
        />
        <button
          type="button"
          className={`save ${saved ? 'saved' : ''}`}
          aria-label={`Save ${product.name} to wishlist`}
          aria-pressed={saved}
          onClick={() => dispatch({ type: 'toggleSaved', id: product.id })}
        >
          <Icon name="heart" size={19} filled={saved} />
        </button>
      </div>
      <div className="product-meta">
        {product.category} <span> / </span> {product.pets.join(' & ')}
      </div>
      <div className="product-title">
        <h3>{product.name}</h3>
        <strong>{money(product.cents)}</strong>
      </div>
      <p>{product.detail}</p>
      <button
        type="button"
        className="add"
        aria-label={`Add ${product.name} to cart`}
        onClick={() => {
          dispatch({ type: 'add', id: product.id });
          setAdds((n) => n + 1);
        }}
      >
        <Icon size={15} name={adds ? 'check' : 'plus'} />
        <span aria-live="polite">{adds ? 'Added to cart' : 'Add to cart'}</span>
      </button>
    </article>
  );
}
