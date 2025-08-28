import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#39FF14", // Neon green
          foreground: "#000000",
        },
        secondary: {
          DEFAULT: "#1A1A1A", // Dark gray/black
          foreground: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#00FF41", // Another shade of neon green
          foreground: "#000000",
        },
      },
      keyframes: {
        "fade-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "fade-in": {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
        "glow": {
          "0%, 100%": {
            textShadow: "0 0 10px #39FF14, 0 0 20px #39FF14, 0 0 30px #39FF14",
          },
          "50%": {
            textShadow: "0 0 20px #39FF14, 0 0 30px #39FF14, 0 0 40px #39FF14",
          },
        },
        "float": {
          "0%, 100%": {
            transform: "translateY(0)",
          },
          "50%": {
            transform: "translateY(-10px)",
          },
        },
        "grow": {
          "0%": {
            transform: "scale(0) translateY(20px)",
            opacity: "0",
          },
          "50%": {
            opacity: "0.5",
          },
          "100%": {
            transform: "scale(1) translateY(0)",
            opacity: "1",
          },
        },
        "bloom": {
          "0%": {
            transform: "scale(1) rotate(0deg)",
            filter: "brightness(1) hue-rotate(0deg)",
          },
          "50%": {
            transform: "scale(1.1) rotate(2deg)",
            filter: "brightness(1.2) hue-rotate(10deg)",
          },
          "100%": {
            transform: "scale(1) rotate(0deg)",
            filter: "brightness(1) hue-rotate(0deg)",
          },
        },
        "sway": {
          "0%, 100%": {
            transform: "rotate(-2deg)",
          },
          "50%": {
            transform: "rotate(2deg)",
          },
        },
        "particle-float": {
          "0%": {
            transform: "translateY(0) translateX(0) scale(0)",
            opacity: "0",
          },
          "10%": {
            opacity: "1",
            transform: "scale(1)",
          },
          "90%": {
            opacity: "1",
          },
          "100%": {
            transform: "translateY(-100px) translateX(20px) scale(0)",
            opacity: "0",
          },
        },
        "sparkle": {
          "0%, 100%": {
            transform: "scale(0) rotate(0deg)",
            opacity: "0",
          },
          "50%": {
            transform: "scale(1) rotate(180deg)",
            opacity: "1",
          },
        },
        "pulse-glow": {
          "0%, 100%": {
            boxShadow: "0 0 5px #39FF14, 0 0 10px #39FF14, 0 0 15px #39FF14",
          },
          "50%": {
            boxShadow: "0 0 10px #39FF14, 0 0 20px #39FF14, 0 0 30px #39FF14",
          },
        },
        "wind": {
          "0%, 100%": {
            transform: "translateX(0) rotate(0deg)",
          },
          "25%": {
            transform: "translateX(2px) rotate(1deg)",
          },
          "75%": {
            transform: "translateX(-2px) rotate(-1deg)",
          },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        "glow": "glow 2s ease-in-out infinite",
        "float": "float 3s ease-in-out infinite",
        "grow": "grow 1s ease-out forwards",
        "bloom": "bloom 0.6s ease-in-out",
        "sway": "sway 4s ease-in-out infinite",
        "particle-float": "particle-float 3s ease-out infinite",
        "sparkle": "sparkle 2s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "wind": "wind 3s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;