import { Auth } from 'aws-amplify';
import React from 'react';
import { useEffect } from 'react';
import { StatusBar, Button, StyleSheet, Text, View } from 'react-native';
import AppButton from '../../components/AppButton/AppButton';

const ProfileScreen = (props) => {
  async function signOut() {
    try {
      await Auth.signOut();
      props.updateAuthState('loggedOut')
    } catch (error) {
      console.log('Error signing out:', error);
    }
  }
  return (
    <View style={styles.container}>
      <AppButton
        title="Sign out"
        color="#81D8D0"
        onPress={signOut}
        style={styles.button}
        />
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  button: {
    marginVertical: 10,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    width: '80%',
    backgroundColor: '#81D8D0'
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    textTransform: 'uppercase'
  }
});

export default ProfileScreen;