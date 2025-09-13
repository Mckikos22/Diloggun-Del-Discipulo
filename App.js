import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import ChaptersScreen from './screens/ChaptersScreen';
import ChapterDetailScreen from './screens/ChapterDetailScreen';
import AudioScreen from './screens/AudioScreen';
import CourseScreen from './screens/CourseScreen';
import ShopScreen from './screens/ShopScreen';
import ConsultaScreen from './screens/ConsultaScreen';
import ProfileScreen from './screens/ProfileScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator initialRouteName="Inicio" screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Inicio" component={HomeScreen} />
      <Tab.Screen name="Consulta" component={ConsultaScreen} />
      <Tab.Screen name="Capítulos" component={ChaptersScreen} />
      <Tab.Screen name="Audio" component={AudioScreen} />
      <Tab.Screen name="Curso" component={CourseScreen} />
      <Tab.Screen name="Tienda" component={ShopScreen} />
      <Tab.Screen name="Perfil" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator>
        <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
        <Stack.Screen name="ChapterDetail" component={ChapterDetailScreen} options={{ title: 'Detalle del capítulo' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}