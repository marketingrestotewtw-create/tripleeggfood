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

The homepage form posts to the server-only `/api/join-with-us` endpoint, which
writes leads to the Supabase `join_with_us_leads` table. Apply
`supabase/migrations/20260911000000_create_join_with_us_leads.sql` to the
production Supabase project, then configure these Vercel environment variables:

- `SUPABASE_URL`: the project's API URL
- `SUPABASE_SERVICE_ROLE_KEY`: the project's service-role key
- `JOIN_ADMIN_PASSWORD`: a strong password for the private `/join-admin/` page

All three values are server-only. They are read by the Vercel functions and are
never copied into `dist/` or sent to the browser. The migration enables
row-level security; lead reads are only performed server-side after validating
the signed, HttpOnly admin session cookie.
