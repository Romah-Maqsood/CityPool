import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const COLORS = {
  primary: '#006A61',
  primaryLight: '#86F2E4',
  dark: '#0B1C30',
  grey: '#45464D',
  greyLight: '#76777D',
  greyBorder: '#C6C6CD',
  background: '#F8F9FF',
  white: '#FFFFFF',
  teal: '#006F66',
  tealBg: '#86F2E4',
  orange: '#653E00',
  orangeBg: '#FFB95F',
  orangeBgLight: '#FFDDB8',
  red: '#BA1A1A',
  blueBg: '#D3E4FE',
  purpleBg: '#DCE9FF',
  lavender: '#E5EEFF',
  shield: '#005049',
};

const notifications = [
  {
    id: '1',
    type: 'booking',
    icon: 'check-circle',
    iconColor: COLORS.primary,
    iconBg: COLORS.tealBg,
    accentColor: COLORS.primary,
    title: 'Booking Confirmed',
    time: '2m ago',
    message: 'Your ride to Lahore with Driver Ahmed has been confirmed. Seat #2 is reserved for you.',
    tag: 'Trip ID: CP-8821',
    isUnread: false,
  },
  {
    id: '2',
    type: 'ride',
    icon: 'car',
    iconColor: COLORS.orange,
    iconBg: COLORS.orangeBgLight,
    accentColor: COLORS.orangeBg,
    title: 'Ride Starting Soon',
    time: '15m ago',
    message: 'Your ride is scheduled to depart in 30 minutes. Please reach the pickup point at Daewoo Terminal.',
    actionLabel: 'View Pickup Map 🗺',
    isUnread: true,
  },
  {
    id: '3',
    type: 'message',
    isDriverAvatar: true,
    accentColor: null,
    title: 'New Message from Driver',
    time: '1h ago',
    message: '"I\'ve arrived at the terminal. I\'m parked near the main entrance in a white Honda City."',
    isItalic: true,
    hasReply: true,
    isUnread: true,
  },
  {
    id: '4',
    type: 'payment',
    icon: 'wallet',
    iconColor: COLORS.primary,
    iconBg: COLORS.tealBg,
    accentColor: COLORS.primary,
    title: 'Payment Received',
    time: '4h ago',
    message: 'Payment of PKR 2,500 has been successfully processed for your trip to Islamabad.',
    actionLabel: 'Download Invoice ↓',
    isUnread: false,
  },
  {
    id: '5',
    type: 'verified',
    icon: 'shield-check',
    iconColor: COLORS.greyLight,
    iconBg: COLORS.lavender,
    accentColor: COLORS.greyBorder,
    title: 'Profile Verified',
    time: 'Yesterday',
    message: 'Great news! Your CNIC verification is complete. You can now join more rides.',
    isUnread: false,
  },
];

