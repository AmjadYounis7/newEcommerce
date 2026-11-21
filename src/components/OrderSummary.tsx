import { findProduct } from '../data/catalog';
import type { CartLine } from '../features/shop';
import { money, orderTotals } from '../utils/money';

export function getTotals(cart: CartLine[]) {
  const subtotal = cart.reduce(
    (amount, line) => amount + findProduct(line.id)!.cents * line.quantity,
    0,
  );
  return orderTotals(subtotal);
}

export function OrderSummary({
  cart,
  listItems = false,
  children,
}: {
  cart: CartLine[];
  listItems?: boolean;
  children?: React.ReactNode;
}) {
  const { subtotal, delivery, total } = getTotals(cart);
  return (
    <aside className="summary">
      <h2>Order summary</h2>
      {listItems && (
        <ul className="receipt-lines">
          {cart.map((line) => {
            const product = findProduct(line.id)!;
            return (
              <li key={line.id}>
                <span>
                  {product.name} × {line.quantity}
                </span>
                <span>{money(product.cents * line.quantity)}</span>
              </li>
            );
          })}
        </ul>
      )}
      <dl>
        <div>
          <dt>Subtotal</dt>
          <dd>{money(subtotal)}</dd>
        </div>
        <div>
          <dt>Delivery</dt>
          <dd>{delivery ? money(delivery) : 'Free'}</dd>
        </div>
        <div className="total">
          <dt>Total</dt>
          <dd>{money(total)}</dd>
        </div>
      </dl>
      {children}
    </aside>
  );
}
