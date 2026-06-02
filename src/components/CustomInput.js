import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Platform,
} from 'react-native';
import { colors, typography, spacing, borderRadius } from '../constants/colors';
import AppIcon from './common/AppIcon';

const CustomInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  iconName,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize,
  error = null,
  required = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const iconColor = error
    ? colors.error
    : isFocused
      ? colors.secondary
      : colors.onSurfaceVariant;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label}
        {required && <Text style={styles.requiredStar}> *</Text>}
      </Text>

      <View
        style={[
          styles.inputContainer,
          isFocused && styles.inputContainerFocused,
          error && styles.inputContainerError,
        ]}
      >
        {iconName ? (
          <View style={styles.leftIcon}>
            <AppIcon name={iconName} size={20} color={iconColor} />
          </View>
        ) : null}

        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.placeholder}
          secureTextEntry={secureTextEntry && !showPassword}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

        {secureTextEntry ? (
          <Pressable
            onPress={() => setShowPassword(prev => !prev)}
            hitSlop={8}
            accessibilityLabel={showPassword ? 'Hide password' : 'Show password'}
          >
            <AppIcon
              name={showPassword ? 'eyeOff' : 'eye'}
              size={20}
              color={colors.neutral}
            />
          </Pressable>
        ) : null}
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  label: {
    ...typography.labelLarge,
    color: colors.onSurface,
    marginBottom: spacing.xs,
    fontWeight: '500',
  },
  requiredStar: {
    color: colors.error,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 52,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.md,
  },
  inputContainerFocused: {
    borderColor: colors.secondary,
    backgroundColor: colors.surface,
  },
  inputContainerError: {
    borderColor: colors.error,
  },
  leftIcon: {
    marginRight: spacing.sm,
  },
  input: {
    flex: 1,
    ...typography.bodyMedium,
    color: colors.onSurface,
    paddingVertical: Platform.OS === 'ios' ? 14 : 10,
    paddingHorizontal: 0,
  },
  errorText: {
    ...typography.bodySmall,
    color: colors.error,
    marginTop: spacing.xs,
  },
});

export default CustomInput;
