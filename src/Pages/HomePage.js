import React, {useState,useEffect } from "react";
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

const Item = ({title, navigation }) => (
  <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('CategoryProducts', { category: title })}
    >
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
);


export default function Categories({ navigation }) {
  const [products, setProducts] = useState([]);
  const [expandedItemIndex, setExpandedItemIndex] = useState(null); // Track expanded item

  const fetchData = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products/categories');
      const data = await response.json();
      setProducts(data);
      await AsyncStorage.setItem("Products", JSON.stringify(data)); // save the correct data
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData()
  }, [])
  

  return (
  
    <View style={styles.container}>
      <View style={styles.border}>
        <FlatList
          data={products}
          renderItem={({ item, index }) => (
            <Item title={item} navigation={navigation}/>
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
