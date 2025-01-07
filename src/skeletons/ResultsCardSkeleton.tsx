import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { s } from 'react-native-wind';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { withTiming, useSharedValue, useAnimatedStyle, Easing, withRepeat } from 'react-native-reanimated';

const ResultsCardSkeleton = () => {
  // Create a shared value for the shimmer animation
  const shimmerValue = useSharedValue(0);

  // Set up the shimmer animation using withTiming
  useEffect(() => {
    shimmerValue.value = withTiming(1, {
      duration: 1500,
      easing: Easing.linear,
    });

    // Loop the animation by resetting its value once it reaches 1
    shimmerValue.value = withRepeat(withTiming(1, { duration: 1500, easing: Easing.linear }), -1, true);
  }, [shimmerValue]);

  // Animated style for the shimmer effect
  const shimmerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: shimmerValue.value * 5, // Adjust the translation value to control shimmer speed
        },
      ],
    };
  });

  return (
    <View style={[s`bg-none mt-2 rounded-lg w-full`]}>
      {/* Render Skeleton for Each Card */}
      {[...Array(3)].map((_, index) => (
        <View
          key={index}
          style={[s`bg-white p-2 mb-2 rounded-lg shadow-lg border border-gray-200`]}
        >
          {/* Subject Code Placeholder */}
          <Animated.View
            style={[s`w-24 h-4 rounded-md mb-2`, shimmerStyle]}
          >
            <LinearGradient
              colors={['#f0f0f0', '#e0e0e0', '#f0f0f0']}
              style={[s`w-full h-full rounded-md`]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              locations={[0.3, 0.5, 0.7]}
            />
          </Animated.View>

          {/* Subject Title Placeholder */}
          <Animated.View
            style={[s`w-32 h-4 rounded-md mb-2`, shimmerStyle]}
          >
            <LinearGradient
              colors={['#f0f0f0', '#e0e0e0', '#f0f0f0']}
              style={[s`w-full h-full rounded-md`]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              locations={[0.3, 0.5, 0.7]}
            />
          </Animated.View>

          {/* Marks Details Placeholder */}
          <View style={s`flex-row justify-between bg-gray-300 p-2 rounded-lg mb-2`}>
            <Animated.View
              style={[s`w-16 h-4 bg-gray-400 rounded-md`, shimmerStyle]}
            >
              <LinearGradient
                colors={['#f0f0f0', '#e0e0e0', '#f0f0f0']}
                style={[s`w-full h-full rounded-md`]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                locations={[0.3, 0.5, 0.7]}
              />
            </Animated.View>
            <View style={s`border-l border-red-500 mx-1`} />
            <Animated.View
              style={[s`w-16 h-4 bg-gray-400 rounded-md`, shimmerStyle]}
            >
              <LinearGradient
                colors={['#f0f0f0', '#e0e0e0', '#f0f0f0']}
                style={[s`w-full h-full rounded-md`]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                locations={[0.3, 0.5, 0.7]}
              />
            </Animated.View>
            <View style={s`border-l border-red-500 mx-1`} />
            <Animated.View
              style={[s`w-16 h-4 bg-gray-400 rounded-md`, shimmerStyle]}
            >
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
      ))}
    </View>
  );
};

export default ResultsCardSkeleton;
