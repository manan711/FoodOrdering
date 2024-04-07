import { supabase } from '@/lib/supabase'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Button title="Sign Out" onPress={async() => await supabase.auth.signOut()} />
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 50,
    },
})