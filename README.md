# Triple Egg website

A dependency-free, component-based static website for Triple Egg. Run `npm run
dev` for local development and `npm run build` for the production output in
`dist/`.

## Content status

### Verified from the supplied brand reference

- Triple Egg is a healthy lifestyle restaurant in Bali, inside OBSIDIAN Gym.
- The positioning centres on nutritious, delicious food.
- The official social handle supplied in the brief is `@tripleeggfood`.
- Triple Egg Green is `#1F4F2B`.

### Review required before launch

- Official menu names, descriptions, prices, categories, and photography.
- Full street address, current opening hours, and official map URL.
- Any phone, WhatsApp, email, or ordering channel.
- Current accuracy of the food-principle claims shown on the site.
- Licensed ChunkFive and Satoshi webfont files.
- Original, web-ready official logo variants and favicon.
- Open Graph social sharing image.

Menu and location content can be updated in `src/data.js`. Review-required
content is deliberately visible in the interface so an unverified fact cannot
accidentally look production-ready.

## Join With Us lead storage

The homepage form writes leads to the Supabase `join_with_us_leads` table. Apply
`supabase/migrations/20260911000000_create_join_with_us_leads.sql` to the
production Supabase project, then configure these build-time environment
variables in the hosting provider:

- `SUPABASE_URL`: the project's public API URL
- `SUPABASE_ANON_KEY`: the project's public anon/publishable key (never use a
  service-role key)

The migration enables row-level security and grants public clients insert-only
access. Public clients cannot select, update, or delete collected leads.
