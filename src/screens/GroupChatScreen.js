import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ─── Colors ───────────────────────────────────────────────────────────────────
const C = {
  white:          '#FFFFFF',
  primary:        '#006A61',
  dark:           '#0B1C30',
  onSurface:      '#45464D',
  mutedText:      '#9BA3AF',
  background:     '#ECEEF6',
  seaGreen:       '#89F5E7',
  borderLight:    '#E5E7EB',
  // Driver bubble — light blue/lavender tint
  bubbleDriver:   '#DDE5FA',
  driverText:     '#0B1C30',
  // Passenger bubble (other riders) — same light tint
  bubblePassenger:'#DDE5FA',
  // Sent bubble — dark teal (user's own)
  bubbleSent:     '#006A61',
  sentText:       '#FFFFFF',
  // Verified banner — sea-green tint, no border
  verifiedBg:     '#CFF5EC',
  verifiedText:   '#006A61',
  // Date pill
  datePill:       '#DDE0EE',
  // Input
  inputBg:        '#ECEEF6',
  sendBtn:        '#006A61',
  onlineGreen:    '#22C55E',
  encryptedText:  '#9BA3AF',
  // Trip info button — blue background, green icon, black text
  tripInfoBg:     '#D3E4FE',
  tripInfoIcon:   '#006A61',
  tripInfoText:   '#0B1C30',
  // Sender label
  senderLabel:    '#6B7280',
};

// ─── Message Data ─────────────────────────────────────────────────────────────
const INITIAL_MESSAGES = [
  { id: '1', type: 'date', text: 'TODAY' },
  {
    id: '2',
    type: 'driver',
    senderName: 'Ahmed (Driver)',
    text: "Assalam-o-Alaikum everyone! I'll be picking you up from Thokar Niaz Baig at 8:00 AM sharp. Please be on time.",
    time: '07:30 AM',
    avatar: 'ahmed-driver-avatar',
  },
  {
    id: '3',
    type: 'verified_banner',
    text: "Ahmed's CNIC and Vehicle documents are verified",
  },
  {
    id: '4',
    type: 'sent',
    senderLabel: 'You',
    text: "Walaikum Assalam! Thanks Ahmed. I'll be there 10 minutes early. Bringing one small suitcase.",
    time: '07:45 AM',
    ticks: 'double',
  },
  {
    id: '5',
    type: 'passenger',
    senderName: 'I atima',
    text: "Great! I'm coming from Johar Town. Hopefully the traffic isn't too bad.",
    time: '07:48 AM',
    avatar: 'fatima-passenger-avatar',
  },
  {
    id: '6',
    type: 'driver_image',
    senderName: 'Ahmed (Driver)',
    avatar: 'ahmed-driver-avatar',
    imageAsset: 'car-white-sportage',
    caption: "This is the car. White Sportage, plate LEA-1234. I'm already at the spot.",
    time: '07:55 AM',
  },
];

// ─── Date Divider ─────────────────────────────────────────────────────────────
const DateDivider = ({ text }) => (
  <View style={st.dateDividerWrapper}>
    <View style={st.datePill}>
      <Text style={st.datePillText}>{text}</Text>
    </View>
  </View>
);

// ─── Verified Banner ──────────────────────────────────────────────────────────
const VerifiedBanner = ({ text }) => (
  <View style={st.verifiedBanner}>
    <IconMCI name="shield-check" size={15} color={C.primary} />
    <Text style={st.verifiedBannerText}>{text}</Text>
  </View>
);

// ─── Driver / Passenger Bubble (left side) ────────────────────────────────────
const LeftBubble = ({ senderName, text, time, avatarKey }) => (
  <View style={st.leftWrapper}>
    {/* Sender name above the row, flush left — aligns with the avatar, not the bubble */}
    {senderName ? <Text style={st.senderName}>{senderName}</Text> : null}
    <View style={st.leftRow}>
      {/* Small avatar bottom-left */}
      <View style={st.leftAvatarWrap}>
        <Image
          source={getAvatar(avatarKey)}
          style={st.leftAvatar}
          resizeMode="cover"
        />
      </View>
      <View style={st.leftBubble}>
        <Text style={st.leftText}>{text}</Text>
        <Text style={st.timeInsideLeft}>{time}</Text>
      </View>
    </View>
  </View>
);

