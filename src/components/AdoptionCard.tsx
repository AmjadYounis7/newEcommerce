/* Use a router link so opening a profile keeps the visitor inside the app. */
import { Link } from 'react-router-dom';
/* Import the shared type so each card receives a complete pet record. */
import type { AdoptionPet } from '../data/adoption';
/* Add the same arrow used by other storefront links. */
import { Icon } from './Icon';

/* A card needs one pet and can carry the gallery filter into its profile link. */
export function AdoptionCard({ pet, search = '' }: { pet: AdoptionPet; search?: string }) {
  /* Give React one article containing one focusable link. */
  return (
    /* Name the article after the pet it introduces. */
    <article className="adoption-card" aria-label={pet.name}>
      {/* Make the whole card tappable and give the link a short spoken name. */}
      <Link to={`/adoption/${pet.id}${search}`} aria-label={`Meet ${pet.name}`}>
        {/* Reserve the picture area before the image loads. */}
        <img className={`adoption-portrait portrait-${pet.id}`} src={pet.photo} alt={pet.alt} loading="lazy" />
        {/* Keep the name, age and short introduction together. */}
        <div className="adoption-card-copy">
          {/* Give the species and age above the pet's name. */}
          <p className="pet-facts">{pet.species} · {pet.age}</p>
          {/* Pair the name with an arrow leading to the full profile. */}
          <h3>{pet.name}<Icon name="diagonal" size={17} /></h3>
          {/* Show a personality detail before the visitor opens the profile. */}
          <p>{pet.introduction}</p>
        {/* Finish the text area. */}
        </div>
      {/* End the link that opens the pet's profile. */}
      </Link>
    {/* Finish this pet's card. */}
    </article>
  /* Finish the returned JSX. */
  );
/* End the shared card component. */
}
