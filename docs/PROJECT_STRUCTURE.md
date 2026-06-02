# CityPool — Project Folder Structure

**Version:** 1.1 · **Aligned with:** PRD v1.0 (18 May 2026)  
**Scope:** React Native mobile app only. The API is built and hosted in a **separate repository**; this app integrates via `src/services/api/` and `src/config/`.

---

## Repository layout (top level)

```
CityPool/
├── android/                 # React Native — Android native project
├── ios/                     # React Native — iOS native project
├── src/                     # React Native — application source (main work area)
├── docs/                    # Team documentation (this file)
├── __tests__/               # Root-level Jest tests (app shell)
├── App.tsx                  # App entry — wires navigation & providers
└── package.json             # Mobile app dependencies
```

**Backend (external):** Node.js + Express + PostgreSQL per PRD §7 — not in this repo. Use environment variables in `src/config/` for the API base URL, WebSocket/chat endpoints, and payment redirect URLs.

---

## Mobile app — `src/`

Feature-first layout: **screens** = UI flows, **components** = reusable UI, **services** = API/network integration, **hooks** = screen logic, **store** = global state, **types** = TypeScript contracts.

### Existing code

| Path | Notes |
|------|--------|
| `src/components/CustomButton.js`, `CustomInput.js`, `Checkbox.js` | Shared UI — consider moving to `components/common/` when refactoring |
| `src/constants/colors.js` | Theme tokens |
| `src/navigation/AppNavigator.js` | Root navigator — split stacks into `navigation/auth`, `driver`, `passenger` |
| `src/screens/SignUpScreen.js` | Auth — target home: `screens/auth/` |

---

### `src/assets/`

Static files only (no business logic).

| Folder | Use for |
|--------|---------|
| `fonts/` | Custom typefaces |
| `images/` | Logos, illustrations, onboarding art |
| `icons/` | Tab bar / feature icons (or SVG imports) |

---

### `src/components/`

Presentational and lightly smart UI, grouped by PRD feature.

| Folder | PRD feature | Examples to add later |
|--------|-------------|------------------------|
| `common/` | Shared | Cards, loaders, modals, empty states |
| `auth/` | §5.11 OTP, registration | OTP input, CNIC upload preview |
| `rides/` | §5.1 Ride posting, §5.3 Search | Ride card, seat stepper, city picker |
| `booking/` | §5.4 Booking & approval | Request status badge, approve/reject actions |
| `chat/` | §5.5 Chat | Message bubble, image picker, broadcast bar |
| `payment/` | §5.8 Payment | Method selector, escrow status |
| `ratings/` | §5.7 Ratings | Star rating, review input |
| `profile/` | §5.7 Trust badges | Verification chips, rating summary |

---

### `src/screens/`

One screen (or small group) per file; map to user journeys in PRD §6.

| Folder | Role | PRD reference |
|--------|------|----------------|
| `auth/` | Register, OTP login, profile setup | Driver & passenger journey — start |
| `driver/` | Post ride, manage requests, start/complete ride | §5.1, §5.4, group chat trigger |
| `passenger/` | Search, ride detail, request seat, route preferences | §5.3, §5.4, route alerts |
| `chat/` | Private chat (per booking), auto group chat | §5.5 |
| `payment/` | Pay after approval, refund/cancellation UI | §5.8 |
| `ratings/` | Post-ride rating (48h window) | §5.7 |
| `profile/` | View/edit profile, verification status | §5.7, §5.11 |
| `notifications/` | In-app notification list (optional) | §5.6 |
| `shared/` | Legal, help, generic errors | Cross-cutting |

**Post-MVP (v1.1+)** — add when scoped: `screens/driver/LiveLocation`, `screens/passenger/SOS` (§4 features 14–15).

---

### `src/navigation/`

React Navigation stacks / tabs; keep `AppNavigator` thin.

| Folder | Contents |
|--------|----------|
| `root/` | App root, auth gate (logged in vs out) |
| `auth/` | Login, OTP, onboarding stack |
| `driver/` | Driver tabs: My Rides, Post, Requests, Profile |
| `passenger/` | Passenger tabs: Search, Bookings, Preferences, Profile |

---

### `src/services/`

All HTTP calls to the **external API**, Firebase/FCM, and local persistence. **No JSX here.**

| Folder | Responsibility |
|--------|----------------|
| `api/` | HTTP client, base URL from config, JWT interceptors |
| `auth/` | OTP send/verify, token refresh |
| `rides/` | List/create/search rides, seat availability |
| `booking/` | Request, approve/reject, cancellation |
| `chat/` | Private + group messages, image upload |
| `payment/` | Easypaisa / JazzCash / card flows via backend |
| `notifications/` | FCM registration, device token sync with API |
| `storage/` | AsyncStorage wrappers, secure token store |

---

### `src/hooks/`

Reusable logic for screens (data fetch, form state, subscriptions).

