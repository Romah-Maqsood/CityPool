import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Image,
  Platform,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';
import Svg, {
  Path,
  Circle,
  Rect,
  Line,
  Polyline,
  G,
  Defs,
  RadialGradient,
  Stop,
  Ellipse,
} from 'react-native-svg';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ─── Color tokens ─────────────────────────────────────────────────────────────
const C = {
  white:        '#FFFFFF',
  primary:      '#006A61',
  dark:         '#0B1C30',
  onSurface:    '#45464D',
  mutedText:    '#76777D',
  neutral:      '#C6C6CD',
  background:   '#F8F9FF',
  lightBlue:    '#DCE9FF',
  seaGreen:     '#89F5E7',
  error:        '#BA1A1A',
  amber:        '#FFB95F',
  borderLight:  '#E5E7EB',
  phoneBg:      '#E5EEFF',
  verifiedBg:   '#D6F5F0',
  mapBg1:       '#0D2137',
  mapBg2:       '#0A4A44',
  mapRoad:      '#FFFFFF',
  mapStreet:    '#E8EEF5',
  mapBlock:     '#D6E2EE',
  routeColor:   '#00D4C2',
};

// ─── Fake Map SVG ─────────────────────────────────────────────────────────────
const MapIllustration = () => (
  <Svg width="100%" height="100%" viewBox="0 0 390 220">
    {/* Map background */}
    <Rect x="0" y="0" width="390" height="220" fill="#E8EFF7" />

    {/* City blocks - light fill */}
    <Rect x="20"  y="10"  width="70"  height="45" rx="3" fill="#D4DDE8" />
    <Rect x="100" y="10"  width="55"  height="30" rx="3" fill="#D4DDE8" />
    <Rect x="165" y="10"  width="80"  height="40" rx="3" fill="#D4DDE8" />
    <Rect x="255" y="10"  width="60"  height="50" rx="3" fill="#D4DDE8" />
    <Rect x="325" y="10"  width="55"  height="35" rx="3" fill="#D4DDE8" />

    <Rect x="20"  y="65"  width="45"  height="55" rx="3" fill="#D4DDE8" />
    <Rect x="75"  y="55"  width="60"  height="35" rx="3" fill="#D4DDE8" />
    <Rect x="145" y="60"  width="70"  height="40" rx="3" fill="#D4DDE8" />
    <Rect x="225" y="65"  width="55"  height="45" rx="3" fill="#D4DDE8" />
    <Rect x="290" y="70"  width="80"  height="35" rx="3" fill="#D4DDE8" />

    <Rect x="20"  y="130" width="55"  height="50" rx="3" fill="#D4DDE8" />
    <Rect x="85"  y="125" width="65"  height="45" rx="3" fill="#D4DDE8" />
    <Rect x="160" y="115" width="50"  height="55" rx="3" fill="#D4DDE8" />
    <Rect x="220" y="120" width="75"  height="50" rx="3" fill="#D4DDE8" />
    <Rect x="305" y="115" width="70"  height="55" rx="3" fill="#D4DDE8" />

    <Rect x="20"  y="190" width="80"  height="30" rx="3" fill="#D4DDE8" />
    <Rect x="110" y="185" width="55"  height="35" rx="3" fill="#D4DDE8" />
    <Rect x="175" y="190" width="90"  height="30" rx="3" fill="#D4DDE8" />
    <Rect x="275" y="185" width="60"  height="35" rx="3" fill="#D4DDE8" />

    {/* Main roads - horizontal */}
    <Rect x="0" y="50"  width="390" height="8"  fill="#FFFFFF" opacity="0.9" />
    <Rect x="0" y="110" width="390" height="8"  fill="#FFFFFF" opacity="0.9" />
    <Rect x="0" y="175" width="390" height="7"  fill="#FFFFFF" opacity="0.9" />

    {/* Main roads - vertical */}
    <Rect x="65"  y="0" width="8"  height="220" fill="#FFFFFF" opacity="0.9" />
    <Rect x="138" y="0" width="8"  height="220" fill="#FFFFFF" opacity="0.9" />
    <Rect x="215" y="0" width="8"  height="220" fill="#FFFFFF" opacity="0.9" />
    <Rect x="285" y="0" width="8"  height="220" fill="#FFFFFF" opacity="0.9" />

    {/* Route path - teal */}
    <Path
      d="M 80 185 L 80 115 L 140 115 L 140 55 L 219 55 L 219 115 L 290 115 L 290 55"
      stroke={C.routeColor}
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />

    {/* Destination dot (start) */}
    <Circle cx="80" cy="185" r="6" fill={C.routeColor} />
    <Circle cx="80" cy="185" r="10" fill={C.routeColor} opacity="0.25" />

    {/* Map pin at top of route */}
    <G transform="translate(278, 30)">
      {/* Pin shadow */}
      <Ellipse cx="12" cy="34" rx="6" ry="3" fill="rgba(0,0,0,0.2)" />
      {/* Pin body */}
      <Path
        d="M12 0 C5.37 0 0 5.37 0 12 C0 21 12 34 12 34 C12 34 24 21 24 12 C24 5.37 18.63 0 12 0Z"
        fill={C.primary}
      />
      {/* Crescent moon */}
      <Path
        d="M15 7 C12.5 7 10.5 9 10.5 11.5 C10.5 14 12.5 16 15 16 C13 16 11 14 11 11.5 C11 9 13 7 15 7Z"
        fill={C.white}
      />
    </G>
  </Svg>
);

