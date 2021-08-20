import React, { useState } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import { Auth } from 'aws-amplify';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppTextInput from '../../components/AppTextInput/AppTextInput';
import AppButton from '../../components/AppButton/AppButton';

export default function DogPark({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const createTwoButtonAlert = () =>
  Alert.alert(
    "Ping Users",
    "Users within a mile radius will be notified.",
    [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      { text: "OK", onPress: () => console.log("OK Pressed") }
    ]
  );

  async function signUp() {
    try {
      await Auth.signUp({ username, password, attributes: { email } });
      console.log(' Sign-up Confirmed');
      navigation.navigate('ConfirmSignUp');
    } catch (error) {
      console.log(' Error signing up...', error);
    }
  }
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to Dewitt Clinton Dog Run</Text>
        <AppButton
          leftIcon="image"
          title="View"
          onPress={() => navigation.navigate('DogParkFeed')}
        />
        <AppButton
          leftIcon="camera"
          title="Post"
          onPress={() => navigation.navigate('Camera')}
        />
        <AppButton
          leftIcon="bell"
          title="Request"
          onPress={createTwoButtonAlert}
        />
      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: 'white'
  },
  container: {
    flex: 1,
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    color: '#202020',
    fontWeight: '500',
    marginVertical: 15
  },
  footerButtonContainer: {
    marginVertical: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  forgotPasswordButtonText: {
    color: '#81D8D0',

    fontSize: 18,
    fontWeight: '600'
  }
});