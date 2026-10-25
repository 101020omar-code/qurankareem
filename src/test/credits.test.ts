import { describe, expect, it } from "vitest";
import { START_CREDITS, afterQuestion, canAsk, rewardFor, shouldShowInterstitial } from "@/quran/lib/credits";

describe("illuminated book credits", () => {
  it("starts with 100 credits", () => expect(START_CREDITS).toBe(100));
  it("each question costs 15", () => expect(afterQuestion(100)).toBe(85));
  it("cannot ask with less than 15", () => { expect(canAsk(14)).toBe(false); expect(canAsk(15)).toBe(true); });
  it("2 ads give 50", () => expect(rewardFor(2)).toBe(50));
  it("3 ads give 105", () => expect(rewardFor(3)).toBe(105));
  it("1 ad gives nothing", () => expect(rewardFor(1)).toBe(0));
});

describe("interstitial cap", () => {
  it("shows on 5th page change when 3 minutes passed", () => expect(shouldShowInterstitial(5, 0, 200_000)).toBe(true));
  it("not within 3 minutes", () => expect(shouldShowInterstitial(10, 100_000, 200_000)).toBe(false));
  it("not on 4th page change", () => expect(shouldShowInterstitial(4, 0, 999_999)).toBe(false));
});
