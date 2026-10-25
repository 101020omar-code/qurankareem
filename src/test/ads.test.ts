import { describe, expect, it } from "vitest";
import { AD_IDS } from "@/quran/lib/ads";
import { NAV_VIDEO_REWARD } from "@/quran/lib/credits";

const APP = "ca-app-pub-4072506919111365";

describe("real AdMob unit ids", () => {
  it("banner matches the id the user supplied", () => expect(AD_IDS.banner).toBe(`${APP}/9417628859`));
  it("interstitial image matches the id the user supplied", () => expect(AD_IDS.interstitial).toBe(`${APP}/6316822793`));
  it("illuminated-book reward video matches the id the user supplied", () => expect(AD_IDS.rewarded).toBe(`${APP}/4165302170`));
  it("navigation reward video matches the id the user supplied", () => expect(AD_IDS.navRewarded).toBe(`${APP}/4460815640`));
});

describe("navigation reward video", () => {
  it("grants 5 credits when watched", () => expect(NAV_VIDEO_REWARD).toBe(5));
});
