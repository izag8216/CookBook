import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { supabase } from '../lib/supabase';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

interface Recipe {
  id: string;
  title: string;
  description: string;
  image_url: string;
  cooking_time: number;
}

type MainScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Main'>;

type Props = {
  navigation: MainScreenNavigationProp;
};

export default function MainScreen({ navigation }: Props) {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    fetchRecipes();
  }, []);

  async function fetchRecipes() {
    const { data, error } = await supabase
      .from('recipes')
      .select('id, title, description, image_url, cooking_time')
      .limit(20);

    if (error) {
      console.error('Error fetching recipes:', error);
    } else {
      setRecipes(data || []);
    }
  }

  const renderRecipeCard = ({ item }: { item: Recipe }) => (
    <TouchableOpacity onPress={() => navigation.navigate('RecipeDetail', { id: item.id })}>
      <Card style={styles.card}>
        <Card.Cover source={{ uri: item.image_url }} />
        <Card.Content>
          <Title>{item.title}</Title>
          <Paragraph>{item.description}</Paragraph>
          <Paragraph>調理時間: {item.cooking_time}分</Paragraph>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={recipes}
        renderItem={renderRecipeCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  listContent: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
});