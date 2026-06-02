import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../constants/colors';

const ICONS = {
  person: 'account-outline',
  phone: 'phone-outline',
  email: 'email-outline',
  arrowForward: 'arrow-right',
  lock: 'lock-outline',
  eye: 'eye-outline',
  eyeOff: 'eye-off-outline',
  check: 'check',
  car: 'car-outline',
};

const AppIcon = ({
  name,
  size = 20,
  color = colors.onSurfaceVariant,
  style,
}) => {
  const iconName = ICONS[name] ?? name;
  return (
    <MaterialCommunityIcons
      name={iconName}
      size={size}
      color={color}
      style={style}
    />
  );
};

export default AppIcon;
