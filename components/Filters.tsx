import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams, router } from 'expo-router'
import { categories } from '@/constants/data'

const Filters = () => {
    const params = useLocalSearchParams<{filter?: string}>()
    const [selectedCategory, setSelectedCategory] = useState<string | undefined>(params.filter || 'All')

    const handleCategoryPress = (category: string) => {
        if (category == selectedCategory) {
            setSelectedCategory('All')
            router.setParams({filter: 'All'})
            return
        }

        setSelectedCategory(category)
        router.setParams({ filter: category })
    }

    const renderFilter = () => (
        categories.map((category, index) => (
            <View key={index}>
                <TouchableOpacity onPress={() => handleCategoryPress(category.title)}
                    className={`${category.title === selectedCategory ? 'bg-primrary-300' : 'bg-primrary-100'} px-5 py-2 rounded-full`}>
                    <Text className={`font-rubik${category.title == selectedCategory ? '-bold text-white':''} text-lg`}>
                        {category.title}
                    </Text>
                </TouchableOpacity>
            </View>
        ))
    )

    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className='mt-3 mb-2'>
            <View className='flex flex-row gap-3'>
                {renderFilter()}
            </View>
        </ScrollView>
    )
}

export default Filters