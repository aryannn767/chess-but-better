/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",                     // Main HTML file
        "./src/**/*.{html,js,ts,jsx,tsx}", // All source files in src
        "./pages/**/*.{html,js,ts,jsx,tsx}", // Optional pages folder
        "./components/**/*.{html,js,ts,jsx,tsx}", // Optional components folder
    ],
    theme: {
        extend: {},
    },
    plugins: [],
};

