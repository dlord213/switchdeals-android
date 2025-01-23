# Documentation

---

## Root Layout

The main application layout handling navigation, theming, and global configuration. Serves as the root component for Expo Router.

### Key Features

1. **Tab Navigation**

   - Bottom tab bar with 3 main routes
   - Hidden game detail route
   - Custom `TabButton` component with icons

2. **Theme Synchronization**

   - Syncs with system color scheme (light/dark)
   - Updates navigation bar color dynamically
   - Provides theme context to child components

3. **Font Loading**

   - Loads Nunito Sans font family (5 weights)
   - Manages splash screen visibility

4. **Global State Setup**

   - Initializes MMKV storage for wishlists
   - Sets up TanStack Query client

5. **UI Consistency**
   - Dynamic tab bar styling based on theme
   - Status bar color synchronization

### Component Structure

````tsx
<QueryClientProvider>  // Wraps entire app
  ↳ <Tabs>             // Expo Router tab layout
    ↳ <TabSlot/>       // Content area
    ↳ <TabList>        // Bottom tab bar
      ↳ <TabTrigger>   // Individual tab items
  ↳ <StatusBar>        // System status bar
````

---

## Home Screen (Deals List)

The primary screen displaying discounted Nintendo Switch games/bundles with infinite scroll functionality.

### Key Features

1. **Filterable Content**
   - Toggle between `Games` and `Bundles` using `ChipButton` components
   - Real-time API refetch on filter change

2. **Infinite Scroll**
   - Uses TanStack's `useInfiniteQuery` for pagination
   - Automatic fetch on scroll reach (`onEndReachedThreshold: 0.5`)

3. **Responsive Grid Layout**
   - 2-column grid adapting to screen dimensions
   - Consistent aspect ratio for game images

4. **Price Display**
   - Shows current price and strikethrough original price
   - Dynamic text sizing based on screen width

5. **Navigation**
   - Links to game detail screen (`/game/[id]`)
   - Uses Expo Router's `Link` component

### Component Structure

```tsx
<SafeAreaView>       // Main container
  ↳ Header             // "Discounts/Deals" title
  ↳ Filter Chips       // Game/Bundle toggle
  ↳ FlatList           // Grid of game cards
    ↳ Link             // Wraps each game card
      ↳ Pressable        // Touchable game card
        ↳ Image           // Game artwork
        ↳ Text            // Title and pricing
```

---

## Search Screen

A search interface for discovering Nintendo Switch games/bundles with real-time results powered by the SwitchDeals API.

### Key Features

1. **Search Functionality**
   - Dedicated search input with magnifier icon
   - Manual query triggering (press Enter)
   - 2-column grid results layout

2. **Smart Query Handling**
   - Uses TanStack Query with `enabled: false` (manual fetch)
   - 10-minute stale time for cached results
   - Error silent handling

3. **Adaptive Layout**
   - Responsive image sizing based on window dimensions
   - Consistent styling with home screen cards
   - Theme-aware color scheme

4. **Input Enhancements**
   - Custom search icon positioning
   - Dedicated "search" enter key hint
   - Dynamic keyboard appearance based on theme

### Component Structure

```tsx
<SafeAreaView>       // Main container
  ↳ Search Bar         // Icon + TextInput
  ↳ Conditional Render:
     - FlatList        // Grid of results (if data exists)
     - Prompt Text     // "Search some games..." (empty state)
```

---

## Wishlist Screen

Displays user-saved games from local storage using MMKV. Shows empty state when no items are saved.

### Key Features

1. **Local Storage Integration**
   - Directly reads from MMKV `wishlists` key
   - Automatic parsing of stored JSON data
   - No network dependencies

2. **Conditional Rendering**
   - Empty state with custom icon and message
   - 2-column grid layout when items exist
   - Loading indicator during data fetch

3. **Consistent Card Design**
   - Matches home/search screen dimensions
   - Shared image aspect ratio (1:1)
   - Uniform border radius (8px)

4. **Direct Navigation**
   - Links to game details using stored IDs
   - Maintains navigation stack consistency

### Component Structure

```tsx
<SafeAreaView>       // Main container
  ↳ Conditional Render:
     - If wishlists exist:
       ↳ Title ("Wishlists")
       ↳ FlatList    // 2-column grid
         ↳ Link      // Wraps each game card
           ↳ Pressable // Touchable card
             ↳ Image   // Game artwork
             ↳ Text    // Game title
     - Empty state:
       ↳ "Meh" icon
       ↳ "No wishlists..." text
```

---

## Game Details Screen

A dynamic screen displaying detailed information about a video game, including:

- Game description
- Screenshots
- Recommended similar games
- Pricing information
- Wishlist functionality

### Props

- Uses Expo Router's `useLocalSearchParams` to receive:
  - `id`: Game ID (required for data fetching)

### Key Features

1. **Dynamic Content Sections**
   - Switch between tabs: About, Screenshots, Recommendations
   - Uses `ChipButton` component for navigation
   - Displays content based on `index` state

2. **Wishlist Management**
   - Heart icon toggles wishlist status
   - Uses MMKV storage for persistence
   - Syncs with local storage via `wishlists` key

3. **Data Fetching**
   - Uses TanStack Query for cached API requests
   - Fetches game details from SwitchDeals API
   - Stale time: 5 minutes

4. **Responsive Design**
   - Adapts to window dimensions via `useWindowDimensions`
   - Dynamic font sizing based on screen width
   - Theme-aware styling using custom palette

5. **Image Handling**
   - Displays game cover art
   - Gallery-style screenshot display
   - Recommended games carousel

### Component Structure

```tsx
<ScrollView> // Main container
  ↳ <Image>        // Game cover art
  ↳ <View>         // Title and metadata section
  ↳ <AntDesign>    // Wishlist heart icon
  ↳ <ScrollView>   // Tab navigation (ChipButtons)
  ↳ {pages[index]} // Dynamic content section
```
