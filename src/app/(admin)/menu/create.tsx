import { Alert, Image, Keyboard, Pressable, StyleSheet, Text, TextInput } from 'react-native'
import React, { useState } from 'react'
import Button from '@/components/Button'
import { defaultPizzaImage } from '@/components/ProductListItem'
import Colors from '@/constants/Colors'
import * as ImagePicker from 'expo-image-picker';
import { Stack, useLocalSearchParams } from 'expo-router'

const CreateProductScreen = () => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [image, setImage] = useState<string | null>(null)

    const { id } = useLocalSearchParams()
    const isUpdating = !!id

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
        console.warn('Update Product: ', name, price)
        resetFields()
        Keyboard.dismiss()
    }

    const onCreate = () => {
        if(!validateInput()) return
        
        // API call to create product
        console.warn('Create Product: ', name, price)
        resetFields()
        Keyboard.dismiss()
    }

    const onDelete = () => {
        console.warn('DELETE!!!!!')
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