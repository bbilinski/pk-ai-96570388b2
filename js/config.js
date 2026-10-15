/*
 * Demo links for the "Demo" button on each prototype page.
 * Replace each placeholder with the 119 workspace or page URL.
 * Leave a value that starts with "REPLACE" and the button shows as not set.
 */
window.DEMO_URLS = {
  "material-risk":     "https://mingle-portal.inforcloudsuite.com/v2/SLSGDENA119_DEM/574ea13a-b367-438b-b813-fe77ad352f36",
  "project-margin":    "https://mingle-portal.inforcloudsuite.com/v2/SLSGDENA119_DEM/eebe7738-e6cd-46b5-99d9-7dead222af3e",
  "cash-application":  "https://mingle-portal.inforcloudsuite.com/v2/SLSGDENA119_DEM/c2144b65-1b69-406a-a364-76ed4ef7370d",
  "engineering-release": "https://mingle-portal.inforcloudsuite.com/v2/SLSGDENA119_DEM/127e097a-0941-471c-8d60-6d84ee40dd1a",
  "quality-root-cause":  "https://mingle-portal.inforcloudsuite.com/v2/SLSGDENA119_DEM/f0a0e0bf-15ae-4ce2-8dc1-84782e7f3128"
};

/*
 * Where the Demo link opens.
 * "_top"   leaves this app and opens the workspace in the same portal tab.
 * "_blank" opens a new browser tab.
 */
window.DEMO_TARGET = "_top";

/* Use cases hidden from this presentation until their live pages are ready (her call, Oct 15).
 * Remove an id from this list to bring its pages, cards and links back. */
window.HIDE_CASES = ["cash-application", "engineering-release", "quality-root-cause"];
