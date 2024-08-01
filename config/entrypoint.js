import { ENTRYPOINT_LOCAL } from "./entrypoint.local";

export const ENTRYPOINT = ENTRYPOINT_LOCAL || process.env.APP_API_ENTRYPOINT;
