import { View, Text, Image} from 'react-native'
import React from 'react'
import images from '@/constants/images'

const NoProperties = () => {
  return (
    <View className='flex items-center justify-center'>
      <Image source={images.noResult} className='w-11/12 h-80'/>
      <Text className='font-rubik-bold text-3xl'>No Properties Found</Text>
      <Text className='font-rubik text-base text-primrary-300'>We could not find any results matching your search.</Text>
    </View>
  )
}

export default NoProperties