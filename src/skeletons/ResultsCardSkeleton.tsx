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

const ResultsCardSkeleton = () => {
  // Detect the current theme (light or dark)
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  // Shared value for shimmer animation
  const shimmerValue = useSharedValue(0);

  // Setup shimmer animation
  useEffect(() => {
    shimmerValue.value = withRepeat(
      withTiming(1, { duration: 1500, easing: Easing.linear }),
      -1,
      true
    );
  }, [shimmerValue]);

  // Shimmer animation style
  const shimmerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shimmerValue.value * 5 }],
  }));

  // Dynamic shimmer colors based on theme
  const shimmerColors = isDarkMode
    ? ['#383838', '#505050', '#383838']
    : ['#f0f0f0', '#e0e0e0', '#f0f0f0'];

  // Dynamic styles
  const containerStyle = isDarkMode
    ? s`bg-gray-800`
    : s`bg-gray-100`;
  const cardStyle = isDarkMode
    ? s`bg-gray-700 border-gray-600`
    : s`bg-white border-gray-200`;
  const placeholderStyle = isDarkMode
    ? s`bg-gray-600`
    : s`bg-gray-300`;

  return (
    <View style={[s`bg-none mt-2 rounded-lg w-full`, containerStyle]}>
      {/* Render Skeleton for Each Card */}
      {[...Array(3)].map((_, index) => (
        <View
          key={index}
          style={[s`p-2 mb-2 rounded-lg shadow-lg border`, cardStyle]}
        >
          {/* Subject Code Placeholder */}
          <Animated.View style={[s`w-24 h-4 rounded-md mb-2`, placeholderStyle, shimmerStyle]}>
            <LinearGradient
              colors={shimmerColors}
              style={[s`w-full h-full rounded-md`]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              locations={[0.3, 0.5, 0.7]}
            />
          </Animated.View>

          {/* Subject Title Placeholder */}
          <Animated.View style={[s`w-32 h-4 rounded-md mb-2`, placeholderStyle, shimmerStyle]}>
            <LinearGradient
              colors={shimmerColors}
              style={[s`w-full h-full rounded-md`]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              locations={[0.3, 0.5, 0.7]}
            />
          </Animated.View>

          {/* Marks Details Placeholder */}
          <View style={s`flex-row justify-between p-2 rounded-lg mb-2`}>

            {[...Array(3)].map((_, i) => (
              <React.Fragment key={i}>
                <Animated.View style={[s`w-16 h-4 rounded-md`, placeholderStyle, shimmerStyle]}>
                  <LinearGradient
                    colors={shimmerColors}
                    style={[s`w-full h-full rounded-md`]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    locations={[0.3, 0.5, 0.7]}
                  />
                </Animated.View>
                {i < 2 && <View style={s`border-l ${isDarkMode ? 'border-red-700' : 'border-red-500'} mx-1`} />}
              </React.Fragment>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
};

export default ResultsCardSkeleton;
