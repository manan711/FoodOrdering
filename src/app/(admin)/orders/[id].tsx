import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import OrderListItem from '@/components/OrderListItem'
import OrderItemListItem from '@/components/OrderItemListItem'
import { OrderStatusList } from '@/types'
import Colors from '@/constants/Colors'
import { useOrderDetails, useUpdateOrder } from '@/api/orders'

const OrderDetailsScreen = () => {
  const { id: idString } = useLocalSearchParams()
  const id = parseFloat(typeof idString === 'string' ? idString : idString[0]).toString();

  const { data: order, error, isLoading } = useOrderDetails(id);
  const { mutate: updateOrder} = useUpdateOrder();

  const updateStatus = (status: string) => {
    updateOrder({id: parseFloat(id), updatedFields: {status}})
  }

    if(isLoading){
      return <ActivityIndicator />
    }
    if(error || !order){
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
        ListFooterComponent={() => (
          <>
  <Text style={{ fontWeight: 'bold' }}>Status</Text>
  <View style={{ flexDirection: 'row', gap: 5 }}>
    {OrderStatusList.map((status) => (
      <Pressable
        key={status}
        onPress={() => updateStatus(status)}
        style={[styles.statusContainer,{backgroundColor:
          order.status === status
            ? Colors.light.tint
            : 'transparent',}]}
      >
        <Text
          style={{
            color:
              order.status === status ? 'white' : Colors.light.tint,
          }}
        >
          {status}
        </Text>
      </Pressable>
    ))}
  </View>
</>

        )}
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
    statusContainer: {
      borderColor: Colors.light.tint,
      borderWidth: 1,
      padding: 10,
      borderRadius: 5,
      marginVertical: 10,
    }
})