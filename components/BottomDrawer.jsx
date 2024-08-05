import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

const BottomDrawer = ({ isVisible, onClose }) => {
  const navigation = useNavigation();
  const translateY = useSharedValue(isVisible ? 0 : height);

  useEffect(() => {
    translateY.value = withSpring(isVisible ? 0 : height, {
      damping: 10,
      stiffness: 100,
      mass: 0.5,
    });
  }, [isVisible]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const menuItems = [
    { name: 'Set Monthly Target', icon: 'help-buoy-outline', route: 'SetMonthlyTarget' },
    { name: 'Corporate Visit', icon: 'business', route: 'CorporateVisit' },
    { name: 'Home Visit', icon: 'home', route: 'HomeVisit' },
    { name: 'Event', icon: 'calendar', route: 'Event' },
    { name: 'Admission Done', icon: 'school', route: 'AdmissionDone' },
    { name: 'IP Done', icon: 'medical', route: 'IPDone' },
  ];

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      {menuItems.map((item, index) => (
        <TouchableOpacity key={index} style={styles.menuItem} onPress={() => { navigation.navigate(item.route); onClose(); }}>
          <Ionicons name={item.icon} size={24} color="black" />
          <Text style={styles.menuText}>{item.name}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text style={styles.closeButtonText}>CLOSE</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '66%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  menuText: {
    marginLeft: 15,
    fontSize: 18,
  },
  closeButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 18,
    color: '#007BFF',
  },
});

export default BottomDrawer;
