import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Image,
  Modal,
  Pressable,
  Dimensions,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon    from 'react-native-vector-icons/MaterialIcons';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';
import IconIon from 'react-native-vector-icons/Ionicons';

const C = {
  white:      '#FFFFFF',
  primary:    '#006A61',
  onSurface:  '#45464D',
  dark:       '#0B1C30',
  mutedText:  '#76777D',
  neutral:    '#C6C6CD',
  background: '#F8F9FF',
  darkCard:   '#131B2E',
  amber:      '#B87500',
  amberBg:    '#FFF3E0',
  seaGreen:   '#89F5E7',
  cnicBg:     '#E0F7F5',
  red:        '#BA1A1A',
  lightBlue:  '#D3E4FE',
  omarBg:     '#DAE2FD',
  sortText:   '#6B7280',
};

const { width: SW } = Dimensions.get('window');
const PANEL_W = SW * 0.78;

const RIDES = [
  {
    id: '1',
    name: 'Ahmed Khan',
    image: require('../assets/images/ahmed-khan.png'),
    rating: 4.8,
    cnicVerified: true,
    phoneVerified: true,
    car: 'Toyota Corolla',
    color: 'White',
    departure: '09:30 AM',
    arrival: '02:45 PM',
    from: 'Islamabad',
    to: 'Lahore',
    price: 'PKR 1,250',
    seats: '2 seats left',
    badge: null,
    cardBg: C.white,
  },
  {
    id: '2',
    name: 'Zubair Malik',
    image: require('../assets/images/zubair-malik.png'),
    rating: 4.9,
    cnicVerified: true,
    phoneVerified: false,
    car: 'Honda Civic',
    color: 'Silver',
    departure: '11:00 AM',
    arrival: '04:15 PM',
    from: 'Islamabad',
    to: 'Lahore',
    price: 'PKR 1,400',
    seats: '3 seats left',
    badge: null,
    cardBg: C.white,
  },
  {
    id: '3',
    name: 'Omar Farooq',
    image: require('../assets/images/omar-farooq.png'),
    rating: 5.0,
    cnicVerified: true,
    phoneVerified: true,
    car: 'KIA Sportage',
    color: 'Black',
    departure: '12:15 PM',
    arrival: '04:45 PM',
    from: 'Islamabad',
    to: 'Lahore',
    price: 'PKR 1,800',
    seats: '1 seat left',
    badge: 'FASTEST ROUTE',
    cardBg: C.omarBg,
  },
];

