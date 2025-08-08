import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { observer } from 'mobx-react';
import { useAuthStore } from '../hooks/useAuthStore';
import { Button, Card } from '../components';

const HomeScreen = observer(() => {
  const authStore = useAuthStore();

  const handleSignOut = async () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Sign Out', 
          style: 'destructive',
          onPress: async () => {
            const result = await authStore.signOut();
            if (result.success) {
              Alert.alert('Success', 'Signed out successfully');
            }
          }
        },
      ]
    );
  };

  if (authStore.isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>React Native Clean Architecture</Text>
      <Text style={styles.subtitle}>With Supabase & Expo 53</Text>
      
      {authStore.isAuthenticated ? (
        <Card title="Welcome back!" style={styles.userCard}>
          <Text style={styles.userInfo}>
            📧 {authStore.user?.email}
          </Text>
          {authStore.user?.name && (
            <Text style={styles.userInfo}>
              👤 {authStore.user.name}
            </Text>
          )}
          <Text style={styles.userInfo}>
            🆔 {authStore.user?.id.slice(0, 8)}...
          </Text>
          
          <Button
            title="Sign Out"
            onPress={handleSignOut}
            variant="secondary"
            style={styles.signOutButton}
          />
        </Card>
      ) : (
        <Card title="Authentication Required" style={styles.loginCard}>
          <Text style={styles.loginText}>Please sign in to continue</Text>
        </Card>
      )}
      
      {authStore.error && (
        <Text style={styles.error}>{authStore.error}</Text>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#666',
  },
  userCard: {
    alignItems: 'center',
    maxWidth: 400,
    width: '100%',
  },
  userInfo: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
    textAlign: 'center',
  },
  signOutButton: {
    marginTop: 15,
    width: '100%',
  },
  loginCard: {
    alignItems: 'center',
    maxWidth: 400,
    width: '100%',
  },
  loginText: {
    fontSize: 16,
    color: '#FF5722',
    textAlign: 'center',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 14,
  },
});

export default HomeScreen;
