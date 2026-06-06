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
  Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors, typography, spacing, borderRadius } from '../constants/colors';

const LoginScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [countryCode, setCountryCode] = useState('+92');
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleContinue = () => {
    if (!phoneNumber.trim()) {
      setError('Phone number is required');
      return;
    }
    if (!/^[0-9]{10}$/.test(phoneNumber.trim())) {
      setError('Enter a valid 10-digit phone number');
      return;
    }
    setError('');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      console.log('Login with:', countryCode, phoneNumber);
    }, 1500);
  };

  const handleSocialLogin = (platform) => {
    console.log(`${platform} login pressed`);
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
          bounces={false}
        >
          {/* Top Content */}
          <View style={styles.topContent}>
            {/* Header with Pool/Swimmer Icon + CityPool */}
            <View style={styles.header}>
              <Icon name="pool" size={28} color={colors.secondary} />
              <Text style={styles.brand}>CityPool</Text>
            </View>

            {/* Car Illustration with Full Image Shadow Overlay */}
            <View style={styles.imageContainer}>
              <Image 
                source={require('../assets/images/car-illustration.png')} 
                style={styles.carImage}
                resizeMode="cover"
              />
              <View style={styles.imageOverlay} />
            </View>

            {/* Welcome Section - Exactly 3 Lines */}
            <View style={styles.welcomeContainer}>
              <Text style={styles.welcomeText}>Welcome to CityPool</Text>
              <Text style={styles.subtitle}>
                Reliable long-distance travel{'\n'}
                at your fingertips. Connect with{'\n'}
                verified travelers across Pakistan.
              </Text>
            </View>

            {/* Card Section */}
            <View style={styles.card}>
              {/* Phone Number Input */}
              <View style={styles.phoneContainer}>
                <Text style={styles.inputLabel}>Phone Number</Text>
                <View style={styles.phoneInputWrapper}>
                  <TouchableOpacity 
                    style={styles.countryCodeContainer}
                    onPress={() => setShowCountryDropdown(!showCountryDropdown)}
                  >
                    <Text style={styles.countryCodeText}>{countryCode}</Text>
                    <Icon name="arrow-drop-down" size={20} color={colors.neutral} />
                  </TouchableOpacity>
                  <View style={styles.divider} />
                  <TextInput
                    style={styles.phoneInput}
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    placeholder="300 1234567"
                    placeholderTextColor={colors.placeholder}
                    keyboardType="phone-pad"
                    maxLength={10}
                  />
                </View>
                {error ? <Text style={styles.errorText}>{error}</Text> : null}
              </View>

              {/* Continue Button */}
              <TouchableOpacity
                style={[styles.continueButton, isLoading && styles.buttonDisabled]}
                onPress={handleContinue}
                disabled={isLoading}
                activeOpacity={0.8}
              >
                <Text style={styles.continueButtonText}>Continue</Text>
                <Icon name="arrow-forward" size={18} color={colors.onSecondary} />
              </TouchableOpacity>

              {/* OR CONTINUE WITH Section */}
              <View style={styles.orContainer}>
                <View style={styles.orLine} />
                <Text style={styles.orText}>OR CONTINUE WITH</Text>
                <View style={styles.orLine} />
              </View>

              {/* Social Buttons - Using available icons */}
              <View style={styles.socialContainer}>
                <TouchableOpacity 
                  style={styles.socialButton}
                  onPress={() => handleSocialLogin('Google')}
                  activeOpacity={0.7}
                >
                  {/* Using "public" as Google icon alternative */}
                  <View style={styles.googleIconBg}>
                    <Icon name="public" size={20} color="#DB4437" />
                  </View>
                  <Text style={styles.socialButtonText}>Google</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.socialButton}
                  onPress={() => handleSocialLogin('Facebook')}
                  activeOpacity={0.7}
                >
                  <Icon name="facebook" size={20} color="#4267B2" />
                  <Text style={styles.socialButtonText}>Facebook</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Sign Up Link */}
            <View style={styles.signupContainer}>
              <Text style={styles.signupText}>
                Don't have an account?{' '}
                <Text style={styles.signupLink} onPress={() => navigation.navigate('SignUp')}>
                  Sign Up
                </Text>
              </Text>
            </View>
          </View>

          {/* Bottom Footer */}
          <View style={styles.bottomFooter}>
            <View style={styles.securityContainer}>
              <Icon name="verified-user" size={14} color={colors.neutral} />
              <Text style={styles.securityText}>Secure and Verified Connections</Text>
            </View>
            <Text style={styles.copyright}>
              © 2024 CityPool Pakistan. All rights reserved.
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
  flex: { flex: 1 },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.containerPadding,
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
    justifyContent: 'space-between',
  },
  topContent: {
    flex: 1,
  },
  bottomFooter: {
    marginTop: 'auto',
    paddingBottom: spacing.md,
  },
  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  brand: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.secondary,
  },
  // Car Image
  imageContainer: {
    alignItems: 'center',
    marginBottom: spacing.lg,
    position: 'relative',
  },
  carImage: {
    width: '100%',
    height: 180,
    borderRadius: borderRadius.lg,
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: borderRadius.lg,
  },
  // Welcome Section
  welcomeContainer: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.onSurface,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: 14,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    lineHeight: 20,
  },
  // Card Section
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    ...Platform.select({
      ios: {
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 8,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  // Phone Input
  phoneContainer: {
    marginBottom: spacing.md,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.onSurfaceVariant,
    marginBottom: spacing.xs,
  },
  phoneInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
  },
  countryCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  countryCodeText: {
    fontSize: 16,
    color: colors.onSurface,
  },
  divider: {
    width: 1,
    height: 24,
    backgroundColor: colors.border,
    marginHorizontal: spacing.sm,
  },
  phoneInput: {
    flex: 1,
    fontSize: 16,
    color: colors.onSurface,
    padding: 0,
  },
  errorText: {
    fontSize: 12,
    color: colors.error,
    marginTop: spacing.xs,
  },
  // Continue Button
  continueButton: {
    flexDirection: 'row',
    height: 52,
    backgroundColor: colors.secondary,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  buttonDisabled: { 
    backgroundColor: colors.neutral, 
    opacity: 0.6,
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.onSecondary,
  },
  // OR Section
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  orText: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
    marginHorizontal: spacing.md,
  },
  // Social Buttons
  socialContainer: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    gap: spacing.sm,
  },
  googleIconBg: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.onSurface,
  },
  // Sign Up
  signupContainer: {
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  signupText: {
    fontSize: 14,
    color: colors.onSurfaceVariant,
  },
  signupLink: { 
    color: colors.secondary, 
    fontWeight: '600',
  },
  // Security Footer
  securityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
    gap: spacing.xs,
  },
  securityText: {
    fontSize: 12,
    color: colors.neutral,
  },
  copyright: {
    fontSize: 11,
    color: colors.neutral,
    textAlign: 'center',
  },
});

export default LoginScreen;