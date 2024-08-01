import { ENTRYPOINT } from "../../../../../config/entrypoint.js";
import SubmissionError from "../error/SubmissionError.js";

export default function (id, options = {}) {
  const entryPoint = ENTRYPOINT + (ENTRYPOINT.endsWith("/") ? "" : "/");
  return fetch(new URL(id, entryPoint), options)
    .then((response) => {
      if (response.ok) {
        return response;
      }
      return response
        .json()
        .then((json) => {
          const error = json["hydra:description"]
            ? json["hydra:description"]
            : response.statusText;
          if (!json.violations) {
            throw Error(error);
          }
          const errors = { _error: error };
          json.violations.map((violation) =>
            Object.assign(errors, {
              [violation.propertyPath]: violation.message,
            })
          );
          throw new SubmissionError(errors);
        })
        .finally(() => {
          
        });
    })
    .then((response) => response.json());
}
