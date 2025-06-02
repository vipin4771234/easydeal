import {
  View,
  Text,
  Image,
  ToastAndroid,
  Pressable,
  Dimensions,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StackActions, useNavigation} from '@react-navigation/native';
import {login} from '../../store/UserSlice';
import {useDispatch} from 'react-redux';
import Input from '../../component/InputFields/Input';
import CommonButton from '../../component/Buttons/CommonButton';
// import {loginUser} from '../../api/api';
import WrapperComponent from '../../WrapperComponent/WrapperComponent';
import {scale} from '../../utils/mixins';
import Animated, {
  useAnimatedKeyboard,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import IMAGES from '../../assets/images/images';
// import {PhoneSignIn} from '../../utils/hooks/PhoneAuth';

const AuthScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({phoneError: ''});
  const dispatch = useDispatch();
  const screenWidth = Dimensions.get('screen').width;
  const screenHeight = Dimensions.get('screen').height;
  // const {signInWithPhoneNumber, signOut} = PhoneSignIn();
  const keyboard = useAnimatedKeyboard();

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{translateY: -keyboard.height.value / 1.5}],
  }));

  const validate = () => {
    let valid = true;
    let err = {phoneError: '', passwordError: ''};
    if (!phone) {
      ToastAndroid.show('Enter correct number', ToastAndroid.LONG);
      // setError({...error,phoneError: 'This Field is required'})
      valid = false;
    } else if (phone.length !== 10) {
      ToastAndroid.show('Enter correct number', ToastAndroid.LONG);
      valid = false;
    }
    setError({phoneError: err.phoneError});
    return valid;
  };

  const onSubmit = async () => {
    if (!validate()) return;
    try {
      setLoading(true);
      // const confirmation = await signInWithPhoneNumber(`+91${phone}`);
      // if (confirmation) {
      //   navigation.navigate('OtpScreen', {
      //     confirmation: confirmation,
      //     phone: phone,
      //   });
      // }
      navigation.navigate('OtpScreen');
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const onChange = (value: any) => {
    let isnum = /^\d+$/.test(value);
    if (value.length > 10 || (!isnum && !(value === ''))) {
      return;
    }
    setPhone(value);
  };
  console.log('raanarnanr');
  return (
    <WrapperComponent>
      <Animated.View
        style={[
          animatedStyles,
          {
            flex: 1,
            // paddingHorizontal: 20,
            alignItems: 'center',
            // justifyContent: 'flex-end'
          },
        ]}>
            <View>

            </View>
        <View
          style={{
            paddingHorizontal: scale(100),
            width: '100%',
            alignItems: 'center',
          }}>
          <IMAGES.IcLoginImage />
        </View>
        <View
          style={{
            flex: 1,
            // paddingHorizontal: 20,
            alignItems: 'flex-start',
            width: '100%',
            paddingHorizontal: scale(20),
          }}>
          <View style={{height: '5%'}} />
          <CommonButton
            text={'CREATE AN ACCOUNT'}
            loading={loading}
            onPress={() => onSubmit()}
          />
          <CommonButton
            text={'Login'}
            loading={loading}
            onPress={() => onSubmit()}
          />
          {/* <CommonButton
              text={'SignOut'}
              loading={loading}
              onPress={() => signOut()}
            /> */}
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
            }}></View>
          <Text style={styles.text}>
            By clicking, I accept the{' '}
            <Text style={[styles.text, {fontFamily: 'Montserrat-Bold'}]}>
              Terms and Conditions
            </Text>{' '}
            and{' '}
            <Text style={[styles.text, {fontFamily: 'Montserrat-Bold'}]}>
              Privacy Policy
            </Text>
          </Text>
          <View style={{height: '5%'}} />
        </View>
      </Animated.View>
    </WrapperComponent>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: scale(14),
    color: '#3c3c3c',
    fontFamily: 'Montserrat-Regular',
  },
});
