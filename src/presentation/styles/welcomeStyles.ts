import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const welcomeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  logo: {
    width: width * 0.55,
    height: width * 0.55,
    marginBottom: 24,
    resizeMode: 'contain',
  },
  title: {
    fontSize: width * 0.15,
    fontFamily: 'RubikOne',
    fontWeight: 'normal',
    color: '#7664FF',
    marginBottom: 8,
    textAlign: 'center',
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: width * 0.05,
    color: '#8B6AFF',
    marginBottom: 32,
    textAlign: 'center',
    fontWeight: '500',
  },
  button: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 24,
    marginBottom: 18,
    alignItems: 'center',
  },
  loginButton: {
    backgroundColor: '#8B6AFF',
  },
  registerButton: {
    backgroundColor: '#FF7CA3',
  },
  buttonText: {
    color: '#fff',
    fontSize: width * 0.05,
    fontWeight: 'bold',
  },
});

export default welcomeStyles;
