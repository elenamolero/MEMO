import React, { useState } from 'react';
import { ScrollView, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { observer } from 'mobx-react';
import { useAuthStore } from '../hooks/useAuthStore';
import { Button, Card } from '../components';

import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../navigation/AppNavigator';

const LoginScreen = observer(() => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const authStore = useAuthStore();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleSubmit = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }
    try {
      const result = await authStore.signIn(email, password);
      if (result.success) {
        Alert.alert('Success', 'Welcome back!');
      }
    } catch (error) {
      // Error is handled by authStore
    }
  };

  return (
    <ScrollView contentContainerStyle={{ ...styles.container, flexGrow: 1 }} keyboardShouldPersistTaps="handled">
      <Card title="Sign In" style={styles.card}>
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
          autoComplete="current-password"
        />
        {authStore.error && (
          <Text style={styles.error}>{authStore.error}</Text>
        )}
        <Button
          title="Sign In"
          onPress={handleSubmit}
          loading={authStore.isLoading}
          disabled={authStore.isLoading}
          style={styles.submitButton}
        />
        <Button
          title="Create Account"
          onPress={() => navigation.navigate('Register')}
          variant="outline"
        />
      </Card>
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  container: {
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
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 14,
  },
});

export default LoginScreen;