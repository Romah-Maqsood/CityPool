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
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// ─── Color Palette ───────────────────────────────────────────────────────────
const C = {
  dark:         '#0B1C30',
  teal:         '#006A61',
  tealDark:     '#006F66',
  white:        '#FFFFFF',
  offWhite:     '#F8F9FF',
  border:       '#C6C6CD',
  textDark:     '#45464D',
  textGray:     '#76777D',
  greenPlus:    '#1DBF73',
  redMinus:     '#BA1A1A',
  orange:       '#FF9800',
  seaGreen:     '#89F5E7',          // avatar border + wallet icon tint
  iconBgGreen:  'rgba(137,245,231,0.25)', // light sea green bg for wallet icon
  cardBgGreen:  '#E7F7EF',          // easypaisa / ride icon bg
  cardBgOrange: '#FFF4E5',          // jazzcash icon bg
  cardBgBlue:   '#DCE9FF',          // visa / withdrawal icon bg
  cardBgRed:    '#FFDAD6',          // commission icon bg
  lightBlue:    '#D3E4FE',
  divider:      '#E8EDF2',
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const LINKED_ACCOUNTS = [
  { id: '1', name: 'Easypaisa',  number: '0345 •••• 829',        iconName: 'cash-multiple',      iconBg: C.cardBgGreen,  iconColor: C.teal   },
  { id: '2', name: 'JazzCash',   number: '0301 •••• 112',        iconName: 'bank-outline',        iconBg: C.cardBgOrange, iconColor: C.orange },
  { id: '3', name: 'Visa Card',  number: '•••• •••• •••• 4492',  iconName: 'credit-card-outline', iconBg: C.cardBgBlue,   iconColor: '#0066FF'},
];

const TRANSACTIONS = [
  { id: '1', title: 'Lahore to Islamabad Ride', date: 'Oct 24, 2023 • 10:30 AM', amount: '+Rs. 2,400', label: 'Wallet Credit', positive: true,  iconName: 'car-outline',     iconBg: C.cardBgGreen, iconColor: C.teal    },
  { id: '2', title: 'Service Commission',        date: 'Oct 24, 2023 • 10:31 AM', amount: '-Rs. 120',   label: 'Deduction',     positive: false, iconName: 'percent-outline', iconBg: C.cardBgRed,   iconColor: C.redMinus},
  { id: '3', title: 'Withdrawal to Easypaisa',  date: 'Oct 22, 2023 • 08:45 PM', amount: '-Rs. 5,000', label: 'Success',       positive: false, iconName: 'wallet-outline',  iconBg: C.cardBgBlue,  iconColor: '#0066FF' },
  { id: '4', title: 'Multan to Lahore Ride',    date: 'Oct 20, 2023 • 02:15 PM', amount: '+Rs. 1,850', label: 'Wallet Credit', positive: true,  iconName: 'car-outline',     iconBg: C.cardBgGreen, iconColor: C.teal    },
];

// ─── Main Component ───────────────────────────────────────────────────────────
export default function WalletScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [activeNav, setActiveNav] = useState('profile');

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor={C.offWhite} />

      {/* ── Header ── */}
      <View style={styles.header}>
        {/* Hamburger — left */}
        <TouchableOpacity onPress={() => navigation?.goBack?.()}>
          <Icon name="menu" size={26} color={C.textDark} />
        </TouchableOpacity>

        {/* Title — centered absolutely */}
        <Text style={styles.headerTitle}>CityPool</Text>

        {/* Avatar — right */}
        <TouchableOpacity>
          <Image
            source={require('../assets/images/ahmed-khan-profile.png')}
            style={styles.avatar}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Balance Card ── */}
        <View style={styles.balanceCard}>
          <View style={styles.balanceTop}>
            <Text style={styles.balanceLabel}>Current Balance</Text>
            {/* Wallet icon — sea green tint, matching reference */}
            <View style={styles.walletIconCircle}>
              <Icon name="wallet-outline" size={24} color={C.seaGreen} />
            </View>
          </View>
          <Text style={styles.balanceAmount}>Rs. 14,250.00</Text>

          <View style={styles.cardActions}>
            <TouchableOpacity style={styles.addBtn}>
              <Icon name="plus-circle-outline" size={20} color={C.white} />
              <Text style={styles.addBtnText}>Add Funds</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.withdrawBtn}>
              <Icon name="arrow-top-right" size={20} color={C.white} />
              <Text style={styles.withdrawBtnText}>Withdraw</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ── Linked Accounts ── */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Linked Accounts</Text>
          <TouchableOpacity>
            <Text style={styles.manageAll}>Manage All</Text>
          </TouchableOpacity>
        </View>

        {LINKED_ACCOUNTS.map((account, index) => (
          <TouchableOpacity key={account.id} style={styles.accountRow}>
            <View style={[styles.accountIcon, { backgroundColor: account.iconBg }]}>
              <Icon name={account.iconName} size={22} color={account.iconColor} />
            </View>
            <View style={styles.accountInfo}>
              <Text style={styles.accountName}>{account.name}</Text>
              <Text style={styles.accountNumber}>{account.number}</Text>
            </View>
            <Icon name="chevron-right" size={20} color={C.textGray} />
          </TouchableOpacity>
        ))}

        {/* Add New Method */}
        <TouchableOpacity style={styles.addMethodBtn}>
          <Icon name="plus" size={18} color={C.textGray} />
          <Text style={styles.addMethodText}>Add New Method</Text>
        </TouchableOpacity>

        {/* ── Transaction History ── */}
        <View style={[styles.sectionHeader, { marginTop: 20 }]}>
          <Text style={styles.sectionTitle}>Transaction History</Text>
          <View style={styles.filterBtn}>
            <Icon name="filter-variant" size={18} color={C.textDark} />
          </View>
        </View>

        {/* Single card wrapping ALL transactions + View All */}
        <View style={styles.txCard}>
          {TRANSACTIONS.map((tx, index) => (
            <View key={tx.id}>
              <View style={styles.txRow}>
                {/* Circular icon */}
                <View style={[styles.txIconCircle, { backgroundColor: tx.iconBg }]}>
                  <Icon name={tx.iconName} size={18} color={tx.iconColor} />
                </View>
                <View style={styles.txInfo}>
                  <Text style={styles.txTitle}>{tx.title}</Text>
                  <Text style={styles.txDate}>{tx.date}</Text>
                </View>
                <View style={styles.txRight}>
                  <Text style={[styles.txAmount, { color: tx.positive ? C.greenPlus : C.redMinus }]}>
                    {tx.amount}
                  </Text>
                  <Text style={styles.txLabel}>{tx.label}</Text>
                </View>
              </View>
              {/* Divider between rows, not after last */}
              {index < TRANSACTIONS.length - 1 && <View style={styles.txDivider} />}
            </View>
          ))}

          {/* View All — inside the same card */}
          <View style={styles.viewAllDivider} />
          <TouchableOpacity style={styles.viewAllBtn}>
            <Text style={styles.viewAllText}>View All History</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>

      {/* ── Bottom Navigation ── */}
      <View style={[styles.bottomNav, { paddingBottom: insets.bottom || 8 }]}>

        {/* Home */}
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => { setActiveNav('home'); navigation?.navigate?.('Home'); }}
        >
          <Ionicons
            name={activeNav === 'home' ? 'home' : 'home-outline'}
            size={24}
            color={activeNav === 'home' ? C.teal : C.dark}
          />
          <Text style={[styles.navLabel, activeNav === 'home' && styles.navLabelActive]}>Home</Text>
        </TouchableOpacity>

        {/* My Rides */}
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => { setActiveNav('rides'); navigation?.navigate?.('MyRides'); }}
        >
          <Icon
            name="car-outline"
            size={24}
            color={activeNav === 'rides' ? C.teal : C.dark}
          />
          <Text style={[styles.navLabel, activeNav === 'rides' && styles.navLabelActive]}>My Rides</Text>
        </TouchableOpacity>

        {/* Messages */}
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => { setActiveNav('messages'); navigation?.navigate?.('Chat'); }}
        >
          <Icon
            name={activeNav === 'messages' ? 'message-outline' : 'message-outline'}
            size={24}
            color={activeNav === 'messages' ? C.teal : C.dark}
          />
          <Text style={[styles.navLabel, activeNav === 'messages' && styles.navLabelActive]}>Messages</Text>
        </TouchableOpacity>

        {/* Profile — active: sea green pill bg, dark teal icon+text */}
        <TouchableOpacity
          style={[styles.navItem, activeNav === 'profile' && styles.navItemActive]}
          onPress={() => setActiveNav('profile')}
        >
          <Ionicons
            name="person-outline"
            size={24}
            color={activeNav === 'profile' ? C.teal : C.dark}
          />
          <Text style={[styles.navLabel, activeNav === 'profile' && styles.navLabelActive]}>Profile</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: C.offWhite,
  },

  // ── Header ──
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',  // left icon | spacer | right avatar
    paddingHorizontal: 18,
    paddingVertical: 12,
    backgroundColor: C.offWhite,
    position: 'relative',
  },
  headerTitle: {
    // Absolutely centered over the full header width
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
    color: C.teal,
    // pointer-events none so touches fall through to the buttons behind
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 2,
    borderColor: C.seaGreen,   // light sea green stroke as in reference
  },

  // ── Scroll ──
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },

  // ── Balance Card ──
  balanceCard: {
    backgroundColor: C.dark,
    borderRadius: 20,
    padding: 20,
    marginTop: 8,
    marginBottom: 24,
  },
  balanceTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  balanceLabel: {
    color: C.border,
    fontSize: 13,
    fontWeight: '500',
  },
  walletIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: C.iconBgGreen,   // subtle sea-green tinted bg
    alignItems: 'center',
    justifyContent: 'center',
  },
  balanceAmount: {
    color: C.white,
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 20,
    letterSpacing: 0.3,
  },
  cardActions: {
    flexDirection: 'row',
    gap: 12,
  },
  addBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: C.teal,
    borderRadius: 12,
    paddingVertical: 13,
    gap: 8,
  },
  addBtnText: {
    color: C.white,
    fontWeight: '700',
    fontSize: 15,
  },
  withdrawBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    paddingVertical: 13,
    borderWidth: 1.5,
    borderColor: C.white,
    gap: 8,
  },
  withdrawBtnText: {
    color: C.white,
    fontWeight: '700',
    fontSize: 15,
  },

  // ── Section Header ──
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: C.textDark,
  },
  manageAll: {
    color: C.teal,
    fontSize: 14,
    fontWeight: '600',
  },

  // ── Linked Account Rows ──
  accountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: C.white,
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    ...Platform.select({
      ios:     { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4 },
      android: { elevation: 1 },
    }),
  },
  accountIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  accountInfo: { flex: 1 },
  accountName: {
    fontSize: 15,
    fontWeight: '700',
    color: C.textDark,
    marginBottom: 3,
  },
  accountNumber: {
    fontSize: 13,
    color: C.textGray,
  },

  // ── Add Method ──
  addMethodBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: C.border,
    borderStyle: 'dashed',
    paddingVertical: 15,
    gap: 8,
  },
  addMethodText: {
    color: C.textGray,
    fontSize: 15,
    fontWeight: '600',
  },

  // ── Filter ──
  filterBtn: {
    backgroundColor: C.cardBgBlue,
    borderRadius: 8,
    padding: 6,
  },

  // ── Transaction Card (single card wrapping everything) ──
  txCard: {
    backgroundColor: C.white,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingTop: 4,
    paddingBottom: 4,
    ...Platform.select({
      ios:     { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 6 },
      android: { elevation: 2 },
    }),
  },
  txRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },
  txIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,          // ← CIRCLE not square
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  txInfo: { flex: 1 },
  txTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: C.textDark,
    marginBottom: 3,
    flexShrink: 1,
  },
  txDate: {
    fontSize: 11,
    color: C.textGray,
  },
  txRight: {
    alignItems: 'flex-end',
    marginLeft: 8,
  },
  txAmount: {
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 2,
  },
  txLabel: {
    fontSize: 11,
    color: C.textGray,
    textAlign: 'right',
  },
  txDivider: {
    height: 1,
    backgroundColor: C.divider,
    marginHorizontal: 0,
  },
  viewAllDivider: {
    height: 1,
    backgroundColor: C.divider,
  },
  viewAllBtn: {
    alignItems: 'center',
    paddingVertical: 14,
  },
  viewAllText: {
    color: C.teal,
    fontSize: 15,
    fontWeight: '700',
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
  // Active profile pill — sea green background
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