import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import OrderListItem from '@/components/OrderListItem'
import OrderItemListItem from '@/components/OrderItemListItem'
import { useOrderDetails } from '@/api/orders'
import { useUpdateOrderSubscription } from '@/api/orders/subscriptions'

const OrderDetailsScreen = () => {
  const { id: idString } = useLocalSearchParams()
  const id = parseFloat(typeof idString === 'string' ? idString : idString[0]).toString();

  const { data: order, error, isLoading } = useOrderDetails(id);

  useUpdateOrderSubscription(parseFloat(id));

    if(isLoading){
      return <ActivityIndicator />
    }
    if(error){
      return <Text>Failed to fetch products</Text>
    }

  return (
    <View style={styles.container}>
        <Stack.Screen options={{title: `Order #${id}`}} />
        
        <FlatList
        data={order.order_items}
        renderItem={({item}) => <OrderItemListItem item={item} />}
        contentContainerStyle={{gap: 10}}
        ListHeaderComponent={() => <OrderListItem order={order} />}
        />
    </View>
  )
}

export default OrderDetailsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        gap: 20
    },
})