// ─── Sent Bubble (right side, dark teal) ─────────────────────────────────────
const SentBubble = ({ senderLabel, text, time, ticks }) => (
  <View style={st.sentWrapper}>
    {senderLabel ? <Text style={st.youLabel}>{senderLabel}</Text> : null}
    <View style={st.sentBubble}>
      <Text style={st.sentText}>{text}</Text>
      <View style={st.sentMeta}>
        <Text style={st.timeInsideRight}>{time}</Text>
        {ticks === 'double' && (
          <Icon name="done-all" size={14} color="rgba(255,255,255,0.8)" style={{ marginLeft: 3 }} />
        )}
      </View>
    </View>
  </View>
);

// ─── Driver Image Message ─────────────────────────────────────────────────────
const DriverImageMessage = ({ senderName, avatarKey, caption, time }) => (
  <View style={st.leftWrapper}>
    {senderName ? <Text style={st.senderName}>{senderName}</Text> : null}
    <View style={st.leftRow}>
      <View style={st.leftAvatarWrap}>
        <Image
          source={getAvatar(avatarKey)}
          style={st.leftAvatar}
          resizeMode="cover"
        />
      </View>
      {/* Card with image + caption */}
      <View style={st.imageMessageCard}>
        <Image
          source={require('../assets/images/car-white-sportage.png')}
          style={st.carImage}
          resizeMode="cover"
        />
        <View style={st.imageCaption}>
          <Text style={st.captionText}>{caption}</Text>
          <Text style={st.timeInsideLeft}>{time}</Text>
        </View>
      </View>
    </View>
  </View>
);

// ─── Avatar helper ────────────────────────────────────────────────────────────
// Maps string keys to require() calls (can't dynamic-require in RN)
function getAvatar(key) {
  switch (key) {
    case 'ahmed-driver-avatar':
      return require('../assets/images/ahmed-driver-avatar.png');
    case 'fatima-passenger-avatar':
      return require('../assets/images/fatima-passenger-avatar.png');
    default:
      return require('../assets/images/ahmed-driver-avatar.png');
  }
}

// ─── Participant Avatars (header cluster) ─────────────────────────────────────
const ParticipantAvatars = () => (
  <View style={st.participantRow}>
    <Image source={require('../assets/images/ahmed-driver-avatar.png')}   style={[st.participantAvatar, { zIndex: 4, left: 0 }]}   resizeMode="cover" />
    <Image source={require('../assets/images/fatima-passenger-avatar.png')} style={[st.participantAvatar, { zIndex: 3, left: 16 }]}  resizeMode="cover" />
    <Image source={require('../assets/images/passenger2-avatar.png')}     style={[st.participantAvatar, { zIndex: 2, left: 32 }]}  resizeMode="cover" />
    <View style={[st.participantAvatar, st.participantExtra, { zIndex: 1, left: 48 }]}>
      <Text style={st.participantExtraText}>+2</Text>
    </View>
    <Text style={st.participantCount}>  5 participants</Text>
  </View>
);

