# MyTrine — Complete Build Plan

## Overview
MyTrine is a **AI-powered health & fitness companion** for the current generation. Users input their body details, goals, preferences, and budget — and AI generates a complete **90-day transformation plan** with workouts, diet charts, food ordering, daily tracking, and before/after progress vault.

---

## 1. Architecture

```
┌──────────────────────────────────────────────────┐
│                  Next.js 16 App                    │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐  │
│  │ Landing    │  │ Consult-   │  │ Dashboard  │  │
│  │ Page       │  │ ation      │  │ (App)      │  │
│  └────────────┘  └────────────┘  └────────────┘  │
│  ┌──────────────────────────────────────────────┐ │
│  │           API Routes (Next.js)                │ │
│  │  /api/groq       → AI Consultation Questions  │ │
│  │  /api/plan       → Generate 90-day plan       │ │
│  │  /api/track      → Daily tracking updates     │ │
│  │  /api/order      → Food ordering (MCP)        │ │
│  │  /api/analyze    → Body analysis + progress   │ │
│  └──────────────────────────────────────────────┘ │
│  ┌──────────────────────────────────────────────┐ │
│  │         External Integrations                 │ │
│  │  Groq AI  Clerk Auth  MCP (Swiggy/Zomato)    │ │
│  └──────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────┘
```

---

## 2. Data Flow

```
User Inputs (Body details, goals, preferences, budget)
        │
        ▼
  AI Consultation (22+ questions)
        │
        ▼
  Groq AI generates:
  ├── 90-day workout plan (tailored to weight/goal)
  ├── 90-day diet chart (calorie + protein optimized)
  ├── Budget breakdown (daily/weekly/monthly)
  └── Smart food recommendations
        │
        ▼
  Dashboard shows:
  ├── Daily workouts (video/text)
  ├── Daily meals (with order button)
  ├── Tracking (calories, water, weight, sleep)
  ├── Progress photos (before/after vault)
  └── Habit score + streak
        │
        ▼
  MCP Integration → One-tap order on Swiggy/Zomato
```

---

## 3. Feature Breakdown

### Phase 1: AI Consultation (✅ Done — 22 Questions)
- Collects: gender, age, height, weight, goal, health conditions, diet preferences, allergies, lifestyle, sleep, water intake, budget, food ordering preference
- **Upgrade**: Send collected data to Groq LLM to generate actual AI plan (currently hardcoded)

### Phase 2: AI Plan Generator (🔄 In Progress)
- **`/api/plan`**: Takes consultation answers → calls Groq → returns structured 90-day plan
- Response format:
  ```json
  {
    "goal": "weight_loss",
    "duration": "90 days",
    "total_budget": 45000,
    "monthly_budget": 15000,
    "weekly_breakdown": [...],
    "workout_plan": {
      "phase_1": { "weeks": "1-4", "focus": "Foundation", "exercises": [...] },
      "phase_2": { "weeks": "5-8", "focus": "Progression", "exercises": [...] },
      "phase_3": { "weeks": "9-12", "focus": "Peak", "exercises": [...] }
    },
    "diet_plan": {
      "daily_calories": 1800,
      "protein_target": "128g",
      "meal_plan": { "breakfast": ..., "lunch": ..., "dinner": ..., "snacks": ... }
    }
  }
  ```

### Phase 3: Dashboard App (🔄 In Progress)
- **Route**: `/app`
- **Sections**:
  - `Today's Plan` — workout + meals for today
  - `Tracking` — calories, water, weight, sleep, steps
  - `Progress` — habit score, streak, weekly trends
  - `Food Order` — AI recommended meals → Swiggy/Zomato via MCP
  - `Before/After Vault` — photo upload + timeline view

### Phase 4: MCP Food Ordering (📋 Planned)
- **Concept**: When AI recommends a meal, show a "Order on Swiggy" / "Order on Zomato" button
- **MCP Integration**: Use Model Context Protocol to connect with Swiggy/Zomato APIs
  - Search for meal items near user's location
  - Add to cart with dietary filters
  - Place order with budget check
- **Fallback**: Show restaurant suggestions + manual order flow

### Phase 5: Before/After Vault (📋 Planned)
- Users upload progress photos every 15 days
- Side-by-side comparison view
- Body measurement tracking (chest, waist, arms, thighs)
- AI analyzes visual progress + gives feedback

### Phase 6: Budget Calculator (📋 Planned)
- Input: monthly budget for food + supplements
- AI allocates budget across meals per day
- Tracks actual spend vs planned
- Alerts when overspending

---

## 4. Routes Map

