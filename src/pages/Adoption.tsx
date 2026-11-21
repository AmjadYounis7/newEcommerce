/* Keep the active species filter in the URL so a refresh preserves it. */
import { Link, useSearchParams } from 'react-router-dom';
/* Display the same card on this page and in the home page adoption section. */
import { AdoptionCard } from '../components/AdoptionCard';
/* Load the example cats and dogs from the project's own data. */
import { adoptionPets } from '../data/adoption';

/* Pair each filter label with its link and the species value to match. */
const filters = [
  /* The empty value means the visitor wants to see both species. */
  { label: 'All pets', species: '', to: '/adoption' },
  /* The cats link stores Cat in the query string. */
  { label: 'Cats', species: 'Cat', to: '/adoption?pet=Cat' },
  /* The dogs link stores Dog in the query string. */
  { label: 'Dogs', species: 'Dog', to: '/adoption?pet=Dog' },
/* Finish the list of filter choices. */
];

/* Show all the profiles that match the visitor's selected species. */
export function Adoption() {
  /* Read the part of the address after the question mark. */
  const [params] = useSearchParams();
  /* Look up the selected filter, using All pets for missing or unknown values. */
  const selected = filters.find((filter) => filter.species === params.get('pet')) ?? filters[0]!;
  /* Keep every pet for All pets, or just the records with the selected species. */
  const visiblePets = adoptionPets.filter((pet) => !selected.species || pet.species === selected.species);
  /* Carry valid selections into profile links so visitors can return to their filtered gallery. */
  const search = selected.species ? `?pet=${selected.species}` : '';
  /* Put the gallery and its filters inside the standard page width. */
  return (
    /* Use the main heading to name the gallery for assistive technology. */
    <section className="wrap inner-page adoption-gallery" aria-labelledby="adoption-title">
      {/* Identify this part of the site as the adoption section. */}
      <p className="eyebrow"><span className="dash" /> Pet adoption</p>
      {/* Introduce the photos in the shop's usual headline style. */}
      <h1 id="adoption-title" className="page-title">Meet the pets<span className="accent">.</span></h1>
      {/* Explain what visitors can learn and that these are demo listings. */}
      <p className="adoption-intro">Get to know our four fictional cats and dogs. Open a profile to explore their habits, their care, and the home that suits them.</p>
      {/* Put the species choices and the matching count on one row when space allows. */}
      <div className="adoption-toolbar">
        {/* Give the group of filter links its own accessible name. */}
        <nav aria-label="Filter adoption pets" className="adoption-filters">
          {/* Create one link for each filter defined above. */}
          {filters.map((filter) => (
            /* Mark the current filter for both screen readers and the active visual style. */
            <Link key={filter.label} to={filter.to} aria-current={selected === filter ? 'page' : undefined}>{filter.label}</Link>
          /* Finish turning filters into links. */
          ))}
        {/* Close the filter navigation. */}
        </nav>
        {/* Announce the number of matching profiles when the filter changes. */}
        <p role="status" className="adoption-count">{visiblePets.length} {visiblePets.length === 1 ? 'profile' : 'profiles'}</p>
      {/* End the filter and count row. */}
      </div>
      {/* Provide a heading for the collection of individual pet cards. */}
      <h2 className="sr-only">Pet profiles</h2>
      {/* Let CSS arrange the matching profile cards for each screen size. */}
      <div className="adoption-grid">
        {/* Use a stable ID so React can track each card after filtering. */}
        {visiblePets.map((pet) => <AdoptionCard key={pet.id} pet={pet} search={search} />)}
      {/* End the list of cards. */}
      </div>
    {/* End the gallery section. */}
    </section>
  /* Finish returning the gallery. */
  );
/* Finish the adoption page. */
}
