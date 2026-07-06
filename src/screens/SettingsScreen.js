import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Animated,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Custom Toggle that matches the reference design exactly
const TRACK_W = 52;
const TRACK_H = 30;
const THUMB_SIZE = 24;
const THUMB_MARGIN = 3;

function CustomToggle({ value, onValueChange }) {
  const animVal = React.useRef(new Animated.Value(value ? 1 : 0)).current;

  React.useEffect(() => {
    Animated.spring(animVal, {
      toValue: value ? 1 : 0,
      useNativeDriver: false,
      bounciness: 4,
      speed: 18,
    }).start();
  }, [value]);

  const trackColor = animVal.interpolate({
    inputRange: [0, 1],
    outputRange: ['#C6C6CD', '#006A61'],
  });

  const thumbLeft = animVal.interpolate({
    inputRange: [0, 1],
    outputRange: [THUMB_MARGIN, TRACK_W - THUMB_SIZE - THUMB_MARGIN],
  });

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => onValueChange(!value)}
      style={{ justifyContent: 'center' }}
    >
      <Animated.View
        style={{
          width: TRACK_W,
          height: TRACK_H,
          borderRadius: TRACK_H / 2,
          backgroundColor: trackColor,
          justifyContent: 'center',
        }}
      >
        <Animated.View
          style={{
            position: 'absolute',
            left: thumbLeft,
            width: THUMB_SIZE,
            height: THUMB_SIZE,
            borderRadius: THUMB_SIZE / 2,
            backgroundColor: '#FFFFFF',
            shadowColor: '#000',
            shadowOpacity: 0.2,
            shadowOffset: { width: 0, height: 1 },
            shadowRadius: 3,
            elevation: 3,
          }}
        />
      </Animated.View>
    </TouchableOpacity>
  );
}

const COLORS = {
  primary: '#006A61',
  primaryDark: '#006F66',
  dark: '#0B1C30',
  grey: '#45464D',
  greyLight: '#76777D',
  greyBorder: '#C6C6CD',
  greyBorderLight: '#D1D5DB',
  background: '#F8F9FF',
  white: '#FFFFFF',
  iconBg: '#E5EEFF',
  tealBg: '#86F2E4',
  red: '#93000A',
  redBg: '#FFDAD6',
  version: '#76777D',
};

