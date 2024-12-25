import { ScrollView, View, Image, Text, TouchableOpacity, FlatList, Button, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import icons from "@/constants/icons";
import Search from "@/components/Search";
import { Card, FeaturedCard } from "@/components/Cards";
import Filters from "@/components/Filters";
import { useGlobalContext } from "@/lib/global-provider";
import { avatar, getLatestProperties, getProperties } from "@/lib/appwrite";
import { Redirect, router, useLocalSearchParams } from "expo-router";
import { useAppwrite } from "@/lib/useAppWrite";
import { useEffect } from "react";
import NoProperties from "@/components/NoProperties";

export default function Index() {

  const { user } = useGlobalContext()
  
  const params = useLocalSearchParams<{query?: string, filter?: string}>()

  const { data: latestProperties, loading: latestPropertiesLoading } = useAppwrite({
    fn: getLatestProperties,
  })

  const { data: properties, loading: propertiesLoading, refetch: refetchProperties } = useAppwrite({
    fn: getProperties,
    params: {
      filter: params.filter!,
      query: params.filter!,
      limit: 6,
    },
    skip: true
  })

  useEffect(() => {
    refetchProperties({filter: params.filter!, query: params.query!, limit: 6})
  }, [params.filter, params.query])

  const handlePress = (id: string) => {
    router.push(`/properties/${id}`)
  }

  return (
    <SafeAreaView className="bg-white h-full">
      <FlatList 
        data={properties}
        renderItem={({item}) => <Card onPress={handlePress} id={item.$id} name={item.name} address={item.address} price={item.price} rating={item.rating} image={item.image}/>}
        numColumns={2}
        keyExtractor={(item) => item.$id}
        contentContainerClassName="pb-32"
        columnWrapperClassName="flex gap-5 px-5"
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          latestPropertiesLoading ? <ActivityIndicator size='large' color="#0061FF"/> : <NoProperties/>
        }
        ListHeaderComponent={
        <View className="ml-5">
          <View className="flex flex-row items-center justify-between mt-5 mx-5">
            <View className="flex flex-row items-center">
              <Image source={{uri: user?.avatar}} className="size-12 rounded-full" />
              <View className="flex flex-col items-start ml-2 justify-center">
                <Text className="text-xs font-rubik text-black-100">Good Morning</Text>
                <Text className="text-base font-rubik-medium text-black-300">
                  {user?.name}
                </Text>
              </View>
            </View>
            <Image source={icons.bell} className="size-6"/>
          </View>
          <Search/>
            {latestPropertiesLoading ? 
            <ActivityIndicator/> : 
            (!latestProperties || latestProperties.length == 0 ? null : 
            <View className="my-5">
              <View className="flex flex-row items-center justify-between mx-2">
              <Text className="text-xl font-rubik-bold text-black-300">Featured</Text>
              <TouchableOpacity>
                <Text>See All</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              horizontal
              data={latestProperties}
              keyExtractor={(item) => item.$id}
              renderItem={({item}) => <FeaturedCard id={item.$id} onPress={handlePress} name={item.name} address={item.address} price={item.price} rating={item.rating} image={item.image}/>}
              contentContainerClassName="flex gap-3 mt-5"
              showsHorizontalScrollIndicator={false}
              bounces={false}
              />
            </View>)}
        <View className="my-5">
            <View className="flex flex-row items-center justify-between mr-5">
              <Text className="text-xl font-rubik-bold text-black-300">Our Recommendations</Text>
              <TouchableOpacity onPress={() => router.navigate('/explore')}>
                <Text>See All</Text>
              </TouchableOpacity>
            </View>
            <Filters/>
        </View>
      </View>
      }/>
    </SafeAreaView>
  );
}
