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
import { colors, typography, spacing, borderRadius } from '../constants/colors';

// Custom Input Component
const CustomInput = ({ label, value, onChangeText, placeholder, iconName, error }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={[
        styles.inputWrapper,
        isFocused && styles.inputWrapperFocused,
        error && styles.inputWrapperError,
      ]}>
        {iconName && (
          <Icon 
            name={iconName} 
            size={20} 
            color={colors.placeholder}
            style={styles.inputIcon} 
          />
        )}
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.placeholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

// Custom Button Component
const CustomButton = ({ title, onPress, loading, disabled }) => {
  return (
    <TouchableOpacity
      style={[styles.button, (disabled || loading) && styles.buttonDisabled]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      <Text style={styles.buttonText}>{title}</Text>
      {!loading && (
        <Icon name="arrow-forward" size={18} color={colors.onSecondary} style={styles.buttonIcon} />
      )}
    </TouchableOpacity>
  );
};

const SignUpScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
  });
  const [errors, setErrors] = useState({});
  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s-]{10,}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Enter a valid phone number';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Enter a valid email address';
    }

    if (!isTermsChecked) {
      newErrors.terms = 'Please accept the Terms of Service';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = () => {
    if (!validateForm()) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      console.log('Sign Up Data:', formData);
    }, 1500);
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
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: Math.max(insets.bottom, spacing.xl) + spacing.lg },
          ]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* CityPool Heading - CENTER aligned */}
          <Text style={styles.brand}>CityPool</Text>

          {/* Header Section - LEFT aligned */}
          <View style={styles.header}>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Enter your details to start pooling.</Text>
          </View>

          {/* Form Section */}
          <View style={styles.form}>
            <CustomInput
              label="Full Name"
              value={formData.fullName}
              onChangeText={text => handleChange('fullName', text)}
              placeholder="Enter your full name"
              iconName="person-outline"
              error={errors.fullName}
            />

            <CustomInput
              label="Phone Number"
              value={formData.phone}
              onChangeText={text => handleChange('phone', text)}
              placeholder="+92 300 1234567"
              iconName="phone"
              keyboardType="phone-pad"
              error={errors.phone}
            />

            <CustomInput
              label="Email Address"
              value={formData.email}
              onChangeText={text => handleChange('email', text)}
              placeholder="name@example.com"
              iconName="mail-outline"
              keyboardType="email-address"
              autoCapitalize="none"
              error={errors.email}
            />

            {/* Terms Checkbox */}
            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() => setIsTermsChecked(!isTermsChecked)}
              activeOpacity={0.7}
            >
              <View style={[styles.checkbox, isTermsChecked && styles.checkboxChecked]}>
                {isTermsChecked && (
                  <Icon name="check" size={12} color={colors.onSecondary} />
                )}
              </View>
              <Text style={styles.checkboxLabel}>
                I agree to CityPool's{' '}
                <Text style={styles.linkText}>Terms of Service</Text> and{' '}
                <Text style={styles.linkText}>Privacy Policy</Text>.
              </Text>
            </TouchableOpacity>
            {errors.terms && <Text style={styles.termsError}>{errors.terms}</Text>}

            {/* Create Account Button */}
            <CustomButton
              title="Create Account"
              onPress={handleSignUp}
              loading={isLoading}
              disabled={isLoading}
            />
          </View>

          {/* Login Link - CENTER aligned */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Already have an account?{' '}
              <Text style={styles.loginLink} onPress={() => navigation.navigate('Login')}>
                Login
              </Text>
            </Text>
          </View>

          {/* Security Text - CENTER aligned */}
          <View style={styles.securityContainer}>
            <Icon name="lock-outline" size={14} color={colors.neutral} />
            <Text style={styles.securityText}>
              End-to-End Secure Registration
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
    paddingTop: spacing.lg,
  },
  brand: {
    ...typography.headlineMedium,
    fontSize: 28,
    fontWeight: '700',
    color: colors.secondary,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  header: { marginBottom: spacing.lg },
  title: {
    ...typography.title,
    fontSize: 26,
    fontWeight: '700',
    color: colors.onSurface,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.bodyMedium,
    fontSize: 15,
    color: colors.onSurfaceVariant,
  },
  form: { marginBottom: spacing.md },
  inputContainer: { marginBottom: spacing.md },
  inputLabel: {
    ...typography.labelLarge,
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
  },
  inputWrapperFocused: { borderColor: colors.secondary, borderWidth: 1.5 },
  inputWrapperError: { borderColor: colors.error },
  inputIcon: { marginRight: spacing.sm },
  input: {
    flex: 1,
    ...typography.bodyMedium,
    fontSize: 16,
    color: colors.onSurface,
    padding: 0,
  },
  errorText: {
    ...typography.bodySmall,
    fontSize: 12,
    color: colors.error,
    marginTop: spacing.xs,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.md,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 3,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  checkboxChecked: { backgroundColor: colors.secondary, borderColor: colors.secondary },
  checkboxLabel: {
    ...typography.bodySmall,
    fontSize: 13,
    color: colors.onSurfaceVariant,
    flex: 1,
    lineHeight: 20,
  },
  linkText: { 
    color: colors.secondary, 
    fontWeight: '700',
  },
  termsError: {
    ...typography.bodySmall,
    fontSize: 12,
    color: colors.error,
    marginTop: -spacing.sm,
    marginBottom: spacing.sm,
  },
  button: {
    flexDirection: 'row',
    height: 52,
    backgroundColor: colors.secondary,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  buttonDisabled: { backgroundColor: colors.neutral, opacity: 0.6 },
  buttonText: {
    ...typography.labelLarge,
    fontSize: 16,
    fontWeight: '600',
    color: colors.onSecondary,
  },
  buttonIcon: { marginLeft: spacing.sm },
  footer: { alignItems: 'center', paddingVertical: spacing.md },
  footerText: {
    ...typography.bodyMedium,
    fontSize: 14,
    color: colors.onSurfaceVariant,
  },
  loginLink: { color: colors.secondary, fontWeight: '600' },
  securityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.lg,
    marginBottom: spacing.md,
  },
  securityText: {
    ...typography.labelSmall,
    fontSize: 12,
    color: colors.neutral,
    marginLeft: spacing.xs,
  },
});

export default SignUpScreen;