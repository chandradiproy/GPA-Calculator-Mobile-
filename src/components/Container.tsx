import {
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  useColorScheme,
  StyleSheet,
  Button,
  ScrollView,
  Keyboard,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import React from 'react';
import { s } from 'react-native-wind';
import WelcomeCard from './WelcomeCard';
import ResultsCard from './ResultsCard';
import useStore from '../store/resultStore'; // ✅ Import the store
import Toast from 'react-native-toast-message';
import WelcomeCardSkeleton from '../skeletons/WelcomeCardSkeleton';
import ResultsCardSkeleton from '../skeletons/ResultsCardSkeleton';
const Container = ({ propStyle }) => {
  const isDark = useColorScheme() === 'dark';

  // ✅ Zustand store hooks
  const { regNo, examSession, setRegNo, setExamSession, fetchResults, isLoading, isResultsAvailable } = useStore();

  // ✅ Button click handler
  const handleSubmit = () => {
    if (!regNo || !examSession) {
      Toast.show({
        type: 'error',
        text1: 'Missing Fields',
        text2: 'Please enter all required fields',
      });
      return;
    }
    fetchResults(regNo, examSession); // ✅ Call the store function
    Keyboard.dismiss();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[s`w-full p-4`, propStyle]}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      <View style={[s`bg-white p-4 rounded-lg w-full`, styles.formContainer]}>
        {/* Registration Number Input */}
        <View>
          <TextInput
            placeholder="Eg. 202116003"
            style={[
              s`border border-gray-300 rounded-lg p-2`,
              isDark ? styles.darkTheme : styles.lightTheme,
            ]}
            value={regNo}
            onChangeText={(val) => setRegNo(val)}
            onSubmitEditing={()=>Keyboard.dismiss()}
          />
        </View>

        {/* Exam Session Picker */}
        <View style={s`border border-gray-300 rounded-lg p-1`}>
          <Picker
            selectedValue={examSession}
            onValueChange={(itemValue) => setExamSession(itemValue)}
            style={[isDark ? styles.darkTheme : styles.lightTheme]}
          >
            <Picker.Item label="Select ..." value="" />
            <Picker.Item label="Nov/Dec 2024" value="nov_dec_2024" />
            <Picker.Item label="May/June 2024" value="may_june_2024" />
            <Picker.Item label="Nov/Dec 2023" value="nov_dec_2023" />
            <Picker.Item label="May/June 2023" value="may_june_2023" />
          </Picker>
        </View>

        {/* Submit Button */}
        <View style={s`w-full mt-4`}>
          <Button
            title={isLoading ? 'Loading...' : 'Search'}
            onPress={handleSubmit}
            color={isDark ? '#2475B0' : '#27272a'}
            disabled={isLoading}
          />
        </View>
      </View>

      {/* Other Components */}
      { isResultsAvailable && (
        <ScrollView style={s`mt-2 bg-red-none`}>
          <WelcomeCard />
          <ResultsCard />
        </ScrollView>
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  lightTheme: {
    color: 'black',
  },
  darkTheme: {
    color: 'white',
  },
  formContainer: {
    width: '100%',
    gap: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
});

export default Container;
