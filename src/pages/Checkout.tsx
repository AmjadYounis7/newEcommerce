import { useRef, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useShop, type CartLine } from '../features/shop';
import {
  blankDelivery,
  fields,
  validateDelivery,
  type DeliveryField,
  type Errors,
} from '../features/delivery';
import { OrderSummary } from '../components/OrderSummary';
import { EmptyState } from '../components/EmptyState';
import { Icon } from '../components/Icon';

type Receipt = { reference: string; lines: CartLine[] };

export function Checkout() {
  const { cart, dispatch } = useShop();
  const [delivery, setDelivery] = useState({ ...blankDelivery });
  const [errors, setErrors] = useState<Errors>({});
  const [receipt, setReceipt] = useState<Receipt | null>(null);
  const form = useRef<HTMLFormElement>(null);

  function placeOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!cart.length || receipt) return;
    const nextErrors = validateDelivery(delivery);
    setErrors(nextErrors);
    const invalid = fields.find((field) => nextErrors[field.name]);
    if (invalid) {
      form.current
        ?.querySelector<HTMLInputElement>(`[name="${invalid.name}"]`)
        ?.focus();
      return;
    }
    // Snapshot the lines before clearing the cart, so the confirmation can show the original order.
    const bytes = crypto.getRandomValues(new Uint8Array(5));
    const reference =
      'PP-' +
      Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0'))
        .join('')
        .toUpperCase();
    setReceipt({ reference, lines: cart.map((line) => ({ ...line })) });
    dispatch({ type: 'clearCart' });
    setDelivery({ ...blankDelivery });
    window.scrollTo(0, 0);
  }

  function change(name: DeliveryField, value: string) {
    const next = { ...delivery, [name]: value };
    setDelivery(next);
    // Once a field has shown an error, revalidate it as the shopper corrects it.
    if (errors[name])
      setErrors({ ...errors, [name]: validateDelivery(next)[name] });
  }

  if (receipt)
    return (
      <div className="wrap inner-page confirmation">
        <div className="confirmation-copy" role="status">
          <span className="empty-icon">
            <Icon name="check" size={32} />
          </span>
          <h1 className="page-title">
            Order confirmed<span className="accent">.</span>
          </h1>
          <p>Your demo order is complete.</p>
          <p>
            Order reference <strong>{receipt.reference}</strong>
          </p>
        </div>
        <OrderSummary cart={receipt.lines} listItems />
        <Link className="button primary" to="/products">
          Continue shopping <Icon name="arrow" size={16} />
        </Link>
      </div>
    );
  return (
    <div className="wrap inner-page">
      <p className="eyebrow">
        <span className="dash" /> Order review
      </p>
      <h1 className="page-title">
        Checkout<span className="accent">.</span>
      </h1>
      {!cart.length ? (
        <EmptyState
          title="Add something before checkout"
          detail="Your cart is empty. Choose a supply to start a demo order."
          icon="bag"
        />
      ) : (
        <div className="order-layout">
          <form
            ref={form}
            className="delivery-form"
            onSubmit={placeOrder}
            noValidate
          >
            <h2>Delivery details</h2>
            <p className="muted">
              All fields are required. Use sample details for this demo.
            </p>
            <div className="fields">
              {fields.map((field) => (
                <div key={field.name}>
                  <label htmlFor={field.name}>{field.label}</label>
                  <input
                    type={field.type}
                    autoComplete={field.autoComplete}
                    name={field.name}
                    id={field.name}
                    value={delivery[field.name]}
                    required
                    onChange={(event) => change(field.name, event.target.value)}
                    aria-invalid={!!errors[field.name]}
                    aria-describedby={
                      errors[field.name] ? `${field.name}-error` : undefined
                    }
                  />
                  {errors[field.name] && (
                    <span
                      role="alert"
                      id={`${field.name}-error`}
                      className="error"
                    >
                      {errors[field.name]}
                    </span>
                  )}
                </div>
              ))}
            </div>
            <button className="button primary" type="submit">
              Place demo order <Icon name="arrow" size={18} />
            </button>
            <p className="summary-note">
              Simulated checkout. No payment is collected.
            </p>
          </form>
          <OrderSummary cart={cart} listItems>
            <Link className="text-link" to="/cart">
              Edit shopping cart <Icon name="arrow" size={16} />
            </Link>
          </OrderSummary>
        </div>
      )}
    </div>
  );
}
