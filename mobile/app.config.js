export default {
  expo: {
    name: 'mobile',
    slug: 'mobile',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'automatic',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
    },
    web: {
      favicon: './assets/favicon.png',
      bundler: 'metro',
    },
    experiments: {
      tsconfigPaths: true,
    },
    plugins: ['expo-router'],
    extra: {
      apiUrl: process.env.EXPO_PUBLIC_API_URL || 'https://09ae-158-106-211-150.ngrok-free.app',
      clerkPublishableKey: process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY,
    },
  },
};
