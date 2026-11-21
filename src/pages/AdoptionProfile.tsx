/* Store the local introduction form's values and type its submit event. */
import { useState, type FormEvent } from 'react';
/* Read the pet ID from the route and the species filter from the address. */
import { Link, useLocation, useParams } from 'react-router-dom';
/* Read the same records used for the gallery cards. */
import { adoptionPets } from '../data/adoption';

/* Keep the practice request within one profile's visit. */
function IntroductionForm({ petName }: { petName: string }) {
  /* Store the visitor's first name while they type. */
  const [firstName, setFirstName] = useState('');
  /* Track whether a submission needs an inline name error. */
  const [showError, setShowError] = useState(false);
  /* Switch to the confirmation after a valid submission. */
  const [complete, setComplete] = useState(false);

  /* Handle the request in React so no information leaves the page. */
  function requestIntroduction(event: FormEvent<HTMLFormElement>) {
    /* Prevent the browser from sending the form or reloading the app. */
    event.preventDefault();
    /* Treat spaces on their own as an empty name. */
    if (!firstName.trim()) {
      /* Show an explanation beside the name field. */
      setShowError(true);
      /* Stop before the success screen. */
      return;
    /* Finish checking the name. */
    }
    /* Show the confirmation for the pet the visitor actually selected. */
    setComplete(true);
  /* End the form submission handler. */
  }

  /* After submission, replace the form with the visitor's personal confirmation. */
  if (complete) {
    /* Return the completed request in the same panel. */
    return (
      /* Let assistive technology announce the result. */
      <section className="adoption-request" role="status">
        {/* Name the pet on the receipt so the visitor can check their choice. */}
        <h2>Meet-and-greet with {petName}</h2>
        {/* Confirm the practice request and clarify its scope. */}
        <p>{firstName.trim()}, your demo request is complete. This practice visit stays on this page.</p>
      {/* Finish the confirmation panel. */}
      </section>
    /* Finish returning the success view. */
    );
  /* End the successful-submission branch. */
  }

  /* Show the form until the visitor finishes it. */
  return (
    /* Use our own inline validation so the message appears beside the field. */
    <form className="adoption-request" noValidate onSubmit={requestIntroduction}>
      {/* Give the visitor a clear next step after reading the profile. */}
      <h2>Meet {petName}</h2>
      {/* Set expectations before asking for a first name. */}
      <p>Try a meet-and-greet request for this fictional pet. The form runs on this device and makes no shelter booking.</p>
      {/* Connect the visible label to the matching input ID. */}
      <label htmlFor="visitor-name">Your first name</label>
      {/* Read back the current field value and connect any validation error to it. */}
      <input
        /* Match the label above to this text box. */
        id="visitor-name"
        /* Tell the browser which value visitors can enter. */
        autoComplete="given-name"
        /* Mark the field as required for assistive technology. */
        required
        /* Show the value held by React. */
        value={firstName}
        /* Limit the size of this short introduction. */
        maxLength={80}
        /* Mark the field invalid only while its explanation is visible. */
        aria-invalid={showError}
        /* Point screen readers to the error when it exists. */
        aria-describedby={showError ? 'visitor-name-error' : undefined}
        /* Update the value and clear the error once there is a real name. */
        onChange={(event) => {
          /* Store the text exactly as typed. */
          setFirstName(event.target.value);
          /* A nonblank name fixes the only field error. */
          if (event.target.value.trim()) setShowError(false);
        /* Finish the input change handler. */
        }}
      /* Finish the name input. */
      />
      {/* Display the inline error only after a blank submission. */}
      {showError && <p id="visitor-name-error" className="error" role="alert">Enter your first name.</p>}
      {/* Run the form's submit handler when this button is activated. */}
      <button className="button primary" type="submit">Request a demo meet-and-greet</button>
    {/* Close the practice request form. */}
    </form>
  /* Finish returning the initial form. */
  );
/* End the private form component. */
}

/* Find the pet named in the URL and show its full profile. */
export function AdoptionProfile() {
  /* Read the dynamic segment from the /adoption/:petId route. */
  const { petId } = useParams();
  /* Keep the current filter when linking back to the gallery. */
  const { search } = useLocation();
  /* Find returns undefined when a bookmarked pet address is unknown. */
  const pet = adoptionPets.find((entry) => entry.id === petId);
  /* Build a back link that works even if this profile was opened directly. */
  const galleryPath = `/adoption${search}`;
  /* Offer a way back to valid profiles for a mistyped address. */
  if (!pet) {
    /* Return a useful page instead of attempting to read a missing record. */
    return (
      /* Place the message in the familiar page layout. */
      <section className="wrap inner-page">
        {/* Explain why this address does not show a pet. */}
        <h1 className="page-title">Pet profile unavailable</h1>
        {/* Take the visitor directly back to the gallery. */}
        <Link className="button primary" to={galleryPath}>Browse adoption pets</Link>
      {/* Finish the fallback section. */}
      </section>
    /* Finish the fallback view. */
    );
  /* End the missing-profile branch. */
  }
  /* Show the selected animal, its story and the practice introduction form. */
  return (
    /* Keep the profile inside the same page width as the gallery. */
    <div className="wrap inner-page adoption-profile">
      {/* Return to the previous species filter or to all pets when there was none. */}
      <Link className="text-link" to={galleryPath}>← Back to adoption pets</Link>
      {/* Show the portrait next to its story on larger screens. */}
      <div className="adoption-profile-grid">
        {/* Give the full profile a larger version of the matching portrait. */}
        <img className={`adoption-portrait portrait-${pet.id}`} src={pet.photo} alt={pet.alt} />
        {/* Keep all reading content together in its own column. */}
        <div className="adoption-story">
          {/* Remind the visitor which section this profile belongs to. */}
          <p className="eyebrow"><span className="dash" /> Adoption profile</p>
          {/* Use the pet's name as the main page heading. */}
          <h1 className="page-title">{pet.name}<span className="accent">.</span></h1>
          {/* Display the basic facts before the longer story. */}
          <p className="pet-facts">{pet.species} · {pet.age} · {pet.appearance}</p>
          {/* Introduce this pet through specific habits. */}
          <p className="pet-story-text">{pet.story}</p>
          {/* Pair each care heading with the information that belongs to it. */}
          <dl className="adoption-care">
            {/* Describe the living arrangements that would suit the pet. */}
            <div><dt>A good home for {pet.name}</dt><dd>{pet.home}</dd></div>
            {/* Describe the daily play or care this pet enjoys. */}
            <div><dt>Daily routine</dt><dd>{pet.routine}</dd></div>
          {/* End the home and care information. */}
          </dl>
          {/* Changing pets creates a fresh form so a request cannot carry into another profile. */}
          <IntroductionForm key={pet.id} petName={pet.name} />
        {/* End the story column. */}
        </div>
      {/* End the two-column profile layout. */}
      </div>
    {/* End the pet's page. */}
    </div>
  /* Finish returning the full profile. */
  );
/* End the profile component. */
}
