import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React, { useRef,useEffect, useState} from 'react';
import { Provider } from 'react-redux';
import Add from './components/AddButton';
import store from './redux/store';
import CorpVisit from './screens/CorpVisit';
import Dashboard from './screens/Dashboard';
import Menu from './screens/Menu';
import SageMitraFollowUp from './screens/SageMitraFollowUp';
import {Animated , Easing, SafeAreaView} from 'react-native';
import Header from './components/Header';
import Splash from './components/Splash';
import { blue } from './constants';


const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarStyle: {
        backgroundColor: blue,
        paddingTop: 10,
        position: 'absolute',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
      },
      tabBarLabel: '',
      tabBarActiveTintColor: 'yellow',
      tabBarInactiveTintColor: 'white',
      headerShown: false,
      tabBarIcon: ({ focused, size }) => {
        let icon;
        if (route.name === 'Dashboard') {
          icon = focused ? 'home' : 'home-outline';
        }
        if (route.name === 'Menu') {
          icon = focused ? 'grid' : 'grid-outline';
        }

        return <Ionicons name={icon} size={size} color={'white'} />;
      },
    })}
  >
    <Tab.Screen name='Dashboard' component={Dashboard} />
    <Tab.Screen
      name='Add'
      component={Dashboard}
      options={{
        tabBarButton: (props) => <Add {...props} />,
      }}
    />
    <Tab.Screen name='SageMF' component={SageMitraFollowUp} />
    <Tab.Screen name='CorpVisit' component={CorpVisit} />
    <Tab.Screen
      name='Menu'
      component={Menu}
      options={{
        tabBarButton: (props) => <Menu {...props} />,
      }}
    />
  </Tab.Navigator>
);

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  // const scaleAnim = new Animated.Value(1);
  
  // useEffect(() => {
  //   const t = setTimeout(() => {
  //     setIsLoading(false);
  //   },8000)

  //   return () => clearTimeout(t);
  // })


  useEffect(() => {
    const zoomInOut = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1.2,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    const zoomInFull = () => {
      Animated.timing(scaleAnim, {
        toValue: 10,
        duration: 500,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }).start(() => {
        setIsLoading(false);
      });
    };

    zoomInOut();

    const timer = setTimeout(() => {
      zoomInFull();
    }, 8000);

    return () => clearTimeout(timer);
  }, [scaleAnim]);

  return isLoading ? (
    <Splash scaleAnim={scaleAnim} />
  ) : (  
    <Provider store={store}>
      <NavigationContainer>
          <Header />
          <TabNavigator />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
