# Broscience — Mobile Client

A cross‑platform fitness & nutrition app built with **Expo + React Native + Tamagui**. Track meals, scan food with the camera for AI ingredient/macro analysis, browse recipes, calculate body fat, and get a personalised daily nutrition plan.

> This repository is the mobile client. The Python/FastAPI backend lives in [`server-broscience`](../server-broscience). Both must run together for full functionality.

---

## Features

- **Email/password auth** via Firebase
- **Daily food tracking** stored in Firestore (`user_foods` / `user_plan` / `users`)
- **Camera scan → AI analysis** of meals (calls server `/analyze-image`)
- **Search food** (fuzzy, typo‑tolerant via the server's Meilisearch index)
- **Recipe browser** with filters and pagination (`/search-recipe`)
- **Add food manually**
- **Body‑fat calculator**
- **Personalised nutrition plan** generated on signup (calls server `/nutrition-plan`)
- **Theming** + light/dark mode via Tamagui
- **File‑based routing** with `expo-router` (typed routes enabled)
- **New Architecture (Fabric/TurboModules)** enabled

---

## Tech stack

| Layer | Choice |
|---|---|
| Runtime | Expo SDK 53 (React Native 0.79, React 19) |
| Routing | `expo-router` v5 (file‑based, typed) |
| UI | Tamagui (`@tamagui/*`) |
| Auth & DB | Firebase (Auth + Firestore) — JS SDK |
| HTTP | axios |
| Storage | `@react-native-async-storage/async-storage` |
| Camera / images | `expo-camera`, `expo-image-picker`, `expo-image` |
| Build | EAS Build (`eas.json`) |
| Language | TypeScript |

---

## Project layout

```
.
├── app/                     # expo-router routes
│   ├── _layout.tsx
│   ├── +not-found.tsx
│   ├── login/
│   └── (tabs)/
│       ├── index.tsx        # home / dashboard
│       ├── scan/            # camera-based food scan
│       ├── search-food/
│       ├── add-manualy/
│       ├── recipes/
│       ├── calculate-body-fat/
│       └── settings/
├── components/              # feature-grouped UI (Home, Scan, Recipes, …)
├── contexts/                # User, Theme, Toast, ConfirmationDialog
├── providers/               # Firebase, EnvConfig, StorageService
├── hooks/                   # useColorScheme, useThemeColor
├── helpers/                 # shared helpers
├── types/                   # food.ts, user.ts
├── assets/                  # icons, fonts, images
├── tamagui.config.ts
├── app.json                 # Expo config (slug: broscience)
├── eas.json                 # EAS Build profiles
└── .env.example
```

---

## Prerequisites

- **Node.js 20+** and **npm**
- **Git**
- For native builds: **Xcode** (iOS) and/or **Android Studio** (Android)
- A **Firebase** project (Web app config) — same project the server uses
- The companion **server** running locally or remotely — see [`server-broscience`](../server-broscience)
- Optional: **Expo Go** on your phone for the fastest dev loop, OR an iOS Simulator / Android Emulator

> Some features (camera, native modules in `expo-camera`, etc.) work best with a **dev build** rather than Expo Go. See [Expo dev builds](https://docs.expo.dev/develop/development-builds/introduction/).

---

## Quick start

### 1. Clone and install

```bash
git clone <your-repo-url> expo-broscience
cd expo-broscience
npm install
```

### 2. Configure env

```bash
cp .env.example .env
```

Fill `.env`:

| Variable | What it is |
|---|---|
| `EXPO_PUBLIC_FIREBASE_API_KEY` | Firebase Web SDK config |
| `EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN` | `<your-project>.firebaseapp.com` |
| `EXPO_PUBLIC_FIREBASE_PROJECT_ID` | Firebase project id |
| `EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET` | `<your-project>.appspot.com` |
| `EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | from Firebase config |
| `EXPO_PUBLIC_FIREBASE_APP_ID` | from Firebase config |
| `EXPO_PUBLIC_SERVER_ADDRESS` | URL of the FastAPI server, e.g. `http://192.168.1.42:8000` |

> **Important — `EXPO_PUBLIC_SERVER_ADDRESS`:**
> - iOS Simulator: `http://127.0.0.1:8000` works.
> - Android Emulator: use `http://10.0.2.2:8000`.
> - Real device on the same Wi‑Fi: use your computer's **LAN IP** (e.g. `http://192.168.1.42:8000`) and make sure your firewall allows it.

> **Firebase setup:** in the Firebase console, create a **Web app** (it generates the config above) and enable **Email/Password** in *Authentication → Sign‑in method*. Create the Firestore database in *Build → Firestore Database*. The same project must back the [server](../server-broscience) (the server uses Firebase Admin against this project).

### 3. Make sure the server is running

```bash
cd ../server-broscience
# follow that repo's README — TL;DR:
pipenv install
pipenv run uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

### 4. Start the app

```bash
cd ../expo-broscience
npx expo start
```

From the dev menu in your terminal:

- press `i` — open iOS Simulator
- press `a` — open Android Emulator
- scan the QR with **Expo Go** on a real phone (limited — camera scan works best in a dev build)
- press `w` — open in the browser

Other handy scripts:

```bash
npm run ios       # expo start --ios
npm run android   # expo start --android
npm run web       # expo start --web
npm run lint      # expo lint
npm run reset-project   # archives starter code into app-example/
```

---

## Building

EAS profiles are configured in [`eas.json`](eas.json). Typical flow:

```bash
npm install -g eas-cli
eas login
eas build --platform ios       # or android, or all
```

App identifiers (already set in [`app.json`](app.json)):

- iOS bundle id: `com.haba03.broscience`
- Android package: `com.haba03.broscience`

Change these to your own before building for distribution.

---

## How it talks to the server

| Action in the app | Server endpoint |
|---|---|
| Sign up → onboarding finishes | `POST /nutrition-plan` |
| Scan a meal with the camera | `POST /analyze-image` (sends base64 image) |
| Search for a food | `GET /search-food?input=…` |
| Browse recipes | `GET /search-recipe?input=…&filter=…&pagination=…` |
| Open a recipe | `GET /search-recipe/{recipe_id}` |

User profile, plan, and per‑day food entries live in **Firestore** (collections: `users`, `user_plan`, `user_foods`, `errors`) — written directly from the client via the Firebase JS SDK in [`providers/Firebase.ts`](providers/Firebase.ts).

---

## Troubleshooting

| Symptom | Likely cause |
|---|---|
| Network errors hitting the server from a real device | `EXPO_PUBLIC_SERVER_ADDRESS` is `127.0.0.1` — switch to your LAN IP. |
| Network errors on Android emulator | Use `http://10.0.2.2:8000` instead of `127.0.0.1`. |
| `auth is not defined` / Firebase init errors | Missing `EXPO_PUBLIC_FIREBASE_*` envs, or you didn't restart `expo start` after editing `.env`. |
| Camera scan fails in Expo Go | Build a dev client: `npx expo run:ios` / `npx expo run:android`. |
| Tamagui types complain after upgrade | Delete `.tamagui/` cache and restart Metro. |
| Stale Metro cache | `npx expo start -c` |

---

## License

Private project — all rights reserved unless a license file is added.
