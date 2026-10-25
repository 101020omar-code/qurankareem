import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "app.lovable.quranreader",
  appName: "تقوى القلوب | محمد صديق المنشاوي | تطبيق متكامل",
  webDir: "dist/client",
  server: {
    // The app uses server functions (AI answers), so the Android shell loads the hosted app.
    // Replace with the published URL before releasing.
    url: "https://id-preview--3b96406e-b4a3-4945-8e8b-1588a7a18415.lovable.app?forceHideBadge=true",
    cleartext: true,
  },
  android: {
    allowMixedContent: false,
  },
  plugins: {
    Admob: {
      // Publisher app ID provided by the user (2026-10-25).
      appID: "ca-app-pub-4072506919111365~3383451970",
      // Ad unit IDs in src/quran/lib/ads.ts are still Google's TEST ids;
      // set this to false together with real ad unit ids before release.
      initializeForTesting: true,
    },
  },
};

export default config;