| Route | Component | Description |
|---|---|---|
| `/` | LandingClient | Marketing + CTA |
| `/consultation` | ConsultationClient | AI question flow |
| `/app` | AppDashboard | Main app (auth protected) |
| `/app/today` | TodayPlan | Daily workout + meals |
| `/app/track` | TrackingPage | Log calories, water, weight |
| `/app/food` | FoodOrdering | Meal recommendations + order |
| `/app/progress` | ProgressPage | Charts, photos, vault |
| `/app/settings` | SettingsPage | Goals, preferences, budget |
| `/sign-in` | Clerk SignIn | Auth |
| `/sign-up` | Clerk SignUp | Register |

---

## 5. Database Schema (localStorage → Future DB)

```
UserProfile: {
  id, name, email, age, gender, height, weight, goal,
  health_conditions, diet_preference, allergies, lifestyle,
  sleep_hours, water_intake, monthly_budget, food_order_platform
}

DailyLog: {
  date, calories_consumed, calories_burned, water_intake,
  weight, sleep_hours, workout_done, meals_logged[]
}

ProgressPhoto: {
  date, image_url, body_measurements{chest,waist,arms,thighs}
}

MealOrder: {
  date, meal_name, platform, cost, calories, protein
}
```

---

## 6. AI Prompt Engineering

### System Prompt for Plan Generation:
```
You are MyTrine AI — a health and fitness coach for young Indians.
Given a user's body details, goals, and budget, generate:

1. A 90-day progressive workout plan (home/gym based)
2. A complete diet chart with Indian food options
3. Daily calorie + protein targets
4. Monthly budget breakdown (food + supplements)
5. Smart food recommendations that can be ordered online

Rules:
- Use local Indian foods (idli, chapati, dal, rice, etc.)
- Match budget constraints
- Consider vegetarian/non-veg preference
- Account for health conditions (diabetes, PCOD, etc.)
- Make it practical for a lazy/sedentary person starting out
```

---

## 7. Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Auth | Clerk |
| AI | Groq SDK (Llama/Mixtral) |
| State | React useState + localStorage |
| Food Ordering | MCP Protocol (Swiggy/Zomato) |
| Deployment | Vercel |

---

## 8. Timeline

| Phase | Duration | Status |
|---|---|---|
| Phase 1: AI Consultation | ✅ Complete | 22 questions flow done |
| Phase 2: AI Plan Generator | 1 week | Needs Groq integration |
| Phase 3: Dashboard App | 2 weeks | Build main app routes |
| Phase 4: MCP Food Ordering | 2 weeks | Research + integrate |
| Phase 5: Before/After Vault | 1 week | Photo upload + comparison |
| Phase 6: Budget Calculator | 3 days | Track spend vs plan |
| **Launch** | **~6 weeks** | MVP ready |

---

## 9. Landing Page Sections (Final Layout)

| # | Section | Source |
|---|---|---|---|
| 1 | Hero — Goal selector tabs (Fat Loss, Muscle Gain, Maintenance, Yoga) | **Calo inspired** |
| 2 | Stats Counter — "12K+ users, 45K+ meals, 28K+ kg lost, 1.2L+ AI suggestions" | Calo |
| 3 | How It Works — 5-step process with progress bar | Original |
| 4 | AI Body Scan — 22 questions in 3 steps, BMR/TDEE/Protein/Budget display | New |
| 5 | Features Grid — 8 powerful features in 4 columns | Enhanced |
| 6 | AI Coach Riya — Chat interface, food snap tracking, weekly insights | **HealthifyMe inspired** |
| 7 | More Than Tracking — LEARN/ACT/ASK 3-column layout | **HealthifyMe inspired** |
| 8 | Meal Plan Categories — 6 plan types with macro % (Fat Loss, Muscle Gain, Balanced, Vegan, Low Carb, Custom) | Calo |
| 9 | Total Control / Full Flexibility — 3-column (Calories, Swap, Pause) | **Calo inspired** |
| 10 | Daily Command Center — Dashboard cards with AI engine details | Original |
| 11 | 90-Day Journey — 3 phases (Foundation / Progression / Peak) | New |
| 12 | Mindset & Habit Tracking — Psychology-based approach, no-guilt reset | **Noom inspired** |
| 11 | Smart Food Ordering — MCP flow with Swiggy/Zomato integration | Enhanced |
| 12 | Fresh Indian Meals — 6 food image cards with prices | Calo |
| 13 | Real Progress — 3 transformation stories with images | Original |
| 14 | Before & After Vault — Real images, photo comparison, measurements, AI feedback | Enhanced |
| 15 | App Screenshots Gallery — 4 phone mockups (Consultation, Workouts, Food, Progress) | Calo |
| 16 | Community Section — 5 user photos with social handles grid | **Calo inspired** |
| 17 | App Download — QR code + App Store/Play Store buttons | **Calo inspired** |
| 18 | Why MyTrine — Comparison table vs other apps | **New** |
| 19 | Pricing — 3 tiers (Starter, Transformation, Coach Plus) | Original |
| 20 | FAQ — 7 expandable questions | Calo |
| 21 | Footer — Brand + CTA | Enhanced |
| — | **WhatsApp/Chat Button** — Fixed floating CTA (bottom right) | **HealthifyMe inspired** |