export default function NotificationsScreen({ navigation }) {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [notifList, setNotifList] = useState(notifications);

  const markAllRead = () => {
    setNotifList(prev => prev.map(n => ({ ...n, isUnread: false })));
  };

  const renderNotificationCard = (item) => {
    return (
      <View key={item.id} style={styles.card}>
        {item.accentColor ? (
          <View style={[styles.accentBar, { backgroundColor: item.accentColor }]} />
        ) : null}

        <View style={styles.cardInner}>
          {/* Icon / Avatar */}
          {item.isDriverAvatar ? (
            <View style={styles.avatarWrapper}>
              <Image
                source={{ uri: 'https://i.pravatar.cc/150?img=12' }}
                style={styles.avatar}
              />
            </View>
          ) : (
            <View style={[styles.iconCircle, { backgroundColor: item.iconBg }]}>
              <Icon name={item.icon} size={22} color={item.iconColor} />
            </View>
          )}

          {/* Content */}
          <View style={styles.cardContent}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <View style={styles.timeRow}>
                {item.isUnread && <View style={styles.unreadDot} />}
                <Text style={styles.timeText}>{item.time}</Text>
              </View>
            </View>

            <Text style={[styles.cardMessage, item.isItalic && styles.italic]}>
              {item.message}
            </Text>

            {item.tag && (
              <View style={styles.tagChip}>
                <Text style={styles.tagText}>{item.tag}</Text>
              </View>
            )}

            {item.actionLabel && (
              <TouchableOpacity>
                <Text style={styles.actionLink}>{item.actionLabel}</Text>
              </TouchableOpacity>
            )}

            {item.hasReply && (
              <TouchableOpacity style={styles.replyBtn}>
                <Text style={styles.replyBtnText}>Reply</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    );
  };

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
            { label: 'Notifications', icon: 'bell-outline', screen: 'Notifications', active: true },
            { label: 'Messages', icon: 'message-text-outline', screen: 'Messages' },
          ].map(item => (
            <TouchableOpacity
              key={item.label}
              style={[styles.drawerItem, item.active && styles.drawerItemActive]}
              onPress={() => {
                setDrawerVisible(false);
                if (!item.active) navigation?.navigate(item.screen);
              }}
            >
              <Icon
                name={item.icon}
                size={22}
                color={item.active ? COLORS.primary : COLORS.dark}
              />
              <Text style={[styles.drawerLabel, item.active && styles.drawerLabelActive]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}

          <View style={styles.divider} />

          {[
            { label: 'Payments', icon: 'cash-multiple', screen: 'Wallet' },
            { label: 'Profile', icon: 'account-outline', screen: 'Profile' },
            { label: 'Settings', icon: 'cog-outline', screen: 'Settings' },
            { label: 'Help & Support', icon: 'help-circle-outline', screen: 'Help' },
          ].map(item => (
            <TouchableOpacity
              key={item.label}
              style={styles.drawerItem}
              onPress={() => {
                setDrawerVisible(false);
                navigation?.navigate(item.screen);
              }}
            >
              <Icon name={item.icon} size={22} color={COLORS.dark} />
              <Text style={styles.drawerLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Top Nav */}
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => setDrawerVisible(true)} style={styles.menuBtn}>
          <Icon name="menu" size={26} color={COLORS.dark} />
        </TouchableOpacity>
        <Text style={styles.navBrand}>CityPool</Text>
        <View style={styles.navRight}>
          <TouchableOpacity style={styles.bellWrap}>
            <Icon name="bell-outline" size={24} color={COLORS.dark} />
            <View style={styles.bellBadge} />
          </TouchableOpacity>
          <Image
            source={require('../assets/images/profile-icon.png')}
            style={styles.userAvatar}
          />
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Page Header */}
        <View style={styles.pageHeader}>
          <View>
            <Text style={styles.pageTitle}>Notifications</Text>
            <Text style={styles.pageSubtitle}>Stay updated with your travel alerts</Text>
          </View>
          <TouchableOpacity style={styles.markAllBtn} onPress={markAllRead}>
            <Icon name="check-all" size={18} color={COLORS.primary} />
            <Text style={styles.markAllText}>Mark all as{'\n'}read</Text>
          </TouchableOpacity>
        </View>

        {/* Notification Cards */}
        <View style={styles.cardList}>
          {notifList.map(renderNotificationCard)}
        </View>
      </ScrollView>

      {/* Bottom Tab Bar */}
      <View style={styles.tabBar}>
        {[
          { label: 'Home', icon: 'home-outline', screen: 'Home' },
          { label: 'My Rides', icon: 'car-outline', screen: 'MyRides' },
          { label: 'Messages', icon: 'message-text', screen: 'Messages', active: true },
          { label: 'Profile', icon: 'account-outline', screen: 'Profile' },
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
  navRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  bellWrap: {
    position: 'relative',
    padding: 2,
  },
  bellBadge: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.red,
    borderWidth: 1.5,
    borderColor: COLORS.white,
  },
  userAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: COLORS.greyBorder,
  },

  // Page header
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: 20 },
  pageHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 16,
  },
  pageTitle: {
    fontSize: 30,
    fontWeight: '800',
    color: COLORS.dark,
    marginBottom: 4,
  },
  pageSubtitle: {
    fontSize: 15,
    color: COLORS.greyLight,
    lineHeight: 20,
  },
  markAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingTop: 4,
  },
  markAllText: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '600',
    textAlign: 'right',
    lineHeight: 18,
  },

  // Cards
  cardList: {
    paddingHorizontal: 16,
    gap: 10,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: 14,
    overflow: 'hidden',
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
  },
  accentBar: {
    width: 5,
    borderTopLeftRadius: 14,
    borderBottomLeftRadius: 14,
  },
  cardInner: {
    flex: 1,
    flexDirection: 'row',
    padding: 14,
    gap: 12,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  avatarWrapper: {
    flexShrink: 0,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  cardContent: {
    flex: 1,
    gap: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 8,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.dark,
    flex: 1,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
  },
  timeText: {
    fontSize: 13,
    color: COLORS.greyLight,
    flexShrink: 0,
  },
  cardMessage: {
    fontSize: 14,
    color: COLORS.grey,
    lineHeight: 21,
    marginTop: 2,
  },
  italic: {
    fontStyle: 'italic',
  },
  tagChip: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.lavender,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginTop: 6,
  },
  tagText: {
    fontSize: 13,
    color: COLORS.primary,
    fontWeight: '500',
  },
  actionLink: {
    fontSize: 14,
    color: COLORS.teal,
    fontWeight: '600',
    marginTop: 6,
  },
  replyBtn: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginTop: 8,
  },
  replyBtnText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '600',
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
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    zIndex: 10,
  },
  drawer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: 288,
    backgroundColor: COLORS.white,
    zIndex: 20,
    elevation: 16,
    paddingTop: 48,
    paddingHorizontal: 0,
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