const SidePanel = ({ visible, onClose }) => {
  const insets = useSafeAreaInsets();

  const menuTop = [
    { icon: 'history',              label: 'Ride History'  },
    { icon: 'shield-check-outline', label: 'Verification'  },
    { icon: 'credit-card-outline',  label: 'Payments'      },
  ];
  const menuBottom = [
    { icon: 'cog-outline',          label: 'Settings'      },
    { icon: 'help-circle-outline',  label: 'Help & Support'},
  ];

  const MenuItem = ({ icon, label }) => (
    <TouchableOpacity style={panelSt.menuItem} activeOpacity={0.7}>
      <IconMCI name={icon} size={22} color={C.primary} />
      <Text style={panelSt.menuLabel}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={panelSt.overlay}>
        <Pressable style={panelSt.backdrop} onPress={onClose} />
        <View style={[panelSt.panel, { paddingBottom: insets.bottom || 24 }]}>
          <View style={[panelSt.header, { paddingTop: insets.top + 24 }]}>
            <TouchableOpacity onPress={onClose} style={panelSt.closeBtn}>
              <Icon name="close" size={22} color={C.white} />
            </TouchableOpacity>
            <View style={panelSt.headerContent}>
              <View style={panelSt.avatarWrapper}>
                <Image
                  source={require('../assets/images/ahmed-hassan.png')}
                  style={panelSt.avatar}
                  resizeMode="cover"
                />
              </View>
              <View>
                <Text style={panelSt.userName}>Ahmed Hassan</Text>
                <View style={panelSt.verifiedRow}>
                  <IconMCI name="check-decagram" size={15} color={C.seaGreen} />
                  <Text style={panelSt.verifiedText}>Verified Member</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={panelSt.menuSection}>
            {menuTop.map(item => (
              <MenuItem key={item.label} icon={item.icon} label={item.label} />
            ))}
          </View>

          <View style={panelSt.sectionDivider} />

          <View style={panelSt.menuSection}>
            {menuBottom.map(item => (
              <MenuItem key={item.label} icon={item.icon} label={item.label} />
            ))}
          </View>

          <View style={{ flex: 1 }} />

          <View style={panelSt.logoutSection}>
            <View style={panelSt.logoutDivider} />
            <TouchableOpacity style={panelSt.logoutBtn} activeOpacity={0.7}>
              <IconMCI name="logout" size={20} color={C.red} />
              <Text style={panelSt.logoutText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const panelSt = StyleSheet.create({
  overlay:  { flex: 1, flexDirection: 'row' },
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.45)' },
  panel: {
    width: PANEL_W, backgroundColor: C.white,
    position: 'absolute', left: 0, top: 0, bottom: 0,
  },
  header: {
    backgroundColor: C.darkCard,
    paddingHorizontal: 20, paddingBottom: 28,
    position: 'relative',
  },
  closeBtn: { position: 'absolute', top: 16, right: 16, padding: 4, zIndex: 10 },
  headerContent: { flexDirection: 'row', alignItems: 'center', gap: 14, marginTop: 16 },
  avatarWrapper: {
    width: 64, height: 64, borderRadius: 32,
    overflow: 'hidden', borderWidth: 2.5, borderColor: C.seaGreen,
  },
  avatar:       { width: '100%', height: '100%' },
  userName:     { fontSize: 18, fontWeight: '700', color: C.white, marginBottom: 5 },
  verifiedRow:  { flexDirection: 'row', alignItems: 'center', gap: 5 },
  verifiedText: { fontSize: 13, color: C.seaGreen, fontWeight: '500' },
  menuSection:  { paddingVertical: 8, paddingHorizontal: 8 },
  menuItem: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 14, paddingHorizontal: 16,
    gap: 16, borderRadius: 10,
  },
  menuLabel:      { fontSize: 15, color: C.dark, fontWeight: '500' },
  sectionDivider: { height: 1, backgroundColor: C.lightBlue, marginHorizontal: 16, marginVertical: 4 },
  logoutSection:  { paddingBottom: 8 },
  logoutDivider:  { height: 1, backgroundColor: C.lightBlue, marginHorizontal: 16, marginBottom: 8 },
  logoutBtn:      { flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 14, paddingHorizontal: 24 },
  logoutText:     { fontSize: 15, color: C.red, fontWeight: '600' },
});

// ─── CHANGE 1: RideCard now accepts navigation prop ───────────────────────────
const RideCard = ({ ride, navigation }) => (
  <View style={[cardSt.card, { backgroundColor: ride.cardBg }]}>

    {ride.badge && (
      <View style={cardSt.badge}>
        <Text style={cardSt.badgeText}>{ride.badge}</Text>
      </View>
    )}

    <View style={cardSt.topRow}>
      <View style={cardSt.avatarWrapper}>
        <Image source={ride.image} style={cardSt.avatar} resizeMode="cover" />
        <View style={cardSt.verifiedDot}>
          <IconMCI name="check-circle" size={16} color={C.primary} />
        </View>
      </View>

      <View style={cardSt.nameBlock}>
        <View style={cardSt.nameRatingRow}>
          <Text style={cardSt.driverName}>{ride.name}</Text>
          <View style={cardSt.ratingPill}>
            <IconMCI name="star" size={13} color={C.amber} />
            <Text style={cardSt.ratingText}>{ride.rating}</Text>
          </View>
        </View>

        <View style={cardSt.tagsRow}>
          {ride.cnicVerified && (
            <View style={cardSt.cnicTag}>
              <IconMCI name="shield-check" size={11} color={C.primary} />
              <Text style={cardSt.cnicTagText}>CNIC VERIFIED</Text>
            </View>
          )}
          {ride.phoneVerified && (
            <View style={cardSt.phoneTag}>
              <Icon name="phone-android" size={11} color={C.mutedText} />
              <Text style={cardSt.phoneTagText}>PHONE VERIFIED</Text>
            </View>
          )}
        </View>

        <View style={cardSt.carRow}>
          <IconMCI name="car-outline" size={13} color={C.mutedText} />
          <Text style={cardSt.carText}>{ride.car} • {ride.color}</Text>
        </View>
      </View>
    </View>

    <View style={cardSt.timeRow}>
      <View style={cardSt.timeBlock}>
        <Text style={cardSt.time}>{ride.departure}</Text>
        <Text style={cardSt.city}>{ride.from}</Text>
      </View>
      <Icon name="arrow-forward" size={18} color={C.dark} style={cardSt.arrow} />
      <View style={cardSt.timeBlock}>
        <Text style={cardSt.time}>{ride.arrival}</Text>
        <Text style={cardSt.city}>{ride.to}</Text>
      </View>
    </View>

    <View style={cardSt.cardDivider} />

    <View style={cardSt.bottomRow}>
      <View style={cardSt.priceBlock}>
        <Text style={cardSt.price}>{ride.price}</Text>
        <Text style={cardSt.seats}>{ride.seats}</Text>
      </View>
      {/* ── CHANGE 2: onPress navigates to RideDetails ── */}
      <TouchableOpacity
        style={cardSt.bookBtn}
        activeOpacity={0.85}
        onPress={() => navigation.navigate('RideDetails')}
      >
        <Text style={cardSt.bookBtnText}>Book Now</Text>
      </TouchableOpacity>
    </View>

  </View>
);

const cardSt = StyleSheet.create({
  card: {
    borderRadius: 14, padding: 16, marginBottom: 12, position: 'relative',
    ...Platform.select({
      ios:     { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.07, shadowRadius: 6 },
      android: { elevation: 2 },
    }),
  },
  badge: {
    position: 'absolute', top: 0, right: 0,
    backgroundColor: C.primary,
    borderTopRightRadius: 14, borderBottomLeftRadius: 10,
    paddingHorizontal: 10, paddingVertical: 4,
  },
  badgeText:     { fontSize: 10, fontWeight: '700', color: C.white, letterSpacing: 0.5 },
  topRow:        { flexDirection: 'row', marginBottom: 10, gap: 12, alignItems: 'flex-start' },
  avatarWrapper: { width: 52, height: 52, position: 'relative' },
  avatar:        { width: 52, height: 52, borderRadius: 26 },
  verifiedDot: {
    position: 'absolute', bottom: -2, right: -4,
    backgroundColor: C.white, borderRadius: 10, padding: 1,
  },
  nameBlock:     { flex: 1, paddingTop: 2 },
  nameRatingRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 5, flexWrap: 'wrap' },
  driverName:    { fontSize: 15, fontWeight: '700', color: C.dark },
  ratingPill: {
    flexDirection: 'row', alignItems: 'center', gap: 3,
    backgroundColor: C.amberBg, borderRadius: 6,
    paddingHorizontal: 6, paddingVertical: 2,
  },
  ratingText:    { fontSize: 12, fontWeight: '700', color: C.amber },
  tagsRow:       { flexDirection: 'row', gap: 6, flexWrap: 'wrap', marginBottom: 5 },
  cnicTag: {
    flexDirection: 'row', alignItems: 'center', gap: 3,
    backgroundColor: C.cnicBg, borderRadius: 5,
    paddingHorizontal: 6, paddingVertical: 2,
  },
  cnicTagText:   { fontSize: 10, color: C.primary, fontWeight: '700' },
  phoneTag: {
    flexDirection: 'row', alignItems: 'center', gap: 3,
    backgroundColor: C.background, borderRadius: 5,
    paddingHorizontal: 6, paddingVertical: 2,
  },
  phoneTagText:  { fontSize: 10, color: C.mutedText, fontWeight: '600' },
  carRow:        { flexDirection: 'row', alignItems: 'center', gap: 4 },
  carText:       { fontSize: 12, color: C.mutedText },
  timeRow:       { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  timeBlock:     { alignItems: 'flex-start' },
  time:          { fontSize: 20, fontWeight: '800', color: C.dark },
  city:          { fontSize: 11, color: C.mutedText, marginTop: 1 },
  arrow:         { marginHorizontal: 10 },
  cardDivider:   { height: 1, backgroundColor: C.lightBlue, marginBottom: 10, opacity: 0.6 },
  bottomRow:     { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  priceBlock:    { alignItems: 'flex-start' },
  price:         { fontSize: 18, fontWeight: '800', color: C.primary },
  seats:         { fontSize: 11, color: C.mutedText, marginTop: 2 },
  bookBtn:       { backgroundColor: C.primary, borderRadius: 10, paddingVertical: 12, paddingHorizontal: 22 },
  bookBtnText:   { fontSize: 14, fontWeight: '700', color: C.white },
});

const HomeScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  const [activeNav, setActiveNav] = useState('home');
  const [panelOpen, setPanelOpen] = useState(false);
  const [fromCity,  setFromCity]  = useState('');
  const [toCity,    setToCity]    = useState('');
  const [date,      setDate]      = useState('');
  const [seats,     setSeats]     = useState('');
  const [sortBy,    setSortBy]    = useState('earliest');

  const sortOptions = [
    { key: 'earliest',       label: 'Earliest'        },
    { key: 'lowest_price',   label: 'Lowest\nPrice'   },
    { key: 'highest_rating', label: 'Highest\nRating' },
  ];

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor={C.background} />

      <View style={styles.topBar}>
        <TouchableOpacity style={styles.topBarBtn} onPress={() => setPanelOpen(true)}>
          <IconIon name="reorder-three-sharp" size={28} color={C.primary} />
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>CityPool</Text>
        <TouchableOpacity style={styles.topBarBtn}>
          <IconMCI name="bell-outline" size={24} color={C.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.searchCard}>
          <Text style={styles.searchCardTitle}>Find your next ride</Text>

          <View style={styles.formBox}>
            <Text style={styles.formLabel}>From City</Text>
            <View style={styles.formInputRow}>
              <Icon name="location-on" size={18} color={C.neutral} style={styles.formIcon} />
              <TextInput
                style={styles.formInput}
                placeholderTextColor={C.neutral}
                value={fromCity}
                onChangeText={setFromCity}
              />
            </View>

            <Text style={styles.formLabel}>To City</Text>
            <View style={styles.formInputRow}>
              <IconIon name="navigate-outline" size={18} color={C.neutral} style={styles.formIcon} />
              <TextInput
                style={styles.formInput}
                placeholderTextColor={C.neutral}
                value={toCity}
                onChangeText={setToCity}
              />
            </View>

            <Text style={styles.formLabel}>Date</Text>
            <View style={styles.formInputRow}>
              <IconMCI name="calendar-month-outline" size={18} color={C.neutral} style={styles.formIcon} />
              <TextInput
                style={styles.formInput}
                placeholderTextColor={C.neutral}
                value={date}
                onChangeText={setDate}
              />
            </View>

            <Text style={styles.formLabel}>Seats</Text>
            <View style={styles.formInputRow}>
              <Icon name="group" size={18} color={C.neutral} style={styles.formIcon} />
              <TextInput
                style={[styles.formInput, { flex: 1 }]}
                placeholderTextColor={C.neutral}
                value={seats}
                onChangeText={setSeats}
                keyboardType="numeric"
              />
              <Icon name="keyboard-arrow-down" size={22} color={C.neutral} />
            </View>
          </View>

          <TouchableOpacity style={styles.searchBtn} activeOpacity={0.85}>
            <Icon name="search" size={20} color={C.white} />
            <Text style={styles.searchBtnText}>Search</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sortRow}>
          <Text style={styles.sortLabel}>Sort by:</Text>
          {sortOptions.map(opt => (
            <TouchableOpacity
              key={opt.key}
              style={[
                styles.sortChip,
                sortBy === opt.key && styles.sortChipActive,
              ]}
              onPress={() => setSortBy(opt.key)}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.sortChipText,
                  sortBy === opt.key
                    ? styles.sortChipTextActive
                    : styles.sortChipTextInactive,
                ]}
                numberOfLines={2}
              >
                {opt.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ── CHANGE 3: pass navigation into each RideCard ── */}
        {RIDES.map(ride => (
          <RideCard key={ride.id} ride={ride} navigation={navigation} />
        ))}

        <View style={{ height: 16 }} />
      </ScrollView>

      <View style={[styles.bottomNav, { paddingBottom: insets.bottom || 8 }]}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setActiveNav('home')}
          activeOpacity={0.7}
        >
          <Icon name="home" size={26} color={activeNav === 'home' ? C.primary : C.dark} />
          <Text style={[styles.navLabel, activeNav === 'home' && styles.navLabelActive]}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setActiveNav('rides')}
          activeOpacity={0.7}
        >
          <IconMCI name="car-outline" size={26} color={activeNav === 'rides' ? C.primary : C.dark} />
          <Text style={[styles.navLabel, activeNav === 'rides' && styles.navLabelActive]}>Rides</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setActiveNav('post')}
          activeOpacity={0.7}
        >
          <View style={[styles.postCircle, activeNav === 'post' && styles.postCircleActive]}>
            <Icon name="add" size={20} color={activeNav === 'post' ? C.white : C.dark} />
          </View>
          <Text style={[styles.navLabel, activeNav === 'post' && styles.navLabelActive]}>Post</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setActiveNav('profile')}
          activeOpacity={0.7}
        >
          <Icon name="person" size={26} color={activeNav === 'profile' ? C.primary : C.dark} />
          <Text style={[styles.navLabel, activeNav === 'profile' && styles.navLabelActive]}>Profile</Text>
        </TouchableOpacity>
      </View>

      <SidePanel visible={panelOpen} onClose={() => setPanelOpen(false)} />
    </View>
  );
};

