import { useGlobalContext } from "@/lib/global-provider";
import { Redirect, Slot } from "expo-router";
import { ActivityIndicator, SafeAreaView } from "react-native";

export default function AppLayout() {
    const { loading, isLoggedIn } = useGlobalContext()

    if (loading) {
        return (
            <SafeAreaView className="bg-white h-full flex justify-center align-middle">
                <ActivityIndicator className="text-primrary-300 text-6xl" size="large"/>
            </SafeAreaView>
        )
    }

    if (!isLoggedIn) return <Redirect href="/sign-in"/>

    return <Slot/>

}
