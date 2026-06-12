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
  Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors, spacing, borderRadius } from '../constants/colors';

const VerifyIdentityScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [activeNav, setActiveNav] = useState('profile');

  const handleFrontUpload = () => console.log('Upload front side CNIC');
  const handleBackUpload = () => console.log('Upload back side CNIC');
  const handleSubmit = () => console.log('Submit verification');

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

          {/* ── HEADER ── */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Icon name="arrow-back" size={24} color={colors.onSurface} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Verification</Text>

            {/* Profile pic — plain circle, no border, no dashed line */}
            <View style={styles.profileImageWrapper}>
              <Image
                source={require('../assets/images/profile-icon.png')}
                style={styles.profileImage}
                resizeMode="cover"
              />
            </View>
          </View>

          {/* ── STEP INDICATOR ── */}
          <View style={styles.stepContainer}>
            <View style={styles.stepWrapper}>
              <View style={[styles.stepCircle, styles.stepCircleActive]}>
                <Text style={styles.stepNumberActive}>1</Text>
              </View>
              <Text style={[styles.stepLabel, styles.stepLabelActive]}>Identity</Text>
            </View>

            <View style={styles.stepLine} />

            <View style={styles.stepWrapper}>
              <View style={styles.stepCircle}>
                <Text style={styles.stepNumber}>2</Text>
              </View>
              <Text style={styles.stepLabel}>Review</Text>
            </View>

            <View style={styles.stepLine} />

            <View style={styles.stepWrapper}>
              <View style={styles.stepCircle}>
                <Text style={styles.stepNumber}>3</Text>
              </View>
              <Text style={styles.stepLabel}>Verified</Text>
            </View>
          </View>

          {/* ── SECURE VERIFICATION BLOCK ── */}
          <View style={styles.secureContainer}>
            <View style={styles.secureIconSquare}>
              <IconMCI name="shield-check" size={28} color={colors.secondary} />
            </View>
            <Text style={styles.secureTitle}>Secure Verification</Text>
            <Text style={styles.secureDescription}>
              Please upload a clear photo of your CNIC{'\n'}
              (Front &amp; Back) for verification. This helps{'\n'}
              us maintain a trusted community for long-{'\n'}
              distance travel.
            </Text>
          </View>

          {/* ── FRONT SIDE ── */}
          <Text style={styles.sectionTitle}>Front Side</Text>
          <TouchableOpacity
            style={styles.uploadArea}
            onPress={handleFrontUpload}
            activeOpacity={0.7}
          >
            <IconMCI name="camera-plus-outline" size={36} color={colors.secondary} />
            <Text style={styles.uploadText}>Click to Upload</Text>
            <Text style={styles.uploadHint}>PNG or JPG up to 10MB</Text>
          </TouchableOpacity>

          <View style={styles.bulletPoint}>
            <Icon name="info" size={18} color={colors.secondary} />
            <Text style={styles.bulletText}>Ensure all details are legible</Text>
          </View>

          {/* ── BACK SIDE ── */}
          <Text style={[styles.sectionTitle, styles.backSideTitle]}>Back Side</Text>
          <TouchableOpacity
            style={styles.uploadArea}
            onPress={handleBackUpload}
            activeOpacity={0.7}
          >
            <IconMCI name="cards-outline" size={36} color={colors.secondary} />
            <Text style={styles.uploadText}>Click to Upload</Text>
            <Text style={styles.uploadHint}>PNG or JPG up to 10MB</Text>
          </TouchableOpacity>

          <View style={styles.encryptedNote}>
            <IconMCI name="shield-lock-outline" size={18} color={colors.secondary} />
            <Text style={styles.encryptedText}>Your data is encrypted &amp; secure</Text>
          </View>

          {/* ── PRIVACY & SECURITY CARD ── */}
          <View style={styles.privacyCard}>
            <View style={styles.privacyHeader}>
              <IconMCI name="lock-outline" size={20} color={colors.secondary} />
              <Text style={styles.privacyTitle}>Privacy &amp; Security</Text>
            </View>
            <Text style={styles.privacyText}>
              CityPool uses industry-standard encryption to protect your identity documents. Your CNIC data is strictly used for verification purposes and will never be shared with third parties.
            </Text>
          </View>

          {/* ── SUBMIT BUTTON ── */}
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmit}
            activeOpacity={0.8}
          >
            <Text style={styles.submitButtonText}>Submit for Verification</Text>
            <IconMCI name="check-decagram-outline" size={20} color={colors.onSecondary} />
          </TouchableOpacity>

          {/* ── TERMS TEXT ── */}
          <Text style={styles.termsText}>
            By submitting, you agree to our{' '}
            <Text style={styles.termsLink}>Verification Terms</Text> and acknowledge our{' '}
            <Text style={styles.termsLink}>Privacy &amp; Security</Text>.
          </Text>

          {/* ── BOTTOM NAVIGATION ── */}
          <View style={[styles.bottomNav, { paddingBottom: insets.bottom || spacing.sm }]}>

            <TouchableOpacity
              style={[styles.navItem, activeNav === 'home' && styles.navItemActive]}
              onPress={() => setActiveNav('home')}
              activeOpacity={0.7}
            >
              <Icon
                name="home"
                size={26}
                color={activeNav === 'home' ? colors.secondary : colors.neutral}
              />
              <Text style={[styles.navLabel, activeNav === 'home' && styles.navLabelActive]}>
                Home
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.navItem, activeNav === 'rides' && styles.navItemActive]}
              onPress={() => setActiveNav('rides')}
              activeOpacity={0.7}
            >
              <IconMCI
                name="car-outline"
                size={26}
                color={activeNav === 'rides' ? colors.secondary : colors.neutral}
              />
              <Text style={[styles.navLabel, activeNav === 'rides' && styles.navLabelActive]}>
                My Rides
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.navItem, activeNav === 'messages' && styles.navItemActive]}
              onPress={() => setActiveNav('messages')}
              activeOpacity={0.7}
            >
              <IconMCI
                name="message-outline"
                size={26}
                color={activeNav === 'messages' ? colors.secondary : colors.neutral}
              />
              <Text style={[styles.navLabel, activeNav === 'messages' && styles.navLabelActive]}>
                Messages
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.navItem, activeNav === 'profile' && styles.navItemActive]}
              onPress={() => setActiveNav('profile')}
              activeOpacity={0.7}
            >
              <Icon
                name="person"
                size={26}
                color={activeNav === 'profile' ? colors.secondary : colors.neutral}
              />
              <Text style={[styles.navLabel, activeNav === 'profile' && styles.navLabelActive]}>
                Profile
              </Text>
            </TouchableOpacity>

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
    paddingBottom: spacing.xxl,
  },

  // ── HEADER ──
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    marginBottom: spacing.sm,
  },
  backButton: {
    padding: spacing.xs,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.onSurface,
    marginRight: 'auto',
    marginLeft: spacing.sm,
  },
  // FIX 1: explicit width/height + borderRadius makes it a proper visible circle
  // No border, no dashed line — image PNG already has its own green stroke
  profileImageWrapper: {
    width: 48,
    height: 48,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: colors.border, // fallback while image loads
  },
  profileImage: {
    width: 48,
    height: 48,
  },

  // ── STEP INDICATOR ──
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
    marginTop: spacing.xs,
    paddingHorizontal: spacing.md,
  },
  stepWrapper: {
    alignItems: 'center',
    width: 60,
  },
  stepCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#DCE9FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  stepCircleActive: {
    backgroundColor: colors.secondary,
  },
  stepNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.onSurfaceVariant,
  },
  stepNumberActive: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.onSecondary,
  },
  stepLabel: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
  },
  stepLabelActive: {
    color: colors.secondary,
    fontWeight: '600',
  },
  stepLine: {
    flex: 1,
    height: 2,
    backgroundColor: colors.border,
    marginBottom: 20,
  },

  // ── SECURE VERIFICATION ──
  secureContainer: {
    alignItems: 'center',
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.md,
  },
  secureIconSquare: {
    width: 60,
    height: 60,
    borderRadius: 14,
    backgroundColor: '#89F5E7',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  secureTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.onSurface,
    marginBottom: spacing.sm,
  },
  secureDescription: {
    fontSize: 14,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    lineHeight: 22,
  },

  // ── SECTION TITLES ──
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.onSurface,
    marginBottom: spacing.sm,
  },
  backSideTitle: {
    marginTop: spacing.md,
  },

  // ── UPLOAD AREA ──
  uploadArea: {
    borderWidth: 1.5,
    borderColor: '#B0C4DE',
    borderStyle: 'dashed',
    borderRadius: borderRadius.md,
    paddingVertical: spacing.xxl,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    marginBottom: spacing.sm,
    backgroundColor: colors.background,
    minHeight: 160,
    justifyContent: 'center',
  },
  uploadText: {
    fontSize: 15,
    fontWeight: '500',
    color: colors.onSurface,
    marginTop: spacing.sm,
    marginBottom: 2,
  },
  uploadHint: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
  },

  // ── BULLET / NOTE ROWS ──
  bulletPoint: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
    paddingHorizontal: spacing.xs,
  },
  bulletText: {
    fontSize: 13,
    color: colors.onSurface,
    flex: 1,
  },
  encryptedNote: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.xs,
  },
  encryptedText: {
    fontSize: 13,
    color: colors.onSurface,
  },

  // ── PRIVACY CARD ──
  privacyCard: {
    backgroundColor: '#DCE9FF',
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  privacyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  privacyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.onSurface,
  },
  // FIX 2: larger fontSize + generous lineHeight so text fills full card width
  // across ~6 lines with no awkward short lines on the right
  privacyText: {
    fontSize: 15,
    color: colors.onSurfaceVariant,
    lineHeight: 24,
    textAlign: 'justify',   // stretches each line to fill the full width
  },

  // ── SUBMIT BUTTON ──
  submitButton: {
    flexDirection: 'row',
    height: 56,
    backgroundColor: colors.secondary,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.onSecondary,
  },

  // ── TERMS ──
  termsText: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    marginBottom: spacing.xl,
    lineHeight: 18,
  },
  termsLink: {
    color: colors.secondary,
    fontWeight: '500',
  },

  // ── BOTTOM NAV ──
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    marginTop: spacing.md,
    backgroundColor: colors.background,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: borderRadius.md,
    gap: 3,
    minWidth: 64,
    minHeight: 52,
  },
  navItemActive: {
    backgroundColor: '#89F5E7',
  },
  navLabel: {
    fontSize: 11,
    color: colors.neutral,
  },
  navLabelActive: {
    color: colors.secondary,
    fontWeight: '600',
  },
});

export default VerifyIdentityScreen;