/** @type {import("prettier").Config} */
const config = {
  plugins: [require.resolve('prettier-plugin-tailwindcss')],
  singleQuote: true,
  semi: false,
  printWidth: 100,
};

module.exports = config;
