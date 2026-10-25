import { Capacitor } from "@capacitor/core";
import { NAV_VIDEO_REWARD, loadCredits, saveCredits, shouldShowInterstitial } from "./credits";

// Real AdMob unit ids supplied by the user (2026-10-25). Live ads, not test ads.
export const AD_IDS = {
  banner: "ca-app-pub-4072506919111365/9417628859",
  interstitial: "ca-app-pub-4072506919111365/6316822793",
  rewarded: "ca-app-pub-4072506919111365/4165302170",
  navRewarded: "ca-app-pub-4072506919111365/4460815640",
};
const TESTING = false;

export const adsAvailable = () => Capacitor.isNativePlatform();
const lib = () => import("@capacitor-community/admob");

let ready: Promise<void> | null = null;
function init() {
  if (!ready) ready = lib().then(({ AdMob }) => AdMob.initialize({ initializeForTesting: TESTING }));
  return ready;
}

let bannerShown = false;
export async function setBanner(visible: boolean) {
  if (!adsAvailable() || visible === bannerShown) return;
  try {
    await init();
    const { AdMob, BannerAdPosition, BannerAdSize } = await lib();
    if (visible) {
      await AdMob.showBanner({ adId: AD_IDS.banner, adSize: BannerAdSize.ADAPTIVE_BANNER, position: BannerAdPosition.BOTTOM_CENTER, isTesting: TESTING });
    } else await AdMob.hideBanner();
    bannerShown = visible;
  } catch { /* ad failed; app keeps working */ }
}

let navCount = 0;
let lastShown = 0;
export async function onPageChange() {
  if (!adsAvailable()) return;
  navCount++;
  if (!shouldShowInterstitial(navCount, lastShown, Date.now())) return;
  try {
    await init();
    const { AdMob, InterstitialAdPluginEvents } = await lib();
    await AdMob.prepareInterstitial({ adId: AD_IDS.interstitial, isTesting: TESTING });
    // Wait until the interstitial is dismissed so the reward video starts after it.
    const dismissed = new Promise<void>((resolve) => {
      let h: { remove: () => Promise<void> } | null = null;
      const done = () => { h?.remove().catch(() => {}); resolve(); };
      AdMob.addListener(InterstitialAdPluginEvents.Dismissed, done).then((handle) => { h = handle; });
      setTimeout(done, 90_000);
    });
    await AdMob.showInterstitial();
    await dismissed;
    lastShown = Date.now();
  } catch { /* no interstitial available */ }
  // Rewarded video on navigation: +5 credits for the illuminated book.
  try {
    await init();
    if (await playRewarded(AD_IDS.navRewarded)) {
      const n = loadCredits() + NAV_VIDEO_REWARD;
      saveCredits(n);
    }
  } catch { /* no reward video available */ }
}

/** Plays one rewarded video; resolves true only if Google reports the reward. */
async function playRewarded(adId: string): Promise<boolean> {
  try {
    await init();
    const { AdMob, RewardAdPluginEvents } = await lib();
    let rewarded = false;
    const h = await AdMob.addListener(RewardAdPluginEvents.Rewarded, () => { rewarded = true; });
    await AdMob.prepareRewardVideoAd({ adId, isTesting: TESTING });
    await AdMob.showRewardVideoAd();
    await h.remove();
    return rewarded;
  } catch {
    return false;
  }
}

/** Shows one rewarded video; resolves true only if Google reports the reward. */
export async function showRewarded(): Promise<boolean> {
  return playRewarded(AD_IDS.rewarded);
}
