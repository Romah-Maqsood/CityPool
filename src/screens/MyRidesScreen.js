import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
  Pressable,
  Platform,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';
import IconIon from 'react-native-vector-icons/Ionicons';

const C = {
  white:       '#FFFFFF',
  primary:     '#006A61',
  onSurface:   '#45464D',
  dark:        '#0B1C30',
  mutedText:   '#76777D',
  neutral:     '#C6C6CD',
  background:  '#F1F5F9',
  darkCard:    '#131B2E',
  amber:       '#B87500',
  cnicBg:      '#E0F7F5',
  red:         '#BA1A1A',
  lightBlue:   '#D3E4FE',
  activeGreen: '#86F2E4',
  dateBg:      '#EAF0F6',
  pendingBg:   '#FFF8F0',   // very light peach — barely tinted
  pendingIcon: '#653E00',
};

const { width: SW } = Dimensions.get('window');
const PANEL_W = SW * 0.72;

// ─── Sidebar ──────────────────────────────────────────────────────────────────
const SidePanel = ({ visible, onClose, navigation }) => {
  const insets = useSafeAreaInsets();

  const topItems = [
    { icon: 'history',              label: 'Ride History'  },
    { icon: 'shield-check-outline', label: 'Verification'  },
    { icon: 'credit-card-outline',  label: 'Payments'      },
    { icon: 'cog-outline',          label: 'Settings'      },
  ];

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={pSt.root}>

        {/* ── White panel ── */}
        <View style={[pSt.panel, { paddingTop: insets.top + 16 }]}>

          {/* Logo block */}
          <View style={pSt.logoBlock}>
            <Text style={pSt.logoText}>CityPool</Text>
            <Text style={pSt.tagline}>Smart commuting for everyone</Text>
          </View>

          {/* Dashed top divider */}
          <View style={pSt.dashedLine} />

          {/* Top menu items */}
          <View style={pSt.menuGroup}>
            {topItems.map((item, i) => (
              <TouchableOpacity key={i} style={pSt.menuRow} activeOpacity={0.7}>
                <IconMCI name={item.icon} size={22} color={C.primary} />
                <Text style={pSt.menuLabel}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Dashed bottom divider */}
          <View style={pSt.dashedLine} />

          {/* Help & Support */}
          <TouchableOpacity style={pSt.menuRow} activeOpacity={0.7}>
            <IconMCI name="help-circle-outline" size={22} color={C.dark} />
            <Text style={[pSt.menuLabel, { color: C.dark }]}>Help & Support</Text>
          </TouchableOpacity>

        </View>

        {/* Backdrop */}
        <Pressable style={pSt.backdrop} onPress={onClose} />
      </View>
    </Modal>
  );
};

const pSt = StyleSheet.create({
  root:      { flex: 1, flexDirection: 'row' },
  backdrop:  { flex: 1, backgroundColor: 'rgba(0,0,0,0.35)' },
  panel: {
    width: PANEL_W,
    backgroundColor: C.white,
    ...Platform.select({
      ios:     { shadowColor: '#000', shadowOffset: { width: 2, height: 0 }, shadowOpacity: 0.12, shadowRadius: 8 },
      android: { elevation: 10 },
    }),
  },
  logoBlock: { paddingHorizontal: 24, paddingBottom: 20 },
  logoText:  { fontSize: 22, fontWeight: '800', color: C.primary, marginBottom: 3 },
  tagline:   { fontSize: 13, color: C.onSurface },
  dashedLine: {
    height: 1,
    borderWidth: 1,
    borderColor: '#C8D8E8',
    borderStyle: 'dashed',
    marginHorizontal: 0,
    marginBottom: 6,
  },
  menuGroup: { paddingVertical: 4 },
  menuRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 15, paddingHorizontal: 24, gap: 18,
  },
  menuLabel: { fontSize: 15, color: C.dark, fontWeight: '500' },
});

