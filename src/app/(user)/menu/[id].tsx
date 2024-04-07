import { View, Text, StyleSheet, Image, Pressable, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import { defaultPizzaImage } from '@/components/ProductListItem'
import Button from '@/components/Button'
import { useCart } from '@/providers/CartProvider'
import { PizzaSize } from '@/types'
import { useProduct } from '@/api/products'
import RemoteImage from '@/components/RemoteImage'

const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL']

const ProductDetailsScreen = () => {
  const router = useRouter()
  const { id: idString } = useLocalSearchParams()
  const id = parseFloat(typeof idString === 'string' ? idString : idString[0]).toString();

  const { data: product, error, isLoading } = useProduct(id);

  const {addItem} = useCart()
  const [selectedSize, setSelectedSize] = useState<PizzaSize>('M')

  const addToCart = () => {
    if(!product) return
    addItem(product, selectedSize)
    router.push('/cart')
  }

  if(isLoading){
    return <ActivityIndicator />
  }
  if(error){
    return <Text>Failed to fetch products</Text>
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{title: product.name}} />
      <RemoteImage path={product.image} fallback={defaultPizzaImage} style={styles.image}  />
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