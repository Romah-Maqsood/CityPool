import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  TouchableOpacity,
  TextInput,
  PanResponder,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon    from 'react-native-vector-icons/MaterialIcons';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';
import IconIon from 'react-native-vector-icons/Ionicons';

// ─── Figma color tokens ───────────────────────────────────────────────────────
const C = {
  onSurface:  '#45464D',
  primary:    '#006A61',
  background: '#F8F9FF',
  dark:       '#0B1C30',
  lightBlue:  '#D3E4FE',
  neutral:    '#C6C6CD',
  white:      '#FFFFFF',
  seaGreen:   '#89F5E7',
};

const PRICE_MIN  = 500;
const PRICE_MAX  = 5000;
const PRICE_STEP = 100;
const THUMB_R    = 9;

// ─── Custom Slider ────────────────────────────────────────────────────────────
const CustomSlider = ({ value, onValueChange, min, max, step }) => {
  const trackWidthRef = useRef(0);

  const valueFromX = useCallback((x) => {
    const clamped = Math.min(Math.max(x, 0), trackWidthRef.current);
    const raw     = (clamped / trackWidthRef.current) * (max - min) + min;
    return Math.round(raw / step) * step;
  }, [min, max, step]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder:  () => true,
      onPanResponderGrant: (evt) => {
        onValueChange(valueFromX(evt.nativeEvent.locationX));
      },
      onPanResponderMove: (evt) => {
        onValueChange(valueFromX(evt.nativeEvent.locationX));
      },
    })
  ).current;

  const ratio = (Math.min(Math.max(value, min), max) - min) / (max - min);

  return (
    <View
      style={sliderSt.wrapper}
      onLayout={e => { trackWidthRef.current = e.nativeEvent.layout.width; }}
      {...panResponder.panHandlers}
    >
      <View style={sliderSt.track} />
      <View
        style={[
          sliderSt.thumb,
          { left: `${ratio * 100}%`, marginLeft: -THUMB_R },
        ]}
      />
    </View>
  );
};

const TRACK_H = 4;
const sliderSt = StyleSheet.create({
  wrapper: {
    height: THUMB_R * 2 + 4,
    marginTop: 14,
    justifyContent: 'center',
    position: 'relative',
  },
  track: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: TRACK_H,
    borderRadius: TRACK_H / 2,
    backgroundColor: C.lightBlue,
    top: '50%',
    marginTop: -(TRACK_H / 2),
  },
  thumb: {
    position: 'absolute',
    width: THUMB_R * 2,
    height: THUMB_R * 2,
    borderRadius: THUMB_R,
    backgroundColor: C.primary,
    top: '50%',
    marginTop: -THUMB_R,
  },
});

