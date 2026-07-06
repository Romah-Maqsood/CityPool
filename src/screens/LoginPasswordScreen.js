import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors, spacing, borderRadius } from '../constants/colors';
import { loginPassenger, loginDriver } from '../services/authService';
import { saveToken, saveRefreshToken, saveUser } from '../utils/tokenStorage';

const LoginPasswordScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('passenger'); // 'passenger' | 'driver'
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!phone.trim() || !password.trim()) {
      setError('Phone and password are required');
      return;
    }
    if (!/^\+92[0-9]{10}$/.test(phone.trim())) {
      setError('Enter number as +923XXXXXXXXX');
      return;
    }
    setError('');
    setIsLoading(true);

    try {
      const result = role === 'passenger'
        ? await loginPassenger(phone.trim(), password.trim())
        : await loginDriver(phone.trim(), password.trim());

      console.log('Login success:', result);

      await saveToken(result.data.token);
      await saveRefreshToken(result.data.refreshToken);
      await saveUser({
        id: result.data.id,
        phone: result.data.phone,
        fullName: result.data.fullName,
        email: result.data.email,
        role: result.data.role,
      });

      setIsLoading(false);
      navigation.navigate('Home');
    } catch (err) {
      setIsLoading(false);
      console.log('Login error:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Invalid credentials');
    }
  };

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? insets.top : 0}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="arrow-back" size={24} color={colors.onSurface} />
          </TouchableOpacity>

          <Text style={styles.brand}>CityPool</Text>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Log in to continue</Text>

          {/* Role Toggle */}
          <View style={styles.roleToggle}>
            <TouchableOpacity
              style={[styles.roleButton, role === 'passenger' && styles.roleButtonActive]}
              onPress={() => setRole('passenger')}
            >
              <Text style={[styles.roleText, role === 'passenger' && styles.roleTextActive]}>
                Passenger
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.roleButton, role === 'driver' && styles.roleButtonActive]}
              onPress={() => setRole('driver')}
            >
              <Text style={[styles.roleText, role === 'driver' && styles.roleTextActive]}>
                Driver
              </Text>
            </TouchableOpacity>
          </View>

          {/* Phone */}
          <Text style={styles.inputLabel}>Phone Number</Text>
          <View style={styles.inputWrapper}>
            <Icon name="phone" size={20} color={colors.placeholder} style={styles.icon} />
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              placeholder="+923001234567"
              placeholderTextColor={colors.placeholder}
              keyboardType="phone-pad"
            />
          </View>

          {/* Password */}
          <Text style={styles.inputLabel}>Password</Text>
          <View style={styles.inputWrapper}>
            <Icon name="lock-outline" size={20} color={colors.placeholder} style={styles.icon} />
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              placeholderTextColor={colors.placeholder}
              secureTextEntry
              autoCapitalize="none"
            />
          </View>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <TouchableOpacity
            style={[styles.loginButton, isLoading && styles.buttonDisabled]}
            onPress={handleLogin}
            disabled={isLoading}
            activeOpacity={0.8}
          >
            <Text style={styles.loginButtonText}>
              {isLoading ? 'Logging in...' : 'Log In'}
            </Text>
          </TouchableOpacity>

          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>
              New here?{' '}
              <Text style={styles.signupLink} onPress={() => navigation.navigate('Login')}>
                Create an account
              </Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  flex: { flex: 1 },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.containerPadding,
    paddingTop: spacing.md,
  },
  backButton: { padding: spacing.xs, width: 40, marginBottom: spacing.sm },
  brand: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.secondary,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.onSurface,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: 14,
    color: colors.onSurfaceVariant,
    marginBottom: spacing.lg,
  },
  roleToggle: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: 4,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  roleButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: borderRadius.sm,
    alignItems: 'center',
  },
  roleButtonActive: {
    backgroundColor: colors.secondary,
  },
  roleText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.onSurfaceVariant,
  },
  roleTextActive: {
    color: colors.onSecondary,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.onSurfaceVariant,
    marginBottom: spacing.xs,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  icon: { marginRight: spacing.sm },
  input: {
    flex: 1,
    fontSize: 16,
    color: colors.onSurface,
    padding: 0,
  },
  errorText: {
    fontSize: 12,
    color: colors.error,
    marginBottom: spacing.md,
  },
  loginButton: {
    height: 52,
    backgroundColor: colors.secondary,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  buttonDisabled: { backgroundColor: colors.neutral, opacity: 0.6 },
  loginButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.onSecondary,
  },
  signupContainer: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  signupText: {
    fontSize: 14,
    color: colors.onSurfaceVariant,
  },
  signupLink: {
    color: colors.secondary,
    fontWeight: '600',
  },
});

export default LoginPasswordScreen;