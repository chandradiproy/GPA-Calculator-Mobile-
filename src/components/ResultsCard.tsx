import React from 'react';
import { View, Text, ScrollView, useColorScheme, StyleSheet } from 'react-native';
import useStore from '../store/resultStore';
import { s } from 'react-native-wind';
import ResultsCardSkeleton from '../skeletons/ResultsCardSkeleton';

const ResultsCard = () => {
  const isDark = useColorScheme() === 'dark';
  const { subjectDetails, marksDetails, isLoading } = useStore();

  if (isLoading) {
    return <ResultsCardSkeleton />;
  }
  return (
    <View style={[s`bg-none  mt-2 rounded-lg w-full`]}>
      {subjectDetails.length > 0 && marksDetails.length > 0 ? (
        marksDetails.map((item, index) => {
          const subjectCode = subjectDetails[index * 3]?.[1];
          const subjectTitle = subjectDetails[index * 3 + 1]?.[1];
          const marks = marksDetails[index];

          return (
            <View
              key={index}
              style={[s`bg-white p-2 mb-2 rounded-lg shadow-lg border border-gray-200`, styles.card]}
            >
              {/* Subject Code */}
              <Text style={s`text-base font-md text-gray-800 `}>
                {subjectCode}
              </Text>
              {/* Subject Title */}
              <Text style={s`text-lg font-semibold text-gray-700 mb-2`}>
                {subjectTitle}
              </Text>
              {/* Marks Details */}
              {marks && (
                <View style={s`flex-row justify-between bg-gray-800 p-2 rounded-lg mb-2`}>
                  <Text style={s`text-white text-sm  `}>INT: {marks.int}</Text>
                  <View style={s`border-l border-red-500 mx-1`} />
                  <Text style={s`text-white text-sm`}>EXT: {marks.ext}</Text>
                  <View style={s`border-l border-red-500 mx-1`} />
                  <Text style={s`text-white text-sm`}>GRADE: {marks.grade}</Text>
                  <View style={s`border-l border-red-500 mx-1`} />
                  <Text style={s`text-white text-sm`}>Total: {marks.total}</Text>
                </View>
              )}
            </View>
          );
        })
      ) : (
        <Text style={s`text-gray-700 text-center`}>
          No results found. Please try again.
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({

  card:{
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
  }
})

export default ResultsCard;
