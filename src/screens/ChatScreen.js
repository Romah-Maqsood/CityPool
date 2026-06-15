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

const C = {
  white:          '#FFFFFF',
  primary:        '#006A61',
  dark:           '#0B1C30',
  onSurface:      '#45464D',
  mutedText:      '#9BA3AF',
  background:     '#ECEEF6',
  seaGreen:       '#89F5E7',
  borderLight:    '#E5E7EB',
  // Sent bubble — teal-mint fill
  bubbleSent:     '#89F5E7',
  // Sent text — DARK TEAL GREEN (like reference), NOT black, NOT white
  sentText:       '#1A5C56',
  // Received bubble — white + gray border
  bubbleReceived: '#FFFFFF',
  receivedBorder: '#D8DCE8',
  // Date pill
  datePill:       '#DDE0EE',
  // PIN card — very light grayish-blue fill + soft border
  pinCardBg:      '#F0F2FA',
  pinCardBorder:  '#D0D5E8',
  pinIconBg:      '#006A61',
  // Image bubble border
  imageBorder:    '#89F5E7',
  // Driver verified overlay — dark gray (NOT dark green)
  verifiedOverlayBg: 'rgba(55,60,70,0.82)',
  // Input
  inputBg:        '#ECEEF6',
  sendBtn:        '#006A61',
  onlineGreen:    '#22C55E',
  encryptedText:  '#9BA3AF',
};

const INITIAL_MESSAGES = [
  { id: '1', type: 'date', text: 'Today' },
  {
    id: '2',
    type: 'received',
    text: 'Assalam-o-Alaikum! I have reached the pickup point near the Daewoo terminal. Where exactly are you standing?',
    time: '10:15 AM',
  },
  {
    id: '3',
    type: 'sent',
    text: 'Walaikum Assalam. I am standing right next to the main entrance, wearing a blue jacket.',
    time: '10:16 AM',
    ticks: 'double',
  },
  {
    id: '4',
    type: 'pin',
    pinCode: '4829',
    pinNote: 'Share this PIN only with Ahmed once the ride starts.',
  },
  {
    id: '5',
    type: 'received',
    text: "Got it. I see you now. I'm in a white Honda City, plate number LEA-4562. Pulling over to the side.",
    time: '10:18 AM',
  },
  {
    id: '6',
    type: 'image',
    time: '10:19 AM',
    ticks: 'double',
    verified: true,
  },
];

// ── Date Divider ──────────────────────────────────────────────────────────────
const DateDivider = ({ text }) => (
  <View style={st.dateDividerWrapper}>
    <View style={st.datePill}>
      <Text style={st.datePillText}>{text}</Text>
    </View>
  </View>
);

// ── Received Bubble ───────────────────────────────────────────────────────────
const ReceivedBubble = ({ text, time }) => (
  <View style={st.receivedWrapper}>
    <View style={st.receivedBubble}>
      <Text style={st.receivedText}>{text}</Text>
    </View>
    <Text style={st.timeLeft}>{time}</Text>
  </View>
);

// ── Sent Bubble ───────────────────────────────────────────────────────────────
// Text is DARK TEAL GREEN — matches reference screenshot exactly
const SentBubble = ({ text, time, ticks }) => (
  <View style={st.sentWrapper}>
    <View style={st.sentBubble}>
      <Text style={st.sentText}>{text}</Text>
    </View>
    <View style={st.metaRow}>
      <Text style={st.timeRight}>{time}</Text>
      {ticks === 'double' && (
        <Icon name="done-all" size={15} color={C.primary} style={{ marginLeft: 3 }} />
      )}
    </View>
  </View>
);

// ── PIN Card ──────────────────────────────────────────────────────────────────
// Light grayish-blue bg + soft border + teal shield icon box
const PinCard = ({ pinCode, pinNote }) => (
  <View style={st.pinWrapper}>
    <View style={st.pinCard}>
      <View style={st.pinIconBox}>
        <IconMCI name="shield-check" size={22} color={C.white} />
      </View>
      <View style={st.pinTextCol}>
        <Text style={st.pinTitle}>Ride PIN: {pinCode}</Text>
        <Text style={st.pinNote}>{pinNote}</Text>
      </View>
    </View>
  </View>
);

