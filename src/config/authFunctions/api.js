import { authHttpRequest } from "../../helpers/httpHelpers";
import baseUrl from "../baseUrl";
/**
 *
 * @param {String} url
 * @param {Object} data
 */

export const getUserAccessToken = (query) => {
  return authHttpRequest(`${baseUrl}/login`, query, "POST");
};


