import { supabase } from '@/lib/supabase'
import { useAuth } from '@/providers/AuthProvider'
import { Redirect } from 'expo-router'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'


const ProfileScreen = () => {

  const { session } = useAuth();
  if(!session) {
    return <Redirect href={'/sign-in'} />
  }
  const signOuting = async() => {
    await supabase.auth.signOut();
  }
  return (
    <View style={styles.container}>
      <Button title="Sign Out" onPress={signOuting} />
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