## 10. Key Design Patterns from Reference Apps

### From Calo.app

### Stats Counter Bar
Large numbers showing social proof. Positioned right after hero. Creates trust instantly.

### Meal Plan Categories
Each plan card shows:
- Plan name + badge (Popular / Best Value / etc.)
- Macro split (Protein / Carbs / Fat as %)
- Short description with emoji indicators
- Hover effect with border highlight

### Food Image Gallery
Grid of meal images with name + price overlay. "80+ meals updated weekly" headline. Creates craving and desire.

### App Screenshots
Phone mockup cards showing actual app screens. Each card has:
- Mini phone screen with UI details
- Feature name + short description below
- Hover lift effect

### Testimonial / Results Section
User photos + name + specific result (kg lost/gained) + short story + star rating.

### FAQ with Details/Summary
Expandable accordion style. Plus icon rotates on open. Clean border styling.

---

### From HealthifyMe

### AI Coach (Ria)
- Named AI coach ("Riya") with personality — not a generic chatbot
- Chat interface showing conversation bubbles
- Quick response time mention ("under 2 seconds")
- Features: ask anything, food snap tracking, weekly insights
- Coach has avatar/icon, online status indicator

### Food Snap Tracking
- "Snap a photo of your meal" — AI identifies food items
- No manual calorie logging needed
- Instant nutritional breakdown

### Feature Grid with Emojis
- Each feature uses emoji icon + title + short description
- Clean card layout with hover effects

### WhatsApp / Chat Integration
- "Chat with us" floating button
- Direct connection to support

---

### From Noom

### Psychology-Based Approach
- Focus on "why" not just "what" — habit psychology
- Color-coded food system (green / yellow / orange)
- Daily lessons and readings about behavior change

### Habit Tracking
- Track core habits daily (not just workouts)
- Streak building and rewards
- No-guilt approach to missed days

### Goal Breakdown
- Big goal (90 days) → weekly micro-goals
- Every small win celebrated
- Weekly reflections and adjustments

### Clean, Simple UI
- High contrast, bright colors
- Large typography for readability
- Minimalist card-based layouts

---

### Shared Patterns Across All Three Apps

### Social Proof Stats Bar
All three apps prominently display user statistics near the top of the page (users, meals delivered, kg lost, etc.)

### 3-Step "How It Works"
Calo, Noom, and HealthifyMe all use a 3-step explanation of how their product works — simple, visual, easy to scan.

### Before/After Photos with Specific Results
Real user photos with exact numbers (kg lost, time period). Creates trust and aspirational motivation.

### Testimonial Carousel
User quotes with photo, name, and specific result. Often scrollable/multi-item.

### FAQ Section
Expandable accordion format with common objections addressed. Calo has 9 questions, HealthifyMe has detailed support.

### App Store / QR Download
All three promote app download with QR code or direct store links in the footer.

### Multiple CTAs Per Page
Every section has at least one CTA button. Primary CTA (Start/Get Started/Sign Up) appears 5-7 times per page.

### Indian-Specific Adaptations (HealthifyMe)
- Indian food names (dosa, idli, biryani, thali)
- Indian body type considerations
- Rupee pricing
- Support for Indian languages
- WhatsApp integration (most popular messaging in India)

---

## 11. Key Differentiators

1. **India-first**: Indian foods, body types, budget constraints
2. **Zero gym required**: Home workouts for lazy beginners
3. **One-tap food order**: AI meal plan → directly order on Swiggy/Zomato via MCP
4. **Complete budget control**: Know exactly how much 90 days will cost
5. **Before/After vault**: Visual progress keeps motivation high
6. **AI coach that adapts**: Plan updates based on your tracking data
7. **No cooking required**: Order meals directly from Swiggy/Zomato
8. **Macro-based meal categories**: Fat Loss, Muscle Gain, Balanced, Vegan, Low Carb, Custom
