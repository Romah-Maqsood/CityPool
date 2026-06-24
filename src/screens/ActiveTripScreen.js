import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';
import IconIon from 'react-native-vector-icons/Ionicons';

// ─── Colors (matched from the shared design-tool swatches) ───────────────────
const C = {
  white:          '#FFFFFF',
  black:          '#000000',
  primary:        '#006A61',
  primaryDark:    '#006F66',
  dark:           '#0B1C30',
  onSurface:      '#45464D',
  mutedText:      '#76777D',
  neutral:        '#C6C6CD',
  background:     '#F8F9FF',
  cardBorder:      '#E5EEFF',
  divider:        '#E2E8F0',
  lightBlue:      '#D3E4FE',
  lavender:       '#DAE2FD',
  seaGreen:       '#86F2E4',
  tealAvatar:     '#006F66',
  amberStar:      '#FFB95F',
  amberText:      '#B87500',
  activeTripBg:   '#86F2E4',
  activeTripText: '#00201D',
  progressTrack:  '#D3E4FE',
  progressFill:   '#006A61',
  createGroupBtn: '#006A61',
};

// ─── Passenger data ───────────────────────────────────────────────────────────
const PASSENGERS = [
  {
    id: '1',
    initials: 'AZ',
    name: 'Ali Zain',
    verified: true,
    rating: 4.9,
    pickup: 'Kalma Chowk Underpass, Garden Town',
    avatarBg: C.lavender,
    avatarText: C.dark,
  },
  {
    id: '2',
    initials: 'SK',
    name: 'Sara Khan',
    verified: true,
    rating: 4.7,
    pickup: 'DHA Phase 5, Main Entrance',
    avatarBg: C.tealAvatar,
    avatarText: C.white,
  },
  {
    id: '3',
    initials: 'ZH',
    name: 'Zain Hameed',
    verified: false,
    rating: 5.0,
    pickup: 'Liberty Roundabout, Gulberg III',
    avatarBg: C.lavender,
    avatarText: C.dark,
  },
];

// ─── Passenger Card ────────────────────────────────────────────────────────────
const PassengerCard = ({ passenger }) => (
  <View style={st.passengerCard}>
    <View style={st.passengerTopRow}>
      <View style={[st.passengerAvatar, { backgroundColor: passenger.avatarBg }]}>
        <Text style={[st.passengerAvatarText, { color: passenger.avatarText }]}>
          {passenger.initials}
        </Text>
      </View>

      <View style={st.passengerInfo}>
        <View style={st.passengerNameRow}>
          <Text style={st.passengerName}>{passenger.name}</Text>
          {passenger.verified && (
            <IconMCI name="check-decagram" size={15} color={C.primary} />
          )}
        </View>
        <View style={st.ratingRow}>
          <IconMCI name="star" size={13} color={C.amberStar} />
          <Text style={st.ratingText}>{passenger.rating}</Text>
        </View>
      </View>

      <TouchableOpacity style={st.callBtn} activeOpacity={0.7}>
        <IconMCI name="phone-outline" size={20} color={C.dark} />
      </TouchableOpacity>
    </View>

    <View style={st.pickupBox}>
      <IconMCI name="map-marker-outline" size={16} color={C.primary} />
      <View style={{ flexShrink: 1 }}>
        <Text style={st.pickupLabel}>Pickup Point</Text>
        <Text style={st.pickupValue}>{passenger.pickup}</Text>
      </View>
    </View>
  </View>
);

