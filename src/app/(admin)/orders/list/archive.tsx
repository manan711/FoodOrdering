import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import orders from '@assets/orders'
import OrderListItem from '@/components/OrderListItem'

const OrdersScreen = () => {
  return (
    <View>
      <FlatList
      data={orders}
      renderItem={({item}) => <OrderListItem order={item} />}
      contentContainerStyle={{padding: 10, gap: 10}}
      />
    </View>
  )
}

export default OrdersScreen

const styles = StyleSheet.create({})