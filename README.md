# Pip & Paw | Pet Supply Co.

Pip & Paw is a frontend pet supply shop for dogs and cats. Its nine products are organized around walking, playing, eating, and resting. The shop uses local product images and a typed catalog, so it can run without an API or account credentials.

**Team repository** · [AmjadYounis7/1q](https://github.com/AmjadYounis7/1q)

## Run the project

Use Node.js 22.12 or later in the 22.x line, or a newer LTS version. From the extracted project folder (the one containing `package.json`), run:

```sh
npm ci
npm run dev
```

Open the local address printed by Vite. Keep that terminal open while using the site. To check the tests and production build, run:

```sh
npm test
npm run build
npm run preview
```

The production files are in `dist/`. They can be served by a static host. React Router uses hash routes so links such as `/#/checkout` also work after refresh.

## Features

| Page | What you can do |
| --- | --- |
| Home | Browse the featured collection, shop by activity, or open the dog and cat collections. |
| Products | Search by name, choose pet and activity, combine inclusive minimum and maximum USD prices, sort by price, add to cart, or save to the wishlist. |
| Cart | Adjust quantities, remove a line, clear the cart, view the subtotal and delivery charge, continue browsing, or proceed to checkout. |
| Wishlist | Save each product once, remove it, or add it to the cart while keeping it saved. |
| Checkout | Review the order, enter sample delivery details, correct inline errors, and see the order reference and itemized confirmation. |

The cart badge counts units. The wishlist badge counts unique products. Both collections survive a refresh in the same browser. Delivery costs $5 for subtotals below $60 and is free at $60 or above. Prices are in US dollars. Checkout is a simulation. It does not send or store contact details or charge a payment method.

## How the code fits together

The app uses React 19, TypeScript, React Router, Vite, and responsive CSS. Vitest and React Testing Library exercise the rendered application with jsdom and user-event.

| File | Start here when explaining… |
| --- | --- |
| `src/App.tsx` | How the five routes share one header and a single shop provider. |
| `src/data/catalog.ts` | How the Product type describes the local catalog and images. |
| `src/components/ProductCard.tsx` | How the same card works on Home, Products and Wishlist. |
| `src/features/shop.tsx` | How useReducer updates cart and wishlist, how the custom useShop hook reads context, and how localStorage restores and saves state. |
| `src/pages/Products.tsx` | How URL parameters drive name, activity, pet and price filters. Sorting runs on the filtered copy. |
| `src/utils/money.ts` | How integer cents keep subtotal, delivery and total calculations consistent. |
| `src/features/delivery.ts` | Which delivery values are valid and how errors are matched to fields. |
| `src/pages/Checkout.tsx` | Why the receipt copies the cart before dispatching clearCart. |
| `src/tests/shop.test.tsx` | How the tests open routes, interact with visible controls, and assert what a shopper sees. |

For a quick walkthrough, add two Trailhead Leads. The cart should show a $56 subtotal, $5 delivery and a $61 total. Add a third lead to reach $84 and qualify for free delivery. Save a separate product to the wishlist, refresh, then place a demo order. The receipt shows all three leads, the cart becomes empty, and the saved item stays in the wishlist.

## Automated tests

Run `npm test` for a single pass or `npm run test:watch` while developing. The seven integration tests cover combined filtering and sorting, cart quantities and delivery totals, field-level validation, persistence and wishlist toggling, the empty-checkout guard, successful order confirmation, and recovery from malformed saved data.

## Team collaboration

Amjad and each teammate should use their own GitHub accounts so the repository records genuine contributions and reviews.

1. Initialize the shared repository with the basic setup and invite your teammate as a collaborator. Create the integration branch named `dev`.
2. Each developer branches from the current `dev`. A two-person team can split catalog and browsing from cart and checkout. Agree which features and corresponding tests each person owns.
3. Make and explain your own changes, commit them regularly, and push your feature branch. Open a pull request with `dev` as its base.
4. Review a teammate’s pull request, run the relevant tests and leave specific feedback. Update your feature branch with the latest `dev` and resolve conflicts together. A teammate reviews before merge.
5. Run all tests and the production build on the integrated `dev`. Open a final pull request from `dev` to `main` and merge after review.

The GitHub evaluation uses the team’s actual commits, pull requests and peer reviews. This source package can be run independently of that workflow.

## Assets

Original AI-generated product and lifestyle images are included in `public/images/`. The Geist variable font is bundled locally via Fontsource. All product names and sample prices are fictional.
