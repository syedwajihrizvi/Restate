import { View, Text, Image, ActivityIndicator, TouchableHighlight, TouchableOpacity } from 'react-native'
import React from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import icons from '@/constants/icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAppwrite } from '@/lib/useAppWrite'
import { getProperty } from '@/lib/appwrite'
import { Slideshow } from '@/components/Slideshow'
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler'

interface PropertyDetailProps {
  icon: any,
  amount: number,
  type :string
}

function PropertyDetail({icon, amount, type}: PropertyDetailProps) {
  return (
    <View className='flex flex-row items-center gap-2'>
      <View className='p-1 bg-primrary-100'>
        <Image source={icon} className='size-5'/>
      </View>
      <Text className='font-rubik-semibold'>{amount} {type}</Text>
    </View>    
  )
}

const Property = () => {

  const { id } = useLocalSearchParams()
  const { data: property, loading } = useAppwrite({fn: getProperty, params: {id: id as string}})

  if (loading || !property) {
    return <ActivityIndicator/>
  }
  const propertyDetails:PropertyDetailProps[] = [
    {icon: icons.bed, amount: property?.bedrooms, type: `Bed${property!.bed > 1?'s':''}`},
    {icon: icons.bath, amount: property?.bathrooms, type: `Bath${property!.bathrooms > 1?'s':''}`},
    {icon: icons.area, amount: property?.area, type: 'sqft'}
  ]

  const facilitiesMap = {
    "Laundry": icons.laundry,
    "Car-Parking": icons.carPark,
    "Sports-Center": icons.run,
    "Cutlery": icons.cutlery,
    "Gym": icons.dumbell,
    "Swimming-Pool": icons.swim,
    "Wifi": icons.wifi,
    "Pet-Center": icons.dog,
  };

  return (
    <SafeAreaView className='bg-white h-full'>
        {!loading && property &&
        <ScrollView className='relative'>
          <View className='flex flex-row items-center justify-between p-5 absolute top-2 w-full z-10'>
            <TouchableHighlight onPress={() => router.back()}>
              <Image source={icons.backArrow} className='size-8'/>
            </TouchableHighlight>
            <View className='flex flex-row items-center justify-center gap-5'>
              <Image source={icons.heart} className='size-8' tintColor='#000000'/>
              <Image source={icons.send} className='size-8'/>
            </View>
          </View>
        <View className='relative'>
          <Slideshow photos={property.gallery}/>
          <View className='p-6'>
            <Text className='font-rubik-bold text-3xl mb-4'>
              {property.name}
            </Text>
            <View className='flex flex-row items-center gap-4 mb-4'>
              <View className='rounded-3xl bg-primrary-100 p-2'>
                <Text className='font-rubik-semibold text-primrary-300 uppercase text-sm'>{property.type}</Text>
              </View>
              <View className='flex flex-row items-center'>
                <Image source={icons.star} tintColor='gold'/>
                <Text className='font-rubik'>{property.rating}.0 ({property.reviews.length} reviews)</Text>
              </View>
            </View>
            <View className='flex flex-row gap-8 border-b-2 border-b-primrary-100 pb-8'>
              {propertyDetails.map(property => (
                <PropertyDetail icon={property.icon} amount={property.amount} type={property.type}/>
              ))}
            </View>
          </View>
          <View className='px-4'>
              <Text className='font-rubik-bold text-2xl mb-3'>Agent</Text>
              <View className='flex flex-row items-center justify-between'>
                <View className='flex flex-row items-center gap-2'>
                  <Image source={{uri: property.agent.avatar}} className='size-16 rounded-full'/>
                  <View>
                    <Text className='font-rubik-semibold text-lg'>{property.agent.name}</Text>
                    <Text className='font-rubik-semibold text-black-100'>Type</Text>
                  </View>
                </View>
                <View className='flex flex-row gap-4'>
                  <Image source={icons.phone} className='size-8'/>
                  <Image source={icons.chat} className='size-8'/>
                </View>
              </View>
              <View className='mt-4'>
                <Text className='font-rubik-bold text-2xl mb-3'>Overview</Text>
                <Text className='font-rubik text-black-100 text-lg'>{property.description}</Text>
              </View>
              <View className='mt-4'>
                <Text className='font-rubik-bold text-2xl mb-3'>Facilities</Text>
                <View className='flex flex-row gap-12'>
                  {property.facilities.map((facility:string) => (
                    <View className='flex gap-1 items-center justify-center'>
                      <View className='p-2 rounded-full bg-primrary-100'>
                        <Image source={facilitiesMap[facility as keyof typeof facilitiesMap]} className='size-10'/>
                      </View>
                      <Text className='font-rubik'>{facility}</Text>
                    </View>
                  ))}
                </View>
              </View>
              <View className='mt-4'>
                <Text className='font-rubik-bold text-2xl mb-3'>Location</Text>
                <View className='flex flex-row items-center gap-2'>
                  <Image source={icons.location} className='size-4'/> 
                  <Text className='font-rubik-bold text-black-100 '>{property.address}</Text>
                </View>
              </View>
          </View>
          <View className='flex flex-row items-center justify-between px-2 py-5 mt-5 border-t-2 border-t-primrary-200 overflow-hidden'>
              <View>
                <Text className='font-rubik uppercase text-black-200'>Price</Text>
                <Text className='font-rubik-bold text-primrary-300 text-2xl'>${property.price}</Text>
              </View>
              <TouchableOpacity className='bg-primrary-300 px-12 py-4 rounded-3xl'>
                <Text className='font-rubik-semibold text-white text-lg'>Booking Now</Text>
              </TouchableOpacity>
          </View>
        </View>
        </ScrollView> }
    </SafeAreaView>
  )
}

export default Property