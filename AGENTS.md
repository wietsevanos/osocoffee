# Project conventions
- Keep menu products, variants and service windows in `src/lib/menu-data.ts`; shared opening hours and vacancies belong in `src/lib/business-data.ts` so business rules have one source.
- Use TanStack Router file routes on the existing Vite SPA and do not introduce a server; static hosting already supports SPA fallback.
- Use the existing Button component for new controls and global semantic brand tokens for presentation so additions preserve OSO's house style.
- Keep business-rule tests next to data modules and run them with `bun run test`; prices, service windows, opening hours and vacancy changes must have concrete assertions.