import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';
import MainScreen from '../src/screens/MainScreen';
import RecipeDetailScreen from '../src/screens/RecipeDetailScreen';

export type RootStackParamList = {
  Main: undefined;
  RecipeDetail: { id: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name="Main" 
            component={MainScreen} 
            options={{ title: 'レシピ一覧' }}
          />
          <Stack.Screen 
            name="RecipeDetail" 
            component={RecipeDetailScreen} 
            options={{ title: 'レシピ詳細' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}