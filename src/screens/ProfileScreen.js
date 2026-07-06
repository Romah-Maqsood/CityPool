import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

// ─── Colors ──────────────────────────────────────────────────────────────────
const C = {
  dark:         '#0B1C30',
  teal:         '#006A61',
  tealLight:    '#E0F7F5',
  white:        '#FFFFFF',
  offWhite:     '#F8F9FF',
  border:       '#C6C6CD',
  textDark:     '#45464D',
  textGray:     '#76777D',
  seaGreen:     '#89F5E7',
  amber:        '#F5A623',
  lightBlue:    '#D3E4FE',
  plateBg:      '#0B1C30',
  divider:      '#EFEFEF',
  headerBorder: '#E0E0E0',
  // Stat box — slightly darker blue-tinted bg
  statBg:       '#DCE9FF',
  // Verification badge bg — blue-ish tint as in reference
  verifyBg:     '#EAF0FB',
  verifyBorder: '#006A61',
};

export default function ProfileScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [activeNav, setActiveNav] = useState('profile');

  const quickLinks = [
    { icon: 'history',             label: 'Ride History',   screen: null     },
    { icon: 'wallet-outline',      label: 'Payments',       screen: 'Wallet' },
    { icon: 'cog-outline',         label: 'Settings',       screen: null     },
    { icon: 'help-circle-outline', label: 'Help & Support', screen: null     },
  ];

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>

      {/* ── Header — fixed, with bottom border line ── */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation?.goBack?.()}>
          <IconMCI name="menu" size={26} color={C.textDark} />
        </TouchableOpacity>
        {/* Absolutely centered title */}
        <Text style={styles.headerTitle}>CityPool</Text>
        <TouchableOpacity>
          <Image
            source={require('../assets/images/ahmed-khan-profile.png')}
            style={styles.headerAvatar}
          />
        </TouchableOpacity>
      </View>
      {/* Gray separator line below header */}
      <View style={styles.headerDivider} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >

        {/* ══ CARD 1: Profile Hero ══ */}
        <View style={styles.card}>

          {/* Avatar — NO sea green border, just the plain circle */}
          <View style={styles.avatarWrapper}>
            <Image
              source={require('../assets/images/ahmed-hassan.png')}
              style={styles.profileAvatar}
              resizeMode="cover"
            />
            {/* Badge: white outer ring + teal filled circle + white tick */}
            <View style={styles.badgeOuter}>
              <View style={styles.badgeInner}>
                <IconMCI name="check" size={13} color={C.white} />
              </View>
            </View>
          </View>

          {/* Name */}
          <Text style={styles.profileName}>Ahmed Hassan</Text>

          {/* CNIC Verified — full sea-green background pill */}
          <View style={styles.cnicPill}>
            <IconMCI name="shield-check-outline" size={14} color={C.teal} />
            <Text style={styles.cnicPillText}>CNIC Verified</Text>
          </View>

          {/* Rating — value in amber/orange */}
          <View style={styles.ratingRow}>
            <IconMCI name="star" size={20} color={C.amber} />
            <Text style={styles.ratingValue}>4.9</Text>
            <Text style={styles.ratingCount}>(124 reviews)</Text>
          </View>

          {/* Stats — darker blue bg */}
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Total Rides</Text>
              <Text style={styles.statValue}>124</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Member Since</Text>
              <Text style={styles.statValue}>May 2024</Text>
            </View>
          </View>

          {/* Edit Profile */}
          <TouchableOpacity style={styles.editBtn} activeOpacity={0.85}>
            <IconMCI name="pencil-outline" size={18} color={C.white} />
            <Text style={styles.editBtnText}>Edit Profile</Text>
          </TouchableOpacity>

        </View>

        {/* ══ CARD 2: Personal Information ══ */}
        <View style={styles.card}>
          <View style={styles.cardSectionHeader}>
            <IconMCI name="account-outline" size={22} color={C.teal} />
            <Text style={styles.cardSectionTitle}>Personal Information</Text>
          </View>

          <Text style={styles.fieldLabel}>BIO</Text>
          <Text style={styles.bioText}>
            Software engineer and weekend traveler. I frequently travel between Lahore and
            Islamabad and love sharing the journey with fellow professionals. Safety and
            punctuality are my top priorities.
          </Text>

          <View style={styles.fieldDivider} />

          <Text style={styles.fieldLabel}>PHONE</Text>
          <View style={styles.fieldValueRow}>
            <Text style={styles.fieldValue}>+92 300 1234567</Text>
            <IconMCI name="check-decagram-outline" size={18} color={C.teal} />
          </View>

          <Text style={[styles.fieldLabel, { marginTop: 14 }]}>EMAIL</Text>
          <Text style={styles.fieldValue}>ahmed.hassan@example.com</Text>
        </View>

        {/* ══ Verification Badges — small, left-aligned ══ */}
        <View style={styles.verificationColumn}>

          {/* CNIC Verified */}
          <View style={styles.verificationBadge}>
            <View style={styles.verificationIconBox}>
              {/* Teal filled circle with white check — matching reference */}
              <View style={styles.verifyCircle}>
                <IconMCI name="check-decagram" size={22} color={C.white} />
              </View>
            </View>
            <View>
              <Text style={styles.verificationTitle}>CNIC Verified</Text>
              <Text style={styles.verificationDate}>Verified on May 12, 2024</Text>
            </View>
          </View>

          {/* Phone Verified */}
          <View style={styles.verificationBadge}>
            <View style={styles.verificationIconBox}>
              <View style={styles.verifyCircle}>
                <IconMCI name="cellphone-check" size={20} color={C.white} />
              </View>
            </View>
            <View>
              <Text style={styles.verificationTitle}>Phone Verified</Text>
              <Text style={styles.verificationDate}>Verified on May 12, 2024</Text>
            </View>
          </View>

        </View>

        {/* ══ CARD 3: Vehicle Information ══ */}
        <View style={styles.card}>
          <View style={styles.cardSectionHeader}>
            <IconMCI name="car-outline" size={22} color={C.teal} />
            <Text style={styles.cardSectionTitle}>Vehicle Information</Text>
          </View>

          <Image
            source={require('../assets/images/car-replace.png')}
            style={styles.carImage}
            resizeMode="cover"
          />

          <View style={styles.vehicleRow}>
            <Text style={styles.vehicleLabel}>MODEL</Text>
            <Text style={styles.vehicleValue}>Honda Civic 2023</Text>
          </View>
          <View style={styles.fieldDivider} />

          <View style={styles.vehicleRow}>
            <Text style={styles.vehicleLabel}>PLATE NUMBER</Text>
            <View style={styles.plateBadge}>
              <Text style={styles.plateText}>ABC - 1234</Text>
            </View>
          </View>
          <View style={styles.fieldDivider} />

          <View style={styles.vehicleRow}>
            <Text style={styles.vehicleLabel}>COLOR</Text>
            <Text style={styles.vehicleValue}>Lunar Silver Metallic</Text>
          </View>

          <View style={styles.docVerifiedBanner}>
            <IconMCI name="check-decagram" size={18} color={C.teal} />
            <View style={{ flex: 1 }}>
              <Text style={styles.docVerifiedTitle}>Documents Verified</Text>
              <Text style={styles.docVerifiedSub}>
                Vehicle inspection completed and documents validated by CityPool team.
              </Text>
            </View>
          </View>
        </View>

        {/* ══ Quick Links Grid ══ */}
        <View style={styles.quickGrid}>
          {quickLinks.map((item) => (
            <TouchableOpacity
              key={item.label}
              style={styles.quickCard}
              activeOpacity={0.8}
              onPress={() => item.screen && navigation?.navigate?.(item.screen)}
            >
              <IconMCI name={item.icon} size={28} color={C.teal} />
              <Text style={styles.quickLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 16 }} />
      </ScrollView>

      {/* ── Bottom Navigation ── */}
      <View style={[styles.bottomNav, { paddingBottom: insets.bottom || 8 }]}>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => { setActiveNav('home'); navigation?.navigate?.('Home'); }}
        >
          <Ionicons
            name={activeNav === 'home' ? 'home' : 'home-outline'}
            size={24}
            color={activeNav === 'home' ? C.teal : C.dark}
          />
          <Text style={[styles.navLabel, activeNav === 'home' && styles.navLabelActive]}>
            Home
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => { setActiveNav('rides'); navigation?.navigate?.('MyRides'); }}
        >
          <IconMCI
            name="car-outline"
            size={24}
            color={activeNav === 'rides' ? C.teal : C.dark}
          />
          <Text style={[styles.navLabel, activeNav === 'rides' && styles.navLabelActive]}>
            My Rides
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => { setActiveNav('messages'); navigation?.navigate?.('Chat'); }}
        >
          <IconMCI
            name="message-outline"
            size={24}
            color={activeNav === 'messages' ? C.teal : C.dark}
          />
          <Text style={[styles.navLabel, activeNav === 'messages' && styles.navLabelActive]}>
            Messages
          </Text>
        </TouchableOpacity>

        {/* Profile — sea green pill bg, FILLED person icon, dark teal text */}
        <TouchableOpacity
          style={[styles.navItem, activeNav === 'profile' && styles.navItemActive]}
          onPress={() => setActiveNav('profile')}
        >
          <Ionicons
            name={activeNav === 'profile' ? 'person' : 'person-outline'}
            size={24}
            color={activeNav === 'profile' ? C.teal : C.dark}
          />
          <Text style={[styles.navLabel, activeNav === 'profile' && styles.navLabelActive]}>
            Profile
          </Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.offWhite },

  // ── Header ──
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingVertical: 12,
    backgroundColor: C.offWhite,
  },
  // Gray line separating header from page content
  headerDivider: {
    height: 1,
    backgroundColor: C.headerBorder,
  },
  headerTitle: {
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
    color: C.teal,
  },
  headerAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    // NO sea green border on header avatar — removed as requested
  },

  // ── Scroll ──
  scroll: { paddingHorizontal: 16, paddingTop: 12, paddingBottom: 16 },

  // ── Generic card ──
  card: {
    backgroundColor: C.white,
    borderRadius: 16,
    padding: 18,
    marginBottom: 14,
    ...Platform.select({
      ios:     { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.07, shadowRadius: 6 },
      android: { elevation: 2 },
    }),
  },

  // ── Profile Hero ──
  avatarWrapper: {
    alignSelf: 'center',
    marginBottom: 14,
    position: 'relative',
  },
  profileAvatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    // NO border/stroke — removed as requested
  },
  // White outer ring of badge
  badgeOuter: {
    position: 'absolute',
    bottom: 2,
    right: -2,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: C.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Teal filled circle inside
  badgeInner: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: C.teal,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileName: {
    fontSize: 22,
    fontWeight: '800',
    color: C.dark,
    textAlign: 'center',
    marginBottom: 10,
  },
  // Full sea-green background pill (not just stroke)
  cnicPill: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: C.seaGreen,   // FULL sea green fill
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
    gap: 5,
    marginBottom: 12,
  },
  cnicPillText: {
    fontSize: 13,
    fontWeight: '700',
    color: C.teal,                 // dark teal text on sea green bg
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginBottom: 18,
  },
  ratingValue: {
    fontSize: 18,
    fontWeight: '800',
    color: C.amber,                // orange, not black
  },
  ratingCount: {
    fontSize: 13,
    color: C.textGray,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 18,
  },
  statBox: {
    flex: 1,
    backgroundColor: C.statBg,    // darker blue (#DCE9FF)
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 11,
    color: C.textGray,
    fontWeight: '500',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '800',
    color: C.teal,
  },
  editBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: C.teal,
    borderRadius: 12,
    paddingVertical: 14,
    gap: 8,
  },
  editBtnText: {
    color: C.white,
    fontSize: 16,
    fontWeight: '700',
  },

  // ── Personal Info Card ──
  cardSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  cardSectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: C.dark,
  },
  fieldLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: C.textGray,
    letterSpacing: 0.8,
    marginBottom: 5,
  },
  bioText: {
    fontSize: 14,
    color: C.textDark,
    lineHeight: 22,
    marginBottom: 16,
  },
  fieldDivider: {
    height: 1,
    backgroundColor: C.divider,
    marginVertical: 12,
  },
  fieldValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  fieldValue: {
    fontSize: 15,
    fontWeight: '700',
    color: C.dark,
  },

  // ── Verification Badges ──
  // Column layout, left-aligned, small cards
  verificationColumn: {
    gap: 10,
    marginBottom: 14,
    alignItems: 'flex-start',      // left aligned
  },
  verificationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: C.verifyBg,  // blue-ish inner fill
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1.5,
    borderColor: C.verifyBorder,   // dark green stroke
    // Small / auto width — not full width
    alignSelf: 'flex-start',
    minWidth: 200,
    ...Platform.select({
      ios:     { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 3 },
      android: { elevation: 1 },
    }),
  },
  verificationIconBox: {
    // just holds the circle
  },
  // Teal filled circle — icon is white inside
  verifyCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: C.teal,
    alignItems: 'center',
    justifyContent: 'center',
  },
  verificationTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: C.dark,
    marginBottom: 2,
  },
  verificationDate: {
    fontSize: 12,
    color: C.textGray,
  },

  // ── Vehicle Card ──
  carImage: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    marginBottom: 16,
  },
  vehicleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  vehicleLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: C.textGray,
    letterSpacing: 0.8,
  },
  vehicleValue: {
    fontSize: 15,
    fontWeight: '700',
    color: C.dark,
  },
  plateBadge: {
    backgroundColor: C.plateBg,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  plateText: {
    color: C.white,
    fontWeight: '700',
    fontSize: 14,
    letterSpacing: 1,
  },
  docVerifiedBanner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    backgroundColor: C.tealLight,
    borderRadius: 12,
    padding: 14,
    marginTop: 16,
  },
  docVerifiedTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: C.teal,
    marginBottom: 4,
  },
  docVerifiedSub: {
    fontSize: 12,
    color: C.textDark,
    lineHeight: 18,
    fontStyle: 'italic',
  },

  // ── Quick Links Grid ──
  quickGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 4,
  },
  quickCard: {
    width: '47%',
    backgroundColor: C.white,
    borderRadius: 14,
    paddingVertical: 22,
    alignItems: 'center',
    gap: 10,
    ...Platform.select({
      ios:     { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.07, shadowRadius: 5 },
      android: { elevation: 2 },
    }),
  },
  quickLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: C.dark,
  },

  // ── Bottom Nav ──
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: C.white,
    borderTopWidth: 1,
    borderTopColor: C.lightBlue,
    paddingTop: 10,
    paddingHorizontal: 6,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    borderRadius: 14,
    gap: 3,
  },
  // Sea green pill when active
  navItemActive: {
    backgroundColor: C.seaGreen,
  },
  navLabel: {
    fontSize: 11,
    color: C.dark,
    fontWeight: '500',
  },
  navLabelActive: {
    color: C.teal,
    fontWeight: '700',
  },
});