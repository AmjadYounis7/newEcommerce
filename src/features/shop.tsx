import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  type ReactNode,
} from 'react';
import { findProduct } from '../data/catalog';

export type CartLine = { id: string; quantity: number };
type ShopState = { cart: CartLine[]; wishlist: string[] };
type Action =
  | { type: 'add' | 'remove' | 'toggleSaved'; id: string }
  | { type: 'setQuantity'; id: string; quantity: number }
  | { type: 'clearCart' };

export const storageKey = 'pip-and-paw.shop.v1';
const emptyShop = (): ShopState => ({ cart: [], wishlist: [] });

// The initializer runs when the provider mounts. Safely ignore unknown products and old data.
function readShop(): ShopState {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || 'null');
    if (!saved || typeof saved !== 'object') return emptyShop();
    const cart: CartLine[] = [];
    if (Array.isArray(saved.cart)) {
      for (const line of saved.cart) {
        if (
          !line ||
          !findProduct(line.id) ||
          !Number.isSafeInteger(line.quantity) ||
          line.quantity < 1
        )
          continue;
        if (!cart.some((item) => item.id === line.id))
          cart.push({ id: line.id, quantity: line.quantity });
      }
    }
    const wishlist = Array.isArray(saved.wishlist)
      ? saved.wishlist.filter(
          (id: unknown): id is string =>
            typeof id === 'string' && !!findProduct(id),
        )
      : [];
    return { cart, wishlist: Array.from(new Set<string>(wishlist)) };
  } catch {
    return emptyShop();
  }
}

// All pages share these transitions. Each returns a new state object so React updates the UI.
function shopReducer(state: ShopState, action: Action): ShopState {
  if (action.type === 'clearCart') return { ...state, cart: [] };
  if (!findProduct(action.id)) return state;
  switch (action.type) {
    case 'add': {
      const exists = state.cart.some((line) => line.id === action.id);
      const cart = exists
        ? state.cart.map((line) =>
            line.id === action.id
              ? { ...line, quantity: line.quantity + 1 }
              : line,
          )
        : [...state.cart, { id: action.id, quantity: 1 }];
      return { ...state, cart };
    }
    case 'setQuantity':
      if (!Number.isSafeInteger(action.quantity) || action.quantity < 1)
        return state;
      return {
        ...state,
        cart: state.cart.map((line) =>
          line.id === action.id ? { ...line, quantity: action.quantity } : line,
        ),
      };
    case 'remove':
      return {
        ...state,
        cart: state.cart.filter((line) => line.id !== action.id),
      };
    case 'toggleSaved':
      return {
        ...state,
        wishlist: state.wishlist.includes(action.id)
          ? state.wishlist.filter((id) => id !== action.id)
          : [...state.wishlist, action.id],
      };
  }
}

type ShopValue = ShopState & { dispatch: React.Dispatch<Action> };
const ShopContext = createContext<ShopValue | null>(null);

export function ShopProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(shopReducer, undefined, readShop);
  useEffect(() => {
    // Private browsing or a full storage quota can disable persistence. Shopping can still continue.
    try {
      localStorage.setItem(storageKey, JSON.stringify(state));
    } catch {
      /* Keep state in memory. */
    }
  }, [state]);
  return <ShopContext value={{ ...state, dispatch }}>{children}</ShopContext>;
}

export function useShop() {
  const shop = useContext(ShopContext);
  if (!shop) throw new Error('useShop requires a ShopProvider');
  return shop;
}