// ─── My Rides Screen ──────────────────────────────────────────────────────────
const MyRidesScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [activeTab,      setActiveTab]      = useState('Upcoming');
  const [panelOpen,      setPanelOpen]      = useState(false);
  const [activeNav,      setActiveNav]      = useState('rides');
  const [requestStatus,  setRequestStatus]  = useState('pending');

  return (
    <View style={[st.root, { paddingTop: insets.top }]}>

      <SidePanel
        visible={panelOpen}
        onClose={() => setPanelOpen(false)}
        navigation={navigation}
      />

      {/* ── Top Bar ── */}
      <View style={st.topBar}>
        <TouchableOpacity onPress={() => setPanelOpen(true)} style={st.topBarBtn}>
          <IconIon name="reorder-three-sharp" size={28} color={C.primary} />
        </TouchableOpacity>
        <Text style={st.topBarTitle}>CityPool</Text>
        <TouchableOpacity style={st.topBarBtn}>
          <IconMCI name="bell-outline" size={24} color={C.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={st.scroll}
        contentContainerStyle={st.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Page title */}
        <Text style={st.pageTitle}>My Rides</Text>
        <Text style={st.pageSubtitle}>Manage your driving schedule and bookings</Text>

        {/* ── Tabs: full width, each takes 50% ── */}
        <View style={st.tabRow}>
          {['Upcoming', 'History'].map(tab => (
            <TouchableOpacity
              key={tab}
              style={st.tabBtn}
              onPress={() => setActiveTab(tab)}
              activeOpacity={0.8}
            >
              <Text style={[st.tabText, activeTab === tab && st.tabTextActive]}>
                {tab}
              </Text>
              {activeTab === tab && <View style={st.tabUnderline} />}
            </TouchableOpacity>
          ))}
        </View>
        <View style={st.tabDivider} />

        {/* ── Ride Card ── */}
        <View style={st.rideCard}>

          {/* Date row */}
          <View style={st.dateRow}>
            <View style={st.dateLeft}>
              <IconMCI name="calendar-month-outline" size={20} color={C.primary} />
              <Text style={st.dateText}>Tomorrow, Oct 24</Text>
            </View>
            <View style={st.activeBadge}>
              <Text style={st.activeBadgeText}>Active</Text>
            </View>
          </View>

          {/* Route */}
          <View style={st.routeBlock}>
            <View style={st.routeRow}>
              <View style={st.iconCol}>
                <View style={st.dotOutline} />
                <View style={st.routeLine} />
              </View>
              <View style={st.routeInfo}>
                <Text style={st.routeLabel}>DEPARTURE</Text>
                <Text style={st.routePlace}>Gulberg III, Lahore</Text>
              </View>
              <Text style={st.timeGreen}>08:30 AM</Text>
            </View>

            <View style={st.routeRow}>
              <View style={st.iconCol}>
                <View style={st.dotFilled} />
              </View>
              <View style={st.routeInfo}>
                <Text style={st.routeLabel}>ARRIVAL</Text>
                <Text style={st.routePlace}>Blue Area, Islamabad</Text>
              </View>
              <Text style={st.timeGray}>~ 12:45 PM</Text>
            </View>
          </View>

          {/* Divider */}
          <View style={st.innerDivider} />

          {/* Seats & Price */}
          <View style={st.seatsRow}>
            <View style={st.seatsLeft}>
              <IconMCI name="account-multiple-outline" size={20} color={C.primary} />
              <Text style={st.seatsText}>
                <Text style={st.seatsHL}>2/4</Text>{' '}Seats Booked
              </Text>
            </View>
            <View>
              <Text style={st.priceText}>Rs. 1,850</Text>
              <Text style={st.perSeat}>PER SEAT</Text>
            </View>
          </View>

          {/* ── Pending Requests ── */}
          {requestStatus === 'pending' && (
            <View style={st.pendingSection}>
              {/* Section label */}
              <View style={st.pendingHeader}>
                <IconMCI name="clipboard-clock-outline" size={20} color={C.pendingIcon} />
                <Text style={st.pendingTitle}>Pending Requests (1)</Text>
              </View>

              {/* White bordered requester card with avatar + name + buttons inside */}
              <View style={st.requesterCard}>
                <View style={st.requesterTop}>
                  <Image
                    source={require('../assets/images/ahmed-hassan.png')}
                    style={st.avatar}
                    resizeMode="cover"
                  />
                  <View style={st.nameBlock}>
                    <View style={st.nameRow}>
                      <Text style={st.requesterName}>Ahmad Hassan</Text>
                      <View style={st.cnicBadge}>
                        <IconMCI name="shield-check" size={13} color={C.primary} />
                        <Text style={st.cnicText}>CNIC</Text>
                      </View>
                    </View>
                    <View style={st.ratingRow}>
                      <IconMCI name="star" size={13} color={C.amber} />
                      <Text style={st.ratingVal}>4.5</Text>
                      <Text style={st.ratingCount}>(12 Rides)</Text>
                    </View>
                  </View>
                </View>

                {/* Approve / Reject inside the same card */}
                <View style={st.actionRow}>
                  <TouchableOpacity
                    style={st.approveBtn}
                    activeOpacity={0.85}
                    onPress={() => setRequestStatus('approved')}
                  >
                    <Text style={st.approveBtnText}>Approve</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={st.rejectBtn}
                    activeOpacity={0.85}
                    onPress={() => setRequestStatus('rejected')}
                  >
                    <Text style={st.rejectBtnText}>Reject</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}

          {requestStatus === 'approved' && (
            <View style={[st.pendingSection, { backgroundColor: '#DCF5E4' }]}>
              <Text style={[st.feedbackText, { color: C.primary }]}>✓ Ahmad Hassan has been approved!</Text>
            </View>
          )}

          {requestStatus === 'rejected' && (
            <View style={[st.pendingSection, { backgroundColor: '#FDECEA' }]}>
              <Text style={[st.feedbackText, { color: C.red }]}>✗ Request has been rejected.</Text>
            </View>
          )}

        </View>

        {/* Ride Management Console */}
        <TouchableOpacity style={st.consoleBtn} activeOpacity={0.85}>
          <IconMCI name="cog-outline" size={20} color={C.white} style={{ marginRight: 8 }} />
          <Text style={st.consoleBtnText}>Ride Management Console</Text>
        </TouchableOpacity>

        <View style={{ height: 24 }} />
      </ScrollView>

      {/* ── Bottom Nav ── */}
      <View style={[st.bottomNav, { paddingBottom: insets.bottom || 8 }]}>
        <TouchableOpacity
          style={st.navItem}
          onPress={() => { setActiveNav('home'); navigation.navigate('Home'); }}
          activeOpacity={0.7}
        >
          <Icon name="home" size={26} color={activeNav === 'home' ? C.primary : C.dark} />
          <Text style={[st.navLabel, activeNav === 'home' && st.navLabelActive]}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={st.navItem}
          onPress={() => setActiveNav('rides')}
          activeOpacity={0.7}
        >
          <IconMCI name="car-outline" size={26} color={activeNav === 'rides' ? C.primary : C.dark} />
          <Text style={[st.navLabel, activeNav === 'rides' && st.navLabelActive]}>Rides</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={st.navItem}
          onPress={() => { setActiveNav('post'); navigation.navigate('PostRide'); }}
          activeOpacity={0.7}
        >
          <View style={[st.postCircle, activeNav === 'post' && st.postCircleActive]}>
            <Icon name="add" size={20} color={activeNav === 'post' ? C.white : C.dark} />
          </View>
          <Text style={[st.navLabel, activeNav === 'post' && st.navLabelActive]}>Post</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={st.navItem}
          onPress={() => setActiveNav('profile')}
          activeOpacity={0.7}
        >
          <Icon name="person" size={26} color={activeNav === 'profile' ? C.primary : C.dark} />
          <Text style={[st.navLabel, activeNav === 'profile' && st.navLabelActive]}>Profile</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

const st = StyleSheet.create({
  root:          { flex: 1, backgroundColor: C.background },
  scroll:        { flex: 1 },
  scrollContent: { paddingHorizontal: 16, paddingBottom: 24 },

  // Top bar
  topBar: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 14, paddingHorizontal: 16,
    backgroundColor: C.white,
    borderBottomWidth: 1, borderBottomColor: C.lightBlue,
  },
  topBarBtn:   { padding: 4 },
  topBarTitle: { flex: 1, fontSize: 20, fontWeight: '700', color: C.dark, marginLeft: 10 },

  // Page header
  pageTitle:    { fontSize: 26, fontWeight: '800', color: C.dark, marginTop: 20, marginBottom: 2 },
  pageSubtitle: { fontSize: 14, color: C.onSurface, marginBottom: 16 },

  // ── TABS: each tab is flex:1 so they split the full width equally ──
  tabRow: {
    flexDirection: 'row',
  },
  tabBtn: {
    flex: 1,                    // ← key: fills half the row each
    alignItems: 'center',       // text centred within each half
    paddingBottom: 10,
    position: 'relative',
  },
  tabText: {
    fontSize: 15,
    fontWeight: '500',
    color: C.onSurface,
  },
  tabTextActive: {
    color: C.primary,
    fontWeight: '700',
  },
  tabUnderline: {
    position: 'absolute',
    bottom: 0, left: 0, right: 0,
    height: 2.5,
    backgroundColor: C.primary,
    borderRadius: 2,
  },
  tabDivider: {
    height: 1,
    backgroundColor: C.neutral,
    marginBottom: 16,
  },

  // Ride card wrapper
  rideCard: {
    backgroundColor: C.white,
    borderRadius: 14,
    overflow: 'hidden',
    ...Platform.select({
      ios:     { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.07, shadowRadius: 6 },
      android: { elevation: 3 },
    }),
  },

  // Date row — light blue-grey
  dateRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 14,
    backgroundColor: C.dateBg,
  },
  dateLeft:        { flexDirection: 'row', alignItems: 'center' },
  dateText:        { fontSize: 15, fontWeight: '700', color: C.dark, marginLeft: 8 },
  activeBadge:     { backgroundColor: C.activeGreen, paddingHorizontal: 16, paddingVertical: 5, borderRadius: 20 },
  activeBadgeText: { color: C.primary, fontWeight: '700', fontSize: 13 },

  // Route
  routeBlock: { paddingHorizontal: 16, paddingTop: 14, paddingBottom: 10 },
  routeRow:   { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 2 },
  iconCol:    { width: 22, alignItems: 'center', marginRight: 12, paddingTop: 3 },
  dotOutline: { width: 12, height: 12, borderRadius: 6, borderWidth: 2, borderColor: C.primary, backgroundColor: C.white },
  routeLine:  { width: 2, height: 28, backgroundColor: C.neutral, marginTop: 2 },
  dotFilled:  { width: 14, height: 14, borderRadius: 7, backgroundColor: C.primary },
  routeInfo:  { flex: 1 },
  routeLabel: { fontSize: 10, color: C.mutedText, fontWeight: '600', letterSpacing: 0.8, marginBottom: 2 },
  routePlace: { fontSize: 15, fontWeight: '700', color: C.dark },
  timeGreen:  { fontSize: 13, fontWeight: '700', color: C.primary, marginTop: 12 },
  timeGray:   { fontSize: 13, color: C.onSurface, marginTop: 12 },

  innerDivider: { height: 1, backgroundColor: C.lightBlue },

  // Seats row
  seatsRow:  { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 14 },
  seatsLeft: { flexDirection: 'row', alignItems: 'center' },
  seatsText: { fontSize: 15, fontWeight: '600', color: C.dark, marginLeft: 8 },
  seatsHL:   { color: C.primary, fontWeight: '800' },
  priceText: { fontSize: 20, fontWeight: '800', color: C.dark, textAlign: 'right' },
  perSeat:   { fontSize: 10, color: C.mutedText, fontWeight: '600', letterSpacing: 0.6, textAlign: 'right' },

  // ── Pending section — very light peach, barely visible ──
  pendingSection: {
    backgroundColor: C.pendingBg,   // #FFF8F0 — very subtle warm tint
    padding: 16,
  },
  pendingHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  pendingTitle:  { fontSize: 15, fontWeight: '700', color: C.pendingIcon, marginLeft: 8 },

  // ── Requester card — white with border stroke, buttons INSIDE ──
  requesterCard: {
    backgroundColor: C.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E8F0',          // subtle grey stroke
    padding: 14,
    ...Platform.select({
      ios:     { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4 },
      android: { elevation: 1 },
    }),
  },
  requesterTop: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  avatar:       { width: 52, height: 52, borderRadius: 26, marginRight: 12, backgroundColor: C.neutral },
  nameBlock:    { flex: 1 },
  nameRow:      { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 },
  requesterName:{ fontSize: 15, fontWeight: '700', color: C.dark },
  cnicBadge:    { flexDirection: 'row', alignItems: 'center', backgroundColor: C.cnicBg, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6, gap: 3 },
  cnicText:     { fontSize: 11, fontWeight: '700', color: C.primary },
  ratingRow:    { flexDirection: 'row', alignItems: 'center', gap: 4 },
  ratingVal:    { fontSize: 13, fontWeight: '700', color: C.amber, marginLeft: 2 },
  ratingCount:  { fontSize: 12, color: C.mutedText },

  // Buttons inside the card
  actionRow:      { flexDirection: 'row', gap: 12 },
  approveBtn:     { flex: 1, backgroundColor: C.primary, paddingVertical: 13, borderRadius: 10, alignItems: 'center' },
  approveBtnText: { color: C.white, fontWeight: '700', fontSize: 15 },
  rejectBtn:      { flex: 1, backgroundColor: C.white, paddingVertical: 13, borderRadius: 10, alignItems: 'center', borderWidth: 1.5, borderColor: C.red },
  rejectBtnText:  { color: C.red, fontWeight: '700', fontSize: 15 },
  feedbackText:   { fontWeight: '600', textAlign: 'center', paddingVertical: 10, fontSize: 14 },

  // Console button
  consoleBtn:     { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: C.darkCard, marginTop: 20, paddingVertical: 17, borderRadius: 14 },
  consoleBtnText: { color: C.white, fontSize: 16, fontWeight: '700' },

  // Bottom nav
  bottomNav: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingTop: 10, borderTopWidth: 1, borderTopColor: C.lightBlue, backgroundColor: C.white },
  navItem:   { alignItems: 'center', justifyContent: 'center', paddingVertical: 6, paddingHorizontal: 14, borderRadius: 10, gap: 3, minWidth: 64, minHeight: 52 },
  navLabel:       { fontSize: 11, color: C.dark },
  navLabelActive: { color: C.primary, fontWeight: '600' },
  postCircle:       { width: 32, height: 32, borderRadius: 16, borderWidth: 1.5, borderColor: C.dark, justifyContent: 'center', alignItems: 'center' },
  postCircleActive: { backgroundColor: C.primary, borderColor: C.primary },
});

export default MyRidesScreen;