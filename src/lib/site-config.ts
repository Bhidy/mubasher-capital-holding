/**
 * Canonical external destinations for the Mubasher Capital Holding site.
 *
 * Third-party URLs are defined here rather than inline in components so that a
 * vendor change is a single-line edit instead of a search-and-replace.
 */

/** Languages the public site is published in. */
export type SiteLanguage = "en" | "ar";

/**
 * Mubasher's recruitment portal (Modulus MATS).
 *
 * The portal localises itself from the `lang` query parameter. Both `en` and
 * `ar` were verified against the live portal, so visitors are handed off in the
 * language they are already reading rather than always landing on English.
 */
const CAREERS_PORTAL_BASE =
  "https://mats.modulus.biz/index.php?module=rec&page=Public&action=ListVacancies";

/**
 * Builds the recruitment portal URL for a given site language.
 *
 * Anything other than `ar` falls back to `en`, so an unexpected language value
 * can never produce a query string the portal does not understand.
 */
export function careersPortalUrl(lang: SiteLanguage | string): string {
  return `${CAREERS_PORTAL_BASE}&lang=${lang === "ar" ? "ar" : "en"}`;
}

/**
 * Attributes for links that leave the site.
 *
 * `noopener` prevents the destination from reaching back through
 * `window.opener` (reverse tabnabbing); `noreferrer` covers older browsers.
 */
export const EXTERNAL_LINK_PROPS = {
  target: "_blank",
  rel: "noopener noreferrer",
} as const;
