import {
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  useColorScheme,
  StyleSheet,
  Keyboard,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import React from 'react';
import { s } from 'react-native-wind';
import WelcomeCard from './WelcomeCard';
import ResultsCard from './ResultsCard';
import useStore from '../store/resultStore';
import Toast from 'react-native-toast-message';
import WelcomeCardSkeleton from '../skeletons/WelcomeCardSkeleton';
import ResultsCardSkeleton from '../skeletons/ResultsCardSkeleton';
import { Calendar, CalendarRange, IdCard } from 'lucide-react-native';

const Container = ({ propStyle }) => {
  const isDark = useColorScheme() === 'dark';

  // Zustand store hooks
  const {
    regNo,
    examSession,
    setRegNo,
    setExamSession,
    fetchResults,
    isLoading,
    isResultsAvailable,
  } = useStore();

  // Button click handler
  const handleSubmit = () => {
    if (!regNo || !examSession) {
      Toast.show({
        type: 'error',
        text1: 'Missing Fields',
        text2: 'Please enter all required fields',
      });
      return;
    }
    fetchResults(regNo, examSession);
    Keyboard.dismiss();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[s`w-full px-4 pt-6`, propStyle]}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      {/* Form Container */}
      <View
        style={[
          s`rounded-lg p-5 shadow-lg`,
          isDark ? s`bg-gray-900` : s`bg-white`,
          styles.formContainer,
        ]}
      >
        {/* Registration Number Input */}
        <View style={[styles.inputContainer, isDark && s`bg-gray-800`]}>
          <IdCard size={20} color={isDark ? '#ccc' : '#333'} />
          <TextInput
            placeholder="Enter Registration Number"
            placeholderTextColor={isDark ? '#aaa' : '#666'}
            style={[
              s`flex-1 text-base p-2 rounded-lg`,
              isDark ? s` text-white` : s` text-gray-800`,
            ]}
            value={regNo}
            onChangeText={val => setRegNo(val)}
            onSubmitEditing={() => Keyboard.dismiss()}
          />
        </View>

        {/* Exam Session Picker */}
        <View style={[styles.inputContainer, isDark && s`bg-gray-800`]}>
          <CalendarRange size={20} color={isDark ? '#ccc' : '#333'} />
          <Picker
            selectedValue={examSession}
            onValueChange={itemValue => setExamSession(itemValue)}
            style={[s`flex-1`, isDark ? s`text-white` : s`text-gray-800`]}
          >
            <Picker.Item label="Select Session..." value="" />
            <Picker.Item label="Nov/Dec 2024" value="nov_dec_2024" />
            <Picker.Item label="May/June 2024" value="may_june_2024" />
            <Picker.Item label="Nov/Dec 2023" value="nov_dec_2023" />
            <Picker.Item label="May/June 2023" value="may_june_2023" />
          </Picker>
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          onPress={handleSubmit}
          disabled={isLoading}
          style={[
            s`w-full py-4 rounded-lg mt-4`,
            isDark ? s`bg-red-700` : s`bg-gray-800`,
            isLoading && s`bg-gray-400`,
          ]}
        >
          <Text
            style={[
              s`text-center text-lg font-semibold`,
              isDark ? s`text-white` : s`text-warmGray-100`,
            ]}
          >
            {isLoading ? 'Loading...' : 'Search'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Skeleton or Results */}
      <ScrollView style={s`mt-4`}>
        {isLoading ? (
          <>
            <WelcomeCardSkeleton />
            <ResultsCardSkeleton />
          </>
        ) : (
          <>
            <WelcomeCard />
            <ResultsCard />
          </>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    width: '100%',
    elevation: 4,
    shadowColor: '#888',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginBottom: 10,
  },
});

export default Container;
