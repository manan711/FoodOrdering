import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import React, { useState } from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import products from '@assets/products'
import { defaultPizzaImage } from '@/components/ProductListItem'
import Button from '@/components/Button'

const sizes = ['S', 'M', 'L', 'XL']

const ProductDetailsScreen = () => {
  const { id } = useLocalSearchParams()
  const [selectedSize, setSelectedSize] = useState('M')
  const product = products.find(p => p.id.toString() === id)

  const addToCart = () => {
    console.warn('Adding to cart, size: ', selectedSize)
  }

  if(!product) return <Text>Product not found</Text>

  return (
    <View style={styles.container}>
      <Stack.Screen options={{title: product.name}} />
      <Image source={{ uri: product.image || defaultPizzaImage }} style={styles.image} />
      <Text style={styles.price}>Select Size</Text>
      <View style={styles.sizes}>
      {sizes.map((size) => (
      <Pressable onPress={()=> setSelectedSize(size)} key={size} style={[styles.size,{backgroundColor: selectedSize === size ? 'gainsboro' : 'white'}]}>
      <Text key={size} style={[styles.sizeText,{color: selectedSize === size ? 'black' : 'gray'}]}>{size}</Text>
      </Pressable>
      ))}
      </View>
      <Text style={styles.price}>Price: ${product.price}</Text>
      <Button text='Add to Cart' onPress={addToCart} />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 'auto'
  },
  image:{
    width: '100%',
    aspectRatio: 1,
    resizeMode: 'contain'
  },
  sizes:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10
  },
  size:{
    backgroundColor: 'gainsboro',
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center'
  },
  sizeText:{
    fontSize: 20,
    fontWeight: '500'
  }
})
export default ProductDetailsScreen