import { ActivityIndicator, Alert, Image, Keyboard, Pressable, StyleSheet, Text, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import Button from '@/components/Button'
import { defaultPizzaImage } from '@/components/ProductListItem'
import Colors from '@/constants/Colors'
import * as ImagePicker from 'expo-image-picker';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import { useDeleteProduct, useInsertProduct, useProduct, useUpdateProduct } from '@/api/products'
import { View } from '@/components/Themed'

const CreateProductScreen = () => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [image, setImage] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const { id: idString } = useLocalSearchParams()
    const id = parseFloat(typeof idString === 'string' ? idString : idString?.[0]).toString();
    const isUpdating = !!idString

    const { mutate: insertProduct } = useInsertProduct();
    const { mutate: updateProduct } = useUpdateProduct();
    const { data: updatingProduct } = useProduct(id);
    const { mutate: deleteProduct } = useDeleteProduct();

    const router = useRouter();

    useEffect(() => {
        if(updatingProduct){
            setName(updatingProduct.name)
            setPrice(updatingProduct.price.toString())
            setImage(updatingProduct.image)
        }
    },[updatingProduct])

    const resetFields = () => {
        setName('')
        setPrice('')
    }

    const validateInput = () => {
        if(!name || !price){
            alert('Please fill in all fields')
            return false
        }
        if(isNaN(parseFloat(price))){
            alert('Price must be a number')
            return false
        }
        return true
    }
    const onSubmit = () => {
        if(isUpdating){
            onUpdate()
        }else{
            onCreate()
        }
    }
    const onUpdate = () => {
        if(!validateInput()) return

        // API call to update product
        setIsLoading(true)
        updateProduct({id, name, price: parseFloat(price), image},{
            onSuccess: () => {
                resetFields()
                router.back()
                setIsLoading(false)
            }
        })
        Keyboard.dismiss()
    }

    const onCreate = () => {
        if(!validateInput()) return
        
        // API call to create product
        setIsLoading(true)
        insertProduct({name, price: parseFloat(price), image},{
            onSuccess: () => {
                resetFields()
                router.back()
                setIsLoading(false)
            }
        })
        Keyboard.dismiss()
    }

    const onDelete = () => {
        setIsLoading(true)
        deleteProduct(id, {
            onSuccess: () => {
                resetFields()
                router.replace('/(admin)/menu');
                setIsLoading(false)
            }
        
        })
    }

    const confirmDelete = () => {
        Alert.alert('Delete Product', 'Are you sure you want to delete this product?', [
            {text: 'Cancel', style: 'cancel'},
            {text: 'Delete', style: 'destructive', onPress: onDelete},
        ])
    }

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        // console.log(result);
    
        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }
      };

      if(isLoading){
        return (
        <View style={styles.loading}>
          <ActivityIndicator  size="large"/>
        </View>
        )}

  return (
    <Pressable style={styles.container} onPress={() => Keyboard.dismiss()}>
        <Stack.Screen options={{title: isUpdating ? 'Update Product' : 'Create Product'}} />
        <Image source={{uri: image || defaultPizzaImage}} style={styles.image} />
        <Text onPress={pickImage} style={styles.textBtn}>Select Image</Text>
      <Text style={styles.label}>Name</Text>
      <TextInput placeholder='Name' style={styles.input} value={name} onChangeText={setName} />
        
      <Text style={styles.label}>Price ($)</Text>
      <TextInput placeholder='9.99' style={styles.input} keyboardType='numeric' value={price} onChangeText={setPrice}/>

      <Button text={isUpdating? 'Update' : 'Create'} onPress={onSubmit} />
      {isUpdating && <Text onPress={confirmDelete} style={styles.textBtn}>Delete</Text>}
    </Pressable>
  )
}

export default CreateProductScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 10,
    },
    loading:{
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
    },
    label: {
        fontSize: 16,
        color: 'gray',
    },
    input:{
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 20,
    },
    image:{
        width: '50%',
        aspectRatio: 1,
        resizeMode: 'contain',
        alignSelf: 'center',
    },
    textBtn:{
        color: Colors.light.tint,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginVertical: 10,
    }
})