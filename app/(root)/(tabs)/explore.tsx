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
import images from "@/constants/images";

export default function Explore() {

  const { user } = useGlobalContext()
  
  const params = useLocalSearchParams<{query?: string, filter?: string}>()

  const { data: properties, loading: propertiesLoading, refetch: refetchProperties } = useAppwrite({
    fn: getProperties,
    params: {
      filter: params.filter!,
      query: params.filter!
    },
    skip: true
  })

  useEffect(() => {
    refetchProperties({filter: params.filter!, query: params.query!})
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
          propertiesLoading ? <ActivityIndicator size='large' color="#0061FF"/> : <NoProperties/>
        }
        ListHeaderComponent={
        <View>
          <View className="flex flex-row items-center justify-between px-4">
            <TouchableOpacity onPress={() => router.back()}>
              <Image source={icons.backArrow} className="size-6"/>
            </TouchableOpacity>
            <Text className="font-rubik text-lg text-black-100">Search for your ideal name</Text>
            <TouchableOpacity>
              <Image source={icons.bell} className="size-6"/>
            </TouchableOpacity>
          </View>
          <Search/>
          <View className="my-5 ml-5">
            <Filters/>
            <Text className="font-rubik-bold text-2xl mt-3">Found {properties?.length} Properties</Text>
          </View>
      </View>
      }/>
    </SafeAreaView>
  );
}
