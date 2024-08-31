
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Screen1 from './Screen1';
import Screen2 from './Screen2';
import AddProject from './AddProject';
import ProjectDetail from './ProjectDetail';
import { StyleSheet, Image } from 'react-native';
import { COLORS } from './styleScreen/styleScreen1';
import { Project } from './Project.Interface';

type RootStackParamList = {
  Home: undefined;
  Screen1: {
    username: string;
    password: string;
  };
  Screen2: undefined;
  AddProject: undefined;
  ProjectDetail: Project;
};

const Tab = createBottomTabNavigator<RootStackParamList>();
const Stack = createStackNavigator<RootStackParamList>();

const TabScreens = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabContainer,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#14AAAA',
        tabBarInactiveTintColor: '#485555',
      }}
    >
      <Tab.Screen
        name="Screen1"
        component={Screen1}
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                require('../../../assets/home.png')
              }
              style={[
                styles.icon,
                { backgroundColor: focused ? '#14AAAA' : 'white' }
              ]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="AddProject"
        component={AddProject}
        options={{
          title: 'Add',
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                require('../../../assets/add.png')

              }
              style={[
                styles.icon,
                { backgroundColor: focused ? '#14AAAA' : 'white' }
              ]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Screen2"
        component={Screen2}
        options={{
          title: 'Projet',
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                require('../../../assets/folder.png')

              }
              style={[
                styles.icon,
                { backgroundColor: focused ? '#14AAAA' : 'white' }
              ]}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={TabScreens} />
      <Stack.Screen name="Screen2" component={Screen2} />
      <Stack.Screen name="ProjectDetail" component={ProjectDetail} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 70,
    backgroundColor: COLORS.containerProject,
    borderRadius: 30,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    borderTopColor: '#212626',
    borderColor: '#212626',
    borderWidth: 1,
    alignItems: 'center',
  },
  add: {
    display: 'flex',
    position: 'relative',
    top: -30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ED6E68',
    width: 85,
    padding: 20,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#ED6E68',
  },
  icon: {
    width: 20,
    height: 20,
    borderRadius: 2,
    padding: 5
  },
});

export default AppNavigator;
