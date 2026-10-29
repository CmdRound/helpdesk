import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    // The app runs behind a preview proxy, so accept any host name.
    allowedHosts: true,
  },
  test: {
    environment: "jsdom",
  },
});
