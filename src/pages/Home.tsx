import { Link } from 'react-router-dom';
import { categories, products } from '../data/catalog';
import { Icon, type IconName } from '../components/Icon';
import { ProductCard } from '../components/ProductCard';

const activityIcons: IconName[] = ['walk', 'play', 'dine', 'rest'];
const activityCopy = [
  'Leads & accessories',
  'Tugs & teasers',
  'Bowls for home & away',
  'Beds & mats',
];

export function Home() {
  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="dash" /> For dogs &amp; cats
            </p>
            <h1>
              Good gear.
              <br />
              <em>Happy tails.</em>
            </h1>
            <p className="intro">
              From the first walk to the last nap, find the little things that
              make life with your pet better.
            </p>
            <Link className="button primary" to="/products">
              Shop pet supplies <Icon name="arrow" size={18} />
            </Link>
          </div>
          <figure className="hero-frame">
            <img
              src="./images/field-spaniel.webp"
              width="1536"
              height="1024"
              fetchPriority="high"
              alt="A spaniel in a green collar sitting on a sunny woodland trail"
            />
            <Link to="/products?category=Walk" className="photo-tag">
              <span className="tag-dot" /> Shop walking gear{' '}
              <Icon name="diagonal" size={14} />
            </Link>
          </figure>
        </div>
      </section>
      <section className="wrap edit">
        <div className="section-heading">
          <div>
            <p className="eyebrow">
              <span className="dash" /> Featured supplies
            </p>
            <h2>
              The everyday edit<span className="accent">.</span>
            </h2>
          </div>
          <Link className="text-link" to="/products">
            View all products <Icon name="arrow" size={17} />
          </Link>
        </div>
        <div className="product-grid">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
      <section className="activity">
        <div className="wrap">
          <div className="section-heading">
            <h2>
              Shop by activity<span className="accent">.</span>
            </h2>
          </div>
          <div className="activity-grid">
            {categories.map((category, index) => (
              <Link
                to={`/products?category=${category}`}
                key={category}
                className="activity-card"
              >
                <span className="activity-icon">
                  <Icon name={activityIcons[index]!} size={24} />
                </span>
                <span>
                  <strong>{category}</strong>
                  <small>{activityCopy[index]}</small>
                </span>
                <Icon name="diagonal" size={16} />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
