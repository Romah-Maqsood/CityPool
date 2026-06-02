import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
} from 'react-native';
import { colors, typography, spacing, borderRadius } from '../constants/colors';
import AppIcon from './common/AppIcon';

const CustomButton = ({
  title,
  onPress,
  variant = 'primary',
  size = 'large',
  loading = false,
  disabled = false,
  iconName = null,
  iconPosition = 'right',
  style,
}) => {
  const isDisabled = disabled || loading;

  const getButtonStyle = () => {
    let buttonStyle = { backgroundColor: colors.secondary };
    if (variant === 'outline') {
      buttonStyle = {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: colors.secondary,
      };
    }
    if (isDisabled) {
      buttonStyle = {
        ...buttonStyle,
        backgroundColor: variant === 'outline' ? 'transparent' : colors.neutral,
        opacity: 0.55,
      };
    }
    return buttonStyle;
  };

  const getTextStyle = () =>
    variant === 'outline' ? { color: colors.secondary } : { color: colors.onSecondary };

  const getHeight = () => {
    switch (size) {
      case 'small':
        return 40;
      case 'medium':
        return 48;
      default:
        return 52;
    }
  };

  const iconColor = variant === 'outline' ? colors.secondary : colors.onSecondary;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        getButtonStyle(),
        { height: getHeight() },
        style,
      ]}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.85}
    >
      {loading ? (
        <ActivityIndicator color={colors.onSecondary} />
      ) : (
        <View style={styles.buttonContent}>
          {iconName && iconPosition === 'left' ? (
            <AppIcon
              name={iconName}
              size={20}
              color={iconColor}
              style={styles.leftIcon}
            />
          ) : null}
          <Text style={[styles.text, getTextStyle()]}>{title}</Text>
          {iconName && iconPosition === 'right' ? (
            <AppIcon
              name={iconName}
              size={20}
              color={iconColor}
              style={styles.rightIcon}
            />
          ) : null}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: borderRadius.lg,
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
  leftIcon: {
    marginRight: spacing.sm,
  },
  rightIcon: {
    marginLeft: spacing.sm,
  },
});

export default CustomButton;
