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

const RegisterVehicleScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [formData, setFormData] = useState({
    vehicleMake: '',
    vehicleYear: '',
    vehicleColor: '',
    licensePlate: '',
  });
  const [selectedYear, setSelectedYear] = useState('');
  const [showYearPicker, setShowYearPicker] = useState(false);

  const years = Array.from({ length: 30 }, (_, i) => (new Date().getFullYear() - i).toString());

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleYearSelect = (year) => {
    setSelectedYear(year);
    setFormData(prev => ({ ...prev, vehicleYear: year }));
    setShowYearPicker(false);
  };

  const handleUploadVehiclePhoto = () => {
    console.log('Upload vehicle photo');
  };

  const handleUploadRegistrationDoc = () => {
    console.log('Upload registration document');
  };

  const handleRegisterVehicle = () => {
    console.log('Register Vehicle:', formData);
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
          {/* Header with Profile Icon */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Icon name="arrow-back" size={24} color={colors.onSurface} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>CityPool</Text>
            <TouchableOpacity style={styles.profileButton}>
              <Image 
                source={require('../assets/images/upload-icon.png')} 
                style={styles.profileImage}
                resizeMode="cover"
              />
            </TouchableOpacity>
          </View>

          {/* Step Indicator */}
          <View style={styles.stepContainer}>
            <Text style={styles.stepText}>STEP 1 OF 3</Text>
            <Text style={styles.stepTitle}>Vehicle Registration</Text>
            <View style={styles.progressBarContainer}>
              <View style={styles.progressBarFill} />
              <View style={styles.progressBarEmpty} />
            </View>
          </View>

          {/* Card 1: Car Details */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Car Details</Text>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Vehicle Make/Model</Text>
              <TextInput
                style={styles.input}
                value={formData.vehicleMake}
                onChangeText={(text) => handleInputChange('vehicleMake', text)}
                placeholder="e.g. Toyota Corolla"
                placeholderTextColor={colors.placeholder}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Vehicle Year</Text>
              <TouchableOpacity
                style={styles.selectInput}
                onPress={() => setShowYearPicker(!showYearPicker)}
                activeOpacity={0.7}
              >
                <Text style={[styles.selectText, selectedYear ? styles.selectTextValue : styles.selectTextPlaceholder]}>
                  {selectedYear || 'Select Year'}
                </Text>
                <Icon name="arrow-drop-down" size={24} color={colors.placeholder} />
              </TouchableOpacity>
            </View>

            {showYearPicker && (
              <View style={styles.pickerContainer}>
                <ScrollView style={styles.pickerScroll} nestedScrollEnabled>
                  {years.map((year) => (
                    <TouchableOpacity
                      key={year}
                      style={styles.pickerItem}
                      onPress={() => handleYearSelect(year)}
                    >
                      <Text style={styles.pickerItemText}>{year}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Color</Text>
              <TextInput
                style={styles.input}
                value={formData.vehicleColor}
                onChangeText={(text) => handleInputChange('vehicleColor', text)}
                placeholder="e.g. Silver"
                placeholderTextColor={colors.placeholder}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>License Plate Number</Text>
              <TextInput
                style={styles.input}
                value={formData.licensePlate}
                onChangeText={(text) => handleInputChange('licensePlate', text)}
                placeholder="LEA-1234"
                placeholderTextColor={colors.placeholder}
                autoCapitalize="characters"
              />
            </View>
          </View>

          {/* Card 2: Verification Documents */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Verification Documents</Text>

            <View style={styles.dashedBox}>
              <View style={styles.circleIcon}>
                <Icon name="directions-car" size={30} color={colors.secondary} />
              </View>
              <Text style={styles.dashedBoxTitle}>Upload Vehicle Photo</Text>
              <Text style={styles.dashedBoxHint}>Front view with number plate visible</Text>
              <TouchableOpacity
                style={styles.greenOutlineButton}
                onPress={handleUploadVehiclePhoto}
                activeOpacity={0.7}
              >
                <Text style={styles.greenOutlineButtonText}>Choose File</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.dashedBox}>
              <View style={styles.circleIcon}>
                <Icon name="description" size={30} color={colors.secondary} />
              </View>
              <Text style={styles.dashedBoxTitle}>Registration Document</Text>
              <Text style={styles.dashedBoxHint}>Scan or photo of vehicle registration</Text>
              <TouchableOpacity
                style={styles.greenOutlineButton}
                onPress={handleUploadRegistrationDoc}
                activeOpacity={0.7}
              >
                <Text style={styles.greenOutlineButtonText}>Choose File</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Card 3: Why We Need This */}
          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>Why we need this</Text>
            <Text style={styles.infoDescription}>
              Safety is our priority. Verifying your vehicle ensures all riders feel secure and helps us maintain a high-quality community of verified drivers.
            </Text>

            <View style={styles.bulletList}>
              <View style={styles.bulletItem}>
                <Icon name="verified" size={20} color="#89F5E7" />
                <Text style={styles.bulletText}>Builds trust with potential co-travelers.</Text>
              </View>
              <View style={styles.bulletItem}>
                <Icon name="security" size={20} color="#89F5E7" />
                <Text style={styles.bulletText}>Prevents fraudulent accounts and ghost vehicles.</Text>
              </View>
              <View style={styles.bulletItem}>
                <Icon name="speed" size={20} color="#89F5E7" />
                <Text style={styles.bulletText}>Faster ride approvals once you are verified.</Text>
              </View>
            </View>
          </View>

          {/* Card 4: Photo Requirements */}
          <View style={styles.photoRequirementsOuterCard}>
            {/* Header row */}
            <View style={styles.photoReqRow}>
              <Icon name="info" size={20} color={colors.secondary} />
              <Text style={styles.photoReqText}>PHOTO REQUIREMENTS</Text>
            </View>

            {/* Two equal side-by-side boxes — both use fixed height */}
            <View style={styles.photoBoxesRow}>
              {/* Left: Good example - car photo */}
              <View style={styles.photoBoxLeft}>
                <Image
                  source={require('../assets/images/car-replace.png')}
                  style={styles.carImageInside}
                  resizeMode="cover"
                />
                <View style={styles.tickOverlay}>
                  <Icon name="check-circle" size={20} color={colors.secondary} />
                </View>
              </View>

              {/* Right: Bad example */}
              <View style={styles.photoBoxRight}>
                <Icon name="block" size={32} color="#BA1A1A" />
                <Text style={styles.blurryNightText}>BLURRY / NIGHT</Text>
              </View>
            </View>
          </View>

          {/* Register Vehicle Button */}
          <TouchableOpacity
            style={styles.registerButton}
            onPress={handleRegisterVehicle}
            activeOpacity={0.8}
          >
            <Text style={styles.registerButtonText}>Register Vehicle</Text>
            <Icon name="arrow-forward" size={18} color={colors.onSecondary} />
          </TouchableOpacity>

          <View style={styles.bottomSpacing} />

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
  // Header with Profile Icon
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    marginBottom: spacing.md,
  },
  backButton: {
    padding: spacing.xs,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.secondary,
    flex: 1,
    marginLeft: spacing.sm,
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  // Step Indicator
  stepContainer: {
    marginBottom: spacing.lg,
  },
  stepText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.secondary,
    letterSpacing: 1,
    marginBottom: spacing.xs,
  },
  stepTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.onSurface,
    marginBottom: spacing.md,
  },
  progressBarContainer: {
    flexDirection: 'row',
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBarFill: {
    flex: 1,
    backgroundColor: colors.secondary,
  },
  progressBarEmpty: {
    flex: 2,
    backgroundColor: colors.border,
  },
  // Card Styles
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
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.onSurface,
    marginBottom: spacing.md,
  },
  // Input Styles
  inputContainer: {
    marginBottom: spacing.md,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.onSurfaceVariant,
    marginBottom: spacing.xs,
  },
  input: {
    height: 48,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    fontSize: 16,
    color: colors.onSurface,
  },
  selectInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 48,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
  },
  selectText: {
    fontSize: 16,
    flex: 1,
  },
  selectTextValue: {
    color: colors.onSurface,
  },
  selectTextPlaceholder: {
    color: colors.placeholder,
  },
  pickerContainer: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    marginTop: -spacing.sm,
    marginBottom: spacing.md,
    maxHeight: 200,
  },
  pickerScroll: {
    maxHeight: 200,
  },
  pickerItem: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  pickerItemText: {
    fontSize: 16,
    color: colors.onSurface,
  },
  // Dashed Box Styles
  dashedBox: {
    borderWidth: 1,
    borderColor: colors.secondary,
    borderStyle: 'dashed',
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  circleIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#89F5E7',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  dashedBoxTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.onSurface,
    marginBottom: spacing.xs,
  },
  dashedBoxHint: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  greenOutlineButton: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: borderRadius.md,
  },
  greenOutlineButtonText: {
    fontSize: 14,
    color: colors.secondary,
    fontWeight: '500',
  },
  // Info Card
  infoCard: {
    backgroundColor: '#131B2E',
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: spacing.sm,
  },
  infoDescription: {
    fontSize: 14,
    color: '#D3E4FE',
    lineHeight: 20,
    marginBottom: spacing.md,
  },
  bulletList: {
    gap: spacing.sm,
  },
  bulletItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  bulletText: {
    flex: 1,
    fontSize: 13,
    color: '#D3E4FE',
    lineHeight: 18,
  },
  // Photo Requirements
  photoRequirementsOuterCard: {
    backgroundColor: '#E5EEFF',
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.xxl,
  },
  photoReqRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
    gap: spacing.xs,
  },
  photoReqText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.secondary,
  },
  photoBoxesRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  photoBoxLeft: {
    flex: 1,
    height: 130,
    borderRadius: borderRadius.md,
    overflow: 'hidden',
    position: 'relative',
  },
  carImageInside: {
    width: '100%',
    height: '100%',
  },
  tickOverlay: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
  },
  photoBoxRight: {
    flex: 1,
    height: 130,
    borderRadius: borderRadius.md,
    backgroundColor: '#D9D9D9',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  blurryNightText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#333333',
    textAlign: 'center',
  },
  // Register Button
  registerButton: {
    flexDirection: 'row',
    height: 56,
    backgroundColor: colors.secondary,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  registerButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.onSecondary,
  },
  bottomSpacing: {
    height: spacing.xxl,
  },
});

export default RegisterVehicleScreen;