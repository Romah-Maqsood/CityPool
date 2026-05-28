// src/components/CustomButton.js
import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
} from 'react-native';
import { colors, typography, spacing, borderRadius } from '../constants/colors';

const CustomButton = ({
  title,
  onPress,
  variant = 'primary',
  size = 'large',
  loading = false,
  disabled = false,
  iconComponent = null,
  iconPosition = 'right',
}) => {
  const getButtonStyle = () => {
    let style = { backgroundColor: colors.secondary };
    if (variant === 'outline') {
      style = { backgroundColor: 'transparent', borderWidth: 1, borderColor: colors.secondary };
    }
    if (disabled || loading) {
      style.backgroundColor = colors.neutral;
      style.opacity = 0.6;
    }
    return style;
  };
  
  const getTextStyle = () => {
    return variant === 'outline' ? { color: colors.secondary } : { color: colors.onSecondary };
  };
  
  const getHeight = () => {
    switch (size) {
      case 'small': return 40;
      case 'medium': return 48;
      default: return 52;
    }
  };
  
  return (
    <TouchableOpacity
      style={[styles.button, getButtonStyle(), { height: getHeight() }]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={colors.onSecondary} />
      ) : (
        <View style={styles.buttonContent}>
          <Text style={[styles.text, getTextStyle()]}>{title}</Text>
          {iconComponent && iconPosition === 'right' && (
            <View style={styles.rightIcon}>
              {iconComponent}
            </View>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    ...typography.labelLarge,
    fontWeight: '600',
    fontSize: 16,
  },
  rightIcon: {
    marginLeft: spacing.sm,
  },
});

export default CustomButton;