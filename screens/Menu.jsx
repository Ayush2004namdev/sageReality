import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet, Pressable, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setIsMenuOpen } from '../redux/slices/misc';
import BottomDrawer from '../components/BottomDrawer';

const { width, height } = Dimensions.get('window');

const Menu = () => {
  const { isMenuOpen } = useSelector((state) => state.misc);
  const dispatch = useDispatch();

  const handleMenuOnPress = () => {
    dispatch(setIsMenuOpen(!isMenuOpen));
  };

  const handleOnMenuClose = () => {
    dispatch(setIsMenuOpen(false));
  };

  return (
    <>
      {isMenuOpen && (
        <View style={styles.drawerContainer}>
          <BottomDrawer isVisible={isMenuOpen} onClose={handleOnMenuClose} />
        </View>
      )}
      <Pressable onPress={handleMenuOnPress} style={styles.menuIcon}>
        <Ionicons name="grid" size={24} color="white" />
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  menuIcon: {
    position: 'absolute',
    bottom: 5,
    right: 10,
    padding: 10,
    borderRadius: 50,
    zIndex: 10,
  },
  drawerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: width, 
    height: height, 
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    zIndex: 1000, 
  },
});

export default Menu;
