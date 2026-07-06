import React, { useState, useRef } from 'react';
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
import { colors, typography, spacing, borderRadius } from '../constants/colors';
import { verifyOtp, sendOtp } from '../services/authService';

const OtpVerificationScreen = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const { phone } = route.params; // passed from LoginScreen

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef([]);

  const handleOtpChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    if (error) setError('');

    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const code = otp.join('');
    if (code.length !== 6) {
      setError('Enter the 6-digit code');
      return;
    }
    setError('');
    setIsLoading(true);
    try {
      const result = await verifyOtp(phone, code);
      console.log('Verify OTP:', result);
      setIsLoading(false);
      navigation.navigate('SignUp', { phone }); // adjust target as needed
    } catch (err) {
      setIsLoading(false);
      console.log('Verify OTP error:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Invalid or expired code');
    }
  };

  const handleResend = async () => {
    try {
      const result = await sendOtp(phone);
      console.log('OTP resent:', result);
    } catch (err) {
      console.log('Resend error:', err.response?.data || err.message);
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
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Icon name="arrow-back" size={24} color={colors.onSurface} />
            </TouchableOpacity>
          </View>

          <Text style={styles.title}>Verify your number</Text>
          <Text style={styles.subtitle}>
            Enter the 6-digit code sent to{'\n'}
            <Text style={styles.phoneText}>{phone}</Text>
          </Text>

          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => (inputRefs.current[index] = ref)}
                style={[styles.otpBox, error && styles.otpBoxError]}
                value={digit}
                onChangeText={(text) => handleOtpChange(text.replace(/[^0-9]/g, ''), index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                keyboardType="number-pad"
                maxLength={1}
                textAlign="center"
              />
            ))}
          </View>
          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <TouchableOpacity
            style={[styles.verifyButton, isLoading && styles.buttonDisabled]}
            onPress={handleVerify}
            disabled={isLoading}
            activeOpacity={0.8}
          >
            <Text style={styles.verifyButtonText}>
              {isLoading ? 'Verifying...' : 'Verify'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleResend} style={styles.resendContainer}>
            <Text style={styles.resendText}>
              Didn't get the code? <Text style={styles.resendLink}>Resend</Text>
            </Text>
          </TouchableOpacity>
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
  header: { marginBottom: spacing.lg },
  backButton: { padding: spacing.xs, width: 40 },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.onSurface,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: 14,
    color: colors.onSurfaceVariant,
    lineHeight: 20,
    marginBottom: spacing.xl,
  },
  phoneText: { fontWeight: '600', color: colors.onSurface },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  otpBox: {
    width: 48,
    height: 56,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    fontSize: 20,
    fontWeight: '600',
    color: colors.onSurface,
    backgroundColor: colors.surface,
  },
  otpBoxError: { borderColor: colors.error },
  errorText: {
    fontSize: 12,
    color: colors.error,
    marginBottom: spacing.md,
  },
  verifyButton: {
    height: 52,
    backgroundColor: colors.secondary,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.md,
  },
  buttonDisabled: { backgroundColor: colors.neutral, opacity: 0.6 },
  verifyButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.onSecondary,
  },
  resendContainer: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  resendText: {
    fontSize: 14,
    color: colors.onSurfaceVariant,
  },
  resendLink: {
    color: colors.secondary,
    fontWeight: '600',
  },
});

export default OtpVerificationScreen;