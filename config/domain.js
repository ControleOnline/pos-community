import { DOMAIN_LOCAL } from "./domain.local";
export const DOMAIN = DOMAIN_LOCAL || process.env.APP_DOMAIN || location.host;
