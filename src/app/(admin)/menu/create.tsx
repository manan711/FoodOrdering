import { Image, Keyboard, Pressable, StyleSheet, Text, TextInput } from 'react-native'
import React, { useState } from 'react'
import Button from '@/components/Button'
import { defaultPizzaImage } from '@/components/ProductListItem'
import Colors from '@/constants/Colors'
import * as ImagePicker from 'expo-image-picker';
import { Stack } from 'expo-router'

const CreateProductScreen = () => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [image, setImage] = useState<string | null>(null)

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

    const onCreate = () => {
        if(!validateInput()) return
        
        // API call to create product
        console.warn('Create Product: ', name, price)
        resetFields()
        Keyboard.dismiss()
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
        <Stack.Screen options={{title: 'Create Product'}} />
        <Image source={{uri: image || defaultPizzaImage}} style={styles.image} />
        <Text onPress={pickImage} style={styles.textBtn}>Select Image</Text>
      <Text style={styles.label}>Name</Text>
      <TextInput placeholder='Name' style={styles.input} value={name} onChangeText={setName} />
        
      <Text style={styles.label}>Price ($)</Text>
      <TextInput placeholder='9.99' style={styles.input} keyboardType='numeric' value={price} onChangeText={setPrice}/>

      <Button text='Create' onPress={onCreate} />
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