// ─── Main Screen ──────────────────────────────────────────────────────────────
const ActiveTripScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [activeNav, setActiveNav] = useState('rides');

  const seatsOccupied = 3;
  const totalSeats = 4;
  const progressPct = (seatsOccupied / totalSeats) * 100;

  return (
    <View style={[st.root, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor={C.background} />

      {/* ── Top bar ── */}
      <View style={st.topBar}>
        <TouchableOpacity style={st.topBarBtn}>
          <IconIon name="reorder-three-sharp" size={26} color={C.primary} />
        </TouchableOpacity>
        <Text style={st.topBarTitle}>CityPool</Text>
        <TouchableOpacity style={st.avatarBtn}>
          <Image
            source={require('../assets/images/ahmed-hassan.png')}
            style={st.avatarImg}
            resizeMode="cover"
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={st.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ACTIVE TRIP badge */}
        <View style={st.activeTripBadge}>
          <Text style={st.activeTripBadgeText}>ACTIVE TRIP</Text>
        </View>

        {/* Title + seats occupied */}
        <View style={st.titleRow}>
          <Text style={st.tripTitle}>Lahore to Islamabad</Text>
          <View style={st.seatsBlock}>
            <Text style={st.seatsLabel}>Seats Occupied</Text>
            <Text style={st.seatsValue}>{seatsOccupied}/{totalSeats}</Text>
          </View>
        </View>

        {/* Progress bar */}
        <View style={st.progressTrack}>
          <View style={[st.progressFill, { width: `${progressPct}%` }]} />
        </View>

        {/* Map preview with Next Pickup overlay */}
        <View style={st.mapCard}>
          <Image
            source={require('../assets/images/active-trip-map.png')}
            style={st.mapImage}
            resizeMode="cover"
          />
          <View style={st.nextPickupOverlay}>
            <IconMCI name="map-marker-outline" size={18} color={C.primary} />
            <View>
              <Text style={st.nextPickupLabel}>Next Pickup</Text>
              <Text style={st.nextPickupValue}>DHA Phase 5, Lahore</Text>
            </View>
          </View>
        </View>

        {/* Create Trip Group */}
        <TouchableOpacity
          style={st.createGroupBtn}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('GroupChat')}
        >
          <IconMCI name="forum-outline" size={20} color={C.white} />
          <Text style={st.createGroupText}>Create Trip Group</Text>
        </TouchableOpacity>

        {/* Trip Summary */}
        <View style={st.summaryCard}>
          <Text style={st.summaryTitle}>Trip Summary</Text>

          <View style={st.summaryRow}>
            <Text style={st.summaryLabel}>Departure</Text>
            <Text style={st.summaryValue}>09:30 AM</Text>
          </View>
          <View style={st.summaryRow}>
            <Text style={st.summaryLabel}>Est. Arrival</Text>
            <Text style={st.summaryValue}>01:45 PM</Text>
          </View>
          <View style={st.summaryRow}>
            <Text style={st.summaryLabel}>Distance</Text>
            <Text style={st.summaryValue}>378 km</Text>
          </View>

          <View style={st.summaryDivider} />

          <View style={st.summaryRow}>
            <Text style={st.earningsLabel}>Total Earnings</Text>
            <Text style={st.earningsValue}>PKR 4,800</Text>
          </View>
        </View>

        {/* Passenger List */}
        <Text style={st.passengerListTitle}>Passenger List</Text>
        {PASSENGERS.map(p => (
          <PassengerCard key={p.id} passenger={p} />
        ))}

        <View style={{ height: 16 }} />
      </ScrollView>

      {/* ── Bottom nav ── */}
      <View style={[st.bottomNav, { paddingBottom: insets.bottom || 8 }]}>
        <TouchableOpacity
          style={st.navItem}
          onPress={() => { setActiveNav('home'); navigation.navigate('Home'); }}
          activeOpacity={0.7}
        >
          <Icon name="home" size={27} color={activeNav === 'home' ? C.primary : C.dark} />
          <Text style={[st.navLabel, activeNav === 'home' && st.navLabelActive]}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={st.navItem}
          onPress={() => setActiveNav('rides')}
          activeOpacity={0.7}
        >
          <View style={[st.navIconWrap, activeNav === 'rides' && st.navIconWrapActive]}>
            <IconMCI name="car-outline" size={24} color={activeNav === 'rides' ? C.primaryDark : C.dark} />
          </View>
          <Text style={[st.navLabel, activeNav === 'rides' && st.navLabelActive]}>My Rides</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={st.navItem}
          onPress={() => setActiveNav('messages')}
          activeOpacity={0.7}
        >
          <IconMCI name="message-text-outline" size={26} color={activeNav === 'messages' ? C.primary : C.dark} />
          <Text style={[st.navLabel, activeNav === 'messages' && st.navLabelActive]}>Messages</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={st.navItem}
          onPress={() => setActiveNav('profile')}
          activeOpacity={0.7}
        >
          <Icon name="person-outline" size={26} color={activeNav === 'profile' ? C.primary : C.dark} />
          <Text style={[st.navLabel, activeNav === 'profile' && st.navLabelActive]}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────
const st = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.background },
  scrollContent: { paddingHorizontal: 16, paddingBottom: 24 },

  // Top bar
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: C.background,
    borderBottomWidth: 1,
    borderBottomColor: C.cardBorder,
  },
  topBarBtn: { padding: 4 },
  topBarTitle: { flex: 1, fontSize: 20, fontWeight: '800', color: C.primary, marginLeft: 10 },
  avatarBtn: {
    width: 38, height: 38, borderRadius: 19,
    borderWidth: 2, borderColor: C.seaGreen,
    overflow: 'hidden',
  },
  avatarImg: { width: '100%', height: '100%' },

  // Active trip badge
  activeTripBadge: {
    alignSelf: 'flex-start',
    backgroundColor: C.activeTripBg,
    borderRadius: 50,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginTop: 16,
    marginBottom: 10,
  },
  activeTripBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: C.activeTripText,
    letterSpacing: 0.5,
  },

  // Title row
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  tripTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: C.black,
    flexShrink: 1,
    paddingRight: 10,
  },
  seatsBlock: { alignItems: 'flex-end' },
  seatsLabel: { fontSize: 12, color: C.mutedText, marginBottom: 2 },
  seatsValue: { fontSize: 22, fontWeight: '800', color: C.primaryDark },

  // Progress bar
  progressTrack: {
    height: 8,
    borderRadius: 4,
    backgroundColor: C.progressTrack,
    overflow: 'hidden',
    marginBottom: 18,
  },
  progressFillBar: {},
  progressFill: {
    height: '100%',
    borderRadius: 4,
    backgroundColor: C.progressFill,
  },

  // Map card
  mapCard: {
    borderRadius: 20,
    overflow: 'hidden',
    height: 320,
    marginBottom: 16,
    position: 'relative',
    backgroundColor: C.dark,
  },
  mapImage: { width: '100%', height: '100%' },
  nextPickupOverlay: {
    position: 'absolute',
    left: 14,
    right: 14,
    bottom: 14,
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  nextPickupLabel: { fontSize: 12, color: C.mutedText, marginBottom: 2 },
  nextPickupValue: { fontSize: 15, fontWeight: '700', color: C.dark },

  // Create Trip Group button
  createGroupBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: C.createGroupBtn,
    borderRadius: 14,
    height: 54,
    marginBottom: 18,
  },
  createGroupText: { fontSize: 16, fontWeight: '700', color: C.white },

  // Trip Summary card
  summaryCard: {
    backgroundColor: C.white,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: C.cardBorder,
    padding: 16,
    marginBottom: 22,
  },
  summaryTitle: { fontSize: 16, fontWeight: '800', color: C.black, marginBottom: 12 },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryLabel: { fontSize: 14, color: C.onSurface },
  summaryValue: { fontSize: 14, fontWeight: '700', color: C.black },
  summaryDivider: {
    height: 1,
    backgroundColor: C.divider,
    marginVertical: 4,
    marginBottom: 10,
  },
  earningsLabel: { fontSize: 14, fontWeight: '600', color: C.primary },
  earningsValue: { fontSize: 18, fontWeight: '800', color: C.black },

  // Passenger list
  passengerListTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: C.black,
    marginBottom: 12,
  },
  passengerCard: {
    backgroundColor: C.white,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: C.cardBorder,
    padding: 14,
    marginBottom: 12,
  },
  passengerTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  passengerAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  passengerAvatarText: { fontSize: 14, fontWeight: '700' },
  passengerInfo: { flex: 1 },
  passengerNameRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 3 },
  passengerName: { fontSize: 15, fontWeight: '700', color: C.black },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  ratingText: { fontSize: 13, fontWeight: '600', color: C.amberText },
  callBtn: { padding: 6 },
  pickupBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    backgroundColor: C.background,
    borderWidth: 1,
    borderColor: C.cardBorder,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  pickupLabel: { fontSize: 11, color: C.mutedText, marginBottom: 2 },
  pickupValue: { fontSize: 13, fontWeight: '700', color: C.dark },

  // Bottom nav
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: C.cardBorder,
    backgroundColor: C.white,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 10,
    gap: 3,
    minWidth: 64,
  },
  navIconWrap: {
    width: 46,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navIconWrapActive: { backgroundColor: C.seaGreen },
  navLabel: { fontSize: 12, color: C.dark },
  navLabelActive: { color: C.primary, fontWeight: '700' },
});

export default ActiveTripScreen;