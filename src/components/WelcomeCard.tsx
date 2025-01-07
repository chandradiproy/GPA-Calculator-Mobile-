/* eslint-disable react-native/no-inline-styles */
import {View, Text, StyleSheet, useColorScheme} from 'react-native';
import React, {useEffect, useState} from 'react';
import {s} from 'react-native-wind';
import useStore from '../store/resultStore';
import WelcomeCardSkeleton from '../skeletons/WelcomeCardSkeleton';

const WelcomeCard = () => {
  const isDark = useColorScheme() === 'dark';
  const [gpa, setGpa] = useState(0);
  const {tempReg, isResultsAvailable, marksDetails, subjectDetails, isLoading} = useStore();
  const calculateGPA = () => {
    const grade_points: Object = {
      S: 10,
      A: 9,
      B: 8,
      C: 7,
      D: 6,
      E: 5,
      F: 0,
    };
    const gradeObtained: any = [];
    const credits: any = [];
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
    // console.log(gpa);
  };
  useEffect(() => {
    if (isResultsAvailable) {
      calculateGPA();
    }
  });

  if (isLoading) {
    return <WelcomeCardSkeleton />;
  }
  return (
    <View
      style={[
        s`w-full bg-white mt-2 p-4 rounded-md flex-row justify-between `,
        styles.container,
      ]}>
      {/* Student Details Section */}
      <View style={[s`flex-col h-full w-48`, styles.stdDetails]}>
        <Text style={s`text-3xl `}>Welcome,</Text>
        <Text style={[s`text-4xl`, {color: isDark ? '#2475B0' : '#BB0A0A'}]}>
          {tempReg}
        </Text>
      </View>
      {/* GPA Section */}
      <View
        style={[
          s`bg-${
            isDark ? 'gray-800' : 'gray-800'
          } w-24 h-24 rounded-full  flex justify-center items-center`,
          styles.gpa,
        ]}>
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
  // reg_no:{
  //   color:'#BB0A0A',
  // },
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
