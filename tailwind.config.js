export default {
  content: ["./index.html", "./src/**/*.{html,js,ts,jsx,tsx}"],
    theme: {
      extend: {
        colors: {
          'success-100': '#49de50',
          'success-200': '#42c748',
          'destructive-100': '#f75353',
          'destructive-200': '#c44141',
          'primary-50': '#f0efff',
          'primary-100': '#dddfff',
          'primary-200': '#cac5fe',
          'primary-300':'#a8a1fd',
          'light-100': '#d6e0ff',
          'light-400': '#6870a6',
          'light-600': '#4f557d',
          'light-800': '#24273a',
          'dark-100': '#020408',
          'dark-200': '#27282f',
          'dark-300': '#242633',
        },
        fontFamily: {
          'mona-sans': ['Mona Sans', 'sans-serif'],
        },
      },
    },
    plugins: [],
  };