// ── Image Bubble ──────────────────────────────────────────────────────────────
// Sea-green border + DARK GRAY "Driver verified" badge (not dark green)
const ImageBubble = ({ time, ticks, verified }) => (
  <View style={st.sentWrapper}>
    <View style={st.imageBubble}>
      <Image
        source={require('../assets/images/driver-verified-photo.png')}
        style={st.chatImage}
        resizeMode="cover"
      />
      {verified && (
        <View style={st.verifiedBadge}>
          <IconMCI name="check-decagram" size={15} color={C.seaGreen} />
          <Text style={st.verifiedBadgeText}>Driver verified</Text>
        </View>
      )}
    </View>
    <View style={st.metaRow}>
      <Text style={st.timeRight}>{time}</Text>
      {ticks === 'double' && (
        <Icon name="done-all" size={15} color={C.primary} style={{ marginLeft: 3 }} />
      )}
    </View>
  </View>
);

// ── Main Screen ───────────────────────────────────────────────────────────────
const ChatScreen = ({ navigation }) => {
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
        <TouchableOpacity onPress={() => navigation?.goBack()} style={st.backBtn}>
          <Icon name="arrow-back" size={24} color={C.dark} />
        </TouchableOpacity>
        <View style={st.avatarWrap}>
          <Image
            source={require('../assets/images/ahmed-khan-profile.png')}
            style={st.avatar}
            resizeMode="cover"
          />
          <View style={st.onlineDot} />
        </View>
        <View style={st.nameCol}>
          <Text style={st.headerName}>Ahmed Khan</Text>
          <View style={st.statusRow}>
            <IconMCI name="check-decagram" size={13} color={C.primary} />
            <Text style={st.statusText}>Verified Driver • Online</Text>
          </View>
        </View>
        <TouchableOpacity style={st.actionBtn}>
          <Icon name="phone" size={22} color={C.dark} />
        </TouchableOpacity>
        <TouchableOpacity style={st.actionBtn}>
          <Icon name="more-vert" size={22} color={C.dark} />
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
            case 'date':     return <DateDivider    key={msg.id} text={msg.text} />;
            case 'received': return <ReceivedBubble key={msg.id} text={msg.text} time={msg.time} />;
            case 'sent':     return <SentBubble     key={msg.id} text={msg.text} time={msg.time} ticks={msg.ticks} />;
            case 'pin':      return <PinCard        key={msg.id} pinCode={msg.pinCode} pinNote={msg.pinNote} />;
            case 'image':    return <ImageBubble    key={msg.id} time={msg.time} ticks={msg.ticks} verified={msg.verified} />;
            default:         return null;
          }
        })}
      </ScrollView>

      {/* ── Input Bar ──
           Layout:
             [+]  [ Type your message...        😊 ]  [▶]
             END-TO-END ENCRYPTED • CITYPOOL SECURITY
      */}
      <View style={[st.inputBar, { paddingBottom: insets.bottom || 10 }]}>
        <View style={st.inputRow}>
          {/* Plus */}
          <TouchableOpacity style={st.plusBtn}>
            <Icon name="add-circle-outline" size={28} color={C.mutedText} />
          </TouchableOpacity>

          {/* Input field — emoji icon inside, same height as send button */}
          <View style={st.inputFieldWrap}>
            <TextInput
              style={st.textInput}
              placeholder="Type your message..."
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

          {/* Send */}
          <TouchableOpacity style={st.sendBtn} onPress={handleSend} activeOpacity={0.85}>
            <Icon name="send" size={20} color={C.white} />
          </TouchableOpacity>
        </View>

        {/* Encrypted label — BELOW input row */}
        <Text style={st.encryptedLabel}>END-TO-END ENCRYPTED • CITYPOOL SECURITY</Text>
      </View>
    </KeyboardAvoidingView>
  );
};

// ── Styles ────────────────────────────────────────────────────────────────────
const INPUT_HEIGHT = 50; // shared height for input field and send button

