import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "app.lovable.quranreader",
  appName: "تقوى القلوب | محمد صديق المنشاوي | تطبيق متكامل",
  webDir: "dist/client",
  server: {
    // The app uses server functions (AI answers), so the Android shell loads the hosted app.
    url: "https://id-preview--5662eb05-d26a-475c-821e-a00991de0356.lovable.app?forceHideBadge=true",
    cleartext: true,
  },
  android: {
    allowMixedContent: false,
  },
  plugins: {
    Admob: {
      // Publisher app ID provided by the user (2026-10-25).
      appID: "ca-app-pub-4072506919111365~3383451970",
    // Ad unit IDs in src/quran/lib/ads.ts are the user's real ids (2026-10-25);
    // live ads, so initializeForTesting is false.
    initializeForTesting: false,
    },
  },
};

export default config;
