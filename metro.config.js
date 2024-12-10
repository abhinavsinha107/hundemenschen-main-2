const { getDefaultConfig } = require("expo/metro-config");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

config.transformer = {
  ...config.transformer,
  babelTransformerPath: require.resolve("react-native-svg-transformer"), // Enables SVG transformer
};

config.resolver = {
  ...config.resolver,
  assetExts: config.resolver.assetExts.filter((ext) => ext !== "svg"), // Remove 'svg' from asset extensions
  sourceExts: [...config.resolver.sourceExts, "svg", "sql"], // Add 'svg' and 'sql' to source extensions
};

module.exports = config;
