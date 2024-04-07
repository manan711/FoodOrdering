import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import orders from '@assets/orders'
import OrderListItem from '@/components/OrderListItem'
import { useAdminOrderList } from '@/api/orders'

const OrdersScreen = () => {
  const { data: orders, error, isLoading } = useAdminOrderList({archived: true});

  if(isLoading){
    return <ActivityIndicator />
  }
  if(error){
    return <Text>Failed to fetch products</Text>
  }
  
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