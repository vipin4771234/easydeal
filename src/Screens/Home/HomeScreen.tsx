import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ImageBackground,
  ScrollView,
  RefreshControl,
} from 'react-native';
import React from 'react';
import Header from './components/Header';
import {scale} from '../../utils/mixins';
import Search from './components/Search';
import DividerLine from './components/DividerLine';
import Plans from './components/Plans';
import IconComponent from '../../component/Icon/IconComponent';
import DineoutNavigate from './components/DineoutNavigate';
import FoodNavigate from './components/FoodNavigate';

const HomeScreen = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{flex: 1}}>
        <ImageBackground
          source={require('../../assets/images/monthlyPlan.png')}
          resizeMode="contain"
          style={styles.image}>
          <Header />
          <View style={{height: scale(10)}} />
          <Search />
        </ImageBackground>
        <View style={styles.container}>
          <DividerLine text={'Plans'} />
          <Plans />
          <View style={{height: scale(20)}} />
          <DividerLine text={'More'} />
          <FoodNavigate />
          <DineoutNavigate />
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    padding: scale(20),
  },
  imageContainer: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').width,
    position: 'absolute',
    top: 0,
    zIndex: -5,
    borderBottomRightRadius: scale(20),
    borderBottomLeftRadius: scale(20),
  },
  image: {
    padding: scale(20),
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').width,
    borderBottomRightRadius: scale(20),
    borderBottomLeftRadius: scale(20),
  },
});
