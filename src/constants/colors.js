// src/constants/colors.js

export const colors = {
  // Primary Colors
  primary: '#0F172A',
  secondary: '#006A61',     // ✅ Green color aapne diya hai
  tertiary: '#F59E0B',
  neutral: '#64748B',
  
  // Background & Surface
  background: '#F8F9FF',
  surface: '#FFFFFF',
  
  // Text Colors
  onSurface: '#0B1C30',
  onSurfaceVariant: '#45464D',
  onSecondary: '#FFFFFF',
  
  // Border Colors (Light grey as requested)
  border: '#E5E7EB',        // ✅ Light grey border
  borderLight: '#F3F4F6',
  
  // Status Colors
  error: '#BA1A1A',
  success: '#006A61',
  
  // Placeholder text color (Light grey)
  placeholder: '#9CA3AF',   // ✅ Light grey placeholder
};

export const typography = {
  headlineLarge: {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: '700',
    letterSpacing: -0.02,
  },
  headlineMedium: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '700',
  },
  title: {
    fontSize: 28,
    lineHeight: 36,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
  },
  bodyMedium: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
  },
  bodySmall: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
  },
  labelLarge: {
    fontSize: 14,
    lineHeight: 16,
    fontWeight: '600',
  },
  labelSmall: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500',
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  containerPadding: 20,
  headerPadding: 60,        // ✅ Header ke liye extra space
  footerPadding: 40,        // ✅ Footer ke liye
};

export const borderRadius = {
  sm: 6,                    // ✅ Kam radius (pehle 8 tha)
  md: 10,
  lg: 12,                   // ✅ Kam radius (pehle 16 tha)
  xl: 16,
  full: 9999,
};