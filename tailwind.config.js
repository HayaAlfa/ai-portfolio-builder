/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./pages/**/*.{js,jsx,ts,tsx}",
      "./components/**/*.{js,jsx,ts,tsx}",
      "./app/**/*.{js,jsx,ts,tsx}", // ok to include even if you don't have /app
    ],
    theme: { extend: {} },
    plugins: [],
  };
  