import { Link } from 'react-router-dom';
import { Icon, type IconName } from './Icon';

export function EmptyState({
  title,
  detail,
  icon,
}: {
  title: string;
  detail: string;
  icon: IconName;
}) {
  return (
    <section className="empty">
      <span className="empty-icon">
        <Icon name={icon} size={30} />
      </span>
      <h2>{title}</h2>
      <p>{detail}</p>
      <Link className="button primary" to="/products">
        Continue shopping <Icon name="arrow" size={17} />
      </Link>
    </section>
  );
}
