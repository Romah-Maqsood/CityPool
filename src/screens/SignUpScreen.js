// src/screens/SignUpScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { colors, typography, spacing, borderRadius } from '../constants/colors';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import Checkbox from '../components/Checkbox';
import PersonIcon from '../assets/icons/person.svg';
import PhoneIcon from '../assets/icons/phone.svg';
import EmailIcon from '../assets/icons/email.svg';
import ArrowIcon from '../assets/icons/arrow-forward.svg';



// Temporary text icons (replace with SVG components later)
const PersonIcon = () => <Text style={styles.iconText}>👤</Text>;
const PhoneIcon = () => <Text style={styles.iconText}>📞</Text>;
const EmailIcon = () => <Text style={styles.iconText}>✉️</Text>;
const ArrowIcon = () => <Text style={styles.iconText}>→</Text>;

const SignUpScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
  });
  const [errors, setErrors] = useState({});
  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: null });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
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
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header Section - CityPool Logo */}
          <View style={styles.header}>
            <Text style={styles.logo}>CityPool</Text>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Enter your details to start pooling.</Text>
          </View>

          {/* Form Section */}
          <View style={styles.form}>
            <CustomInput
              label="Full Name"
              value={formData.fullName}
              onChangeText={(text) => handleChange('fullName', text)}
              placeholder="Enter your full name"
              iconComponent={<PersonIcon />}
              required
              error={errors.fullName}
            />

            <CustomInput
              label="Phone Number"
              value={formData.phone}
              onChangeText={(text) => handleChange('phone', text)}
              placeholder="+92 300 1234567"
              iconComponent={<PhoneIcon />}
              keyboardType="phone-pad"
              required
              error={errors.phone}
            />

            <CustomInput
              label="Email Address"
              value={formData.email}
              onChangeText={(text) => handleChange('email', text)}
              placeholder="name@example.com"
              iconComponent={<EmailIcon />}
              keyboardType="email-address"
              autoCapitalize="none"
              required
              error={errors.email}
            />

            {/* Terms Checkbox */}
            <Checkbox
              checked={isTermsChecked}
              onPress={() => setIsTermsChecked(!isTermsChecked)}
              label="I agree to CityPool's "
              onLinkPress={() => console.log('Open Terms')}
            />

            {/* Create Account Button */}
            <View style={styles.buttonContainer}>
              <CustomButton
                title="Create Account"
                onPress={handleSignUp}
                loading={isLoading}
                iconComponent={<ArrowIcon />}
                iconPosition="right"
              />
            </View>
          </View>

          {/* Login Link - Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Already have an account?
              <Text
                style={styles.loginLink}
                onPress={() => navigation.navigate('Login')}
              >
                {' '}Login
              </Text>
            </Text>
          </View>

          {/* Security Badge - Bottom Footer */}
          <View style={styles.securityBadge}>
            <Text style={styles.securityIcon}>🔒</Text>
            <Text style={styles.securityText}>End-to-End Secure Registration</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.containerPadding,
    paddingTop: spacing.headerPadding,
    paddingBottom: spacing.footerPadding,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  logo: {
    ...typography.headlineLarge,
    color: colors.secondary,
    marginBottom: spacing.md,
    fontSize: 32,
    fontWeight: '700',
  },
  title: {
    ...typography.title,
    color: colors.onSurface,
    marginBottom: spacing.xs,
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
  },
  subtitle: {
    ...typography.subtitle,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
  },
  form: {
    marginBottom: spacing.lg,
  },
  buttonContainer: {
    marginTop: spacing.md,
  },
  footer: {
    alignItems: 'center',
    marginTop: spacing.lg,
    marginBottom: spacing.md,
  },
  footerText: {
    ...typography.bodyMedium,
    color: colors.onSurfaceVariant,
  },
  loginLink: {
    color: colors.secondary,
    fontWeight: 'bold',
  },
  securityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.md,
    gap: spacing.sm,
    opacity: 0.6,
  },
  securityIcon: {
    fontSize: 14,
  },
  securityText: {
    ...typography.labelSmall,
    color: colors.onSurface,
    fontSize: 12,
  },
  iconText: {
    fontSize: 18,
  },
});

export default SignUpScreen;