import { useEffect, useRef, useState } from 'react'
import { View, Image, FlatList, Easing, Dimensions, Animated, useAnimatedValue } from 'react-native'
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated'

interface Photo {
    $id: string,
    image: string
}

const {width} = Dimensions.get('screen')
export const Slideshow = ({photos}: {photos: Photo[]}) => {
    const [photo, setPhoto] = useState(0)
    const progressIcons = useRef<(any | null)[]>([])
    const flatListRef = useRef<FlatList | null>(null)
    
    const widthAnim = useRef(new Animated.Value(8)).current

    const widthIncrease = () => {
        Animated.timing(widthAnim, {
          toValue: 24,
          duration: 200,
          useNativeDriver: false,
          easing: Easing.linear
        }).start();
    };
    
    useEffect(() => {
        if (flatListRef.current) {
            scrollToIndex()
            widthIncrease()
            progressIcons.current.forEach((photoRef, index) => 
                photoRef?.setNativeProps({
                    style: { 
                        width: index == photo ? 24: 8,
                        backgroundColor: index == photo ? '#0061FF': 'white'},
                  }))
        }
    }, [photo])

    const renderPhoto = (photo: Photo) => (
        <View className='flex items-center justify-center w-full h-full relative' style={{width: width}}>
            <Image source={{uri:photo.image}} className='size-full' resizeMode='cover'/>
        </View>
    )

    const renderProgressIcons = () => (
        <View className='absolute flex flex-row gap-1 z-10 bottom-5 justify-center w-full'>
            {photos.map((_, index) => 
                <Animated.View key={index} className='bg-white rounded-full' style={{width: 8,height: 8}}
                      ref={(element) => {
                        if (progressIcons.current.length < 7)
                            progressIcons.current.push(element)
                    }}/>)}
        </View>
    )

    const swipeGesture = Gesture.Pan()
        .onEnd((event) => {
            // Reset the swipe direction after the gesture ends
            if (event.velocityX > 30) {
                runOnJS(setPhoto)(Math.max(photo-1, 0))
                // runOnJS(scrollToIndex)
            } else if (event.velocityX < -30) {
                runOnJS(setPhoto)(Math.min(photo+1, photos.length-1))
                // runOnJS(scrollToIndex)
            }

        });

    const scrollToIndex = () => {
        // Scroll to a specific index, e.g., 10th item
        if (flatListRef.current)
            flatListRef.current.scrollToIndex({ index: photo, animated: true });
    };

    
    return (
        <View className='relative w-full h-80'>
            {renderProgressIcons()}
                <GestureDetector gesture={swipeGesture}>
                    <FlatList 
                        horizontal data={photos}
                        keyExtractor={(photo) => photo.$id}
                        renderItem={({item: photo}) => renderPhoto(photo)}
                        contentContainerClassName='flex'
                        showsHorizontalScrollIndicator={false}
                        scrollEnabled={false}
                        ref={flatListRef}
                        initialScrollIndex={photo}
                        />
                </GestureDetector>
        </View>
    )
}
