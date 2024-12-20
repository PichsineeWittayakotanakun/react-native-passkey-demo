import * as React from 'react';
import { StyleSheet, View, Button, Alert } from 'react-native';
import { Passkey } from 'react-native-passkey';

export default function App() {

 
  async function createAccount() {

    try {
      //generate a requestJson from backend
      const requestJson = {
        'challenge': 'T1xCsnxM2DNL2KdK5CLa6fMhD7OBqho6syzInk_n-Uo',
        'rp': {
          'name': 'Passkey',
          'id': 'your_assetlinks_domain_name',
        },
        'user': {
          'id': 'user123',
          'name': 'john.doe@example.coms',
          'displayName': 'john Does',
        },
        'pubKeyCredParams': [
          {
            'type': 'public-key',
            'alg': -7,
          },
        ],
        'authenticatorSelection': {
          'authenticatorAttachment': 'platform',
          'requireResidentKey': true,
          'userVerification': 'preferred',
        },
        'timeout': 60000,
        'attestation': 'direct',
      };

      const result = await Passkey.createPlatformKey(requestJson);
      // call api to save the result to backend
      console.log('Registration result: ',result);

    } catch (e) {
      console.log('Registration result:',e);

    }
  }

  async function authenticateAccount() {

    try {
       //generate a requestJson from backend
      const requestJson = {
      'challenge': 'T1xCsnxM2DNL2KdK5CLa6fMhD7OBqho6syzInk_n-Uo',
      'allowCredentials': [],
      'timeout': 1800000,
      'userVerification': 'required',
      'rpId': 'your_assetlinks_domain_name',
      };

      const result = await Passkey.getPlatformKey(requestJson);
      // call api to verify the result from backend

      console.log('Authentication result: ', result);
    } catch (e) {
      console.log(e);
    }
  }

  async function isSupported() {
    const result = Passkey.isSupported();
    Alert.alert(result ? 'Supported' : 'Not supported');
  }

  return (
    <View style={styles.container}>
      <Button title="Create Account" onPress={createAccount} />
      <Button title="Authenticate" onPress={authenticateAccount} />
      <Button title="isSupported?" onPress={isSupported} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
