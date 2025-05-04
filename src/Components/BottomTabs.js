import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const BottomTabs = ({ navigation }) => {
  return (
    <View style={styles.tabBar}>
      <TouchableOpacity onPress={() => navigation.navigate('CategoryProducts')}>
        <Text style={styles.tab}>Products</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
        <Text style={styles.tab}>Cart</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Orders')}>
        <Text style={styles.tab}>My Orders</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <Text style={styles.tab}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#e0f0ff',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  tab: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#007aff',
  },
});

export default BottomTabs;
