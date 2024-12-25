import React from 'react'
import { ScrollView, View, Image, Text, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import images from '@/constants/images'
import icons from '@/constants/icons'
import { login } from '@/lib/appwrite'
import { useGlobalContext } from '@/lib/global-provider'
import { Redirect } from 'expo-router'

const SignIn = () => {
  const { user, loading, isLoggedIn, refetch } = useGlobalContext()

  if (!loading && isLoggedIn) return <Redirect href='/'/>
  const handleLogin = async () => {
    const result = await login()

    if (result) {
      refetch()
    } else {
      console.log("Error")
    }
  }

  return (
    <SafeAreaView className='bg-white h-full'>
      <ScrollView contentContainerClassName='h-full'>
        <Image source={images.onboarding} className='w-full h-4/6'/>
        <View className='px-10'>
          <Text className='font-rubik text-2xl text-center text-black-200 uppercase'>
            Welcome to Restate
          </Text>
          <Text className='text-center text-3xl font-rubik-bold mt-2'>
              Let's Get You Closer To {"\n"} <Text className='text-primrary-300'>Your Ideal Home.</Text>
          </Text>
          <Text className='text-lg mt-12 text-center font-rubik text-black-200'>
            Login to ReState with Google
          </Text>
          <TouchableOpacity onPress={handleLogin} className='bg-white mt-4 shadow-md shadow-zinc-300 p-5 rounded-3xl'>
            <View className='flex flex-row items-center justify-center gap-4'>
              <Image source={icons.google} className='w-5 h-5' resizeMode='contain'/>
              <Text className='font-rubik-medium text-lg text-black-300'>Continue with Google</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn