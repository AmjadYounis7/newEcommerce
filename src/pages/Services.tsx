/* Store the service form choices and describe the TypeScript type of a submit event. */
import { useState, type FormEvent } from 'react';
/* Reuse the storefront’s SVG symbols for controls and labels. */
import { Icon } from '../components/Icon';
/* Reuse the cents-to-dollars formatter so prices look the same across pages. */
import { money } from '../utils/money';

/* Allow exactly two kinds of visitors to the care studio. */
type Species = 'Cat' | 'Dog';
/* Limit service choices to the two options offered by the form. */
type ServiceType = 'Cleaning' | 'Training';

/* Organize prices, durations and descriptions by species first, then service. */
const sessions = {
  /* Group the two sessions offered for cats. */
  Cat: {
    /* Define the cat grooming session used when Cat and Cleaning are selected. */
    Cleaning: {
      /* Give this session its name on the service card. */
      title: 'Brush & tidy',
      /* Describe the item or session in words the shopper will see. */
      detail: 'A gentle coat brush and a tidy-up around the paws.',
      /* Set the session length to 30 minutes. */
      minutes: 30,
      /* Store the price as 2500 cents, or $25.00. */
      cents: 2500,
    /* Finish this object and continue with the next entry. */
    },
    /* Define the training session offered to cats. */
    Training: {
      /* Give this session its name on the service card. */
      title: 'Clicker basics',
      /* Describe the item or session in words the shopper will see. */
      detail: 'Practice following a target and stepping into a carrier for a treat.',
      /* Set the session length to 30 minutes. */
      minutes: 30,
      /* Store the price as 3500 cents, or $35.00. */
      cents: 3500,
    /* Finish this object and continue with the next entry. */
    },
  /* Finish this object and continue with the next entry. */
  },
  /* Group the sessions offered for dogs. */
  Dog: {
    /* Define the dog grooming session. */
    Cleaning: {
      /* Give this session its name on the service card. */
      title: 'Wash & brush',
      /* Describe the item or session in words the shopper will see. */
      detail: 'A coat wash, towel dry and brush-out after a muddy walk.',
      /* Set the session length to 45 minutes. */
      minutes: 45,
      /* Store the price as 3500 cents, or $35.00. */
      cents: 3500,
    /* Finish this object and continue with the next entry. */
    },
    /* Define the dog training session. */
    Training: {
      /* Give this session its name on the service card. */
      title: 'Everyday manners',
      /* Describe the item or session in words the shopper will see. */
      detail: 'Practice loose-lead walking, settling on a mat and coming when called.',
      /* Set the session length to 45 minutes. */
      minutes: 45,
      /* Store the price as 4500 cents, or $45.00. */
      cents: 4500,
    /* Finish this object and continue with the next entry. */
    },
  /* Finish this object and continue with the next entry. */
  },
/* Finish this object. */
};

/* Build a date string that the browser’s date input accepts. */
function localDate() {
  /* Read today’s date in the shopper’s local time zone. */
  const now = new Date();
  /* Collect the year, month and day in the order expected by a date input. */
  return [
    /* Read the four-digit local year. */
    now.getFullYear(),
    /* Months start at zero in JavaScript. Add one, then turn 3 into “03”. */
    String(now.getMonth() + 1).padStart(2, '0'),
    /* Read the day of the month and pad single digits to two characters. */
    String(now.getDate()).padStart(2, '0'),
  /* Join the three parts with dashes to produce a date such as 2026-11-18. */
  ].join('-');
/* End the localDate function. */
}

/* Describe the four values shown after submitting a demo visit request. */
type Visit = {
  /* Store the name entered for this visit. */
  petName: string;
  /* Store the species selected for this visit. */
  pet: Species;
  /* Store the type of session requested. */
  service: ServiceType;
  /* Store the preferred date as a year-month-day string. */
  day: string;
/* Finish the TypeScript definition. */
};

