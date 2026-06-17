export type Feature = {
  title: string;
  slug: string;
  summary: string;
  details: [string, string][];
  icon: string;
  deepDive: {
    title: string;
    body: string;
  }[];
  workflow: string[];
  outcome: string;
};

export const features: Feature[] = [
  {
    title: "AI Body Scan",
    slug: "ai-body-scan",
    summary:
      "The consultation starts with 22 guided questions. MyTrine understands your body type, age, height, weight, gender, lifestyle, health conditions, food habits, budget, and fitness goal before creating any plan.",
    details: [
      ["Body goal detection", "AI identifies whether your main focus is fat loss, muscle gain, maintenance, or general fitness."],
      ["Health and lifestyle mapping", "Your sleep, activity level, food habits, medical conditions, and routine are considered before planning."],
      ["Beginner-friendly onboarding", "Questions are simple and guided, so even first-time fitness users can complete it confidently."],
    ],
    icon: "AI",
    deepDive: [
      {
        title: "What it collects",
        body: "MyTrine asks about age, gender, height, weight, body goal, food preference, activity level, medical conditions, budget, sleep, water intake, and workout access. This helps the AI understand the full person, not just one number on the scale.",
      },
      {
        title: "How AI uses it",
        body: "The answers are used to estimate calorie needs, protein target, risk areas, workout difficulty, food style, and consistency level. This avoids generic plans and makes the first plan feel realistic.",
      },
      {
        title: "Why it matters",
        body: "Most people fail because the plan does not match their life. The body scan makes the plan match your routine, budget, food habits, and current fitness level from day one.",
      },
    ],
    workflow: ["Answer guided questions", "AI analyzes lifestyle and goal", "Plan difficulty is selected", "Diet and workout targets are generated"],
    outcome: "You get a plan that starts from your real condition instead of a random fitness template.",
  },
  {
    title: "AI Diet Planner",
    slug: "ai-diet-planner",
    summary:
      "Your diet plan is not random. The AI builds meals around your calorie target, protein needs, Indian food preferences, allergies, cooking ability, and daily food budget.",
    details: [
      ["Indian meal options", "Meals are built around familiar foods like rice, chapati, dosa, idli, paneer, eggs, dal, and regional choices."],
      ["Protein and calorie targets", "The plan balances calories, protein, carbs, and fats based on your body goal."],
      ["Budget-aware food choices", "Food suggestions change based on how much you can spend daily or monthly."],
    ],
    icon: "AI",
    deepDive: [
      {
        title: "Personalized meals",
        body: "The planner chooses breakfast, lunch, snacks, and dinner based on your goal. It can support fat loss, muscle gain, maintenance, vegetarian preferences, non-veg meals, and simple home food.",
      },
      {
        title: "Macro balance",
        body: "Calories and protein are prioritized first because they directly affect transformation. Carbs and fats are adjusted around your food habits so the diet does not feel impossible.",
      },
      {
        title: "Practical substitutions",
        body: "If one meal is not possible, the plan can suggest swaps with similar calories and protein. This keeps you consistent even on busy days.",
      },
    ],
    workflow: ["Set calorie target", "Choose preferred foods", "Build daily meals", "Adjust with swaps"],
    outcome: "You know what to eat every day without guessing calories or copying a generic diet chart.",
  },
  {
    title: "AI Workout Planner",
    slug: "ai-workout-planner",
    summary:
      "MyTrine creates workouts that match your current fitness level. Whether you train at home, gym, or with no equipment, the plan stays realistic and progressive.",
    details: [
      ["Home and gym routines", "You can choose bodyweight, dumbbell, gym, walking, yoga, or hybrid workout modes."],
      ["Strength-level matching", "Workout difficulty starts from your current ability and slowly increases over time."],
      ["Rest day planning", "Recovery days are included so your body can improve without burnout or injury."],
    ],
    icon: "TR",
    deepDive: [
      {
        title: "Workout type selection",
        body: "The AI checks whether you can train at home, in a gym, with dumbbells, or with no equipment. Then it builds a plan that fits your available setup.",
      },
      {
        title: "Progressive overload",
        body: "Instead of doing the same workout forever, the plan slowly increases reps, sets, time, or intensity so your body keeps improving.",
      },
      {
        title: "Recovery built in",
        body: "Rest days and lighter days are included because recovery is where the body adapts. This helps avoid soreness, burnout, and quitting early.",
      },
    ],
    workflow: ["Select training place", "Choose fitness level", "Generate weekly routine", "Progress every week"],
    outcome: "You get workouts that feel doable now and become more challenging as your fitness improves.",
  },
  {
    title: "Smart Food Ordering",
    slug: "smart-food-ordering",
    summary:
      "When you do not want to cook, MyTrine helps you choose healthier meals from Swiggy or Zomato. The AI suggests meals that match your diet goal instead of breaking your plan.",
    details: [
      ["One-tap meal suggestions", "AI suggests meals you can order quickly when cooking is not possible."],
      ["Goal-friendly ordering", "Suggested foods are matched to your calorie and protein target instead of random cravings."],
      ["Restaurant food control", "You can still eat outside while keeping your transformation plan under control."],
    ],
    icon: "FD",
    deepDive: [
      {
        title: "Why ordering matters",
        body: "Many users break their diet when they order food. MyTrine turns ordering into a controlled decision by suggesting better choices that still fit your goal.",
      },
      {
        title: "How it chooses meals",
        body: "The AI looks for meals that are higher in protein, reasonable in calories, and closer to your daily plan. It helps avoid hidden calorie traps.",
      },
      {
        title: "Real-life use",
        body: "On busy days, you can still stay on track by choosing from suggested meal options instead of skipping diet or ordering randomly.",
      },
    ],
    workflow: ["Open meal suggestion", "Pick a goal-friendly option", "Order from food app", "Track it in your plan"],
    outcome: "You can eat outside without completely losing control of your transformation.",
  },
  {
    title: "Daily Tracking",
    slug: "daily-tracking",
    summary:
      "Track calories, water, workouts, sleep, weight, and habits in one place. Your daily logs help the AI understand what is working and what needs adjustment.",
    details: [
      ["Calories and water", "Daily food and water logs show whether you are hitting your basic health targets."],
      ["Workout consistency", "The app tracks completed workouts, skipped days, and weekly discipline."],
      ["Sleep and habit score", "Sleep, routine, and habits are converted into simple progress signals."],
    ],
    icon: "PL",
    deepDive: [
      {
        title: "What you track",
        body: "You can log food, calories, water, workout completion, sleep, weight, and daily habits. These small logs create a clear picture of your routine.",
      },
      {
        title: "How AI learns",
        body: "If weight is not changing, workouts are skipped, or water is low, the AI can identify the pattern and suggest changes.",
      },
      {
        title: "Why it helps",
        body: "Tracking removes confusion. You can see whether the problem is diet, workout consistency, sleep, water, or missed habits.",
      },
    ],
    workflow: ["Log daily habits", "View weekly pattern", "AI detects weak points", "Plan adjusts"],
    outcome: "You understand your progress clearly instead of wondering why results are slow.",
  },
  {
    title: "Budget Calculator",
    slug: "budget-calculator",
    summary:
      "Before starting, you can understand how much your 90-day transformation may cost. MyTrine estimates food, snacks, supplements, and ordering budget clearly.",
    details: [
      ["Daily food estimate", "MyTrine estimates how much your planned meals may cost per day."],
      ["Monthly spend view", "You can understand the total expected food and supplement spend before starting."],
      ["No surprise planning", "The plan is realistic because it fits both your body goal and your wallet."],
    ],
    icon: "AI",
    deepDive: [
      {
        title: "Daily cost planning",
        body: "The calculator estimates how much your meals may cost per day based on home food, ordered meals, snacks, and protein choices.",
      },
      {
        title: "Monthly clarity",
        body: "Instead of starting blindly, you can see a rough monthly transformation budget and choose a plan that fits your pocket.",
      },
      {
        title: "Smarter choices",
        body: "If the cost is high, MyTrine can suggest cheaper alternatives while keeping the nutrition goal similar.",
      },
    ],
    workflow: ["Set food preference", "Choose budget range", "Estimate daily spend", "Adjust plan"],
    outcome: "You start with financial clarity and avoid quitting because the plan is too expensive.",
  },
  {
    title: "90-Day Timeline",
    slug: "90-day-timeline",
    summary:
      "The journey is split into phases, so you do not feel lost. Foundation builds habits, progression improves intensity, and peak phase focuses on visible results.",
    details: [
      ["Phase 1: Foundation", "The first phase builds routine, fixes basic eating habits, and starts light training."],
      ["Phase 2: Progression", "The second phase increases workout intensity and tightens diet consistency."],
      ["Phase 3: Peak", "The final phase focuses on visible results, better discipline, and maintaining momentum."],
    ],
    icon: "AI",
    deepDive: [
      {
        title: "Weeks 1-4: Foundation",
        body: "The focus is on building routine, understanding food portions, drinking enough water, and completing manageable workouts.",
      },
      {
        title: "Weeks 5-8: Progression",
        body: "The plan becomes more structured. Workouts get stronger, calories are tracked better, and consistency becomes the main goal.",
      },
      {
        title: "Weeks 9-12: Peak",
        body: "The final phase focuses on visible transformation, stronger habits, and preparing you to maintain results after the plan.",
      },
    ],
    workflow: ["Start foundation", "Build consistency", "Increase intensity", "Review results"],
    outcome: "You always know what stage you are in and what to focus on next.",
  },
  {
    title: "Before & After Vault",
    slug: "before-after-vault",
    summary:
      "Upload progress photos every 15 days and compare them side by side. MyTrine keeps your visual journey private, organized, and easy to review.",
    details: [
      ["Private photo timeline", "Progress photos are stored as a timeline so you can see changes every 15 days."],
      ["Side-by-side comparison", "Before and after images are placed next to each other for clear visual tracking."],
      ["Motivation through progress", "Small visible improvements keep you motivated even when weight changes slowly."],
    ],
    icon: "AI",
    deepDive: [
      {
        title: "Photo timeline",
        body: "You can save progress photos from Day 1, Day 15, Day 30, and beyond. This creates a private visual history of your transformation.",
      },
      {
        title: "Visual comparison",
        body: "Side-by-side comparison makes body changes easier to notice, especially when the scale is moving slowly.",
      },
      {
        title: "Motivation system",
        body: "Seeing small improvements helps users stay consistent. The vault becomes proof that the effort is working.",
      },
    ],
    workflow: ["Upload Day 1 photo", "Add updates every 15 days", "Compare side by side", "Review body changes"],
    outcome: "You see real visual progress and stay motivated throughout the transformation.",
  },
];

export function getFeatureBySlug(slug: string) {
  return features.find((feature) => feature.slug === slug);
}
