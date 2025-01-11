import React, { useEffect } from 'react';
import { View, useColorScheme } from 'react-native';
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
  // Detect the current theme (light or dark)
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  // Create a shared value for the shimmer animation
  const shimmerValue = useSharedValue(0);

  // Set up the shimmer animation using withTiming
  useEffect(() => {
    shimmerValue.value = withRepeat(
      withTiming(1, { duration: 1500, easing: Easing.linear }),
      -1,
      true
    );
  }, [shimmerValue]);

  // Animated style for the shimmer effect
  const shimmerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: shimmerValue.value * 5 }],
    };
  });

  // Dynamic gradient colors based on theme
  const shimmerColors = isDarkMode
    ? ['#383838', '#505050', '#383838']
    : ['#f0f0f0', '#e0e0e0', '#f0f0f0'];

  // Dynamic styles based on theme
  const containerStyle = isDarkMode
    ? s`bg-gray-800`
    : s`bg-gray-100`;
  const placeholderStyle = isDarkMode
    ? s`bg-gray-700`
    : s`bg-gray-200`;
  const circleStyle = isDarkMode
    ? s`bg-gray-600`
    : s`bg-gray-300`;

  return (
    <View style={[s`w-full mt-2 p-4 rounded-md flex-row justify-between`, containerStyle]}>
      {/* Left Section */}
      <View style={[s`flex-col h-full w-48`]}>
        {/* Subject Code Placeholder */}
        <Animated.View style={[s`w-36 h-6 rounded-md mb-2`, placeholderStyle, shimmerStyle]}>
          <LinearGradient
            colors={shimmerColors}
            style={[s`w-full h-full rounded-md`]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            locations={[0.3, 0.5, 0.7]}
          />
        </Animated.View>

        {/* Subject Title Placeholder */}
        <Animated.View style={[s`w-24 h-6 rounded-md`, placeholderStyle, shimmerStyle]}>
          <LinearGradient
            colors={shimmerColors}
            style={[s`w-full h-full rounded-md`]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            locations={[0.3, 0.5, 0.7]}
          />
        </Animated.View>
      </View>

      {/* Right Section */}
      <View style={[s`w-24 h-24 rounded-full flex justify-center items-center`, circleStyle]}>
        {/* Placeholder 1 */}
        <Animated.View style={[s`w-10 h-4 rounded-md mb-2`, placeholderStyle, shimmerStyle]}>
          <LinearGradient
            colors={shimmerColors}
            style={[s`w-full h-full rounded-md`]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            locations={[0.3, 0.5, 0.7]}
          />
        </Animated.View>

        {/* Placeholder 2 */}
        <Animated.View style={[s`w-10 h-4 rounded-md`, placeholderStyle, shimmerStyle]}>
          <LinearGradient
            colors={shimmerColors}
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