| Folder | Typical hooks |
|--------|----------------|
| `auth/` | `useAuth`, `useOtp` |
| `rides/` | `useRideSearch`, `usePostRide` |
| `booking/` | `useBookingRequest`, `useSeatAvailability` |
| `chat/` | `useChatMessages`, `useGroupChat` |
| `payment/` | `usePayment`, `useEscrowStatus` |

---

### `src/store/`

Global state (Redux Toolkit, Zustand, or Context — team choice).

| Folder | Slices / domains |
|--------|------------------|
| `slices/` | `auth`, `user`, `activeRide`, `notifications` |
| `selectors/` | Derived data (e.g. remaining seats, unread chat) |

---

### `src/types/`

TypeScript interfaces aligned with **external API** contracts (keep in sync with backend OpenAPI or shared types package if the team adds one later).

| Folder | Models |
|--------|--------|
| `user/` | User, Driver, Passenger, verification flags |
| `auth/` | Session, OTP payload |
| `rides/` | Ride, City, Vehicle, preferences |
| `booking/` | Booking, status enum, cancellation |
| `chat/` | Message, thread, group |
| `payment/` | Payment method, escrow, refund |

---

### `src/utils/`

Pure helpers (no React, no API).

| Folder | Examples |
|--------|----------|
| `validation/` | Ride form rules (§5.1), seat limits 1–6 |
| `formatting/` | PKR currency, dates, city labels (ISB/LHR/PEW) |
| `helpers/` | Deep link builders, error mappers |

---

### `src/config/`

API base URL, feature toggles (MVP vs v1.1), third-party keys (Maps, FCM). Use `.env` + a small config module — never commit secrets.

---

## Full `src/` tree (reference)

```
src/
├── assets/
│   ├── fonts/
│   ├── images/
│   └── icons/
├── components/
│   ├── common/
│   ├── auth/
│   ├── rides/
│   ├── booking/
│   ├── chat/
│   ├── payment/
│   ├── ratings/
│   └── profile/
├── config/
├── constants/
├── hooks/
│   ├── auth/
│   ├── rides/
│   ├── booking/
│   ├── chat/
│   └── payment/
├── navigation/
│   ├── root/
│   ├── auth/
│   ├── driver/
│   └── passenger/
├── screens/
│   ├── auth/
│   ├── driver/
│   ├── passenger/
│   ├── chat/
│   ├── payment/
│   ├── ratings/
│   ├── profile/
│   ├── notifications/
│   └── shared/
├── services/
│   ├── api/
│   ├── auth/
│   ├── rides/
│   ├── booking/
│   ├── chat/
│   ├── payment/
│   ├── notifications/
│   └── storage/
├── store/
│   ├── slices/
│   └── selectors/
├── types/
│   ├── user/
│   ├── auth/
│   ├── rides/
│   ├── booking/
│   ├── chat/
│   └── payment/
└── utils/
    ├── validation/
    ├── formatting/
    └── helpers/
```

Create folders as you add files; Git does not track empty directories.

---

## MVP feature → mobile folders

| # | MVP feature | Where to implement |
|---|-------------|-------------------|
| 1 | Ride posting | `screens/driver/`, `components/rides/`, `services/rides/` |
| 2 | Seat management | `hooks/booking/`, `services/booking/` |
| 3 | Ride search | `screens/passenger/`, `services/rides/` |
| 4 | Booking & approval | `screens/driver/`, `screens/passenger/`, `components/booking/` |
| 5–7 | Chat + auto-delete | `screens/chat/`, `services/chat/` |
| 8 | Push notifications | `services/notifications/` |
| 9 | Route preferences | `screens/passenger/` |
| 10 | Ratings | `screens/ratings/`, `components/ratings/` |
| 11 | CNIC verification | `screens/profile/`, `components/profile/` |
| 12 | Payment | `screens/payment/`, `services/payment/` |
| 13 | Cancellation | `screens/shared/` or booking screens |

---

## Integrating the external backend

| Concern | Mobile location |
|---------|-----------------|
| REST API | `services/api/` + feature modules under `services/*/` |
| Auth (JWT) | `services/auth/`, tokens in `services/storage/` |
| Real-time chat | `services/chat/` (WebSocket or Firebase client per backend choice) |
| Push (FCM) | `services/notifications/` — register token with API |
| Payments | `services/payment/` — call backend; no raw card storage on device |

Coordinate API paths and payloads with the backend team; mirror shapes in `src/types/`.

---

## Conventions for contributors

1. **One feature, one vertical slice** — e.g. booking: `screens/` + `components/booking/` + `services/booking/` + `types/booking/`.
2. **Screens stay thin** — fetch and mutate via `hooks/` and `services/`.
3. **No secrets in repo** — use `.env` (gitignored); document required keys in this file or team wiki.
4. **Naming** — `PascalCase` for screen/component files, `camelCase` for hooks/utils.
5. **New folders** — add when you add code; update this doc if you introduce a new top-level area under `src/`.

---

## Related documents

- Product requirements: CityPool PRD v1.0 (18 May 2026)
- Run app: `npm start` then `npm run android` / `npm run ios`
- Backend API: separate repository (link in team wiki when available)

For structure questions, update this file in the same PR as meaningful layout changes.
