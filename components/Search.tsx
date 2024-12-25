import { View, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { router, useLocalSearchParams, usePathname } from 'expo-router'
import { useDebouncedCallback } from 'use-debounce'
import icons from '@/constants/icons'

const Search = () => {
    const path = usePathname()
    const params = useLocalSearchParams<{query?: string}>()
    const [search, setSearch] = useState(params.query)

    const debouncedSearch = useDebouncedCallback((text: string) => 
        router.setParams({query: text}), 500)
    const handleSearch = (text: string) => {
        setSearch(text)
        debouncedSearch(text)
    }

    return (
        <View className='flex flex-row items-center 
                         justify-between px-4
                         rounded-lg bg-accent-100 border 
                         border-primrary-100 mt-5 py-2 ml-2 mr-2'>
            <View className='flex-1 flex flex-row items-center justify-start z-50'>
                <Image source={icons.search} className='size-6 mr-2'/>
                <TextInput 
                    value={search}
                    onChangeText={handleSearch}
                    placeholder='Search for anything'
                    className='text-md font-rubik text-black-300'
                />
            </View>

            <TouchableOpacity>
                <Image source={icons.filter} className='size-5'></Image>
            </TouchableOpacity>
        </View>
    )
}

export default Search
