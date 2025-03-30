import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				dark: {
					1: '#1C1F2E',
					2: '#161925',
					3: '#252A41',
				},
				sky: {
					1: '#C9DDFF'
				},
				turquoise: '#5eead4',
				black: '#2F2F2F',
				white: '#fff',
			},
			backgroundImage: {
				hero: "url('/images/hero-background.png')",
			},
			fontFamily: {
				inter: ['Inter', 'sans-serif'],
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
