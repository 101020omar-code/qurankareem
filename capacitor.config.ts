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
};

export default config;