const styles = StyleSheet.create({
  root:          { flex: 1, backgroundColor: C.background },
  scrollContent: { flexGrow: 1, paddingHorizontal: 16, paddingBottom: 24 },

  topBar: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 14, paddingHorizontal: 16,
    backgroundColor: C.background,
    borderBottomWidth: 1, borderBottomColor: C.lightBlue,
  },
  topBarBtn:   { padding: 4 },
  topBarTitle: { flex: 1, fontSize: 20, fontWeight: '700', color: C.dark, marginLeft: 10 },

  searchCard: {
    backgroundColor: C.darkCard, borderRadius: 16,
    padding: 16, marginBottom: 20, marginTop: 16,
  },
  searchCardTitle: { fontSize: 22, fontWeight: '800', color: C.white, marginBottom: 14 },
  formBox: { backgroundColor: C.white, borderRadius: 12, padding: 14, marginBottom: 14 },
  formLabel: { fontSize: 12, fontWeight: '600', color: C.onSurface, marginBottom: 4, marginTop: 8 },
  formInputRow: {
    flexDirection: 'row', alignItems: 'center',
    borderWidth: 1, borderColor: C.lightBlue,
    borderRadius: 8, paddingHorizontal: 10,
    height: 40, backgroundColor: C.background, marginBottom: 2,
  },
  formIcon:  { marginRight: 8 },
  formInput: { flex: 1, fontSize: 14, color: C.dark, paddingVertical: 0 },
  searchBtn: {
    flexDirection: 'row', backgroundColor: C.primary,
    borderRadius: 10, height: 46,
    justifyContent: 'center', alignItems: 'center', gap: 8,
  },
  searchBtnText: { fontSize: 15, fontWeight: '700', color: C.white },

  sortRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16, gap: 8 },
  sortLabel: { fontSize: 13, fontWeight: '600', color: C.dark, flexShrink: 0 },
  sortChip: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: C.neutral,
    borderRadius: 50,
    paddingHorizontal: 8, paddingVertical: 7,
    backgroundColor: C.white,
    alignItems: 'center', justifyContent: 'center',
    minHeight: 40,
  },
  // ── CHANGE 4: added borderColor: C.primary for dark green stroke when active ──
  sortChipActive: {
    backgroundColor: C.seaGreen,
    borderColor: C.primary,   // dark green stroke
  },
  sortChipText:         { fontSize: 12, fontWeight: '500', textAlign: 'center' },
  sortChipTextActive:   { color: C.primary, fontWeight: '700' },
  sortChipTextInactive: { color: C.sortText },

  bottomNav: {
    flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center',
    paddingTop: 10, borderTopWidth: 1, borderTopColor: C.lightBlue,
    backgroundColor: C.white,
  },
  navItem: {
    alignItems: 'center', justifyContent: 'center',
    paddingVertical: 6, paddingHorizontal: 14,
    borderRadius: 10, gap: 3, minWidth: 64, minHeight: 52,
  },
  navLabel:         { fontSize: 11, color: C.dark },
  navLabelActive:   { color: C.primary, fontWeight: '600' },
  postCircle: {
    width: 32, height: 32, borderRadius: 16,
    borderWidth: 1.5, borderColor: C.dark,
    justifyContent: 'center', alignItems: 'center',
  },
  postCircleActive: { backgroundColor: C.primary, borderColor: C.primary },
});

export default HomeScreen;