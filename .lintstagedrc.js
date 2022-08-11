const path = require("path");

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames.map((f) => path.relative(process.cwd(), f)).join(" --file ")}`;

module.exports = {
  "**/*.{ts,tsx}": [buildEslintCommand],
  "**/*.{js,jsx,ts,tsx,json}": "prettier --write --ignore-unknown",
  "**/*.{css,scss,less}": "stylelint --fix",
};
