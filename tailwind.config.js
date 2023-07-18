/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	daisyui: {
		themes: ["cupcake", "dark"],
		// themes: ["dark"],
	},
	plugins: [require("daisyui"), require("@tailwindcss/forms")],
};
