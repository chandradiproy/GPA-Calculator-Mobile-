import React, { useEffect } from 'react';
import { View } from 'react-native';
import { s } from 'react-native-wind';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  withTiming,
  useSharedValue,
  useAnimatedStyle,
  Easing,
  withRepeat,
} from 'react-native-reanimated';

const WelcomeCardSkeleton = () => {
  // Create a shared value for the shimmer animation
  const shimmerValue = useSharedValue(0);

  // Set up the shimmer animation using withTiming
  useEffect(() => {
    shimmerValue.value = withTiming(1, {
      duration: 1500,
      easing: Easing.linear,
    });

    // Loop the animation by resetting its value once it reaches 1
    shimmerValue.value = withRepeat(
      withTiming(1, { duration: 1500, easing: Easing.linear }),
      -1,
      true
    );
  }, [shimmerValue]);

  // Animated style for the shimmer effect
  const shimmerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: shimmerValue.value * 5, // Controls the shimmer movement to the right
        },
      ],
    };
  });

  return (
    <View style={[s`w-full bg-white mt-2 p-4 rounded-md flex-row justify-between`]}>
      <View style={[s`flex-col h-full w-48`]}>
        {/* Subject Code Placeholder */}
        <Animated.View style={[s`w-36 h-6 bg-gray-300 rounded-md mb-2`, shimmerStyle]}>
          <LinearGradient
            colors={['#f0f0f0', '#e0e0e0', '#f0f0f0']}
            style={[s`w-full h-full rounded-md`]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            locations={[0.3, 0.5, 0.7]}
          />
        </Animated.View>

        {/* Subject Title Placeholder */}
        <Animated.View style={[s`w-24 h-6 bg-gray-300 rounded-md`, shimmerStyle]}>
          <LinearGradient
            colors={['#f0f0f0', '#e0e0e0', '#f0f0f0']}
            style={[s`w-full h-full rounded-md`]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            locations={[0.3, 0.5, 0.7]}
          />
        </Animated.View>
      </View>

      <View style={[s`bg-gray-300 w-24 h-24 rounded-full flex justify-center items-center`]}>
        <Animated.View style={[s`w-10 h-4 bg-gray-400 rounded-md mb-2`, shimmerStyle]}>
          <LinearGradient
            colors={['#f0f0f0', '#e0e0e0', '#f0f0f0']}
            style={[s`w-full h-full rounded-md`]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            locations={[0.3, 0.5, 0.7]}
          />
        </Animated.View>
        <Animated.View style={[s`w-10 h-4 bg-gray-400 rounded-md`, shimmerStyle]}>
          <LinearGradient
            colors={['#f0f0f0', '#e0e0e0', '#f0f0f0']}
            style={[s`w-full h-full rounded-md`]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            locations={[0.3, 0.5, 0.7]}
          />
        </Animated.View>
      </View>
    </View>
  );
};

export default WelcomeCardSkeleton;
