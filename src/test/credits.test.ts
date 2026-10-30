import { describe, expect, it } from "vitest";
import { NAV_VIDEO_MIN_NAVS, NAV_VIDEO_REWARD, START_CREDITS, VIDEO_START_MAX_WAIT_MS, afterQuestion, canAsk, canShowInterstitial, canShowNavVideo, rewardFor } from "@/quran/lib/credits";

describe("illuminated book credits", () => {
  it("starts with 100 credits", () => expect(START_CREDITS).toBe(100));
  it("each question costs 15", () => expect(afterQuestion(100)).toBe(85));
  it("cannot ask with less than 15", () => { expect(canAsk(14)).toBe(false); expect(canAsk(15)).toBe(true); });
  it("2 ads give 50", () => expect(rewardFor(2)).toBe(50));
  it("3 ads give 105", () => expect(rewardFor(3)).toBe(105));
  it("1 ad gives nothing", () => expect(rewardFor(1)).toBe(0));
});

describe("ad timing rules set by the user", () => {
  it("image ad shows when 4 minutes passed", () => expect(canShowInterstitial(0, 240_000)).toBe(true));
  it("image ad not before 4 minutes", () => expect(canShowInterstitial(0, 239_999)).toBe(false));
  it("video shows after 3 navigations once 4 minutes passed", () => expect(canShowNavVideo(NAV_VIDEO_MIN_NAVS, 0, 240_000)).toBe(true));
  it("video not before 3 navigations", () => expect(canShowNavVideo(2, 0, 240_000)).toBe(false));
  it("video not before the 4 minutes passed", () => expect(canShowNavVideo(3, 0, 200_000)).toBe(false));
  it("video starts at most 5 seconds after the image ad closes", () => expect(VIDEO_START_MAX_WAIT_MS).toBe(5_000));
  it("watching the navigation video adds 5 credits", () => expect(NAV_VIDEO_REWARD).toBe(5));
});
