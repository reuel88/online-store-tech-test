module.exports = {
  purge: ['src/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      outline: {
        indigo: ['0.125rem solid #4F46E5', '0.0625rem']
      },
      gridTemplateColumns: {
        cartItem: '100px auto auto'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
