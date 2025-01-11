/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import Navbar from './src/components/Navbar';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  useColorScheme,
  View,
} from 'react-native';
import Container from './src/components/Container';
import {s} from 'react-native-wind';
import Toast from 'react-native-toast-message';

export default function App() {
  const isDark = useColorScheme() === 'dark';

  return (
    <SafeAreaView style={s`${isDark ? 'bg-gray-800' : 'bg-gray-100'} flex-1`}>
      {/* Wrap the entire layout with KeyboardAvoidingView */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={s`flex-1 relative`}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}>
        <Navbar propStyle={s`h-20`} />

        <Container propStyle={s`flex-1`} />
      </KeyboardAvoidingView>

      {/* Render Toast outside, with adjusted zIndex for overlay */}

      <Toast position="bottom" />
    </SafeAreaView>
  );
}
