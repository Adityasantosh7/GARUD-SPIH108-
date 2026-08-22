# 🏆 SPORTSPHERE

> **One Platform. Every Sport. Every Athlete.**  
> A unified multi-sport discovery and game coordination platform connecting athletes, teams, and local matches.

---

## 📌 1. The Core Problem

Athletes are scattered across isolated single-sport apps, unorganized chat groups, and closed personal networks. 

Because of this fragmentation, people struggle to:
- Find suitable players nearby at compatible skill levels
- Discover active local games and open pickup matches
- Fill open spots to prevent games from cancelling last-minute
- Coordinate venue, date, and timing without endless messaging
- **Turn their intention to play into an actual game**

**SportSphere** solves this by unifying sports discovery into one platform:
$$\text{Want to Play} \longrightarrow \text{Find Compatible Players & Games} \longrightarrow \text{Join Game} \longrightarrow \text{Actually Play}$$

---

## 💡 2. Primary MVP Flows

### 🔍 Flow A: Find & Join Games
1. **Choose Sport:** Toggle across Cricket, Football, Badminton, Basketball, Swimming, and Chess.
2. **Discover Games:** View live matches with venue, time, skill level, and available spots.
3. **Inspect Game Details:** Review host, confirmed player roster, approximate distance, and match compatibility score.
4. **1-Click Join Game:** Instantly reserves your spot, updates player count (e.g. `3 / 4` $\to$ `4 / 4`), and adds you to the roster with confirmation: *"You're in! You successfully joined this game."*

### ➕ Flow B: Create a Game
1. Click **Create Game** from Navbar or Hero.
2. Fill out sport, game title, venue, date, time, skill level, and player count required.
3. Publish $\to$ Game immediately appears at the top of **Discover Games** and is available for other athletes to join.

---

## ✨ 3. Core Features

- 🏀 **Extensible Multi-Sport Support:** Cricket (🏏), Football (⚽), Badminton (🏸), Basketball (🏀), Swimming (🏊), Chess (♟️).
- ⚡ **Match Compatibility Score:** Simple transparent rating calculating compatibility based on sport interest, skill level, distance, and schedule.
- 👤 **Multi-Sport Athlete Profile:** Clean profile supporting multiple disciplines, skill ratings, location, availability, and real-time joined games tracker.
- 🎯 **Hyper-Local Radius Search:** Filter across city hubs (Gachibowli, Madhapur, Kukatpally, Kondapur, Hitec City, Jubilee Hills, Banjara Hills).
- 💾 **Persistent State:** Fast client-side state using React Context and `localStorage` so created games and joined rosters persist across sessions.

---

## 🛠️ 4. Tech Stack

- **Frontend:** React 18
- **Build Tool:** Vite 6
- **Styling:** Tailwind CSS 3 (Sports-Tech Palette: Deep Navy, Emerald Green, Sports Orange)
- **Icons:** Lucide React
- **State Management:** React Context API + LocalStorage Persistence

---

## 🚀 5. How to Run Locally

```bash
# 1. Clone repository
git clone https://github.com/Adityasantosh7/GARUD-SPIH108-.git
cd GARUD-SPIH108-

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open in browser
http://localhost:3000
```

---

## 🔮 6. Future Expansion Roadmap

- **Phase 2:** Verified Coaches & Certified Training Academy Directory
- **Phase 3:** Real-Time Court & Turf Slot Booking Integrations
- **Phase 4:** Regional League Ladders, Tournaments & Live Score Tracking

---

© SportSphere — One Platform. Every Sport. Every Athlete.
