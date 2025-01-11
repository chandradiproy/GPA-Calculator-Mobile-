import React from 'react';
import { View, Text, ScrollView, useColorScheme, StyleSheet } from 'react-native';
import useStore from '../store/resultStore';
import { s } from 'react-native-wind';
import ResultsCardSkeleton from '../skeletons/ResultsCardSkeleton';
import { Book, FileText, GraduationCap, Star, CheckCircle } from 'lucide-react-native';

const ResultsCard = () => {
  const isDark = useColorScheme() === 'dark';
  const { subjectDetails, marksDetails, isLoading, isResultsAvailable } = useStore();

  if (isResultsAvailable === false) {
    return <></>;
  }

  return (
    <View style={[s`bg-none mt-2 rounded-lg w-full`]}>
      {subjectDetails.length > 0 && marksDetails.length > 0 ? (
        marksDetails.map((item, index) => {
          const subjectCode = subjectDetails[index * 3]?.[1];
          const subjectTitle = subjectDetails[index * 3 + 1]?.[1];
          const marks = marksDetails[index];

          return (
            <View
              key={index}
              style={[
                s`bg-white  mb-2 rounded-lg shadow-lg border border-gray-200`,
                styles.card,
                isDark ? s`bg-gray-900 border-transparent` : s`bg-white`,
              ]}
            >
              {/* Subject Code */}
              <View style={[s`  ml-2 mt-2`, styles.subjectCode]}>
                <Book size={18} color={isDark ? '#fff' : '#333'} />
                <Text style={[s`text-md font-md text-gray-800 ml-2`, isDark ? s`text-white` : s`text-gray-800`, {fontFamily:'Quicksand-Regular'}]}>
                  {subjectCode}
                </Text>
              </View>

              {/* Subject Title */}
              <Text style={[s`text-base font-semibold text-gray-700 mb-2  mt-1 ml-2`, isDark ? s`text-white` : s`text-gray-800`, {fontFamily:'Quicksand-SemiBold'}]}>
                {subjectTitle}
              </Text>

              {/* Marks Details */}
              {marks && (
                <View style={[s`flex-row justify-between px-2 bg-gray-800 w-full h-10 `, styles.resultBar]}>
                  {/* Internal Marks */}
                  <View style={s`flex-row items-center`}>
                    <FileText size={16} color="#FFD700" />
                    <Text style={[s`text-white text-xs ml-1`, {fontFamily:'Quicksand-Regular'}]}>INT: {marks.int}</Text>
                  </View>

                  {/* <View style={s`border-l border-red-500 mx-1`} /> */}

                  {/* External Marks */}
                  <View style={s`flex-row items-center`}>
                    <GraduationCap size={16} color="#FFD700" />
                    <Text style={[s`text-white text-xs ml-1`, {fontFamily:'Quicksand-Regular'}]}>EXT: {marks.ext}</Text>
                  </View>

                  {/* <View style={s`border-l border-red-500 mx-1`} /> */}

                  {/* Grade */}
                  <View style={s`flex-row items-center`}>
                    <Star size={16} 
                    color= {marks.grade === 'S' ? '#32CD32' : '#FFD700'} />
                    <Text style={[s`text-white text-xs ml-1`, {fontFamily:'Quicksand-Regular'}]}>GRADE: {marks.grade}</Text>
                  </View>

                  {/* <View style={s`border-l border-red-500 mx-1`} /> */}

                  {/* Total Marks */}
                  <View style={s`flex-row items-center`}>
                    <CheckCircle size={16} color="#FFD700" />
                    <Text style={[s`text-white text-xs ml-1`, {fontFamily:'Quicksand-Regular'}]}>Total: {marks.total}</Text>
                  </View>
                </View>
              )}
            </View>
          );
        })
      ) : (
        <Text style={s`text-gray-700 text-center`}>No results found. Please try again.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
  },
  resultBar:{
    columnGap:2,
    borderBottomStartRadius: 7,
    borderBottomEndRadius: 7,
  },
  subjectCode: {
    flexDirection: 'row',
    columnGap:2,
    
  },
});

export default ResultsCard;
