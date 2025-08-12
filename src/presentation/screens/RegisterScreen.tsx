import React, { useState } from 'react';
import { ScrollView, Text, TextInput, StyleSheet, View, Alert } from 'react-native';
import { observer } from 'mobx-react';
import { useAuthStore } from '../hooks/useAuthStore';
import { Button, Card } from '../components';

const RegisterScreen = observer(() => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const role = 'supervisor';
  const [supervisorRole, setSupervisorRole] = useState<'familiar' | 'neuropsychologist' | 'doctor' | null>(null);

  const authStore = useAuthStore();

  const handleSubmit = async () => {
    if (!email || !password || !name || !surname || !supervisorRole) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }
    try {
      const dto = {
        email,
        password,
        name,
        surname,
        role,
        supervisor_role: supervisorRole,
      };
      console.log('RegisterScreen DTO:', dto);
      const result = await authStore.signUp(dto);
      if (result.success) {
        if (result.needsConfirmation) {
          Alert.alert('Success', 'Please check your email to confirm your account');
        } else {
          Alert.alert('Success', 'Account created successfully!');
        }
      }
    } catch (error) {
      // Error is handled by authStore
    }
  };

  return (
    <ScrollView contentContainerStyle={{ ...styles.container, flexGrow: 1 }} keyboardShouldPersistTaps="handled">
      <Card title="Create Account" style={styles.card}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
        />
        <TextInput
          style={styles.input}
          placeholder="Surname"
          value={surname}
          onChangeText={setSurname}
          autoCapitalize="words"
        />
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
          autoComplete="new-password"
        />
        <View style={{ marginBottom: 10 }}>
          <Text style={{ marginBottom: 5 }}>Supervisor Role</Text>
          <Button
            title={supervisorRole || 'Select'}
            onPress={() => {
              const roles = ['familiar', 'neuropsychologist', 'doctor'];
              const idx = roles.indexOf(supervisorRole || 'familiar');
              setSupervisorRole(roles[(idx + 1) % roles.length] as any);
            }}
            style={styles.input}
          />
        </View>
        {authStore.error && (
          <Text style={styles.error}>{authStore.error}</Text>
        )}
        <Button
          title="Sign Up"
          onPress={handleSubmit}
          loading={authStore.isLoading}
          disabled={authStore.isLoading}
          style={styles.submitButton}
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

export default RegisterScreen;
