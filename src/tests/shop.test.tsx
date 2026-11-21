import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import { storageKey } from '../features/shop';

function openPage(route = '/') {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <App />
    </MemoryRouter>,
  );
}
function startCart() {
  localStorage.setItem(
    storageKey,
    JSON.stringify({
      cart: [{ id: 'trail-lead', quantity: 1 }],
      wishlist: ['feather-wand'],
    }),
  );
}
const button = (name: string | RegExp) => screen.getByRole('button', { name });
const link = (name: string | RegExp) => screen.getByRole('link', { name });

describe('shopping through the rendered application', () => {
  it('combines name, pet, activity and inclusive price filters and sorts the visible cards', async () => {
    const user = userEvent.setup();
    openPage('/products?pet=Cats');
    await user.selectOptions(screen.getByLabelText('Category'), 'Dine');
    await user.type(screen.getByRole('searchbox'), 'bOwL');
    await user.type(screen.getByLabelText('Min price ($)'), '18.50');
    await user.type(screen.getByLabelText('Max price ($)'), '24');
    await user.selectOptions(screen.getByLabelText('Sort by'), 'asc');
    const names = () =>
      screen
        .getAllByRole('article')
        .map((card) => card.getAttribute('aria-label'));
    expect(names()).toEqual(['Creekside Travel Bowl', 'Meadow Bowl']);
    await user.selectOptions(screen.getByLabelText('Sort by'), 'desc');
    expect(names()).toEqual(['Meadow Bowl', 'Creekside Travel Bowl']);
    await user.type(screen.getByRole('searchbox'), 'zzz');
    expect(
      screen.getByRole('heading', { name: 'No matching products' }),
    ).toBeInTheDocument();
    await user.click(button('Show all supplies'));
    expect(names()).toHaveLength(9);
  });

  it('adds repeated products into one cart line and recalculates prices when quantity changes', async () => {
    const user = userEvent.setup();
    openPage('/products');
    await user.click(button('Add Trailhead Lead to cart'));
    await user.click(button('Add Trailhead Lead to cart'));
    await user.click(link('Cart, 2 items'));
    expect(screen.getAllByRole('article')).toHaveLength(1);
    expect(
      within(screen.getByRole('complementary')).getByText('$61.00'),
    ).toBeVisible();
    await user.click(button('Increase Trailhead Lead quantity'));
    expect(screen.getByText('Free', { exact: true })).toBeVisible();
    expect(
      within(screen.getByRole('complementary')).getAllByText('$84.00'),
    ).toHaveLength(2);
    await user.click(button('Decrease Trailhead Lead quantity'));
    await user.click(button('Remove Trailhead Lead from cart'));
    expect(
      screen.getByRole('heading', { name: 'Your cart is empty' }),
    ).toBeVisible();
  });

  it('shows an error at each invalid checkout field and keeps the cart intact', async () => {
    startCart();
    const user = userEvent.setup();
    openPage('/checkout');
    await user.type(screen.getByLabelText('Email address'), 'invalid');
    await user.click(button('Place demo order'));
    expect(screen.getAllByRole('alert')).toHaveLength(5);
    expect(screen.getByLabelText('Email address')).toHaveAccessibleDescription(
      'Enter a valid email address.',
    );
    expect(screen.getByLabelText('Full name')).toHaveFocus();
    expect(screen.getByLabelText('Street address')).toHaveAttribute(
      'aria-invalid',
      'true',
    );
    expect(screen.queryByText(/PP-[0-9A-F]{10}/)).toBeNull();
    expect(link('Cart, 1 item')).toBeVisible();
  });

  it('preserves cart and unique wishlist entries across a remount and supports adding from the wishlist', async () => {
    const user = userEvent.setup();
    const first = openPage('/products');
    const save = button('Save Sunday Rope Tug to wishlist');
    await user.click(save);
    await user.click(save);
    await user.click(save);
    await user.click(link('Wishlist, 1 saved'));
    expect(screen.getAllByRole('article')).toHaveLength(1);
    await user.click(button('Add Sunday Rope Tug to cart'));
    first.unmount();
    openPage('/wishlist');
    expect(screen.getAllByRole('article')).toHaveLength(1);
    expect(link('Cart, 1 item')).toBeVisible();
    await user.click(button('Save Sunday Rope Tug to wishlist'));
    expect(screen.getByText('Your wishlist is empty')).toBeVisible();
    await user.click(link('Cart, 1 item'));
    expect(
      screen.getByRole('article', { name: 'Sunday Rope Tug' }),
    ).toBeVisible();
    await user.click(button('Clear cart'));
    expect(screen.getByText('Your cart is empty')).toBeVisible();
  });

  it('blocks an empty checkout even when opened directly', () => {
    openPage('/checkout');
    expect(
      screen.getByRole('heading', { name: 'Add something before checkout' }),
    ).toBeVisible();
    expect(screen.queryByRole('form')).toBeNull();
    expect(
      screen.queryByRole('button', { name: 'Place demo order' }),
    ).toBeNull();
  });

  it('confirms a valid order with its reference and original totals, clears the cart and retains the wishlist', async () => {
    startCart();
    const user = userEvent.setup();
    openPage('/checkout');
    await user.type(screen.getByLabelText('Full name'), 'Demo Shopper');
    await user.type(
      screen.getByLabelText('Email address'),
      'shopper@example.com',
    );
    await user.type(screen.getByLabelText('Phone number'), '+961 70 123 456');
    await user.type(screen.getByLabelText('Street address'), '12 Cedar Street');
    await user.type(screen.getByLabelText('City or town'), 'Saida');
    await user.click(button('Place demo order'));
    expect(
      screen.getByRole('heading', { name: /Order confirmed/ }),
    ).toBeVisible();
    expect(screen.getByText(/^PP-[0-9A-F]{10}$/)).toBeVisible();
    const summary = within(screen.getByRole('complementary'));
    expect(summary.getByText('Trailhead Lead × 1')).toBeVisible();
    expect(summary.getByText('$33.00')).toBeVisible();
    expect(link('Cart, 0 items')).toBeVisible();
    await user.click(link('Wishlist, 1 saved'));
    expect(
      screen.getByRole('article', { name: 'Feather Chaser' }),
    ).toBeVisible();
    expect(localStorage.getItem(storageKey)).not.toContain(
      'shopper@example.com',
    );
  });

  it('recovers from malformed browser storage', () => {
    localStorage.setItem(storageKey, 'invalid JSON');
    openPage('/cart');
    expect(screen.getByText('Your cart is empty')).toBeVisible();
  });
});
