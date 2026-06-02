import React from 'react';
import {
  Pressable,
  Text,
  StyleSheet,
  View,
} from 'react-native';
import { colors, typography, spacing, borderRadius } from '../constants/colors';
import AppIcon from './common/AppIcon';

const Checkbox = ({
  checked,
  onPress,
  label,
  onLinkPress,
}) => {
  return (
    <Pressable
      style={styles.container}
      onPress={onPress}
      accessibilityRole="checkbox"
      accessibilityState={{ checked }}
    >
      <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
        {checked ? (
          <AppIcon name="check" size={14} color={colors.onSecondary} />
        ) : null}
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
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    paddingVertical: spacing.sm,
    marginBottom: spacing.xs,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: borderRadius.sm,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 1,
  },
  checkboxChecked: {
    backgroundColor: colors.secondary,
    borderColor: colors.secondary,
  },
  label: {
    ...typography.bodySmall,
    color: colors.onSurfaceVariant,
    flex: 1,
    lineHeight: 20,
  },
  linkText: {
    color: colors.secondary,
    fontWeight: '600',
  },
});

export default Checkbox;
