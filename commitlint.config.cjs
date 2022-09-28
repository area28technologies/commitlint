const fixupCheck = (parsedCommit) => {
  const { header } = parsedCommit;
  return [!header.startsWith("fixup!"), `fixup! commits are not allowed.`];
};

const Configuration = {
  extends: ["@commitlint/config-conventional"],
  plugins: ["commitlint-plugin-function-rules"],
  defaultIgnores: false, // removes default ignore for fixup! commits
  rules: {
    // explicitly define default rule because the corresponding function rule overrides it otherwise
    "header-max-length": [2, "always", 72],
    // bit hacky but using this rule to check for fixup! commits
    "function-rules/header-max-length": [2, "always", fixupCheck,],
  },
};

module.exports = Configuration;