// ─── Main Screen ──────────────────────────────────────────────────────────────
const PostRideScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  const [activeNav,         setActiveNav]         = useState('post');
  const [departureCity,     setDepartureCity]     = useState('');
  const [destinationCity,   setDestinationCity]   = useState('');
  const [date,              setDate]              = useState('');
  const [time,              setTime]              = useState('');
  const [seats,             setSeats]             = useState(2);
  const [price,             setPrice]             = useState(1000);
  const [pickupDescription, setPickupDescription] = useState('');

  const handleDecrement = useCallback(() => setSeats(p => Math.max(1, p - 1)), []);
  const handleIncrement = useCallback(() => setSeats(p => Math.min(8, p + 1)), []);

  const handlePostRide = useCallback(() => {
    console.log('Post Ride:', {
      departureCity, destinationCity, date, time,
      seats, price, pickupDescription,
    });
  }, [departureCity, destinationCity, date, time, seats, price, pickupDescription]);

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor={C.background} />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? insets.top : 0}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* ── TOP BAR ── */}
          <View style={styles.topBar}>
            <TouchableOpacity style={styles.topBarBtn}>
              <IconIon name="reorder-three-sharp" size={28} color={C.primary} />
            </TouchableOpacity>
            <Text style={styles.topBarTitle}>CityPool</Text>
            <TouchableOpacity style={styles.topBarBtn}>
              <IconMCI name="bell-outline" size={24} color={C.primary} />
            </TouchableOpacity>
          </View>

          {/* ── PAGE HEADING ── */}
          <Text style={styles.pageTitle}>Post a Ride</Text>
          <Text style={styles.pageSubtitle}>Step 1 of 3: Journey Details</Text>
          <View style={styles.progressRow}>
            <View style={[styles.progressSeg, styles.progressSegActive]} />
            <View style={styles.progressSeg} />
            <View style={styles.progressSeg} />
          </View>

          {/* ── CARD 1: Departure & Destination ── */}
          <View style={styles.card}>
            <Text style={styles.fieldLabel}>Departure City</Text>
            <View style={styles.inputRow}>
              <Icon name="location-on" size={20} color={C.neutral} style={styles.inputIcon} />
              <TextInput
                style={styles.inputField}
                placeholder="Where are you leaving from?"
                placeholderTextColor={C.neutral}
                value={departureCity}
                onChangeText={setDepartureCity}
              />
            </View>

            <View style={styles.divider} />

            <Text style={styles.fieldLabel}>Destination City</Text>
            <View style={styles.inputRow}>
              <Icon name="flag" size={20} color={C.neutral} style={styles.inputIcon} />
              <TextInput
                style={styles.inputField}
                placeholder="Where are you going?"
                placeholderTextColor={C.neutral}
                value={destinationCity}
                onChangeText={setDestinationCity}
              />
            </View>
          </View>

          {/* ── CARD 2: Date & Time ── */}
          <View style={styles.card}>
            <View style={styles.dateTimeRow}>
              <View style={styles.dateTimeHalf}>
                <Text style={styles.fieldLabel}>Date</Text>
                <View style={styles.inputRow}>
                  <IconMCI
                    name="calendar-month-outline"
                    size={20}
                    color={C.neutral}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.inputField}
                    placeholder="dd/mm/yyyy"
                    placeholderTextColor={C.neutral}
                    value={date}
                    onChangeText={setDate}
                    keyboardType="numeric"
                  />
                </View>
              </View>
              <View style={styles.dateTimeHalf}>
                <Text style={styles.fieldLabel}>Time</Text>
                <View style={styles.inputRow}>
                  <IconMCI
                    name="clock-time-four-outline"
                    size={20}
                    color={C.neutral}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.inputField}
                    placeholder="--:-- --"
                    placeholderTextColor={C.neutral}
                    value={time}
                    onChangeText={setTime}
                  />
                </View>
              </View>
            </View>
          </View>

          {/* ── CARD 3: Seats + Price ── */}
          <View style={styles.card}>
            <View style={styles.seatsRow}>
              <View style={styles.seatsLeft}>
                <Text style={styles.fieldLabelBold}>Available Seats</Text>
                <Text style={styles.seatsSubtext}>
                  How many passengers{'\n'}can you take?
                </Text>
              </View>
              <View style={styles.stepperPill}>
                <TouchableOpacity style={styles.stepperCircle} onPress={handleDecrement}>
                  <Icon name="remove" size={18} color={C.dark} />
                </TouchableOpacity>
                <Text style={styles.stepperVal}>{seats}</Text>
                <TouchableOpacity style={styles.stepperCircle} onPress={handleIncrement}>
                  <Icon name="add" size={18} color={C.dark} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.priceRow}>
              <View style={styles.priceLeft}>
                <Text style={styles.fieldLabelBold}>Price per Seat</Text>
                <Text style={styles.priceSuggested}>Suggested: PKR 1,000</Text>
              </View>
              <View style={styles.priceRight}>
                <Text style={styles.priceCurrency}>PKR</Text>
                <Text style={styles.priceAmount}>{price.toLocaleString()}</Text>
              </View>
            </View>

            <CustomSlider
              value={price}
              onValueChange={setPrice}
              min={PRICE_MIN}
              max={PRICE_MAX}
              step={PRICE_STEP}
            />
          </View>

          {/* ── CARD 4: Pickup Description ── */}
          <View style={styles.card}>
            <Text style={styles.fieldLabelBold}>Pickup Point Description</Text>
            <TextInput
              style={styles.textArea}
              placeholder="Example: Near the main gate of Giga Mall, under the flyover."
              placeholderTextColor={C.neutral}
              value={pickupDescription}
              onChangeText={setPickupDescription}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          {/* ── POST BUTTON ── */}
          <TouchableOpacity
            style={styles.postBtn}
            onPress={handlePostRide}
            activeOpacity={0.85}
          >
            <Text style={styles.postBtnText}>Post Ride</Text>
          </TouchableOpacity>

          <View style={{ height: 16 }} />
        </ScrollView>
      </KeyboardAvoidingView>

      {/* ── BOTTOM NAV ── */}
      <View style={[styles.bottomNav, { paddingBottom: insets.bottom || 8 }]}>

        {/* Home */}
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setActiveNav('home')}
          activeOpacity={0.7}
        >
          <Icon
            name="home"
            size={26}
            color={activeNav === 'home' ? C.primary : C.dark}
          />
          <Text style={[
            styles.navLabel,
            activeNav === 'home' && styles.navLabelActive,
          ]}>
            Home
          </Text>
        </TouchableOpacity>

        {/* Rides */}
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setActiveNav('rides')}
          activeOpacity={0.7}
        >
          <IconMCI
            name="car-outline"
            size={26}
            color={activeNav === 'rides' ? C.primary : C.dark}
          />
          <Text style={[
            styles.navLabel,
            activeNav === 'rides' && styles.navLabelActive,
          ]}>
            Rides
          </Text>
        </TouchableOpacity>

        {/* Post — small circle around + only, no background pill */}
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setActiveNav('post')}
          activeOpacity={0.7}
        >
          <View style={[
            styles.postCircle,
            activeNav === 'post' && styles.postCircleActive,
          ]}>
            <Icon
              name="add"
              size={20}
              color={activeNav === 'post' ? C.white : C.dark}
            />
          </View>
          <Text style={[
            styles.navLabel,
            activeNav === 'post' && styles.navLabelActive,
          ]}>
            Post
          </Text>
        </TouchableOpacity>

        {/* Profile */}
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setActiveNav('profile')}
          activeOpacity={0.7}
        >
          <Icon
            name="person"
            size={26}
            color={activeNav === 'profile' ? C.primary : C.dark}
          />
          <Text style={[
            styles.navLabel,
            activeNav === 'profile' && styles.navLabelActive,
          ]}>
            Profile
          </Text>
        </TouchableOpacity>

      </View>
    </View>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root:          { flex: 1, backgroundColor: C.background },
  flex:          { flex: 1 },
  scrollContent: { flexGrow: 1, paddingHorizontal: 16, paddingBottom: 24 },

  // Top bar
  topBar:      { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, marginBottom: 4 },
  topBarBtn:   { padding: 4 },
  topBarTitle: { flex: 1, fontSize: 20, fontWeight: '700', color: C.dark, marginLeft: 10 },

  // Heading
  pageTitle:    { fontSize: 26, fontWeight: '800', color: C.dark, marginBottom: 4 },
  pageSubtitle: { fontSize: 14, color: C.onSurface, marginBottom: 12 },

  // Progress
  progressRow:       { flexDirection: 'row', gap: 6, marginBottom: 20 },
  progressSeg:       { flex: 1, height: 4, borderRadius: 2, backgroundColor: C.lightBlue },
  progressSegActive: { backgroundColor: C.dark },

  // Card
  card: {
    backgroundColor: C.white,
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    ...Platform.select({
      ios:     { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.07, shadowRadius: 6 },
      android: { elevation: 2 },
    }),
  },
  divider: { height: 1, backgroundColor: C.background, marginVertical: 14 },

  // Labels
  fieldLabel:     { fontSize: 13, fontWeight: '600', color: C.onSurface, marginBottom: 8 },
  fieldLabelBold: { fontSize: 14, fontWeight: '700', color: C.dark, marginBottom: 4 },

  // Input
  inputRow: {
    flexDirection: 'row', alignItems: 'center',
    borderWidth: 1, borderColor: C.lightBlue,
    borderRadius: 10, paddingHorizontal: 12,
    height: 48, backgroundColor: C.background,
  },
  inputIcon:  { marginRight: 10 },
  inputField: { flex: 1, fontSize: 14, color: C.onSurface, paddingVertical: 0 },

  // Date-time
  dateTimeRow:  { flexDirection: 'row', gap: 12 },
  dateTimeHalf: { flex: 1 },

  // Seats
  seatsRow:     { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  seatsLeft:    { flex: 1, paddingRight: 12 },
  seatsSubtext: { fontSize: 12, color: C.onSurface, lineHeight: 18, marginTop: 2 },

  // Stepper
  stepperPill: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: C.lightBlue,
    borderRadius: 12, paddingVertical: 8, paddingHorizontal: 10, gap: 10,
  },
  stepperCircle: {
    width: 34, height: 34, borderRadius: 17,
    backgroundColor: C.white,
    justifyContent: 'center', alignItems: 'center',
  },
  stepperVal: {
    fontSize: 18, fontWeight: '700', color: C.dark,
    minWidth: 22, textAlign: 'center',
  },

  // Price
  priceRow:       { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  priceLeft:      { flex: 1 },
  priceSuggested: { fontSize: 12, color: C.primary, marginTop: 2, fontWeight: '500' },
  priceRight:     { flexDirection: 'row', alignItems: 'baseline', gap: 14 },
  priceCurrency:  { fontSize: 13, color: C.neutral, fontWeight: '500' },
  priceAmount:    { fontSize: 20, fontWeight: '800', color: C.dark },

  // Text area
  textArea: {
    borderWidth: 1, borderColor: C.lightBlue,
    borderRadius: 10, padding: 12,
    fontSize: 14, color: C.onSurface,
    backgroundColor: C.background,
    minHeight: 100, marginTop: 8, lineHeight: 22,
  },

  // Post button
  postBtn:     { height: 56, backgroundColor: C.primary, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginTop: 4 },
  postBtnText: { fontSize: 16, fontWeight: '700', color: C.white, letterSpacing: 0.3 },

  // ── BOTTOM NAV ──
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: C.lightBlue,
    backgroundColor: C.white,
  },
  // navItem has NO active background — no sea-green pill ever
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 10,
    gap: 3,
    minWidth: 64,
    minHeight: 52,
  },
  // navLabel default = dark (not grey)
  navLabel:       { fontSize: 11, color: C.dark },
  navLabelActive: { color: C.primary, fontWeight: '600' },

  // Post circle — border only when inactive, filled green when active
  postCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: C.dark,
    justifyContent: 'center',
    alignItems: 'center',
  },
  postCircleActive: {
    backgroundColor: C.primary,
    borderColor: C.primary,
  },
});

export default PostRideScreen;