// ─── Component ────────────────────────────────────────────────────────────────
const RideConfirmedScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [activeNav, setActiveNav] = useState('rides');

  const navItems = [
    { key: 'home',     label: 'Home',     icon: 'home',                activeIcon: 'home'         },
    { key: 'rides',    label: 'My Rides', icon: 'directions-car',      activeIcon: 'directions-car'},
    { key: 'messages', label: 'Messages', icon: 'chat-bubble-outline', activeIcon: 'chat-bubble'  },
    { key: 'profile',  label: 'Profile',  icon: 'person-outline',      activeIcon: 'person'       },
  ];

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor={C.white} />

      {/* ── Header ── */}
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <TouchableOpacity onPress={() => navigation?.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color={C.dark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>CityPool</Text>
        <TouchableOpacity style={styles.profileButton}>
          <Image
            source={require('../assets/images/profile-icon.png')}
            style={styles.profileImage}
            resizeMode="cover"
          />
          <View style={styles.profileStroke} />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Map Card with gradient overlay ── */}
        <View style={styles.mapCard}>
          {/* Gradient overlay on top of map */}
          <LinearGradient
            colors={['rgba(13,33,55,0.55)', 'rgba(10,74,68,0.35)', 'rgba(13,33,55,0.55)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFillObject}
          />

          {/* Map SVG */}
          <View style={styles.mapSvgWrapper}>
            <MapIllustration />
          </View>

          {/* Gradient tinted overlay again on top of map for depth */}
          <LinearGradient
            colors={['rgba(13,33,55,0.45)', 'transparent', 'rgba(13,33,55,0.45)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={StyleSheet.absoluteFillObject}
            pointerEvents="none"
          />

          {/* Driver Status Badge - top right */}
          <View style={styles.driverStatusBadge}>
            {/* Sea-green pill for top label */}
            <View style={styles.driverStatusPill}>
              <Text style={styles.driverStatusTitle}>Driver 5 mins away</Text>
            </View>
            <Text style={styles.driverStatusSub}>Arriving at Pick-up</Text>
          </View>
        </View>

        {/* ── Ride Confirmed Card ── */}
        <View style={styles.confirmedCard}>
          {/* White circle with green check */}
          <View style={styles.confirmedCheckCircle}>
            <Icon name="check" size={22} color={C.primary} />
          </View>
          <View style={styles.confirmedTextCol}>
            <Text style={styles.confirmedTitle}>Ride Confirmed</Text>
            <Text style={styles.confirmedSubtext}>
              Ahmed Hassan is on his way to your location.
            </Text>
          </View>
        </View>

        {/* ── Driver Info Card ── */}
        <View style={styles.driverCard}>
          <View style={styles.driverRow}>
            <View style={styles.driverAvatarWrapper}>
              <Image
                source={require('../assets/images/driver-ahmed.png')}
                style={styles.driverAvatar}
                resizeMode="cover"
              />
            </View>
            <View style={styles.driverInfo}>
              <Text style={styles.driverName}>Ahmed Hassan</Text>
              <View style={styles.ratingRow}>
                <Icon name="star" size={15} color={C.amber} />
                <Text style={styles.ratingText}>4.9 • 1,240 rides</Text>
              </View>
            </View>
            <View style={styles.verifiedBadge}>
              <IconMCI name="check-decagram" size={16} color={C.primary} />
              <Text style={styles.verifiedText}>Verified</Text>
            </View>
          </View>

          <View style={styles.dividerLight} />

          {/* Vehicle + Estimated Fare */}
          <View style={styles.vehicleFareRow}>
            <View style={styles.vehicleCol}>
              <Text style={styles.sectionLabel}>VEHICLE</Text>
              <View style={styles.vehicleNameRow}>
                <Icon name="directions-car" size={17} color={C.mutedText} style={{ marginRight: 5 }} />
                <Text style={styles.vehicleText}>Honda Civic</Text>
              </View>
              <Text style={styles.vehicleSubtext}>White • LED-9241</Text>
            </View>
            <View style={styles.fareCol}>
              <Text style={styles.sectionLabel}>ESTIMATED FARE</Text>
              <Text style={styles.fareAmount}>PKR 3,450</Text>
            </View>
          </View>
        </View>

        {/* ── Pickup & Destination Card ── */}
        <View style={styles.locationCard}>
          {/* Pickup row */}
          <View style={styles.locationRow}>
            <View style={styles.locationIconCol}>
              <View style={styles.dotOutline} />
              <View style={styles.locationLine} />
            </View>
            <View style={styles.locationTextCol}>
              <Text style={styles.locationLabel}>PICKUP</Text>
              <Text style={styles.locationPlace}>Lahore, DHA Phase 6</Text>
            </View>
          </View>

          {/* Destination row */}
          <View style={[styles.locationRow, { marginBottom: 0 }]}>
            <View style={styles.locationIconCol}>
              <View style={styles.dotFilled} />
            </View>
            <View style={styles.locationTextCol}>
              <Text style={styles.locationLabel}>DESTINATION</Text>
              <Text style={styles.locationPlace}>Islamabad, Blue Area</Text>
            </View>
          </View>

          <View style={styles.dividerLight} />

          {/* Time & Seats */}
          <View style={styles.timeSeatsRow}>
            <View style={styles.timeItem}>
              <Icon name="schedule" size={17} color={C.mutedText} />
              <Text style={styles.timeText}>Today, 4:30 PM</Text>
            </View>
            <View style={styles.seatsItem}>
              <Icon name="people-outline" size={17} color={C.mutedText} />
              <Text style={styles.seatsText}>2 Seats booked</Text>
            </View>
          </View>
        </View>

        {/* ── Action Buttons ── */}
        <TouchableOpacity style={styles.messageButton} activeOpacity={0.85}onPress={() => navigation.navigate('Chat')}>
          <Icon name="chat-bubble-outline" size={21} color={C.white} />
          <Text style={styles.messageButtonText}>Message Driver</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.callButton} activeOpacity={0.85}>
          <Icon name="phone" size={21} color={C.dark} />
          <Text style={styles.callButtonText}>Call Ahmed</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cancelButton} activeOpacity={0.7}>
          <Text style={styles.cancelButtonText}>Cancel Ride Request</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* ── Bottom Navigation ── */}
      <View style={[styles.bottomNav, { paddingBottom: insets.bottom || 10 }]}>
        {navItems.map((item) => {
          const isActive = activeNav === item.key;
          return (
            <TouchableOpacity
              key={item.key}
              style={[styles.navItem, isActive && styles.navItemActive]}
              onPress={() => setActiveNav(item.key)}
              activeOpacity={0.7}
            >
              <Icon
                name={isActive ? item.activeIcon : item.icon}
                size={24}
                color={isActive ? C.primary : C.mutedText}
              />
              <Text style={[styles.navLabel, isActive && styles.navLabelActive]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: C.background,
  },

  // ── Header ──
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: C.white,
    borderBottomWidth: 1,
    borderBottomColor: C.borderLight,
  },
  backButton: {
    padding: 4,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: C.primary,
    // LEFT-aligned: sits naturally after back button, no absolute centering
  },
  profileButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    marginLeft: 'auto',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 21,
  },
  profileStroke: {
    position: 'absolute',
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    borderRadius: 23,
    borderWidth: 2,
    borderColor: C.seaGreen,
  },

  // ── Scroll ──
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 24,
  },

  // ── Map Card ──
  mapCard: {
    height: 230,
    width: '100%',
    overflow: 'hidden',
    position: 'relative',
  },
  mapSvgWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  driverStatusBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: C.white,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    alignItems: 'center',
    minWidth: 160,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
      },
      android: { elevation: 5 },
    }),
  },
  driverStatusPill: {
    backgroundColor: C.seaGreen,
    borderRadius: 50,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginBottom: 5,
  },
  driverStatusTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: C.dark,
  },
  driverStatusSub: {
    fontSize: 12,
    color: C.mutedText,
  },

  // ── Ride Confirmed Card ──
  confirmedCard: {
    backgroundColor: C.primary,
    marginHorizontal: 16,
    marginTop: 14,
    borderRadius: 18,
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  confirmedCheckCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: C.white,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  confirmedTextCol: {
    flex: 1,
  },
  confirmedTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: C.white,
    marginBottom: 5,
  },
  confirmedSubtext: {
    fontSize: 14,
    color: C.white,
    lineHeight: 20,
    opacity: 0.9,
  },

  // ── Driver Card ──
  driverCard: {
    backgroundColor: C.white,
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 18,
    paddingVertical: 20,
    paddingHorizontal: 18,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
      },
      android: { elevation: 3 },
    }),
  },
  driverRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  driverAvatarWrapper: {
    width: 62,
    height: 62,
    borderRadius: 31,
    marginRight: 14,
    overflow: 'hidden',
    borderWidth: 2.5,
    borderColor: C.lightBlue,
  },
  driverAvatar: {
    width: '100%',
    height: '100%',
  },
  driverInfo: {
    flex: 1,
  },
  driverName: {
    fontSize: 20,
    fontWeight: '700',
    color: C.dark,
    marginBottom: 5,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  ratingText: {
    fontSize: 14,
    color: C.mutedText,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: C.verifiedBg,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 50,
    alignSelf: 'flex-start',
  },
  verifiedText: {
    fontSize: 13,
    color: C.primary,
    fontWeight: '600',
  },
  dividerLight: {
    height: 1,
    backgroundColor: C.borderLight,
    marginVertical: 14,
  },
  vehicleFareRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  vehicleCol: {
    flex: 1,
  },
  fareCol: {
    alignItems: 'flex-end',
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: C.mutedText,
    letterSpacing: 0.7,
    marginBottom: 5,
  },
  vehicleNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vehicleText: {
    fontSize: 15,
    fontWeight: '700',
    color: C.dark,
  },
  vehicleSubtext: {
    fontSize: 13,
    color: C.mutedText,
    marginTop: 3,
  },
  fareAmount: {
    fontSize: 22,
    fontWeight: '800',
    color: C.primary,
    marginTop: 2,
  },

  // ── Location Card ──
  locationCard: {
    backgroundColor: C.white,
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 18,
    paddingVertical: 20,
    paddingHorizontal: 18,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
      },
      android: { elevation: 3 },
    }),
  },
  locationRow: {
    flexDirection: 'row',
    gap: 14,
    marginBottom: 2,
  },
  locationIconCol: {
    alignItems: 'center',
    width: 20,
    paddingTop: 3,
  },
  dotOutline: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 3,
    borderColor: C.seaGreen,
    backgroundColor: C.white,
  },
  locationLine: {
    width: 2,
    height: 36,
    backgroundColor: C.neutral,
    marginTop: 4,
  },
  dotFilled: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: C.dark,
  },
  locationTextCol: {
    flex: 1,
    paddingBottom: 10,
  },
  locationLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: C.mutedText,
    letterSpacing: 0.7,
    marginBottom: 3,
  },
  locationPlace: {
    fontSize: 16,
    fontWeight: '600',
    color: C.dark,
  },
  timeSeatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  timeText: {
    fontSize: 14,
    color: C.onSurface,
  },
  seatsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  seatsText: {
    fontSize: 14,
    color: C.onSurface,
  },

  // ── Action Buttons ──
  messageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    height: 58,
    backgroundColor: C.primary,
    borderRadius: 14,
    marginHorizontal: 16,
    marginTop: 16,
  },
  messageButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: C.white,
  },
  callButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    height: 58,
    backgroundColor: C.phoneBg,
    borderRadius: 14,
    marginHorizontal: 16,
    marginTop: 12,
  },
  callButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: C.dark,
  },
  cancelButton: {
    alignItems: 'center',
    paddingVertical: 16,
    marginHorizontal: 16,
  },
  cancelButtonText: {
    fontSize: 15,
    color: C.error,
    fontWeight: '600',
  },

  // ── Bottom Navigation ──
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: C.borderLight,
    backgroundColor: C.white,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: 10,
    gap: 3,
    minWidth: 60,
  },
  navItemActive: {
    backgroundColor: C.seaGreen,
  },
  navLabel: {
    fontSize: 11,
    color: C.mutedText,
  },
  navLabelActive: {
    color: C.primary,
    fontWeight: '600',
  },
});

export default RideConfirmedScreen;