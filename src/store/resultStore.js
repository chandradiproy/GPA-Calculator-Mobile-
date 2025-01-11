import { create } from 'zustand';
import axios from 'axios';
import Toast from 'react-native-toast-message';

const useStore = create((set) => ({
  subjectDetails: [],  // For storing subject details
  marksDetails: [],    // For storing marks details
  regNo: '',
  tempReg:'',
  examSession: '',
  isLoading: false,
  isResultsAvailable: false,
  gpa:0.0,

  setRegNo: (value) => set({ regNo: value }),
  setExamSession: (value) => set({ examSession: value }),
  resetAppState: () => set({
    subjectDetails: [],
    marksDetails: [],
    regNo: '',
    tempReg: '',
    examSession: '',
    isLoading: false,
    isResultsAvailable: false,
    gpa: 0.0,
  }),

  fetchResults: async (regNo, examSession) => {
    set({ isLoading: true });
    const API_URL = process.env.NODE_ENV === 'production'
      ? 'https://gpa-calculator-mobile-backend.onrender.com'
      : 'http://192.168.1.4:3000'; // Local URL for development
  try {
      const response = await axios.get(
        `${API_URL}/results?exam_session=${examSession}&reg_no=${regNo}`
      );

      if (response.data.length === 0) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'No data found',
        });
        set({ isLoading: false });
        return;
      }

      // Separate arrays for subject details and marks
      const subDetails = [];
      const marksDetails = [];
      const data = response.data;
      data.forEach((item)=>{
        if(Array.isArray(item)){
          subDetails.push(item);
        }else{
          marksDetails.push(item);
        }
      });
      set({ subjectDetails: subDetails, marksDetails: marksDetails, isLoading: false, isResultsAvailable: true, tempReg:regNo });

    } catch (err) {
      console.error(err);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Something went wrong! Please check your internet connection',
      });
      set({ isLoading: false });
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useStore;
