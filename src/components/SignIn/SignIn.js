import React from 'react';
import { StyleSheet, View, TextInput, Button } from 'react-native';
import { AuthContext } from '../..';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';

WebBrowser.maybeCompleteAuthSession();

export default function SignIn() {
  const { signIn } = React.useContext(AuthContext);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: '170887349484-v2gjagrb7bipafeqbe21qdlig2mgjgpd.apps.googleusercontent.com'
  })

  React.useEffect(()=>{console.log('response', response)})

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      }
  }, [response]);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button 
        title="Sign in" 
        onPress={() => signIn({ username, password })} 
      />
      <Button
        disabled={!request}
        title="Login w/ Google"
        onPress={() => {
          // promptAsync().then(resp => {console.log('wtf', resp)})
          console.log(response)
          }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});