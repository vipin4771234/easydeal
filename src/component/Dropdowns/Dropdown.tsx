import React, { useState } from 'react';
  import { StyleSheet, Text, View } from 'react-native';
  import { Dropdown } from 'react-native-element-dropdown';
import { scale } from '../../utils/mixins';
import { Colors } from '../../utils/colorUtils';
  // import AntDesign from '@expo/vector-icons/AntDesign';

  const data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
  ];

  const DropdownComponent = ({data, value, setValue, containerStyle={}}: any) => {
    // const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    const renderLabel = () => {
      if (value || isFocus) {
        return (
          <Text style={[styles.label, isFocus && { color: 'blue' }]}>
            Dropdown label
          </Text>
        );
      }
      return null;
    };

    return (
      <View style={[styles.container, containerStyle]}>
        {/* {renderLabel()} */}
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          itemTextStyle={[styles.selectedTextStyle,]}
          itemContainerStyle={{marginVertical: scale(0), backgroundColor: Colors.primary.dark}}
          activeColor={Colors.primary.light}
          // search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select item' : '...'}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);
          }}
          // renderLeftIcon={() => (
          //   <AntDesign
          //     style={styles.icon}
          //     color={isFocus ? 'blue' : 'black'}
          //     name="Safety"
          //     size={20}
          //   />
          //)}
        />
      </View>
    );
  };

  export default DropdownComponent;

  const styles = StyleSheet.create({
    container: {
      // backgroundColor: 'white',
      flex: 1,
      // width: '100%',
      padding: scale(20),
    },
    dropdown: {
      flex: 1,
      height: scale(40),
      borderColor: Colors.text.dark,
      borderWidth: 1,
      borderRadius: 8,
      paddingLeft: 12,
      paddingRight: 10
    },
    icon: {
      marginRight: 5,
      // color: Colors.text.dark
    },
    label: {
      position: 'absolute',
      backgroundColor: 'white',
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
    },
    placeholderStyle: {
      fontSize: 16,
      color: Colors.text.dark
    },
    selectedTextStyle: {
      fontSize: 16,
      color: Colors.text.dark,
      fontFamily: 'Poppins-Medium',
      marginBottom: scale(-5),
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
  });