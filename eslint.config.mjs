import nextConfig from "eslint-config-next";

const eslintConfig = [
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      "vitest.config.ts",
      "vitest.setup.ts",
    ],
  },
  ...nextConfig,
];

export default eslintConfig;

