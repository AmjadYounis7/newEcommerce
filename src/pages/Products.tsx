import { useSearchParams } from 'react-router-dom';
import { categories, products } from '../data/catalog';
import { ProductCard } from '../components/ProductCard';
import { Icon } from '../components/Icon';

export function Products() {
  // URL parameters make category links, the back button, and shared filtered links work together.
  const [params, setParams] = useSearchParams();
  const read = (key: string) => params.get(key) || '';
  function update(key: string, value: string) {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true });
  }
  const query = read('q').trim().toLowerCase();
  const pet = read('pet');
  const category = read('category');
  const min = read('min');
  const max = read('max');
  const lower = min ? Math.round(Number(min) * 100) : 0;
  const upper = max ? Math.round(Number(max) * 100) : Infinity;
  const sort = read('sort');
  const visible = products.filter(
    (product) =>
      product.name.toLowerCase().includes(query) &&
      (!pet || product.pets.some((value) => value === pet)) &&
      (!category || product.category === category) &&
      product.cents >= lower &&
      product.cents <= upper,
  );
  if (sort === 'asc') visible.sort((a, b) => a.cents - b.cents);
  if (sort === 'desc') visible.sort((a, b) => b.cents - a.cents);

  return (
    <div className="wrap inner-page">
      <p className="eyebrow">
        <span className="dash" /> The supply shop
      </p>
      <h1 className="page-title">
        {pet === 'Dogs'
          ? 'For dogs'
          : pet === 'Cats'
            ? 'For cats'
            : 'Shop all supplies'}
        <span className="accent">.</span>
      </h1>
      <div className="filter-panel">
        <label className="search-label">
          Search products
          <span className="search-input">
            <Icon name="search" size={18} />
            <input
              type="search"
              placeholder="Find a product…"
              value={read('q')}
              onChange={(e) => update('q', e.target.value)}
            />
          </span>
        </label>
        <label>
          Pet
          <select value={pet} onChange={(e) => update('pet', e.target.value)}>
            <option value="">All pets</option>
            <option>Dogs</option>
            <option>Cats</option>
          </select>
        </label>
        <label>
          Category
          <select
            value={category}
            onChange={(e) => update('category', e.target.value)}
          >
            <option value="">All activities</option>
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>
        <label>
          Min price ($)
          <input
            type="number"
            min="0"
            step=".01"
            placeholder="0"
            value={min}
            onChange={(e) => update('min', e.target.value)}
          />
        </label>
        <label>
          Max price ($)
          <input
            type="number"
            min="0"
            step=".01"
            placeholder="Any"
            value={max}
            onChange={(e) => update('max', e.target.value)}
          />
        </label>
      </div>
      {lower > upper && (
        <p className="error" role="status">
          The maximum price must be at least the minimum price.
        </p>
      )}
      <div className="result-line">
        <p aria-live="polite">
          {visible.length} {visible.length === 1 ? 'product' : 'products'}
          {params.size > 0 && (
            <button className="plain" onClick={() => setParams({})}>
              Reset filters
            </button>
          )}
        </p>
        <label className="sort">
          Sort by
          <select value={sort} onChange={(e) => update('sort', e.target.value)}>
            <option value="">Featured</option>
            <option value="asc">Price: low to high</option>
            <option value="desc">Price: high to low</option>
          </select>
        </label>
      </div>
      {visible.length ? (
        <div className="product-grid">
          {visible.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <Icon name="search" size={32} />
          <h2>No matching products</h2>
          <p>Try another name or change your filters.</p>
          <button className="button primary" onClick={() => setParams({})}>
            Show all supplies
          </button>
        </div>
      )}
    </div>
  );
}
