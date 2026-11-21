/* Describe the information every adoption profile needs. */
export interface AdoptionPet {
  /* Use a short, unique word for the pet's page address. */
  id: string;
  /* Keep the display name separate from its lowercase address. */
  name: string;
  /* Allow only the two species shown in the gallery filters. */
  species: 'Cat' | 'Dog';
  /* Store a readable age, including its unit. */
  age: string;
  /* Describe the coat or breed mix to help people recognize this pet. */
  appearance: string;
  /* Point to the portrait bundled with the website. */
  photo: string;
  /* Describe the actual photograph for readers who cannot see it. */
  alt: string;
  /* Introduce a memorable habit on the gallery card. */
  introduction: string;
  /* Tell a longer story on the pet's own page. */
  story: string;
  /* Describe the surroundings where this fictional pet feels comfortable. */
  home: string;
  /* Give a concrete example of an everyday care or play routine. */
  routine: string;
/* Finish the shared shape of a pet record. */
}

/* Keep all four fictional profiles together so cards and detail pages agree. */
export const adoptionPets: AdoptionPet[] = [
  /* Start the profile for the grey cat from the home page. */
  {
    /* Use this ID in links to Miso's profile. */
    id: 'miso',
    /* Print this name on her card. */
    name: 'Miso',
    /* Include Miso when someone chooses Cats. */
    species: 'Cat',
    /* Show her age in years. */
    age: '3 years',
    /* Describe her grey coat and white bib. */
    appearance: 'Grey-and-white tabby',
    /* Reuse her familiar garden portrait. */
    photo: './images/grey-cat.webp',
    /* Describe what Miso is doing in this image. */
    alt: 'Miso, a grey-and-white tabby with white paws, sitting on a garden step',
    /* Give the gallery a quick glimpse of her personality. */
    introduction: 'A quiet window watcher who keeps a seat warm for you.',
    /* Show how she builds trust in her own time. */
    story: 'Miso likes to watch a room before joining in. Sit nearby with a book and she’ll eventually tap your ankle, turn twice, and settle beside you. The birds outside can interrupt almost any nap.',
    /* Describe her ideal living space. */
    home: 'A calm home with a sunny perch and a quiet corner where she can greet visitors at her own pace.',
    /* Describe a familiar activity and the way she prefers attention. */
    routine: 'A short feather-wand game in the evening, followed by a few gentle brush strokes when she leans in.',
  /* Close Miso's profile and begin the next entry. */
  },
  /* Start the spaniel's profile. */
  {
    /* Give Scout an address that can be bookmarked. */
    id: 'scout',
    /* Display his name on the site. */
    name: 'Scout',
    /* Include Scout in the Dogs filter. */
    species: 'Dog',
    /* Describe his age in years. */
    age: '4 years',
    /* Describe his long ears and rich coat color. */
    appearance: 'Golden spaniel',
    /* Use the woodland photo from the dog collection. */
    photo: './images/field-spaniel.webp',
    /* Describe the visible subject of the photo. */
    alt: 'Scout, a golden spaniel with long wavy ears, sitting on a woodland trail',
    /* Describe what makes a walk with Scout memorable. */
    introduction: 'Takes the scenic route and stops for every interesting leaf.',
    /* Describe how his energy changes across an ordinary day. */
    story: 'Scout waits by the door when he hears a lead jingle. On a walk he likes to investigate one good patch of grass thoroughly. Back home, he usually falls asleep with his chin on someone’s shoe.',
    /* Describe the home routine that suits him. */
    home: 'Someone who enjoys unhurried daily walks and has a spot by the door for one muddy towel.',
    /* Tell visitors which games and care he already enjoys. */
    routine: 'Hide a toy for him to sniff out, then let him unwind. A gentle comb through his long ears is part of his evening routine.',
  /* Close Scout's profile. */
  },
  /* Start the tuxedo cat's profile. */
  {
    /* Give Fig a short profile address. */
    id: 'fig',
    /* Display her name on the site. */
    name: 'Fig',
    /* Include Fig in the Cats filter. */
    species: 'Cat',
    /* Use months for a cat under one year old. */
    age: '10 months',
    /* Describe the black-and-white markings in her photo. */
    appearance: 'Tuxedo shorthair',
    /* Load the portrait made for Fig. */
    photo: './images/adopt-fig.webp',
    /* Describe her markings and the box beside her. */
    alt: 'Fig, a black-and-white tuxedo cat, peeking over a cardboard box',
    /* Introduce her favorite game in one sentence. */
    introduction: 'First to inspect an empty box and last to leave it.',
    /* Illustrate her curiosity through familiar behaviors. */
    story: 'Fig follows the sound of unpacking. Give her an open box and she’ll test every corner before popping up to see who’s watching. When playtime ends, she looks for a warm lap.',
    /* Explain why an active home suits Fig. */
    home: 'A home with room for a climbing perch and someone who enjoys several short play breaks during the day.',
    /* Describe the play and rest she enjoys. */
    routine: 'She likes chasing a soft ball down the hall, scratching her post, and retreating to a box for a nap.',
  /* Close Fig's profile. */
  },
  /* Start the small terrier mix's profile. */
  {
    /* Give Pippin a unique address. */
    id: 'pippin',
    /* Show the same name on his card and detail page. */
    name: 'Pippin',
    /* Include him when visitors filter for dogs. */
    species: 'Dog',
    /* Display his age in years. */
    age: '7 years',
    /* Describe the scruffy coat visible in the portrait. */
    appearance: 'Scruffy terrier mix',
    /* Load his portrait on a blue cushion. */
    photo: './images/adopt-pippin.webp',
    /* Describe the subject and setting for a screen reader. */
    alt: 'Pippin, a small sandy-colored dog with a whiskery muzzle, resting on a blue cushion',
    /* Introduce the habit visitors will read more about on his page. */
    introduction: 'A porch sitter with a whiskery chin and a fondness for company.',
    /* Paint a picture of his day without promising a particular behavior. */
    story: 'Pippin follows the patch of sun across the porch. He perks up for a gentle stroll, then brings a soft toy back to his cushion. His favorite company is someone happy to sit beside him.',
    /* Explain which surroundings suit him. */
    home: 'A household that enjoys a steady routine, with an easy-to-reach bed and a quiet place for afternoon naps.',
    /* Describe his preferred pace and daily care. */
    routine: 'He enjoys familiar walking routes with plenty of sniffing stops and a gentle brush through his wiry coat.',
  /* Close the last profile. */
  },
/* Finish the list that the adoption gallery displays. */
];