const st = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.background },

  /* Header */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: C.white,
    borderBottomWidth: 1,
    borderBottomColor: C.borderLight,
  },
  backBtn: { padding: 4, marginRight: 6 },
  avatarWrap: { width: 44, height: 44, borderRadius: 22, marginRight: 10, position: 'relative' },
  avatar: { width: 44, height: 44, borderRadius: 22 },
  onlineDot: {
    position: 'absolute', bottom: 1, right: 1,
    width: 11, height: 11, borderRadius: 6,
    backgroundColor: C.onlineGreen,
    borderWidth: 2, borderColor: C.white,
  },
  nameCol: { flex: 1 },
  headerName: { fontSize: 16, fontWeight: '700', color: C.dark, marginBottom: 1 },
  statusRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  statusText: { fontSize: 12, color: C.primary, fontWeight: '500' },
  actionBtn: { padding: 8 },

  /* Message list */
  list: { flex: 1 },
  listContent: { paddingHorizontal: 14, paddingTop: 14, paddingBottom: 10 },

  /* Date divider */
  dateDividerWrapper: { alignItems: 'center', marginVertical: 14 },
  datePill: {
    backgroundColor: C.datePill, borderRadius: 50,
    paddingHorizontal: 16, paddingVertical: 5,
  },
  datePillText: { fontSize: 13, color: C.mutedText, fontWeight: '500' },

  /* Received bubble — white + gray border */
  receivedWrapper: {
    alignSelf: 'flex-start',
    maxWidth: SCREEN_WIDTH * 0.76,
    marginBottom: 12,
  },
  receivedBubble: {
    backgroundColor: C.bubbleReceived,
    borderRadius: 18, borderTopLeftRadius: 4,
    borderWidth: 1, borderColor: C.receivedBorder,
    paddingHorizontal: 14, paddingVertical: 12,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 3 },
      android: { elevation: 1 },
    }),
  },
  receivedText: { fontSize: 15, color: C.dark, lineHeight: 22 },
  timeLeft: { fontSize: 11, color: C.mutedText, marginTop: 4, marginLeft: 4 },

  /* Sent bubble — teal-mint fill, DARK TEAL GREEN text */
  sentWrapper: {
    alignSelf: 'flex-end',
    maxWidth: SCREEN_WIDTH * 0.76,
    marginBottom: 12,
    alignItems: 'flex-end',
  },
  sentBubble: {
    backgroundColor: C.bubbleSent,   // #89F5E7
    borderRadius: 18, borderTopRightRadius: 4,
    paddingHorizontal: 14, paddingVertical: 12,
  },
  sentText: {
    fontSize: 15,
    color: C.sentText,   // #1A5C56 — dark teal green matching reference
    lineHeight: 22,
  },
  metaRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4, marginRight: 2 },
  timeRight: { fontSize: 11, color: C.mutedText },

  /* PIN card — light grayish-blue bg + soft border */
  pinWrapper: {
    alignSelf: 'stretch',          // full width so text never collapses
    marginBottom: 12,
  },
  pinCard: {
    backgroundColor: C.pinCardBg,
    borderRadius: 16,
    borderTopLeftRadius: 4,
    borderWidth: 1.5,
    borderColor: C.pinCardBorder,
    paddingHorizontal: 14,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'flex-start',      // align top so multiline note doesn't push icon
  },
  pinIconBox: {
    width: 46,
    height: 46,
    borderRadius: 10,
    backgroundColor: C.pinIconBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,               // explicit margin instead of gap
    flexShrink: 0,
  },
  pinTextCol: {
    flex: 1,                       // takes all remaining width
    flexShrink: 1,
  },
  pinTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: C.dark,
    marginBottom: 5,
    flexWrap: 'wrap',
  },
  pinNote: {
    fontSize: 13,
    color: C.onSurface,
    lineHeight: 19,
    flexWrap: 'wrap',
  },

  /* Image bubble — sea-green border */
  imageBubble: {
    borderRadius: 16, borderTopRightRadius: 4,
    borderWidth: 2.5, borderColor: C.imageBorder,
    overflow: 'hidden',
    width: SCREEN_WIDTH * 0.60,
    height: 155,
    position: 'relative',
  },
  chatImage: { width: '100%', height: '100%' },
  verifiedBadge: {
    position: 'absolute', bottom: 8, right: 8,
    // DARK GRAY — not dark green
    backgroundColor: C.verifiedOverlayBg,
    borderRadius: 50,
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingHorizontal: 10, paddingVertical: 6,
  },
  verifiedBadgeText: { fontSize: 12, color: C.white, fontWeight: '600' },

  /* Input bar */
  inputBar: {
    backgroundColor: C.white,
    borderTopWidth: 1, borderTopColor: C.borderLight,
    paddingTop: 10, paddingHorizontal: 12,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  plusBtn: { padding: 2 },

  /* Input field — same height as send button (INPUT_HEIGHT) */
  inputFieldWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: C.inputBg,
    borderRadius: INPUT_HEIGHT / 2,   // fully rounded pill
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
  /* Emoji inside the field on the right */
  emojiBtn: { paddingLeft: 6 },

  /* Send button — same height as input field */
  sendBtn: {
    width: INPUT_HEIGHT,
    height: INPUT_HEIGHT,
    borderRadius: INPUT_HEIGHT / 2,
    backgroundColor: C.sendBtn,
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* Encrypted label — below input row */
  encryptedLabel: {
    textAlign: 'center',
    fontSize: 10,
    fontWeight: '500',
    color: C.encryptedText,
    letterSpacing: 0.4,
    marginBottom: 2,
  },
});

export default ChatScreen;