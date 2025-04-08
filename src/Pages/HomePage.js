import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Buy Milk',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Buy Bread',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Buy Eggs',
  },
]

const Item = ({title}) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

export default function Categories({ navigation }) {
  const [todoList, setTodoList] = useState([]);
  const [expandedItemIndex, setExpandedItemIndex] = useState(null); // Track expanded item

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("Todo");
      if (value !== null) {
        setTodoList(JSON.parse(value)); // Convert string to array
      } else {
        setTodoList([]);
      }
    } catch (e) {
      console.error("Error reading data:", e);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getData(); // Fetch latest data when screen is focused
    }, [])
  );
  return (
    <View style={styles.container}>
      <View style={styles.border}>
        <FlatList
          data={DATA}
          renderItem={({ item, index }) => (
            <Item title={item.title} />
          )}
          keyExtractor={(_, index) => index.toString()} // Use index as key
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 10,
    borderColor: "black",
    borderWidth: 3,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
   item: {
    backgroundColor: '#1111',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
    textAlign:'center'
  },
});
