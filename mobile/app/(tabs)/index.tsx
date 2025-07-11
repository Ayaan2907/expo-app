import React from 'react'
import { View, TouchableOpacity, ActivityIndicator, RefreshControl, ScrollView, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { 
  MapPin, 
  Droplets, 
  Wind, 
  Eye, 
  Gauge,
  RefreshCw,
  Clock,
  Sun,
  Thermometer,
  CloudRain,
  Zap,
  LogOut
} from 'lucide-react-native'
import { router } from 'expo-router'
import { useAuth, useUser } from '@clerk/clerk-expo'

import { Text } from '~/components/ui/text'
import { H1, Large, Muted } from '~/components/ui/typography'
import { Card } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { useSettingsStore } from '~/lib/settings-store'

export default function HomeScreen() {
  const { temperatureUnit, windSpeedUnit, precipitationUnit } = useSettingsStore()
  const { signOut } = useAuth()
  const { user } = useUser()

  const handleSignOut = async () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Sign Out', 
          style: 'destructive',
          onPress: async () => {
            await signOut()
            router.replace('/')
          }
        }
      ]
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['bottom']}>
      <ScrollView 
        className="flex-1"
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={() => {}} />
        }>
        <View className="p-5 space-y-6">
          {/* User Header */}
          <View className="items-center space-y-2">
            <View className="flex-row items-center justify-between w-full">
              <View className="flex-1">
                <Text className="text-2xl font-bold">Welcome back!</Text>
                <Text className="text-muted-foreground">
                  {user?.firstName} {user?.lastName}
                </Text>
                <Text className="text-sm text-muted-foreground">
                  {user?.emailAddresses[0]?.emailAddress}
                </Text>
              </View>
              <Button 
                variant="ghost" 
                size="sm"
                onPress={handleSignOut}
                className="p-2">
                <LogOut size={20} className="text-muted-foreground" />
              </Button>
            </View>
          </View>

          {/* Weather Dashboard Placeholder */}
          <Card className="p-6">
            <View className="items-center space-y-4">
              <Sun size={48} className="text-yellow-500" />
              <View className="items-center space-y-2">
                <Text className="text-xl font-semibold">Weather Dashboard</Text>
                <Text className="text-muted-foreground text-center">
                  Your protected weather dashboard is now accessible!
                </Text>
              </View>
              <Text className="text-sm text-muted-foreground text-center">
                This content is only visible to authenticated users.
              </Text>
            </View>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
} 