export default function SettingsScreen({ navigation }) {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [twoFactor, setTwoFactor] = useState(true);
  const [pushNotifs, setPushNotifs] = useState(true);
  const [emailPrefs, setEmailPrefs] = useState(false);

  const SectionHeader = ({ title }) => (
    <Text style={styles.sectionHeader}>{title}</Text>
  );

  const SettingRow = ({ icon, title, subtitle, onPress, rightElement }) => (
    <TouchableOpacity style={styles.row} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.rowLeft}>
        <View style={styles.iconBox}>
          <Icon name={icon} size={22} color={COLORS.primary} />
        </View>
        <View style={styles.rowText}>
          <Text style={styles.rowTitle}>{title}</Text>
          {subtitle ? <Text style={styles.rowSubtitle}>{subtitle}</Text> : null}
        </View>
      </View>
      {rightElement !== undefined ? rightElement : (
        <Icon name="chevron-right" size={22} color={COLORS.greyBorder} />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" translucent={false} />

      {/* Drawer Overlay */}
      {drawerVisible && (
        <TouchableOpacity
          style={styles.drawerOverlay}
          activeOpacity={1}
          onPress={() => setDrawerVisible(false)}
        />
      )}

      {/* Side Drawer */}
      {drawerVisible && (
        <View style={styles.drawer}>
          <View style={styles.drawerHeader}>
            <Text style={styles.drawerBrand}>CityPool</Text>
            <TouchableOpacity onPress={() => setDrawerVisible(false)}>
              <Icon name="close" size={24} color={COLORS.dark} />
            </TouchableOpacity>
          </View>
          <View style={styles.divider} />
          {[
            { label: 'Home', icon: 'home-outline', screen: 'Home' },
            { label: 'My Rides', icon: 'car-outline', screen: 'MyRides' },
            { label: 'Notifications', icon: 'bell-outline', screen: 'Notifications' },
            { label: 'Messages', icon: 'message-text-outline', screen: 'Messages' },
          ].map(item => (
            <TouchableOpacity
              key={item.label}
              style={styles.drawerItem}
              onPress={() => { setDrawerVisible(false); navigation?.navigate(item.screen); }}
            >
              <Icon name={item.icon} size={22} color={COLORS.dark} />
              <Text style={styles.drawerLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}
          <View style={styles.divider} />
          {[
            { label: 'Payments', icon: 'cash-multiple', screen: 'Wallet' },
            { label: 'Profile', icon: 'account-outline', screen: 'Profile' },
            { label: 'Settings', icon: 'cog-outline', screen: 'Settings', active: true },
            { label: 'Help & Support', icon: 'help-circle-outline', screen: 'Help' },
          ].map(item => (
            <TouchableOpacity
              key={item.label}
              style={[styles.drawerItem, item.active && styles.drawerItemActive]}
              onPress={() => { setDrawerVisible(false); if (!item.active) navigation?.navigate(item.screen); }}
            >
              <Icon name={item.icon} size={22} color={item.active ? COLORS.primary : COLORS.dark} />
              <Text style={[styles.drawerLabel, item.active && styles.drawerLabelActive]}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Top Navbar */}
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => setDrawerVisible(true)} style={styles.menuBtn}>
          <Icon name="menu" size={26} color={COLORS.dark} />
        </TouchableOpacity>
        <Text style={styles.navBrand}>CityPool</Text>
        <Image
          source={require('../assets/images/ahmed-hassan.png')}
          style={styles.userAvatar}
        />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Page Header */}
        <View style={styles.pageHeader}>
          <Text style={styles.pageTitle}>Settings</Text>
          <Text style={styles.pageSubtitle}>Manage your account preferences and security</Text>
        </View>

        {/* ACCOUNT */}
        <SectionHeader title="ACCOUNT" />
        <View style={styles.card}>
          <SettingRow
            icon="account-edit-outline"
            title="Edit Profile"
            subtitle="Update your name and photo"
            onPress={() => {}}
          />
          <View style={styles.rowDivider} />
          <SettingRow
            icon="phone-outline"
            title="Change Phone Number"
            subtitle="+92 300 1234567"
            onPress={() => {}}
          />
        </View>

        {/* SECURITY */}
        <SectionHeader title="SECURITY" />
        <View style={styles.card}>
          <SettingRow
            icon="lock-outline"
            title="Password"
            subtitle="Last changed 3 months ago"
            onPress={() => {}}
          />
          <View style={styles.rowDivider} />
          <SettingRow
            icon="shield-check-outline"
            title="Two-Factor Authentication"
            subtitle="Highly recommended"
            onPress={() => {}}
            rightElement={
              <CustomToggle
                value={twoFactor}
                onValueChange={setTwoFactor}
              />
            }
          />
        </View>

        {/* NOTIFICATIONS */}
        <SectionHeader title="NOTIFICATIONS" />
        <View style={styles.card}>
          <SettingRow
            icon="bell-outline"
            title="Push Notifications"
            onPress={() => {}}
            rightElement={
              <CustomToggle
                value={pushNotifs}
                onValueChange={setPushNotifs}
              />
            }
          />
          <View style={styles.rowDivider} />
          <SettingRow
            icon="email-outline"
            title="Email Preferences"
            onPress={() => {}}
            rightElement={
              <CustomToggle
                value={emailPrefs}
                onValueChange={setEmailPrefs}
              />
            }
          />
        </View>

        {/* PAYMENT METHODS */}
        <SectionHeader title="PAYMENT METHODS" />
        <View style={styles.card}>
          <SettingRow
            icon="wallet-outline"
            title="Manage Wallets"
            subtitle="Easypaisa, JazzCash linked"
            onPress={() => {}}
          />
          <View style={styles.rowDivider} />
          <SettingRow
            icon="credit-card-outline"
            title="Saved Cards"
            subtitle="Visa ending in 4421"
            onPress={() => {}}
          />
        </View>

        {/* SUPPORT */}
        <SectionHeader title="SUPPORT" />
        <View style={styles.card}>
          <SettingRow
            icon="help-circle-outline"
            title="Help Center"
            onPress={() => {}}
          />
          <View style={styles.rowDivider} />
          <SettingRow
            icon="shield-search-outline"
            title="Privacy Policy"
            onPress={() => {}}
          />
          <View style={styles.rowDivider} />
          <SettingRow
            icon="file-document-outline"
            title="Terms of Service"
            onPress={() => {}}
          />
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutBtn} activeOpacity={0.8}>
          <Icon name="logout" size={20} color={COLORS.red} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        {/* Version */}
        <Text style={styles.versionText}>CityPool v2.4.0 • Built with trust</Text>
      </ScrollView>

      {/* Bottom Tab Bar */}
      <View style={styles.tabBar}>
        {[
          { label: 'Home', icon: 'home-outline', screen: 'Home' },
          { label: 'My Rides', icon: 'car-outline', screen: 'MyRides' },
          { label: 'Messages', icon: 'message-text-outline', screen: 'Messages' },
          { label: 'Profile', icon: 'account-outline', screen: 'Profile', active: true },
        ].map(tab => (
          <TouchableOpacity
            key={tab.label}
            style={[styles.tabItem, tab.active && styles.tabItemActive]}
            onPress={() => navigation?.navigate(tab.screen)}
          >
            <Icon
              name={tab.icon}
              size={22}
              color={tab.active ? COLORS.primary : COLORS.greyLight}
            />
            <Text style={[styles.tabLabel, tab.active && styles.tabLabelActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  // Navbar
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 8 : 12,
    paddingBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  menuBtn: {
    marginRight: 10,
  },
  navBrand: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.primary,
    letterSpacing: 0.3,
    flex: 1,
  },
  userAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: COLORS.greyBorder,
  },

  // Scroll
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: 32 },

  // Page header
  pageHeader: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 8,
  },
  pageTitle: {
    fontSize: 30,
    fontWeight: '800',
    color: COLORS.dark,
    marginBottom: 6,
  },
  pageSubtitle: {
    fontSize: 15,
    color: COLORS.greyLight,
    lineHeight: 22,
  },

  // Section headers
  sectionHeader: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.primary,
    letterSpacing: 1.2,
    paddingHorizontal: 20,
    paddingTop: 22,
    paddingBottom: 10,
  },

  // Cards
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    marginHorizontal: 16,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    overflow: 'hidden',
  },
  rowDivider: {
    height: 1,
    backgroundColor: COLORS.greyBorder,
    marginLeft: 72,
    opacity: 0.5,
  },

  // Row
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 14,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: COLORS.iconBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowText: {
    flex: 1,
    gap: 2,
  },
  rowTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.dark,
  },
  rowSubtitle: {
    fontSize: 13,
    color: COLORS.greyLight,
    marginTop: 1,
  },

  // Logout
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: COLORS.redBg,
    borderRadius: 14,
    marginHorizontal: 16,
    marginTop: 24,
    paddingVertical: 16,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.red,
  },

  // Version
  versionText: {
    textAlign: 'center',
    fontSize: 13,
    color: COLORS.greyLight,
    marginTop: 20,
    marginBottom: 8,
  },

  // Bottom Tab
  tabBar: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    paddingVertical: 8,
    paddingBottom: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.greyBorder,
    elevation: 8,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    gap: 3,
    borderRadius: 12,
    marginHorizontal: 4,
  },
  tabItemActive: {
    backgroundColor: COLORS.tealBg,
    paddingHorizontal: 8,
  },
  tabLabel: {
    fontSize: 11,
    color: COLORS.greyLight,
  },
  tabLabelActive: {
    color: COLORS.primary,
    fontWeight: '600',
  },

  // Drawer
  drawerOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    zIndex: 10,
  },
  drawer: {
    position: 'absolute',
    top: 0, left: 0, bottom: 0,
    width: 288,
    backgroundColor: COLORS.white,
    zIndex: 20,
    elevation: 16,
    paddingTop: 48,
  },
  drawerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  drawerBrand: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.primary,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.greyBorder,
    marginVertical: 8,
    marginHorizontal: 20,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 12,
  },
  drawerItemActive: {
    backgroundColor: COLORS.tealBg,
  },
  drawerLabel: {
    fontSize: 15,
    color: COLORS.dark,
    fontWeight: '500',
  },
  drawerLabelActive: {
    color: COLORS.primary,
    fontWeight: '600',
  },
});