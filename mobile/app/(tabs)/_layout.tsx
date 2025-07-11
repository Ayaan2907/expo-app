import { Tabs, router } from 'expo-router'; 
import { View, Pressable, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Settings } from 'lucide-react-native';
import { useColorScheme } from '~/lib/useColorScheme';
import { formatCoordinates } from '~/lib/utils';
import { Text } from '~/components/ui/text';
import { CustomStatusBar } from '~/components/CustomStatusBar';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@clerk/clerk-expo';
import { useEffect } from 'react';

export default function TabLayout() {
  const { isDarkColorScheme } = useColorScheme();
  const { isSignedIn, isLoaded } = useAuth();

  // Redirect to sign-in if not authenticated
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.replace('/');
    }
  }, [isLoaded, isSignedIn]);

  // Show loading while checking authentication
  if (!isLoaded) {
    return (
      <View className="flex-1 justify-center items-center bg-background">
        <ActivityIndicator size="large" />
        <Text className="mt-4 text-muted-foreground">Loading...</Text>
      </View>
    );
  }

  // Don't render tabs if not signed in
  if (!isSignedIn) {
    return null;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: isDarkColorScheme ? '#60a5fa' : '#3b82f6',
        tabBarInactiveTintColor: isDarkColorScheme ? '#6b7280' : '#9ca3af',
        tabBarStyle: {
          backgroundColor: isDarkColorScheme ? '#1f2937' : '#ffffff',
          borderTopColor: isDarkColorScheme ? '#374151' : '#e5e7eb',
        },
        headerShown: true,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
