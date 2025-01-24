module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Georgia', 'serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            h3: {
              fontSize: '32px',
              fontWeight: 'bold',
            },
            p: {
              fontSize: '22px'
            },
            a: {
              fontSize: '22px'
            }

          },
        },
      },
    },
  },

  plugins: [require('@tailwindcss/typography')],
};
