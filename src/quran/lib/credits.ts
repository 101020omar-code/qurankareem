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

/** Interstitial frequency cap: every 5th page change, at least 3 minutes apart. */
export const INTERSTITIAL_EVERY = 5;
export const INTERSTITIAL_MIN_GAP_MS = 3 * 60 * 1000;
export function shouldShowInterstitial(navCount: number, lastShownAt: number, now: number) {
  return navCount > 0 && navCount % INTERSTITIAL_EVERY === 0 && now - lastShownAt >= INTERSTITIAL_MIN_GAP_MS;
}

const KEY = "illuminated-credits";
export function loadCredits(): number {
  const v = localStorage.getItem(KEY);
  return v === null ? START_CREDITS : Number(v) || 0;
}
export function saveCredits(n: number) {
  localStorage.setItem(KEY, String(n));
}
