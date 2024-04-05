import {  FlatList, View  } from 'react-native';
import products from '../../../../assets/products';
import ProductListItem from '@/components/ProductListItem';

export default function MenuScreen() {
  return (
    <View>
      <FlatList
        data={products}
        renderItem={({item}) => <ProductListItem product={item} />}
        numColumns={2}
        contentContainerStyle={{padding: 10}}
        />
    </View>
  );
}

