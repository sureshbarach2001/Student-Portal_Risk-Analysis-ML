/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'primary-blue': '#005CA4',   // Header background
        'light-bg': '#EEF4F9',       // Page background (not used here)
        'dark-text': '#111322',      // Title text
        'button-blue': '#2A85FF',    // Buttons
        'sidebar-bg': '#E6F0FA',     // Sidebar background
        'active-link': '#D1E5F4',    // Active link background
        'risk-high': '#FF0000',      // High risk (red)
        'risk-medium': '#FFC107',    // Medium risk (yellow)
        'risk-low': '#28A745',       // Low risk (green)
      },
    },
  },
  plugins: [],
};