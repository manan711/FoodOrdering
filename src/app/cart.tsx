import { FlatList, Platform, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { useCart } from '@/providers/CartProvider';
import CartListItem from '@/components/CartListItem';
import Button from '@/components/Button';


const CartScreen = () => {
    const { items, total } = useCart()
  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={({item}) => <CartListItem cartItem={item} />}
        contentContainerStyle={{ gap: 10}}
        />
        <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>
        <Button text='Checkout' onPress={()=> console.warn('Checkout')} />
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  )
}

export default CartScreen

const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    total: {
        textAlign: 'right',
        fontWeight: '500',
        fontSize: 20,
        marginTop: 10
    }
})