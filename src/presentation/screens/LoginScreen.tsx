import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { observer } from 'mobx-react';
import { useAuthStore } from '../hooks/useAuthStore';
import { Button, Card } from '../components';

const LoginScreen = observer(() => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  
  const authStore = useAuthStore();

  const handleSubmit = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      if (isSignUp) {
        const result = await authStore.signUp(email, password, name || undefined);
        if (result.success) {
          if (result.needsConfirmation) {
            Alert.alert('Success', 'Please check your email to confirm your account');
          } else {
            Alert.alert('Success', 'Account created successfully!');
          }
        }
      } else {
        const result = await authStore.signIn(email, password);
        if (result.success) {
          Alert.alert('Success', 'Welcome back!');
        }
      }
    } catch (error) {
  // Error is handled by authStore
    }
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setEmail('');
    setPassword('');
    setName('');
    authStore.setError(null);
  };

  return (
    <View style={styles.container}>
      <Card title={isSignUp ? 'Create Account' : 'Sign In'} style={styles.card}>
        {isSignUp && (
          <TextInput
            style={styles.input}
            placeholder="Name (optional)"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />
        )}

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoComplete={isSignUp ? "new-password" : "current-password"}
        />

        {authStore.error && (
          <Text style={styles.error}>{authStore.error}</Text>
        )}

        <Button
          title={isSignUp ? 'Sign Up' : 'Sign In'}
          onPress={handleSubmit}
          loading={authStore.isLoading}
          disabled={authStore.isLoading}
          style={styles.submitButton}
        />

        <Button
          title={isSignUp ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
          onPress={toggleMode}
          variant="outline"
          style={styles.switchButton}
        />
      </Card>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  card: {
    maxWidth: 400,
    alignSelf: 'center',
    width: '100%',
  },
  input: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  submitButton: {
    marginTop: 10,
    marginBottom: 15,
  },
  switchButton: {
    marginTop: 5,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 14,
  },
});

export default LoginScreen;
