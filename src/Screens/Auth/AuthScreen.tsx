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
import IconComponent from '../../component/Icon/IconComponent';
import DividerLine from '../Home/components/DividerLine';
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
        <View
          style={{
            flexDirection: 'row',
            padding: scale(20),
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}>
          <View
            style={{
              borderWidth: 1,
              borderColor: '#3c3c3c',
              borderRadius: scale(8),
              padding: scale(5),
              height: scale(35),
              width: scale(35)
            }}>
            <IconComponent
              iconType="MaterialCommunityIcons"
              iconName={'arrow-left'}
              size={25}
              color={'#042b5b'}
            />
          </View>
          <View style={{}}>
            <IMAGES.IcAuthHeader />
          </View>
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
          <DividerLine
            text={'Or login with'}
            containerStyle={{marginVertical: scale(10)}}
          />
          <View
            style={{
              flexDirection: 'row',
            //   padding: scale(20),
              justifyContent: 'space-between',
              width: '100%',
              marginTop: scale(10),
              columnGap: scale(20)
            }}>
            <View
              style={{
                borderWidth: 1,
                borderColor: '#3c3c3c',
                borderRadius: 8,
                padding: scale(15),
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                columnGap: scale(5)
              }}>
              <IMAGES.IcGoogle />
              <Text style={{fontSize: scale(18)}}>Google</Text>
            </View>
            <View
              style={{
                borderWidth: 1,
                borderColor: '#3c3c3c',
                borderRadius: 8,
                padding: scale(15),
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                columnGap: scale(5)
              }}>
              <IMAGES.IcApple />
              <Text style={{fontSize: scale(18)}}>Apple</Text>
            </View>
          </View>
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
