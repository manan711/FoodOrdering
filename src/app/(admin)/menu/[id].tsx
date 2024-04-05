import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import React, { useState } from 'react'
import { Link, Stack, useLocalSearchParams, useRouter } from 'expo-router'
import products from '@assets/products'
import { defaultPizzaImage } from '@/components/ProductListItem'
import Button from '@/components/Button'
import { useCart } from '@/providers/CartProvider'
import { PizzaSize } from '@/types'
import { FontAwesome } from '@expo/vector-icons'
import Colors from '@/constants/Colors'

const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL']

const ProductDetailsScreen = () => {
  const router = useRouter()
  const { id } = useLocalSearchParams()
  const {addItem} = useCart()
  const [selectedSize, setSelectedSize] = useState<PizzaSize>('M')
  const product = products.find(p => p.id.toString() === id)

  const addToCart = () => {
    if(!product) return
    addItem(product, selectedSize)
    router.push('/cart')
  }

  if(!product) return <Text>Product not found</Text>

  return (
    <View style={styles.container}>
      <Stack.Screen options={{title: product.name,
        headerRight: () => (
            <Link href={`/(admin)/menu/create?id=${id}`} asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="pencil"
                    size={25}
                    color={Colors.light.tint}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),}} />
      {/* <Stack.Screen options={{title: product.name}} /> */}
      <Image source={{ uri: product.image || defaultPizzaImage }} style={styles.image} />
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>Price: ${product.price}</Text>
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
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  image:{
    width: '100%',
    aspectRatio: 1,
    resizeMode: 'contain'
  },
})
export default ProductDetailsScreen