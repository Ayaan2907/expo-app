import * as React from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useSignUp } from '~/lib/auth-hooks'
import { Link, useRouter } from 'expo-router'

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp()
  const router = useRouter()

  const [name, setName] = React.useState('')
  const [mobile, setMobile] = React.useState('')
  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [userType, setUserType] = React.useState('P') // Default to Primary
  const [pendingVerification, setPendingVerification] = React.useState(false)
  const [code, setCode] = React.useState('')

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return

    // Start sign-up process using all required fields
    try {
      await signUp.create({
        name,
        mobile,
        emailAddress,
        password,
        userType,
      })

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setPendingVerification(true)
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      })

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId })
        router.replace('/')
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2))
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }

  if (pendingVerification) {
    return (
      <View className="flex-1 justify-center items-center bg-background px-6">
        <View className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-2xl shadow-lg p-8 space-y-6">
          <Text className="text-3xl font-bold text-center text-primary mb-2">Verify your email</Text>
          <Text className="text-center text-zinc-500 mb-4">
            Please enter the verification code sent to your email address.
          </Text>
          <TextInput
            value={code}
            placeholder="Verification code"
            placeholderTextColor="#9ca3af"
            onChangeText={setCode}
            className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-base text-zinc-900 dark:text-zinc-100 focus:border-primary focus:ring-2 focus:ring-primary mb-4"
            keyboardType="number-pad"
            autoCapitalize="none"
          />
          <TouchableOpacity
            onPress={onVerifyPress}
            className="w-full bg-primary rounded-lg py-3 items-center active:opacity-80"
          >
            <Text className="text-white font-semibold text-base">Verify</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  return (
    <View className="flex-1 justify-center items-center bg-background px-6">
      <View className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-2xl shadow-lg p-8 space-y-6">
        <Text className="text-3xl font-bold text-center text-primary mb-2">Sign up</Text>
        
        <TextInput
          value={name}
          placeholder="Full Name"
          placeholderTextColor="#9ca3af"
          onChangeText={setName}
          className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-base text-zinc-900 dark:text-zinc-100 focus:border-primary focus:ring-2 focus:ring-primary mb-2"
          autoCapitalize="words"
        />
        
        <TextInput
          value={mobile}
          placeholder="Mobile Number"
          placeholderTextColor="#9ca3af"
          onChangeText={setMobile}
          className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-base text-zinc-900 dark:text-zinc-100 focus:border-primary focus:ring-2 focus:ring-primary mb-2"
          keyboardType="phone-pad"
        />
        
        <TextInput
          autoCapitalize="none"
          value={emailAddress}
          placeholder="Email address"
          placeholderTextColor="#9ca3af"
          onChangeText={setEmailAddress}
          className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-base text-zinc-900 dark:text-zinc-100 focus:border-primary focus:ring-2 focus:ring-primary mb-2"
          keyboardType="email-address"
        />
        
        <TextInput
          value={password}
          placeholder="Password"
          placeholderTextColor="#9ca3af"
          secureTextEntry
          onChangeText={setPassword}
          className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-base text-zinc-900 dark:text-zinc-100 focus:border-primary focus:ring-2 focus:ring-primary mb-2"
        />
        
        {/* User Type Selection */}
        <View className="mb-4">
          <Text className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">User Type</Text>
          <View className="flex-row space-x-4">
            <TouchableOpacity
              onPress={() => setUserType('P')}
              className={`flex-1 py-3 px-4 rounded-lg border ${
                userType === 'P' 
                  ? 'border-primary bg-primary/10' 
                  : 'border-zinc-200 dark:border-zinc-700'
              }`}
            >
              <Text className={`text-center font-medium ${
                userType === 'P' 
                  ? 'text-primary' 
                  : 'text-zinc-600 dark:text-zinc-400'
              }`}>
                Primary
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setUserType('S')}
              className={`flex-1 py-3 px-4 rounded-lg border ${
                userType === 'S' 
                  ? 'border-primary bg-primary/10' 
                  : 'border-zinc-200 dark:border-zinc-700'
              }`}
            >
              <Text className={`text-center font-medium ${
                userType === 'S' 
                  ? 'text-primary' 
                  : 'text-zinc-600 dark:text-zinc-400'
              }`}>
                Secondary
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <TouchableOpacity
          onPress={onSignUpPress}
          className="w-full bg-primary rounded-lg py-3 items-center active:opacity-80"
        >
          <Text className="text-white font-semibold text-base">Continue</Text>
        </TouchableOpacity>
        <View className="flex-row justify-center items-center mt-4">
          <Text className="text-zinc-500 mr-1">Already have an account?</Text>
          <Link href="/sign-in">
            <Text className="text-primary font-semibold">Sign in</Text>
          </Link>
        </View>
      </View>
    </View>
  )
}