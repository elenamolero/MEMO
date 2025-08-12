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
  const [role, setRole] = useState<'supervisor' | 'patient'>('patient');
  const [supervisorRole, setSupervisorRole] = useState<'familiar' | 'neuropsychologist' | 'doctor' | null>(null);
  const [birthDate, setBirthDate] = useState('');
  const [illnessInitiationDate, setIllnessInitiationDate] = useState('');
  const [illnessName, setIllnessName] = useState('');
  const [GDSNumber, setGDSNumber] = useState('');
  const [sex, setSex] = useState<'male' | 'female' | 'other' | null>(null);
  const [gender, setGender] = useState<'male' | 'female' | 'other' | null>(null);
  const [academicLevel, setAcademicLevel] = useState<'none' | 'primary' | 'secondary' | 'higher' | null>(null);

  const authStore = useAuthStore();

  const handleSubmit = async () => {
    if (!email || !password || !name || !surname || !role) {
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
        supervisor_role: role === 'supervisor' ? supervisorRole : null,
        birth_date: role === 'patient' ? birthDate : null,
        illness_initiation_date: role === 'patient' ? illnessInitiationDate : null,
        illness_name: role === 'patient' ? illnessName : null,
        GDS_number: role === 'patient' && GDSNumber ? Number(GDSNumber) : null,
        sex: role === 'patient' ? sex : null,
        gender: role === 'patient' ? gender : null,
        academic_level: role === 'patient' ? academicLevel : null,
      };
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
          <Text style={{ marginBottom: 5 }}>Role</Text>
          <Button
            title={role === 'supervisor' ? 'Supervisor' : 'Patient'}
            onPress={() => setRole(role === 'supervisor' ? 'patient' : 'supervisor')}
            style={styles.input}
          />
        </View>
        {role === 'supervisor' && (
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
        )}
        {role === 'patient' && (
          <>
            <TextInput
              style={styles.input}
              placeholder="Birth Date (YYYY-MM-DD)"
              value={birthDate}
              onChangeText={setBirthDate}
            />
            <TextInput
              style={styles.input}
              placeholder="Illness Initiation Date (YYYY-MM-DD)"
              value={illnessInitiationDate}
              onChangeText={setIllnessInitiationDate}
            />
            <TextInput
              style={styles.input}
              placeholder="Illness Name"
              value={illnessName}
              onChangeText={setIllnessName}
            />
            <TextInput
              style={styles.input}
              placeholder="GDS Number"
              value={GDSNumber}
              onChangeText={setGDSNumber}
              keyboardType="numeric"
            />
            <View style={{ marginBottom: 10 }}>
              <Text style={{ marginBottom: 5 }}>Sex</Text>
              <Button
                title={sex || 'Select'}
                onPress={() => {
                  const options = ['male', 'female', 'other'];
                  const idx = options.indexOf(sex || 'male');
                  setSex(options[(idx + 1) % options.length] as any);
                }}
                style={styles.input}
              />
            </View>
            <View style={{ marginBottom: 10 }}>
              <Text style={{ marginBottom: 5 }}>Gender</Text>
              <Button
                title={gender || 'Select'}
                onPress={() => {
                  const options = ['male', 'female', 'other'];
                  const idx = options.indexOf(gender || 'male');
                  setGender(options[(idx + 1) % options.length] as any);
                }}
                style={styles.input}
              />
            </View>
            <View style={{ marginBottom: 10 }}>
              <Text style={{ marginBottom: 5 }}>Academic Level</Text>
              <Button
                title={academicLevel || 'Select'}
                onPress={() => {
                  const options = ['none', 'primary', 'secondary', 'higher'];
                  const idx = options.indexOf(academicLevel || 'none');
                  setAcademicLevel(options[(idx + 1) % options.length] as any);
                }}
                style={styles.input}
              />
            </View>
          </>
        )}
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
