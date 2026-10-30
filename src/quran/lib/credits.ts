export const START_CREDITS = 100;
export const QUESTION_COST = 15;
/** Rewarded-ad packages: number of 30s videos watched -> credits earned. */
export const AD_PACKAGES = [
  { ads: 2, credits: 50 },
  { ads: 3, credits: 105 },
] as const;

export const canAsk = (balance: number) => balance >= QUESTION_COST;
export const afterQuestion = (balance: number) => Math.max(0, balance - QUESTION_COST);
export function rewardFor(adsWatched: number): number {
  const pkg = AD_PACKAGES.find((p) => p.ads === adsWatched);
  return pkg ? pkg.credits : 0;
}

/** Credits granted automatically when the navigation reward video is watched. */
export const NAV_VIDEO_REWARD = 5;

/** Image interstitial: shown on navigation when at least 4 minutes passed since the last one. */
export const INTERSTITIAL_MIN_GAP_MS = 4 * 60 * 1000;
export const canShowInterstitial = (lastShownAt: number, now: number) =>
  now - lastShownAt >= INTERSTITIAL_MIN_GAP_MS;

/** Navigation reward video: after 3 navigations, once those 4 minutes passed. */
export const NAV_VIDEO_MIN_NAVS = 3;
export const NAV_VIDEO_MIN_GAP_MS = 4 * 60 * 1000;
export const canShowNavVideo = (navsSinceVideo: number, lastVideoAt: number, now: number) =>
  navsSinceVideo >= NAV_VIDEO_MIN_NAVS && now - lastVideoAt >= NAV_VIDEO_MIN_GAP_MS;

/** The navigation reward video must start at most this long after the image ad closes. */
export const VIDEO_START_MAX_WAIT_MS = 5_000;

const KEY = "illuminated-credits";
export function loadCredits(): number {
  const v = localStorage.getItem(KEY);
  return v === null ? START_CREDITS : Number(v) || 0;
}
export function saveCredits(n: number) {
  localStorage.setItem(KEY, String(n));
}
