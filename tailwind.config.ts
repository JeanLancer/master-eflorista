/* eslint-disable @typescript-eslint/no-require-imports */
import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                lexand: ["var(--font-centra-nube)"],
            },
            colors: {
                white: "#FFFFFF",
                black: "#242424",
                gray: {
                    100: "#919191",
                    200: "#979797",
                    300: "#373738",
                    400: "#2F2F2F",
                },
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                chart: {
                    "1": "hsl(var(--chart-1))",
                    "2": "hsl(var(--chart-2))",
                    "3": "hsl(var(--chart-3))",
                    "4": "hsl(var(--chart-4))",
                    "5": "hsl(var(--chart-5))",
                },
                white: {
                    DEFAULT: "hsl(0, 0%, 98%)",
                },
                blue: {
                    DEFAULT: "hsl(var(--primary-base))",
                },
                sidebar: {
                    DEFAULT: "hsl(var(--sidebar-background))",
                    foreground: "hsl(var(--sidebar-foreground))",
                    primary: "hsl(var(--sidebar-primary))",
                    "primary-foreground":
                        "hsl(var(--sidebar-primary-foreground))",
                    accent: "hsl(var(--sidebar-accent))",
                    "accent-foreground":
                        "hsl(var(--sidebar-accent-foreground))",
                    border: "hsl(var(--sidebar-border))",
                    ring: "hsl(var(--sidebar-ring))",
                },
                success: {
                    100: "#DCFFF1",
                    200: "#BAF3DB",
                    300: "#7EE2B8",
                    400: "#4BCE97",
                    500: "#2ABB7F",
                    600: "#22A06B",
                    700: "#1F845A",
                    800: "#216E4E",
                    900: "#164B35",
                    1000: "#1C3329",
                },
                warning: {
                    100: "#FFF7D6",
                    200: "#F8E6A0",
                    300: "#F5CD47",
                    400: "#E2B203",
                    500: "#CF9F02",
                    600: "#B38600",
                    700: "#946F00",
                    800: "#7F5F01",
                    900: "#533F04",
                    1000: "#332E1B",
                },
                danger: {
                    100: "#FFECEB",
                    200: "#FFD5D2",
                    300: "#FD9891",
                    400: "#F87168",
                    500: "#F15B50",
                    600: "#E2483D",
                    700: "#C9372C",
                    800: "#AE2E24",
                    900: "#5D1F1A",
                    1000: "#42221F",
                },
                info: {
                    100: "#F3F0FF",
                    200: "#DFD8FD",
                    300: "#B8ACF6",
                    400: "#9F8FEF",
                    500: "#8F7EE7",
                    600: "#8270DB",
                    700: "#6E5DC6",
                    800: "#5E4DB2",
                    900: "#352C63",
                    1000: "#2B273F",
                },
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
} satisfies Config;
