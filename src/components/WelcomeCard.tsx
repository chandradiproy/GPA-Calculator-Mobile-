/* eslint-disable react-native/no-inline-styles */
import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import React, { useEffect, useState } from 'react';
import { s } from 'react-native-wind';
import useStore from '../store/resultStore';
import WelcomeCardSkeleton from '../skeletons/WelcomeCardSkeleton';
import { User, Award } from 'lucide-react-native';

const WelcomeCard = () => {
  const isDark = useColorScheme() === 'dark';
  const [gpa, setGpa] = useState(0);
  const { tempReg, isResultsAvailable, marksDetails, subjectDetails, isLoading } = useStore();

  // Calculate GPA
  const calculateGPA = () => {
    const grade_points = {
      S: 10,
      A: 9,
      B: 8,
      C: 7,
      D: 6,
      E: 5,
      F: 0,
    };

    const gradeObtained = [];
    const credits = [];
    marksDetails.forEach(item => {
      gradeObtained.push(item.grade);
    });
    subjectDetails.forEach(item => {
      if (item[0] === 'Subject Credit') {
        credits.push(parseFloat(item[1]));
      }
    });

    let keys = Object.keys(grade_points);
    let sum = 0;
    let total = 0;

    for (let i = 0; i < keys.length; i++) {
      for (let j = 0; j < gradeObtained.length; j++) {
        let flag = 0;
        if (keys[i] === gradeObtained[j]) {
          flag++;
          total += flag * grade_points[keys[i]] * credits[j];
        }
      }
    }

    credits.forEach(item => {
      sum += item;
    });

    setGpa(parseFloat((total / sum).toFixed(2)));
  };

  // Trigger GPA calculation when results are available
  useEffect(() => {
    if (isResultsAvailable) {
      calculateGPA();
    }
  }, [isResultsAvailable]);

  // If no results are available, return an empty view
  if (isResultsAvailable === false) {
    return <></>;
  }

  return (
    <View
      style={[
        s`w-full bg-white mt-2 p-4 rounded-md flex-row justify-between`,
        styles.container,
        isDark ? s`bg-gray-900` : s`bg-white`,
      ]}
    >
      {/* Student Details Section */}
      <View style={[s`flex-col h-full w-48`, styles.stdDetails]}>
        <View style={s`flex-row items-center`}>
          <User size={24} color={isDark ? '#fff' : '#333'} />
          <Text style={[s`text-3xl ml-2`, isDark ? s`text-white` : s`text-gray-800`,{fontFamily: 'NunitoSans_10pt-Light'}]}>Welcome,</Text>
        </View>
        <Text
          style={[
            s`text-4xl mt-2`,
            { color: isDark ? '#EAB308' : 'rgb(197, 16, 25)' },
            {fontFamily: 'Quicksand-SemiBold'},
          ]}
        >
          {tempReg}
        </Text>
      </View>

      {/* GPA Section */}
      <View
        style={[
          s`bg-${isDark ? 'gray-800' : 'gray-800'} w-28 h-28 rounded-full flex justify-center items-center`,
          styles.gpa,
        ]}
      >
        <Award size={32} color="#FFD700" style={s`justify-self-start`} />
        <View>
          <Text style={s`text-xl text-warmGray-100 text-center`}>{gpa}</Text>
          <Text style={s`text-xl text-warmGray-100 text-center`}>GPA</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  stdDetails: {
    rowGap: 10,
  },
  container: {
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
  },
  gpa: {
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
  },
});

export default WelcomeCard;
