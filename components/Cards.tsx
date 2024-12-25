import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import images from '@/constants/images'
import icons from '@/constants/icons'

interface Agent {
    avatar: string,
    name: string,
}

interface Property {
    onPress: (id: string) => void,
    id: string,
    type: string,
    name: string,
    address: string,
    price: number,
    rating: number,
    image: string,
    facilities: string[],
    description: string,
    bedrooms: number,
    bathrooms: number,
    area: number,
    reviews: string[],
    agent: Agent,
    geolocation: string
}
 
export const FeaturedCard = ({ onPress, id, name, address, price, rating, image }: Property) => {
  return (
    <TouchableOpacity onPress={() => onPress(id)} className='flex flex-col items-start w-60 h-80 relative'>
        <Image source={{uri: image}} className='size-full rounded-3xl'/>
        <Image source={images.cardGradient} className='size-full rounded-2xl absolute bottom-0'/>
        <View className='flex flex-row items-center bg-white px-3 py-1.5 rounded-full absolute top-5 right-5'>
            <Image source={icons.star} className='size-3.5'/>
            <Text className='text-xs font-rubik-bold text-primary-300 ml-1'>{rating}.0</Text>
        </View>
        <View className='flex flex-col gap-1 absolute bottom-5 left-5'>
            <Text className='text-white font-rubik-bold text-2xl' numberOfLines={1}>{name}</Text>
            <Text className='text-white font-rubik text-lg'>{address}</Text>
            <View className='flex flex-row items-center justify-between'>
                <Text className='text-white font-rubik-extrabold text-2xl' numberOfLines={1}>${price}</Text>
                <Image source={icons.heart} className='size-6'/>
            </View>
        </View>
    </TouchableOpacity>
  )
}


export const Card = ({ onPress, id, name, address, price, rating, image }: Property) => {
    return (
        <TouchableOpacity onPress={() => onPress(id)}
            className='flex-1 w-full mt-4 p-3 rounded-lg bg-white shadow-lg shadow-black-100/70 relative'>
            <View className='flex flex-row items-center absolute px-2 top-5 right-5 bg-white/90 p-1 rounded-full z-50'>
                <Image source={icons.star} className='size-2.5'/>
                <Text className='text-xs font-rubik-bold text-primary-300 ml-0.5'>
                    {rating}.0
                </Text>
            </View>
            <Image source={{uri: image}} className='w-full h-40 rounded-lg'/>
            <View className='flex flex-col'>
                <Text className='text-base font-rubik-extrabold text-black' numberOfLines={1}>
                    {name}
                </Text>
                <Text className='font-rubik text-black-100'>
                    {address}
                </Text>
                <View className='flex flex-row items-center justify-between'>
                    <Text className='font-rubik-bold text-primrary-300'>${price}</Text>
                    <Image source={icons.heart} className='size-6' tintColor='#0061FF1A'/>
                </View>
            </View>
        </TouchableOpacity>
    )
}