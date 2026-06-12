import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';
import IconIon from 'react-native-vector-icons/Ionicons';

// ─── Color tokens ─────────────────────────────────────────────────────────────
const C = {
  white: '#FFFFFF',
  primary: '#006A61',
  dark: '#0B1C30',
  darkCard: '#131B2E',
  onSurface: '#45464D',
  mutedText: '#76777D',
  neutral: '#C6C6CD',
  background: '#F8F9FF',
  lightBlue: '#DCE9FF',
  fareBg: '#E5EEFF',
  amber: '#B87500',
  amberBg: '#FFF3E0',
  seaGreen: '#89F5E7',
  seaGreenDark: '#006F66',
  cnicBg: '#E0F7F5',
  phoneBg: '#DCE9FF',
  teal86: '#86F2E4',
};

// ─── RideDetailsScreen ────────────────────────────────────────────────────────
const RideDetailsScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor={C.white} />

      {/* ── STICKY HEADER (No boxes, only icons) ── */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
          style={styles.headerBtn}
        >
          <Icon name="arrow-back" size={22} color={C.dark} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Ride Details</Text>

        <TouchableOpacity activeOpacity={0.7} style={styles.headerBtn}>
          <IconIon name="share-social-outline" size={22} color={C.dark} />
        </TouchableOpacity>
      </View>

      {/* ── SCROLLABLE BODY ── */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── CARD 1: Intercity Banner ── */}
        <View style={styles.bannerCard}>
          <Image
            source={require('../assets/images/ride-bg.png')}
            style={styles.bannerBg}
            resizeMode="cover"
          />
          <View style={styles.bannerOverlay} />

          <View style={styles.bannerContent}>
            <View style={styles.bannerTopRow}>
              <View style={styles.intercityChip}>
                <Text style={styles.intercityText}>INTER-CITY</Text>
              </View>
              <Text style={styles.durationText}>3h 45m duration</Text>
            </View>

            <View style={styles.bannerMidRow}>
              <View style={styles.routeBlock}>
                <Text style={styles.routeText}>Islamabad to{'\n'}Lahore</Text>
                <Text style={styles.departureMeta}>Oct 24, 2023 • 08:30 AM</Text>
                <Text style={styles.departureLabel}>Departure</Text>
              </View>
              <View style={styles.priceBlock}>
                <Text style={styles.startingFrom}>Starting from</Text>
                <Text style={styles.priceText}>Rs.{'\n'}1,850</Text>
              </View>
            </View>
          </View>
        </View>

        {/* ── CARD 2: Driver with Sea Green Stroke ── */}
        <View style={styles.card}>
          <View style={styles.driverRow}>
            {/* Avatar with sea green stroke */}
            <View style={styles.driverAvatarWrapper}>
              <Image
                source={require('../assets/images/ahmed-siddiqui.png')}
                style={styles.driverAvatar}
                resizeMode="cover"
              />
            </View>

            <View style={styles.driverInfo}>
              <Text style={styles.driverName}>Ahmed{'\n'}Siddiqui</Text>
              <View style={styles.driverMeta}>
                <IconMCI name="star" size={14} color={C.amber} />
                <Text style={styles.driverRating}>4.9</Text>
                <Text style={styles.driverRides}>• 124 Rides</Text>
              </View>
            </View>

            <View style={styles.verifyCol}>
              <View style={styles.cnicTag}>
                <IconMCI name="shield-check" size={12} color={C.primary} />
                <Text style={styles.cnicTagText}>CNIC{'\n'}Verified</Text>
              </View>
              <View style={styles.phoneTag}>
                <Icon name="phone" size={12} color={C.mutedText} />
                <Text style={styles.phoneTagText}>Phone</Text>
              </View>
            </View>
          </View>
        </View>

        {/* ── CARD 3: Pickup / Drop-off / Vehicle ── */}
        <View style={styles.card}>
          {/* Pickup */}
          <View style={styles.routeStopRow}>
            <View style={styles.routeIconCol}>
              <View style={styles.dotOutline} />
              <View style={styles.routeLine} />
            </View>
            <View style={styles.routeTextCol}>
              <Text style={styles.stopLabel}>PICKUP</Text>
              <Text style={styles.stopPlace}>G-11 Markaz, Islamabad</Text>
              <Text style={styles.stopSub}>Beside Shell Petrol Pump</Text>
            </View>
          </View>

          {/* Drop-off */}
          <View style={styles.routeStopRow}>
            <View style={styles.routeIconCol}>
              <View style={styles.dotFilled} />
            </View>
            <View style={styles.routeTextCol}>
              <Text style={styles.stopLabel}>DROP-OFF</Text>
              <Text style={styles.stopPlace}>Liberty Roundabout, Lahore</Text>
              <Text style={styles.stopSub}>Main Entrance Gate</Text>
            </View>
          </View>

          <View style={styles.inCardDivider} />

          {/* Vehicle + Seats row with icons left-aligned */}
          <View style={styles.vehicleRow}>
            <View style={styles.vehicleBlock}>
              <IconMCI name="car-outline" size={22} color={C.dark} />
              <View>
                <Text style={styles.vehicleLabel}>Vehicle</Text>
                <Text style={styles.vehicleName}>Honda Civic (2022)</Text>
                <Text style={styles.vehiclePlate}>Plate: ABC-123</Text>
              </View>
            </View>

            <View style={styles.seatsBlock}>
              <IconMCI name="seat-passenger" size={22} color={C.dark} />
              <View>
                <Text style={styles.vehicleLabel}>Available</Text>
                <Text style={styles.seatsCount}>2 Seats Left</Text>
                <Text style={styles.seatsTotal}>of 3 total</Text>
              </View>
            </View>
          </View>
        </View>

        {/* ── CARD 4: Driver Notes (5 lines) ── */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Driver Notes</Text>
          <Text style={styles.notesText}>
            "Leaving sharp at 8:30 AM. I usually take the M2 Motorway. Looking for quiet, professional co-travelers. AC will be on full. One small bag per person allowed in the trunk."
          </Text>
        </View>

        {/* ── CARD 5: Preferences (with bone icon for No Pets) ── */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <View style={styles.prefGrid}>
            <View style={styles.prefItem}>
              <IconMCI name="smoking-off" size={20} color={C.dark} />
              <Text style={styles.prefText}>No Smoking</Text>
            </View>
            <View style={styles.prefItem}>
              <IconMCI name="bag-suitcase-outline" size={20} color={C.dark} />
              <Text style={styles.prefText}>Small Luggage{'\n'}Only</Text>
            </View>
            <View style={styles.prefItem}>
              <IconMCI name="music-note" size={20} color={C.dark} />
              <Text style={styles.prefText}>Music Allowed</Text>
            </View>
            <View style={styles.prefItem}>
              <IconMCI name="bone" size={20} color={C.dark} />
              <Text style={styles.prefText}>No Pets</Text>
            </View>
          </View>
        </View>

        {/* ── CARD 6: Ride Fare with Gray Stroke ── */}
        <View style={[styles.card, styles.fareCard]}>
          <Text style={styles.sectionTitle}>Ride Fare</Text>

          <View style={styles.fareRow}>
            <Text style={styles.fareLabel}>Seat Price</Text>
            <Text style={styles.fareValue}>Rs. 1,850</Text>
          </View>
          <View style={styles.fareRow}>
            <Text style={styles.fareLabel}>Booking Fee</Text>
            <Text style={styles.fareValue}>Rs. 50</Text>
          </View>

          <View style={styles.fareDivider} />

          <View style={styles.fareRow}>
            <Text style={styles.fareTotalLabel}>Total</Text>
            <Text style={styles.fareTotalValue}>Rs. 1,900</Text>
          </View>

          <TouchableOpacity style={styles.requestBtn} activeOpacity={0.85}>
            <Text style={styles.requestBtnText}>Request Seat</Text>
            <Icon name="chevron-right" size={20} color={C.white} />
          </TouchableOpacity>

          <Text style={styles.chargeNote}>
            You won't be charged until the driver accepts your request.
          </Text>
        </View>

        {/* ── CARD 7: Recent Reviews ── */}
        <View style={styles.card}>
          <View style={styles.reviewsHeader}>
            <Text style={styles.sectionTitle}>Recent Reviews</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.reviewItem}>
            <View style={styles.reviewTopRow}>
              <Text style={styles.reviewerName}>Zahra K.</Text>
              <View style={styles.reviewRatingRow}>
                <IconMCI name="star" size={13} color={C.amber} />
                <Text style={styles.reviewRating}>5.0</Text>
              </View>
            </View>
            <Text style={styles.reviewText}>
              "Very smooth drive, Ahmed was very punctual. Highly recommend!"
            </Text>
          </View>

          <View style={styles.reviewDivider} />

          <View style={styles.reviewItem}>
            <View style={styles.reviewTopRow}>
              <Text style={styles.reviewerName}>Bilal M.</Text>
              <View style={styles.reviewRatingRow}>
                <IconMCI name="star" size={13} color={C.amber} />
                <Text style={styles.reviewRating}>4.8</Text>
              </View>
            </View>
            <Text style={styles.reviewText}>
              "Great car, very comfortable. A bit fast on the highway but safe."
            </Text>
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* ── STICKY FOOTER: Total price in GREEN ── */}
      <View style={[styles.stickyFooter, { paddingBottom: insets.bottom || 16 }]}>
        <View style={styles.footerLeft}>
          <Text style={styles.footerLabel}>Total per seat</Text>
          <Text style={styles.footerPrice}>Rs. 1,900</Text>
        </View>
        <TouchableOpacity style={styles.footerBtn} activeOpacity={0.85}>
          <Text style={styles.footerBtnText}>Request Seat</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.background },
  scrollContent: { flexGrow: 1, paddingHorizontal: 16, paddingBottom: 16 },

  // ── HEADER (No boxes) ──
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: C.white,
    borderBottomWidth: 1,
    borderBottomColor: C.lightBlue,
  },
  headerBtn: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: C.dark,
    textAlign: 'center',
    flex: 1,
  },

  // ── BANNER CARD ──
  bannerCard: {
    borderRadius: 16,
    overflow: 'hidden',
    marginTop: 16,
    marginBottom: 12,
    height: 200,
    position: 'relative',
  },
  bannerBg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  bannerOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(13,28,48,0.62)',
  },
  bannerContent: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  bannerTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  intercityChip: {
    backgroundColor: C.seaGreen,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  intercityText: {
    fontSize: 11,
    fontWeight: '800',
    color: C.seaGreenDark,
    letterSpacing: 0.5,
  },
  durationText: {
    fontSize: 13,
    color: C.white,
    fontWeight: '500',
  },
  bannerMidRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  routeBlock: { flex: 1 },
  routeText: {
    fontSize: 26,
    fontWeight: '800',
    color: C.white,
    lineHeight: 32,
    marginBottom: 6,
  },
  departureMeta: { fontSize: 12, color: C.lightBlue, marginBottom: 2 },
  departureLabel: { fontSize: 12, color: C.lightBlue },
  priceBlock: { alignItems: 'flex-end' },
  startingFrom: { fontSize: 11, color: C.lightBlue, marginBottom: 2 },
  priceText: {
    fontSize: 26,
    fontWeight: '800',
    color: C.seaGreen,
    textAlign: 'right',
    lineHeight: 30,
  },

  // ── CARD BASE ──
  card: {
    backgroundColor: C.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.07, shadowRadius: 6 },
      android: { elevation: 2 },
    }),
  },

  // ── DRIVER CARD ──
  driverRow: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  driverAvatarWrapper: {
    width: 64,
    height: 64,
    borderRadius: 32,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: C.seaGreen,
  },
  driverAvatar: { width: '100%', height: '100%' },
  driverInfo: { flex: 1 },
  driverName: { fontSize: 18, fontWeight: '700', color: C.dark, lineHeight: 24, marginBottom: 4 },
  driverMeta: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  driverRating: { fontSize: 13, fontWeight: '700', color: C.amber },
  driverRides: { fontSize: 13, color: C.mutedText },
  verifyCol: { gap: 6, alignItems: 'flex-end' },
  cnicTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: C.cnicBg,
    borderRadius: 24,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  cnicTagText: { fontSize: 11, color: C.primary, fontWeight: '700' },
  phoneTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: C.phoneBg,
    borderRadius: 24,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  phoneTagText: { fontSize: 11, color: C.mutedText, fontWeight: '600' },

  // ── ROUTE STOPS ──
  routeStopRow: { flexDirection: 'row', gap: 12, marginBottom: 16 },
  routeIconCol: { alignItems: 'center', paddingTop: 3, width: 16 },
  dotOutline: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: C.primary,
    backgroundColor: C.white,
  },
  routeLine: {
    width: 2,
    flex: 1,
    backgroundColor: C.neutral,
    marginTop: 4,
    minHeight: 40,
  },
  dotFilled: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: C.primary,
  },
  routeTextCol: { flex: 1, paddingBottom: 4 },
  stopLabel: { fontSize: 10, fontWeight: '700', color: C.mutedText, letterSpacing: 0.8, marginBottom: 3 },
  stopPlace: { fontSize: 15, fontWeight: '700', color: C.dark, marginBottom: 2 },
  stopSub: { fontSize: 12, color: C.mutedText },
  inCardDivider: { height: 1, backgroundColor: C.lightBlue, marginVertical: 12 },

  // ── VEHICLE ROW ──
  vehicleRow: { flexDirection: 'row', gap: 24 },
  vehicleBlock: { flexDirection: 'row', gap: 10, flex: 1, alignItems: 'flex-start' },
  seatsBlock: { flexDirection: 'row', gap: 10, flex: 1, alignItems: 'flex-start' },
  vehicleLabel: { fontSize: 11, color: C.mutedText, marginBottom: 2 },
  vehicleName: { fontSize: 14, fontWeight: '700', color: C.dark, lineHeight: 20 },
  vehiclePlate: { fontSize: 12, color: C.mutedText },
  seatsCount: { fontSize: 14, fontWeight: '700', color: C.dark },
  seatsTotal: { fontSize: 12, color: C.mutedText },

  // ── DRIVER NOTES ──
  sectionTitle: { fontSize: 18, fontWeight: '800', color: C.dark, marginBottom: 10 },
  notesText: { fontSize: 14, color: C.onSurface, lineHeight: 22 },

  // ── PREFERENCES ──
  prefGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 16 },
  prefItem: { flexDirection: 'row', alignItems: 'center', gap: 8, width: '45%' },
  prefText: { fontSize: 13, color: C.dark, fontWeight: '500', flex: 1 },

  // ── RIDE FARE with Gray Stroke ──
  fareCard: {
    backgroundColor: C.fareBg,
    borderWidth: 1,
    borderColor: C.neutral,
  },
  fareRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  fareLabel: { fontSize: 14, color: C.mutedText },
  fareValue: { fontSize: 14, color: C.dark, fontWeight: '500' },
  fareDivider: { height: 1, backgroundColor: C.neutral, marginVertical: 10 },
  fareTotalLabel: { fontSize: 16, fontWeight: '800', color: C.dark },
  fareTotalValue: { fontSize: 16, fontWeight: '800', color: C.primary },
  requestBtn: {
    flexDirection: 'row',
    backgroundColor: C.primary,
    borderRadius: 12,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    marginTop: 14,
    marginBottom: 10,
  },
  requestBtnText: { fontSize: 16, fontWeight: '700', color: C.white },
  chargeNote: {
    fontSize: 12,
    color: C.mutedText,
    textAlign: 'center',
    lineHeight: 18,
  },

  // ── REVIEWS ──
  reviewsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  seeAll: { fontSize: 13, color: C.primary, fontWeight: '600' },
  reviewItem: { paddingVertical: 6 },
  reviewTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  reviewerName: { fontSize: 14, fontWeight: '700', color: C.dark },
  reviewRatingRow: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  reviewRating: { fontSize: 13, fontWeight: '700', color: C.amber },
  reviewText: { fontSize: 13, color: C.onSurface, lineHeight: 20 },
  reviewDivider: { height: 1, backgroundColor: C.lightBlue, marginVertical: 10 },

  // ── STICKY FOOTER (Total price in GREEN) ──
  stickyFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: C.lightBlue,
    backgroundColor: C.white,
  },
  footerLeft: {},
  footerLabel: { fontSize: 12, color: C.mutedText, marginBottom: 2 },
  footerPrice: { fontSize: 20, fontWeight: '800', color: C.primary },
  footerBtn: {
    backgroundColor: C.primary,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 32,
  },
  footerBtnText: { fontSize: 15, fontWeight: '700', color: C.white },
});

export default RideDetailsScreen;