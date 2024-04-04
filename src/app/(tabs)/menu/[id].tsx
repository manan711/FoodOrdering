import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'

const ProductDetailsScreen = () => {
  const { id } = useLocalSearchParams()
  return (
    <View style={styles.container}>
      <Stack.Screen options={{title: 'Details: ' + id}} />
      <Text style={styles.text}>ProductDetailsScreen for id: {id}</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 20
  }
})
export default ProductDetailsScreen