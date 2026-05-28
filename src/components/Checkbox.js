// src/components/Checkbox.js
import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
} from 'react-native';
import { colors, typography, spacing, borderRadius } from '../constants/colors';

const Checkbox = ({
  checked,
  onPress,
  label,
  onLinkPress,
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
        {checked && <Text style={styles.checkmark}>✓</Text>}
      </View>
      <Text style={styles.label}>
        {label}
        <Text style={styles.linkText} onPress={onLinkPress}>
          Terms of Service
        </Text>
        <Text style={styles.label}> and </Text>
        <Text style={styles.linkText} onPress={onLinkPress}>
          Privacy Policy
        </Text>
        <Text style={styles.label}>.</Text>
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.sm,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: borderRadius.sm,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: colors.secondary,
    borderColor: colors.secondary,
  },
  checkmark: {
    color: colors.onSecondary,
    fontSize: 12,
    fontWeight: 'bold',
  },
  label: {
    ...typography.bodySmall,
    color: colors.onSurfaceVariant,
    fontSize: 13,
    lineHeight: 18,
  },
  linkText: {
    color: colors.secondary,
    fontWeight: '600',
  },
});

export default Checkbox;