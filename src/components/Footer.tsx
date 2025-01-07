import { View, Text, useColorScheme, StyleSheet } from 'react-native';
import React from 'react';
import { s } from 'react-native-wind';

const Footer = ({propStyle}) => {
  const isDark = useColorScheme() === 'dark';

  // Dynamic shadow style
  const shadowStyle = {
    shadowColor: isDark ? 'black' : 'gray',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 6, // For Android
  };

  return (
    <View
      style={[
        s` bg-${isDark ? 'gray-900' : 'white'}  w-full rounded-tl-3xl rounded-tr-3xl absolute bottom-0 `,
        styles.footer,
        shadowStyle,
        propStyle,
      ]}
    >
      <Text style={s`text-center text-white`}>Footer</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    
  },
});

export default Footer;
