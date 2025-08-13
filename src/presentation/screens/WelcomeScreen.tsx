import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import welcomeStyles from '../styles/welcomeStyles';

const WelcomeScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <View style={welcomeStyles.container}>
      <Image
        source={require('../styles/assets/MEMO_logo.png')}
        style={welcomeStyles.logo}
        accessibilityLabel="Memo logo"
      />
      <Text style={welcomeStyles.title}>MEMO</Text>
      <Text style={welcomeStyles.subtitle}>
        Apoyo diario para tu{"\n"}memoria y quienes{"\n"}te cuidan
      </Text>
      <TouchableOpacity
        style={[welcomeStyles.button, welcomeStyles.loginButton]}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={welcomeStyles.buttonText}>Inicia Sesión</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[welcomeStyles.button, welcomeStyles.registerButton]}
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={welcomeStyles.buttonText}>Regístrate cuidador</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WelcomeScreen;
