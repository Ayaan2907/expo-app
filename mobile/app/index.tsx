import React, { useEffect } from 'react'
import { View, ActivityIndicator } from 'react-native'
import { router } from 'expo-router'
import { useAuth } from '~/lib/auth-hooks'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text } from '~/components/ui/text'
import { Button } from '~/components/ui/button'

export default function IndexPage() {
  const { isSignedIn, isLoaded, user } = useAuth()

  // Redirect to tabs if user is authenticated
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.replace('/(tabs)')
    }
  }, [isLoaded, isSignedIn])

  // Show loading while checking authentication
  if (!isLoaded) {
    return (
      <SafeAreaView className="flex-1 bg-background">
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" />
          <Text className="mt-4 text-muted-foreground">Loading...</Text>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 justify-center items-center px-6">
        {/* Show when user is NOT signed in */}
        {!isSignedIn && (
          <View className="items-center space-y-6">
            <View className="items-center space-y-2">
              <Text className="text-3xl font-bold">Welcome</Text>
              <Text className="text-lg text-muted-foreground text-center">
                Please sign in to access your weather dashboard
              </Text>
            </View>
            
            <View className="space-y-4 w-full max-w-sm">
              <Button className="w-full" onPress={() => router.push('/(auth)/sign-in')}>
                <Text>Sign In</Text>
              </Button>
              
              <Button variant="outline" className="w-full" onPress={() => router.push('/(auth)/sign-up')}>
                <Text>Create Account</Text>
              </Button>
            </View>
          </View>
        )}

        {/* Show when user IS signed in */}
        {isSignedIn && (
          <View className="items-center space-y-4">
            <Text className="text-xl">Welcome, {user?.usrName}!</Text>
            <ActivityIndicator size="large" />
            <Text className="text-muted-foreground">Redirecting to dashboard...</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  )
}
