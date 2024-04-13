/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./pages/*.{html,js}", "index.html","./assets/js/**/*.{html,js}"],
	theme: {
		extend: {
			animation: {
				showMessage: "showMessage 1s cubic-bezier(0.13, 0.22, 0.2, 1.18) 1 forwards",
				hideMessage: "hideMessage 1s 1 forwards cubic-bezier(0.68, -0.24, 1, 0.68)",
				timeMessage: "timeMessage 1s linear 1s forwards",
			},
			keyframes: {
				showMessage: {
					"0%": { transform: "translateX(400px)" },
					"80%": { transform: "translateX(-50px)" },
					"100%": { transform: "translateX(0)" },
				},
				hideMessage: {
					"0%": { transform: "translateX(0)" },
					"10%": { transform: "translateX(-100px)" },
					"100%": { transform: "translateX(400px)" },
				},
				timeMessage: {
					"0%": {
						width: "100%",
					},
					"100%": { width: "0%" },
				},
			},
			colors: {
				grey: "#FAFAFA",
				dark: "#1a1a1a",
				"dark-transparent": "rgba(0, 0, 0, 0.5)",
				"purple-light": "#C6CEFF",
				"green-active": "#088178",
				"primary-light": "#e3e6f3",
			},
			fontFamily: {
				spartan: ["Spartan", "san-serif"],
			},
			backgroundImage: {
				customer: "url('../src/assets/bg_customer.png')",
				liner: "linear-gradient(200deg, #7045d3, #AB65F0);",
			},
			screens: {
				sm: "576px",
				md: "768px",
				lg: "992px",
				xl: "1200px",
				"2xl": "1536px",
			},
		},
	},
	plugins: [],
};