// ─── Main Screen ──────────────────────────────────────────────────────────────
const GroupChatScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const scrollRef = useRef(null);
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState(INITIAL_MESSAGES);

  const handleSend = () => {
    const trimmed = inputText.trim();
    if (!trimmed) return;
    setMessages(prev => [
      ...prev,
      {
        id: String(Date.now()),
        type: 'sent',
        senderLabel: 'You',
        text: trimmed,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        ticks: 'single',
      },
    ]);
    setInputText('');
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 80);
  };

  return (
    <KeyboardAvoidingView
      style={st.root}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={0}
    >
      <StatusBar barStyle="dark-content" backgroundColor={C.white} />

      {/* ── Header ── */}
      <View style={[st.header, { paddingTop: insets.top }]}>
        {/* Back arrow */}
        <TouchableOpacity onPress={() => navigation?.goBack()} style={st.backBtn}>
          <Icon name="arrow-back" size={24} color={C.dark} />
        </TouchableOpacity>

        {/* Title + participants */}
        <View style={st.headerCenter}>
          <Text style={st.headerTitle}>
            Trip: Lahore to Islamabad Group
          </Text>
          <ParticipantAvatars />
        </View>

        {/* Trip Info button */}
        <TouchableOpacity style={st.tripInfoBtn}>
          <Icon name="info-outline" size={20} color={C.tripInfoIcon} />
          <Text style={st.tripInfoText}>Trip{'\n'}Info</Text>
        </TouchableOpacity>
      </View>

      {/* ── Messages ── */}
      <ScrollView
        ref={scrollRef}
        style={st.list}
        contentContainerStyle={st.listContent}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: false })}
      >
        {messages.map(msg => {
          switch (msg.type) {
            case 'date':
              return <DateDivider key={msg.id} text={msg.text} />;
            case 'verified_banner':
              return <VerifiedBanner key={msg.id} text={msg.text} />;
            case 'driver':
              return (
                <LeftBubble
                  key={msg.id}
                  senderName={msg.senderName}
                  text={msg.text}
                  time={msg.time}
                  avatarKey={msg.avatar}
                />
              );
            case 'passenger':
              return (
                <LeftBubble
                  key={msg.id}
                  senderName={msg.senderName}
                  text={msg.text}
                  time={msg.time}
                  avatarKey={msg.avatar}
                />
              );
            case 'sent':
              return (
                <SentBubble
                  key={msg.id}
                  senderLabel={msg.senderLabel}
                  text={msg.text}
                  time={msg.time}
                  ticks={msg.ticks}
                />
              );
            case 'driver_image':
              return (
                <DriverImageMessage
                  key={msg.id}
                  senderName={msg.senderName}
                  avatarKey={msg.avatar}
                  caption={msg.caption}
                  time={msg.time}
                />
              );
            default:
              return null;
          }
        })}
      </ScrollView>

      {/* ── Input Bar ── */}
      <View style={[st.inputBar, { paddingBottom: insets.bottom || 10 }]}>
        <View style={st.inputRow}>
          <TouchableOpacity style={st.plusBtn}>
            <Icon name="add-circle-outline" size={28} color={C.mutedText} />
          </TouchableOpacity>

          <View style={st.inputFieldWrap}>
            <TextInput
              style={st.textInput}
              placeholder="Type a message..."
              placeholderTextColor={C.mutedText}
              value={inputText}
              onChangeText={setInputText}
              multiline
              returnKeyType="send"
              onSubmitEditing={handleSend}
            />
            <TouchableOpacity style={st.emojiBtn}>
              <Icon name="sentiment-satisfied-alt" size={22} color={C.mutedText} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={st.sendBtn} onPress={handleSend} activeOpacity={0.85}>
            <Icon name="send" size={20} color={C.white} />
          </TouchableOpacity>
        </View>

        <Text style={st.encryptedLabel}>END-TO-END ENCRYPTED • CITYPOOL SECURITY</Text>
      </View>
    </KeyboardAvoidingView>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────
const INPUT_HEIGHT = 50;
const AVATAR_SIZE  = 34;

