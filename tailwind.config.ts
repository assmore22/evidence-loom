import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: { extend: {
    colors: { linen: "#F2EDE1", warp: "#E7DFCD", ink: "#2A2118", indigo: "#3B4A8C", madder: "#B4452F", ochre: "#B8860B", slate: "#6E6657" },
    fontFamily: { head: ["var(--font-spectral)", "Georgia", "serif"], body: ["var(--font-inter)", "system-ui", "sans-serif"], mono: ["var(--font-jbm)", "ui-monospace", "monospace"] },
    maxWidth: { reading: "720px", app: "1120px", wide: "1320px" },
    fontSize: { "fluid-page": "clamp(2rem,5vw,4rem)", "fluid-section": "clamp(1.5rem,3vw,2.6rem)", "fluid-panel": "clamp(1.05rem,1.6vw,1.4rem)" },
  } },
  plugins: [],
};
export default config;