/* Define Services as a reusable React component. */
export function Services() {
  /* Start with Cat selected. setPet switches the species and its available session details. */
  const [pet, setPet] = useState<Species>('Cat');
  /* Select Cleaning initially. The Training radio button changes this value. */
  const [service, setService] = useState<ServiceType>('Cleaning');
  /* Remember what the shopper types in the pet name field. */
  const [petName, setPetName] = useState('');
  /* Track the selected day as the date input’s year-month-day string. */
  const [day, setDay] = useState('');
  /* Store a separate optional error message for the name and the date. */
  const [errors, setErrors] = useState<{ petName?: string; day?: string }>({});
  /* Start with no completed visit so the request form appears. */
  const [visit, setVisit] = useState<Visit | null>(null);

  /* Validate the local request when the shopper submits the care form. */
  function requestVisit(event: FormEvent<HTMLFormElement>) {
    /* Keep the page open so React can show errors or the confirmation. */
    event.preventDefault();
    /* Build the messages for the two inputs that the shopper must complete. */
    const invalid = {
      /* A name containing only spaces is empty after trimming. */
      petName: petName.trim() ? undefined : 'Enter your pet’s name.',
      /* Compare fixed-width year-month-day strings to accept today or a later date. */
      day: day && day >= localDate() ? undefined : 'Choose today or a future date.',
    /* Finish this object. */
    };
    /* Store the messages so the matching inputs can display them. */
    setErrors(invalid);
    /* When either check fails, help the shopper reach the first invalid input. */
    if (invalid.petName || invalid.day) {
      /* Look up a form control by its name in the submitted form. */
      const input = event.currentTarget.elements.namedItem(
        /* Prefer the pet name if both fields have errors, otherwise select the date field. */
        invalid.petName ? 'petName' : 'day',
      /* Tell TypeScript that the named control in this form is an input. */
      ) as HTMLInputElement;
      /* Put keyboard focus on that input so the shopper can fix it. */
      input.focus();
      /* Leave the confirmation hidden until both fields are valid. */
      return;
    /* End this conditional branch. */
    }
    /* Save the valid choices in React state to show a local confirmation. */
    setVisit({ petName: petName.trim(), pet, service, day });
  /* End the requestVisit function. */
  }

  /* Return from the confirmation to a fresh request form. */
  function startAgain() {
    /* Clear the completed visit to show the form again. */
    setVisit(null);
    /* Empty the previous pet name. */
    setPetName('');
    /* Empty the previous preferred date. */
    setDay('');
    /* Remove validation messages from the previous request. */
    setErrors({});
  /* End the startAgain function. */
  }

  /* Return the JSX that React should display here. */
  return (
    /* Group the wrap inner page care page content so the stylesheet can position it. */
    <div className="wrap inner-page care-page">
      {/* Group the care heading content so the stylesheet can position it. */}
      <div className="care-heading">
        {/* Render this paragraph for the shopper. */}
        <p className="eyebrow">
          {/* Use the dash style for this inline part of the interface. */}
          <span className="dash" /> The care studio
        {/* End the p element. */}
        </p>
        {/* Show the main heading for this page. */}
        <h1 className="page-title">
          {/* Show this wording to the shopper in the surrounding element. */}
          Pet services<span className="accent">.</span>
        {/* End the h1 element. */}
        </h1>
        {/* Render this paragraph for the shopper. */}
        <p className="catalog-intro">
          {/* Show this wording to the shopper in the surrounding element. */}
          Pick a cleaning or training session for your cat or dog and choose a preferred visit date.
        {/* End the p element. */}
        </p>
      {/* End the div element. */}
      </div>
      {/* Group the care layout content so the stylesheet can position it. */}
      <div className="care-layout">
        {/* Group the care photo content so the stylesheet can position it. */}
        <div className="care-photo">
          {/* Display the product or pet photo using the image attributes below. */}
          <img
            /* Choose the local image file to display. */
            src="./images/cat-grooming.webp"
            /* Set the element’s width in its own size attributes. */
            width="765"
            /* Set the element’s height in its own size attributes. */
            height="1024"
            /* Describe the photo for people who cannot see it. */
            alt="A grey-and-white cat being gently brushed on a towel"
          /* Finish the self-closing tag for img. */
          />
        {/* End the div element. */}
        </div>
        {/* Show the confirmation for a submitted visit, otherwise show the form. */}
        {visit ? (
          /* Group this part of the page as a section. */
          <section className="visit-confirmation" role="status">
            {/* Use the empty icon style for this inline part of the interface. */}
            <span className="empty-icon">
              {/* Draw the check symbol. */}
              <Icon name="check" size={28} />
            {/* End the span element. */}
            </span>
            {/* Show “Demo request complete” as a heading for this section. */}
            <h2>Demo request complete</h2>
            {/* Render this paragraph for the shopper. */}
            <p>{visit.petName}’s preferred visit details</p>
            {/* Group labels with their corresponding values. */}
            <dl className="visit-details">
              {/* Group these related values in a single layout container. */}
              <div>
                {/* Name this detail “Pet”. */}
                <dt>Pet</dt>
                {/* Display the value for the detail named immediately above. */}
                <dd>{visit.pet}</dd>
              {/* End the div element. */}
              </div>
              {/* Group these related values in a single layout container. */}
              <div>
                {/* Name this detail “Service”. */}
                <dt>Service</dt>
                {/* Display the value for the detail named immediately above. */}
                <dd>
                  {/* Look up the session title using both choices saved on the visit. */}
                  {visit.service} · {sessions[visit.pet][visit.service].title}
                {/* End the dd element. */}
                </dd>
              {/* End the div element. */}
              </div>
              {/* Group these related values in a single layout container. */}
              <div>
                {/* Name this detail “Preferred date”. */}
                <dt>Preferred date</dt>
                {/* Display the value for the detail named immediately above. */}
                <dd>
                  {/* Format the preferred day as a readable date in English. */}
                  {new Intl.DateTimeFormat('en', { dateStyle: 'long' }).format(
                    /* Use local noon on the chosen date so formatting keeps the intended local day. */
                    new Date(visit.day + 'T12:00:00'),
                  /* Finish the expression inside the JSX braces. */
                  )}
                {/* End the dd element. */}
                </dd>
              {/* End the div element. */}
              </div>
              {/* Group these related values in a single layout container. */}
              <div>
                {/* Name this detail “Session”. */}
                <dt>Session</dt>
                {/* Display the value for the detail named immediately above. */}
                <dd>
                  {/* Read the duration for the saved pet and service combination. */}
                  {sessions[visit.pet][visit.service].minutes} min ·{' '}
                  {/* Format the fee for that same saved session. */}
                  {money(sessions[visit.pet][visit.service].cents)}
                {/* End the dd element. */}
                </dd>
              {/* End the div element. */}
              </div>
            {/* End the dl element. */}
            </dl>
            {/* Render this paragraph for the shopper. */}
            <p className="summary-note">
              {/* Show this wording to the shopper in the surrounding element. */}
              This is a practice request. No appointment has been booked or payment taken.
            {/* End the p element. */}
            </p>
            {/* Attach the reset handler to the button beneath the confirmation. */}
            <button className="button primary" onClick={startAgain}>
              {/* Show this wording to the shopper in the surrounding element. */}
              Start another request <Icon name="arrow" size={16} />
            {/* End the button element. */}
            </button>
          {/* End the section element. */}
          </section>
        /* Otherwise render the alternative below. */
        ) : (
          /* Use this form’s own validation messages when it submits. */
          <form className="care-form" noValidate onSubmit={requestVisit}>
            {/* Group the related radio choices so the shopper knows what they select. */}
            <fieldset>
              {/* Name the radio group for both visual and screen-reader users. */}
              <legend>Who’s visiting?</legend>
              {/* Group the pet switch content so the stylesheet can position it. */}
              <div className="pet-switch">
                {/* Render one radio choice for Cat and one for Dog. */}
                {(['Cat', 'Dog'] as const).map((species) => (
                  /* Label the input nested inside so its text also activates the control. */
                  <label key={species}>
                    {/* Render the input using the field settings below. */}
                    <input
                      /* Choose how the browser treats this control. */
                      type="radio"
                      /* Identify this input or group of choices by name. */
                      name="species"
                      /* Show the current value from state in this control. */
                      value={species}
                      /* Mark this choice when it matches the species held in state. */
                      checked={species === pet}
                      /* Switching species updates the prices and sessions shown below. */
                      onChange={() => setPet(species)}
                    /* Finish the self-closing tag for input. */
                    />
                    {/* Group this inline text or value. */}
                    <span>{species}</span>
                  {/* End the label element. */}
                  </label>
                /* Finish building this list and return to the surrounding JSX. */
                ))}
              {/* End the div element. */}
              </div>
            {/* End the fieldset element. */}
            </fieldset>
            {/* Group the related radio choices so the shopper knows what they select. */}
            <fieldset>
              {/* Name the radio group for both visual and screen-reader users. */}
              <legend>Choose a service</legend>
              {/* Group the service options content so the stylesheet can position it. */}
              <div className="service-options">
                {/* Build one service card for Cleaning and another for Training. */}
                {(['Cleaning', 'Training'] as const).map((kind) => {
                  /* Read the correct description, duration and price for this species and service. */
                  const session = sessions[pet][kind];
                  /* Return the JSX that React should display here. */
                  return (
                    /* Label the input nested inside so its text also activates the control. */
                    <label className="service-card" key={kind}>
                      {/* Render the input using the field settings below. */}
                      <input
                        /* Choose how the browser treats this control. */
                        type="radio"
                        /* Identify this input or group of choices by name. */
                        name="service"
                        /* Select this radio button when its choice matches React state. */
                        checked={service === kind}
                        /* Give this control an accessible name for screen readers and tests. */
                        aria-label={kind}
                        /* Update React state when this control’s value changes. */
                        onChange={() => setService(kind)}
                      /* Finish the self-closing tag for input. */
                      />
                      {/* Use the service info style for this inline part of the interface. */}
                      <span className="service-info">
                        {/* Display the supporting information in smaller type. */}
                        <small>{kind}</small>
                        {/* Emphasize this price, name or label. */}
                        <strong>{session.title}</strong>
                        {/* Group this inline text or value. */}
                        <span>{session.detail}</span>
                      {/* End the span element. */}
                      </span>
                      {/* Use the service cost style for this inline part of the interface. */}
                      <span className="service-cost">
                        {/* Insert money(session.cents) into the rendered content. */}
                        {money(session.cents)}
                        {/* Display the supporting information in smaller type. */}
                        <small>{session.minutes} min</small>
                      {/* End the span element. */}
                      </span>
                    {/* End the label element. */}
                    </label>
                  /* Finish this JSX return value. */
                  );
                /* Finish building this list and return to the surrounding JSX. */
                })}
              {/* End the div element. */}
              </div>
            {/* End the fieldset element. */}
            </fieldset>
            {/* Group the visit fields content so the stylesheet can position it. */}
            <div className="visit-fields">
              {/* Label the input nested inside so its text also activates the control. */}
              <label>
                {/* Show this wording to the shopper in the surrounding element. */}
                Pet’s name
                {/* Render the input using the field settings below. */}
                <input
                  /* Identify this input or group of choices by name. */
                  name="petName"
                  /* Tell the browser which saved value it can suggest here. */
                  autoComplete="off"
                  /* Show a hint while the field is empty. */
                  placeholder="e.g. Misty"
                  /* Mark this input as required so assistive technology can announce it. */
                  required
                  /* Limit how many characters can be entered. */
                  maxLength={60}
                  /* Show the current value from state in this control. */
                  value={petName}
                  /* Flag this input when there is a validation error. */
                  aria-invalid={!!errors.petName}
                  /* Connect the input to its explanation or validation message. */
                  aria-describedby={errors.petName ? 'pet-name-error' : undefined}
                  /* Update React state when this control’s value changes. */
                  onChange={(event) => {
                    /* Copy the new name from the input into React state. */
                    setPetName(event.target.value);
                    /* Clear the old name warning while keeping any warning on the date. */
                    setErrors({ ...errors, petName: undefined });
                  /* Finish the expression inside the JSX braces. */
                  }}
                /* Finish the self-closing tag for input. */
                />
                {/* Render the name warning only when validation supplied a message. */}
                {errors.petName && (
                  /* Display the supporting information in smaller type. */
                  <small role="alert" className="error" id="pet-name-error">
                    {/* Insert errors.petName into the rendered content. */}
                    {errors.petName}
                  {/* End the small element. */}
                  </small>
                /* Finish the expression inside the JSX braces. */
                )}
              {/* End the label element. */}
              </label>
              {/* Label the input nested inside so its text also activates the control. */}
              <label>
                {/* Show this wording to the shopper in the surrounding element. */}
                Preferred date
                {/* Render the input using the field settings below. */}
                <input
                  /* Choose how the browser treats this control. */
                  type="date"
                  /* Identify this input or group of choices by name. */
                  name="day"
                  /* Mark this input as required so assistive technology can announce it. */
                  required
                  /* Set the smallest valid value or earliest selectable date. */
                  min={localDate()}
                  /* Show the current value from state in this control. */
                  value={day}
                  /* Flag this input when there is a validation error. */
                  aria-invalid={!!errors.day}
                  /* Connect the input to its explanation or validation message. */
                  aria-describedby={errors.day ? 'visit-day-error' : undefined}
                  /* Update React state when this control’s value changes. */
                  onChange={(event) => {
                    /* Copy the selected date into React state. */
                    setDay(event.target.value);
                    /* Clear the old date warning while keeping any warning on the pet name. */
                    setErrors({ ...errors, day: undefined });
                  /* Finish the expression inside the JSX braces. */
                  }}
                /* Finish the self-closing tag for input. */
                />
                {/* Render the date warning if the submitted day was missing or in the past. */}
                {errors.day && (
                  /* Display the supporting information in smaller type. */
                  <small role="alert" className="error" id="visit-day-error">
                    {/* Insert errors.day into the rendered content. */}
                    {errors.day}
                  {/* End the small element. */}
                  </small>
                /* Finish the expression inside the JSX braces. */
                )}
              {/* End the label element. */}
              </label>
            {/* End the div element. */}
            </div>
            {/* Create a button the shopper can activate with the mouse or keyboard. */}
            <button type="submit" className="button primary">
              {/* Show this wording to the shopper in the surrounding element. */}
              Request demo visit <Icon name="arrow" size={16} />
            {/* End the button element. */}
            </button>
            {/* Render this paragraph for the shopper. */}
            <p className="summary-note">Practice booking only. Choose a sample date and pet name.</p>
          {/* End the form element. */}
          </form>
        /* Finish the expression inside the JSX braces. */
        )}
      {/* End the div element. */}
      </div>
    {/* End the div element. */}
    </div>
  /* Finish this JSX return value. */
  );
/* End the Services function. */
}
