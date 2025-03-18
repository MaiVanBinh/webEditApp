import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import EditScreen from './EditScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import { RouteProp } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';

type TabParamList = {
  Home: undefined;
  Explore: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const TabBarIcon: React.FC<{ route: any; color: string; size: number }> = ({
  route,
  color,
  size,
}) => {
  let iconName: string = 'home';

  if (route.name === 'Home') {
    iconName = 'home-outline';
  } else if (route.name === 'Explore') {
    iconName = 'create-outline';
  }
  return <Ionicons name={iconName} size={size} color={color} />;
};

const TabNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarIcon: (props) => <TabBarIcon route={route} {...props} />,
        })}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Explore" component={EditScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default TabNavigator;
