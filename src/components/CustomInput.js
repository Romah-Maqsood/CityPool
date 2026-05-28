// src/components/CustomInput.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { colors, typography, spacing, borderRadius } from '../constants/colors';

const CustomInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  iconComponent,
  secureTextEntry = false,
  keyboardType = 'default',
  error = null,
  required = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label}
        {required && <Text style={styles.requiredStar}> *</Text>}
      </Text>
      
      <View style={[
        styles.inputContainer,
        isFocused && styles.inputContainerFocused,
        error && styles.inputContainerError,
      ]}>
        {iconComponent && (
          <View style={styles.leftIcon}>
            {iconComponent}
          </View>
        )}
        
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.placeholder}
          secureTextEntry={secureTextEntry && !showPassword}
          keyboardType={keyboardType}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        
        {secureTextEntry && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Text style={styles.eyeIcon}>{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
          </TouchableOpacity>
        )}
      </View>
      
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  label: {
    ...typography.labelLarge,
    color: colors.onSurfaceVariant,
    marginBottom: spacing.xs,
    fontSize: 14,
    fontWeight: '500',
  },
  requiredStar: {
    color: colors.error,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.md,
  },
  inputContainerFocused: {
    borderColor: colors.secondary,
    borderWidth: 1.5,
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
    padding: 0,
    fontSize: 16,
  },
  eyeIcon: {
    fontSize: 20,
  },
  errorText: {
    ...typography.bodySmall,
    color: colors.error,
    marginTop: spacing.xs,
  },
});

export default CustomInput;