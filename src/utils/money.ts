const usd = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});
export const money = (cents: number) => usd.format(cents / 100);

export const freeDeliveryAt = 6000;
export function orderTotals(subtotal: number) {
  const delivery = subtotal === 0 || subtotal >= freeDeliveryAt ? 0 : 500;
  return { subtotal, delivery, total: subtotal + delivery };
}
