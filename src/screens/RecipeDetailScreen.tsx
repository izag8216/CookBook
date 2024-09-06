import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, List } from 'react-native-paper';
import { supabase } from '../lib/supabase';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../App';

interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: { name: string; amount: string }[];
  instructions: string[];
  image_url: string;
  cooking_time: number;
}

type RecipeDetailScreenRouteProp = RouteProp<RootStackParamList, 'RecipeDetail'>;

type Props = {
  route: RecipeDetailScreenRouteProp;
};

export default function RecipeDetailScreen({ route }: Props) {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const { id } = route.params;

  useEffect(() => {
    fetchRecipe(id);
  }, [id]);

  async function fetchRecipe(id: string) {
    const { data, error } = await supabase
      .from('recipes')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching recipe:', error);
    } else {
      setRecipe(data);
    }
  }

  if (!recipe) {
    return <View><Paragraph>Loading...</Paragraph></View>;
  }

  return (
    <ScrollView style={styles.container}>
      <Card>
        <Card.Cover source={{ uri: recipe.image_url }} />
        <Card.Content>
          <Title>{recipe.title}</Title>
          <Paragraph>{recipe.description}</Paragraph>
          <Paragraph>調理時間: {recipe.cooking_time}分</Paragraph>
          
          <Title>材料</Title>
          {recipe.ingredients.map((ingredient, index) => (
            <Paragraph key={index}>{ingredient.name}: {ingredient.amount}</Paragraph>
          ))}
          
          <Title>手順</Title>
          {recipe.instructions.map((step, index) => (
            <List.Item
              key={index}
              title={`${index + 1}. ${step}`}
              titleNumberOfLines={3}
            />
          ))}
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});