const st = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.background },

  // ── Header ──
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: C.white,
    borderBottomWidth: 1,
    borderBottomColor: C.borderLight,
  },
  backBtn: { padding: 4, marginRight: 8, alignSelf: 'center' },
  headerCenter: { flex: 1 },
  headerTitle: {
    // No numberOfLines clamp — reference design wraps this to 2 lines
    fontSize: 15,
    fontWeight: '700',
    color: C.dark,
    lineHeight: 19,
    marginBottom: 4,
  },
  // Participant avatar cluster
  participantRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 24,
  },
  participantAvatar: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: C.white,
    position: 'absolute',
  },
  participantExtra: {
    backgroundColor: C.seaGreen,
    alignItems: 'center',
    justifyContent: 'center',
  },
  participantExtraText: {
    fontSize: 9,
    fontWeight: '700',
    color: C.primary,
  },
  participantCount: {
    fontSize: 12,
    color: C.mutedText,
    marginLeft: 80,   // offset past the 4 stacked avatars
  },
  // Trip Info button — icon + 2-line label side by side, inside one pill
  tripInfoBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: C.tripInfoBg,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginLeft: 8,
    gap: 6,
  },
  tripInfoText: {
    fontSize: 11,
    fontWeight: '700',
    color: C.tripInfoText,
    lineHeight: 13,
  },

  // ── Message list ──
  list: { flex: 1 },
  listContent: {
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 12,
  },

  // Date divider
  dateDividerWrapper: { alignItems: 'center', marginVertical: 14 },
  datePill: {
    backgroundColor: C.datePill,
    borderRadius: 50,
    paddingHorizontal: 18,
    paddingVertical: 5,
  },
  datePillText: { fontSize: 12, color: C.mutedText, fontWeight: '600', letterSpacing: 0.5 },

  // Verified banner — solid sea-green pill, no stroke
  verifiedBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: C.verifiedBg,
    borderRadius: 50,
    paddingHorizontal: 14,
    paddingVertical: 7,
    gap: 6,
    marginBottom: 12,
  },
  verifiedBannerText: {
    fontSize: 12,
    color: C.verifiedText,
    fontWeight: '500',
    flexShrink: 1,
  },

  // Left bubble (driver / passenger)
  leftWrapper: {
    alignSelf: 'flex-start',
    maxWidth: SCREEN_WIDTH * 0.78,
    marginBottom: 14,
  },
  senderName: {
    fontSize: 12,
    fontWeight: '600',
    color: C.senderLabel,
    marginBottom: 4,
    // Aligns flush with the avatar's left edge (not the bubble) — matches reference
    marginLeft: 0,
  },
  leftRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
  },
  leftAvatarWrap: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    overflow: 'hidden',
    flexShrink: 0,
  },
  leftAvatar: {
    width: '100%',
    height: '100%',
  },
  leftBubble: {
    backgroundColor: C.bubbleDriver,
    borderRadius: 18,
    borderTopLeftRadius: 4,
    paddingHorizontal: 14,
    paddingVertical: 12,
    // flexShrink (not flex:1) — the row's width is content-based ("shrink to fit"
    // via leftWrapper's alignSelf:'flex-start' + maxWidth), so flex:1 has nothing
    // determinate to grow into and collapses to ~0, wrapping text one letter per line.
    flexShrink: 1,
  },
  leftText: {
    fontSize: 14,
    color: C.driverText,
    lineHeight: 21,
    marginBottom: 6,
  },
  timeInsideLeft: {
    fontSize: 10,
    color: C.mutedText,
    textAlign: 'right',
  },

  // Sent bubble (dark teal, right side)
  sentWrapper: {
    alignSelf: 'flex-end',
    maxWidth: SCREEN_WIDTH * 0.75,
    marginBottom: 14,
    alignItems: 'flex-end',
  },
  youLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: C.senderLabel,
    marginBottom: 4,
  },
  sentBubble: {
    backgroundColor: C.bubbleSent,
    borderRadius: 18,
    borderTopRightRadius: 4,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  sentText: {
    fontSize: 14,
    color: C.sentText,
    lineHeight: 21,
    marginBottom: 6,
  },
  sentMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  timeInsideRight: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.75)',
  },

  // Driver image message card
  imageMessageCard: {
    backgroundColor: C.bubbleDriver,
    borderRadius: 16,
    borderTopLeftRadius: 4,
    overflow: 'hidden',
    flexShrink: 1,
  },
  carImage: {
    width: '100%',
    height: 180,
  },
  imageCaption: {
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  captionText: {
    fontSize: 14,
    color: C.driverText,
    lineHeight: 20,
    marginBottom: 6,
  },

  // ── Input bar ──
  inputBar: {
    backgroundColor: C.white,
    borderTopWidth: 1,
    borderTopColor: C.borderLight,
    paddingTop: 10,
    paddingHorizontal: 12,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  plusBtn: { padding: 2 },
  inputFieldWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: C.inputBg,
    borderRadius: INPUT_HEIGHT / 2,
    height: INPUT_HEIGHT,
    paddingLeft: 18,
    paddingRight: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 15,
    color: C.dark,
    paddingVertical: 0,
  },
  emojiBtn: { paddingLeft: 6 },
  sendBtn: {
    width: INPUT_HEIGHT,
    height: INPUT_HEIGHT,
    borderRadius: INPUT_HEIGHT / 2,
    backgroundColor: C.sendBtn,
    alignItems: 'center',
    justifyContent: 'center',
  },
  encryptedLabel: {
    textAlign: 'center',
    fontSize: 10,
    fontWeight: '500',
    color: C.encryptedText,
    letterSpacing: 0.4,
    marginBottom: 2,
  },
});

export default GroupChatScreen;