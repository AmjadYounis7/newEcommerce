import { Link } from 'react-router-dom';
import { findProduct, imageUrl } from '../data/catalog';
import { useShop } from '../features/shop';
import { money } from '../utils/money';
import { Icon } from '../components/Icon';
import { OrderSummary } from '../components/OrderSummary';
import { EmptyState } from '../components/EmptyState';

export function Cart() {
  const { cart, dispatch } = useShop();
  const count = cart.reduce((n, line) => n + line.quantity, 0);
  return (
    <div className="wrap inner-page">
      <p className="eyebrow">
        <span className="dash" /> Your order
      </p>
      <h1 className="page-title">
        Shopping cart<span className="accent">.</span>
      </h1>
      {!cart.length ? (
        <EmptyState
          title="Your cart is empty"
          detail="Find something for your next walk, play session, or afternoon nap."
          icon="bag"
        />
      ) : (
        <div className="order-layout">
          <section aria-label="Cart items">
            <div className="cart-top">
              <strong>
                {count} {count === 1 ? 'item' : 'items'} in your cart
              </strong>
              <button
                className="plain"
                onClick={() => dispatch({ type: 'clearCart' })}
              >
                Clear cart
              </button>
            </div>
            {cart.map(({ id, quantity }) => {
              const product = findProduct(id)!;
              return (
                <article
                  className="cart-line"
                  key={id}
                  aria-label={product.name}
                >
                  <img
                    src={imageUrl(product)}
                    alt={product.name}
                    width="100"
                    height="100"
                  />
                  <div className="line-copy">
                    <p className="product-meta">{product.category}</p>
                    <h3>{product.name}</h3>
                    <p>{money(product.cents)} each</p>
                  </div>
                  <div className="quantity">
                    <button
                      aria-label={`Decrease ${product.name} quantity`}
                      disabled={quantity <= 1}
                      onClick={() =>
                        dispatch({
                          type: 'setQuantity',
                          id,
                          quantity: quantity - 1,
                        })
                      }
                    >
                      <Icon name="minus" size={14} />
                    </button>
                    <span aria-label="Quantity">{quantity}</span>
                    <button
                      aria-label={`Increase ${product.name} quantity`}
                      onClick={() =>
                        dispatch({
                          type: 'setQuantity',
                          id,
                          quantity: quantity + 1,
                        })
                      }
                    >
                      <Icon name="plus" size={14} />
                    </button>
                  </div>
                  <strong className="line-total">
                    {money(product.cents * quantity)}
                  </strong>
                  <button
                    className="icon-button remove"
                    aria-label={`Remove ${product.name} from cart`}
                    onClick={() => dispatch({ type: 'remove', id })}
                  >
                    <Icon name="trash" size={17} />
                  </button>
                </article>
              );
            })}
            <Link className="text-link back-shop" to="/products">
              Continue shopping <Icon name="arrow" size={16} />
            </Link>
          </section>
          <OrderSummary cart={cart}>
            <Link className="button primary full" to="/checkout">
              Proceed to checkout <Icon name="arrow" size={17} />
            </Link>
            <p className="summary-note">
              Delivery is $5, or free on orders of $60 or more.
            </p>
          </OrderSummary>
        </div>
      )}
    </div>
  );
}
