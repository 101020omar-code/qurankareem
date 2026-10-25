import { Capacitor } from "@capacitor/core";
import { shouldShowInterstitial } from "./credits";

// Google's official TEST ids. Replace with real AdMob ids before release.
export const AD_IDS = {
  banner: "ca-app-pub-3940256099942544/6300978111",
  interstitial: "ca-app-pub-3940256099942544/1033173712",
  rewarded: "ca-app-pub-3940256099942544/5224354917",
};
const TESTING = true;

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
    const { AdMob } = await lib();
    await AdMob.prepareInterstitial({ adId: AD_IDS.interstitial, isTesting: TESTING });
    await AdMob.showInterstitial();
    lastShown = Date.now();
  } catch { /* no ad available */ }
}

/** Shows one rewarded video; resolves true only if Google reports the reward. */
export async function showRewarded(): Promise<boolean> {
  if (!adsAvailable()) return false;
  try {
    await init();
    const { AdMob, RewardAdPluginEvents } = await lib();
    let rewarded = false;
    const h = await AdMob.addListener(RewardAdPluginEvents.Rewarded, () => { rewarded = true; });
    await AdMob.prepareRewardVideoAd({ adId: AD_IDS.rewarded, isTesting: TESTING });
    await AdMob.showRewardVideoAd();
    await h.remove();
    return rewarded;
  } catch {
    return false;
  }
}
