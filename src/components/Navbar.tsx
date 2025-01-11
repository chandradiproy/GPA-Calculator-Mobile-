import {Calculator, Home, InfoIcon, School} from 'lucide-react-native';
import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  useColorScheme,
  Touchable,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {s} from 'react-native-wind';
import useStore from '../store/resultStore';

function Navbar({propStyle}) {
  const isDark = useColorScheme() === 'dark';
  const {resetAppState} = useStore();
  const openLink = url => {
    Linking.openURL(url);
  };
  const handleHomePress = () => {
    console.log('Home Pressed');
    resetAppState();
  };
  return (
    <View
      style={[
        s`p-2 bg-${
          isDark ? 'gray-900' : 'white'
        } rounded-bl-3xl rounded-br-3xl  flex justify-between items-center flex-row w-full `,
        styles.container,
        propStyle,
      ]}>
      <View style={s`h-full flex-row pl-3 items-center  w-24`}>
        <Text>
          <Calculator color={isDark ? 'white' : 'black'} size={30} />
        </Text>
      </View>
      <View style={[styles.navSecondPart]}>
        <TouchableOpacity onPress={handleHomePress}>
          <Text>
            <Home color={isDark ? 'white' : 'black'} size={30} />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => openLink('https://ecm.smtech.in/ecm/login.aspx')}>
          <Text>
            <School color={isDark ? 'white' : 'black'} size={30} />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            openLink('https://www.linkedin.com/in/chandradiproy/')
          }>
          <Text>
            <InfoIcon color={isDark ? 'white' : 'black'} size={30} />
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
  },
  navSecondPart: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 30,
    alignItems: 'center',
    width: '70%',
    height: '100%',
    paddingEnd: 10,
  },
});

export default Navbar;
