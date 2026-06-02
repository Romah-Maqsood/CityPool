import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Pressable,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, typography, spacing, borderRadius } from '../constants/colors';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import Checkbox from '../components/Checkbox';
import AppIcon from '../components/common/AppIcon';

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
    if (!validateForm()) {
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      console.log('Sign Up Data:', formData);
    }, 1500);
  };

  const isSubmitDisabled = isLoading || !isTermsChecked;

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={colors.background}
      />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? insets.top : 0}
      >
        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: Math.max(insets.bottom, spacing.lg) + spacing.md },
          ]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          bounces={false}
        >
          <View style={styles.header}>
            <View style={styles.logoBadge}>
              <AppIcon name="car" size={28} color={colors.onSecondary} />
            </View>
            <Text style={styles.brand}>CityPool</Text>
            <Text style={styles.title}>Create your account</Text>
            <Text style={styles.subtitle}>
              Share intercity rides across Pakistan — cheaper, safer, together.
            </Text>
          </View>

          <View style={styles.formCard}>
            <CustomInput
              label="Full Name"
              value={formData.fullName}
              onChangeText={text => handleChange('fullName', text)}
              placeholder="Enter your full name"
              iconName="person"
              required
              error={errors.fullName}
            />

            <CustomInput
              label="Phone Number"
              value={formData.phone}
              onChangeText={text => handleChange('phone', text)}
              placeholder="+92 300 1234567"
              iconName="phone"
              keyboardType="phone-pad"
              required
              error={errors.phone}
            />

            <CustomInput
              label="Email Address"
              value={formData.email}
              onChangeText={text => handleChange('email', text)}
              placeholder="name@example.com"
              iconName="email"
              keyboardType="email-address"
              autoCapitalize="none"
              required
              error={errors.email}
            />

            <Checkbox
              checked={isTermsChecked}
              onPress={() => {
                setIsTermsChecked(prev => !prev);
                if (errors.terms) {
                  setErrors(prev => ({ ...prev, terms: null }));
                }
              }}
              label="I agree to CityPool's "
              onLinkPress={() => console.log('Open Terms')}
            />
            {errors.terms ? (
              <Text style={styles.termsError}>{errors.terms}</Text>
            ) : null}

            <CustomButton
              title="Create Account"
              onPress={handleSignUp}
              loading={isLoading}
              disabled={isSubmitDisabled}
              iconName="arrowForward"
              iconPosition="right"
              style={styles.submitButton}
            />
          </View>

          <Pressable
            style={styles.footer}
            onPress={() => navigation.navigate('Login')}
            accessibilityRole="button"
          >
            <Text style={styles.footerText}>
              Already have an account?{' '}
              <Text style={styles.loginLink}>Log in</Text>
            </Text>
          </Pressable>

          <View style={styles.securityRow}>
            <AppIcon name="lock" size={14} color={colors.neutral} />
            <Text style={styles.securityText}>
              Secure registration · Phone verification at login
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.containerPadding,
    paddingTop: spacing.lg,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  logoBadge: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.full,
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  brand: {
    ...typography.headlineMedium,
    color: colors.secondary,
    marginBottom: spacing.xs,
  },
  title: {
    ...typography.title,
    fontSize: 24,
    lineHeight: 32,
    color: colors.onSurface,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.bodySmall,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    maxWidth: 300,
    lineHeight: 20,
  },
  formCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.borderLight,
    ...Platform.select({
      ios: {
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.06,
        shadowRadius: 12,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  termsError: {
    ...typography.bodySmall,
    color: colors.error,
    marginTop: -spacing.xs,
    marginBottom: spacing.sm,
  },
  submitButton: {
    marginTop: spacing.sm,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  footerText: {
    ...typography.bodyMedium,
    color: colors.onSurfaceVariant,
  },
  loginLink: {
    color: colors.secondary,
    fontWeight: '700',
  },
  securityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    marginTop: spacing.sm,
    opacity: 0.85,
  },
  securityText: {
    ...typography.labelSmall,
    color: colors.neutral,
  },
});

export default SignUpScreen;
