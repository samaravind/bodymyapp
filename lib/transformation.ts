import type {
  AnswerRecord,
  Blueprint,
  ConsultationAnswers,
  DailyPlan,
  Feedback,
  Progress,
} from "@/types/transformation";

function answer(records: AnswerRecord[], matcher: string, fallback = "") {
  return (
    records.find((record) =>
      record.question.toLowerCase().includes(matcher.toLowerCase())
    )?.answer || fallback
  );
}

function numberFrom(value: string, fallback: number) {
  const numeric = Number(value.replace(/[^\d.]/g, ""));
  return Number.isFinite(numeric) && numeric > 0 ? numeric : fallback;
}

function budgetFrom(value: string) {
  if (value.includes("150") && value.includes("300")) return 250;
  if (value.includes("300") && value.includes("500")) return 400;
  if (value.includes("500") || value.toLowerCase().includes("above")) return 650;
  return 150;
}

function monthlyBudgetFrom(value: string, dailyBudget: number) {
  if (value.includes("5,000") && value.includes("10,000")) return 7500;
  if (value.includes("10,000") && value.includes("15,000")) return 12500;
  if (value.includes("15,000") || value.toLowerCase().includes("above")) return 18000;
  if (value.includes("Below")) return 4500;
  return dailyBudget * 30;
}

function partnerFrom(value: string): "Swiggy" | "Zomato" | "Manual" {
  if (value.toLowerCase().includes("swiggy")) return "Swiggy";
  if (value.toLowerCase().includes("zomato")) return "Zomato";
  if (value.toLowerCase().includes("home")) return "Manual";
  return "Zomato";
}

function caloriesFor(goal: string, activity: string, currentWeight: number, targetWeight: number) {
  const base = Math.round(currentWeight * 24);
  const activityBoost = activity.includes("Very")
    ? 350
    : activity.includes("High")
      ? 250
      : activity.includes("Medium")
        ? 120
        : 0;
  if (targetWeight < currentWeight) return Math.max(1450, base + activityBoost - 450);
  if (targetWeight > currentWeight) return base + activityBoost + 350;
  if (goal.includes("Muscle")) return base + activityBoost + 180;
  return base + activityBoost;
}

function mealFor(preference: string, style: string, target: "breakfast" | "lunch" | "dinner") {
  const vegetarian = preference.includes("Vegetarian") || preference.includes("Vegan");
  if (target === "breakfast") {
    return vegetarian ? `${style} protein dosa with curd` : `${style} egg dosa with fruit`;
  }
  if (target === "dinner") {
    return vegetarian ? `${style} paneer bowl with vegetables` : `${style} chicken bowl with vegetables`;
  }
  return vegetarian ? `${style} paneer protein bowl` : `${style} grilled chicken bowl`;
}

function workoutFor(workout: string, schedule: string, direction: Blueprint["direction"]) {
  if (workout.includes("Gym")) {
    return direction === "gain" ? "45 min strength training + progressive overload" : "40 min strength training + incline walk";
  }
  if (workout.includes("Yoga")) return "35 min yoga, mobility, and core stability";
  if (schedule.includes("Office") || schedule.includes("Student")) return "30 min home strength plan after work";
  return "35 min walking + bodyweight strength circuit";
}

export function generateBlueprint(consultation: ConsultationAnswers): Blueprint {
  const records = consultation.responses;
  const userName = consultation.userName || answer(records, "name", "there");
  const goal = answer(records, "transformation goal", answer(records, "main fitness goal", "Weight Loss"));
  const currentWeight = numberFrom(answer(records, "current weight"), 75);
  const targetWeight = numberFrom(
    answer(records, "target weight"),
    goal.includes("Gain") || goal.includes("Muscle") ? currentWeight + 6 : currentWeight - 8
  );
  const activity = answer(records, "activity level", "Medium");
  const foodPreference = answer(records, "food preference", "Non-Vegetarian");
  const foodStyle = answer(records, "food style", "Mixed Indian");
  const allergy = answer(records, "allergy", "No Allergy");
  const dislikedFoods = answer(records, "dislike", "None");
  const dailyBudget = budgetFrom(answer(records, "daily food budget", "INR 150-INR 300"));
  const monthlyBudget = monthlyBudgetFrom(answer(records, "monthly food budget", ""), dailyBudget);
  const partner = partnerFrom(answer(records, "food ordering option", "Zomato"));
  const location = answer(records, "delivery location", "Current location");
  const autoOrdering = answer(records, "auto ordering", "Ask Before Ordering").includes("Auto Ordering");
  const schedule = answer(records, "daily schedule", "Flexible");
  const workoutPreference = answer(records, "exercise currently", "Walking Only");
  const workoutAvailability = answer(records, "workout availability", "30 Minutes");
  const waterAnswer = answer(records, "water", "2-3L");
  const health = answer(records, "health condition", "No Issues");
  const injury = answer(records, "injury", "No Injury");
  const medication = answer(records, "medicines", "No Medicines");
  const sleep = answer(records, "sleep", "7-8 Hours");
  const direction: Blueprint["direction"] =
    targetWeight > currentWeight ? "gain" : targetWeight < currentWeight ? "loss" : "maintenance";
  const goalChange = Math.abs(currentWeight - targetWeight);
  const dailyCalorieTarget = caloriesFor(goal, activity, currentWeight, targetWeight);
  const proteinTarget = Math.round((direction === "gain" ? targetWeight : currentWeight) * 1.45);
  const waterLiters = waterAnswer.includes("More") ? 3.5 : waterAnswer.includes("1-2") ? 2 : waterAnswer.includes("Less") ? 1.5 : 3;
  const expectedCompletionDate = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const goalProbability = Math.max(
    68,
    Math.min(
      96,
      88 -
        (health === "No Issues" ? 0 : 6) -
        (injury === "No Injury" ? 0 : 5) +
        (activity.includes("High") || activity.includes("Very") ? 4 : 0)
    )
  );
  const sign = targetWeight >= currentWeight ? 1 : -1;

  const weeklyMilestones = [1, 2, 4, 6, 8, 10, 12].map((week) => {
    const progress = week / 12;
    return {
      week,
      targetWeight: Math.round((currentWeight + sign * goalChange * progress) * 10) / 10,
      focus: week < 4 ? "Build routine" : week < 9 ? "Optimize nutrition" : "Protect goal date",
    };
  });
  const monthlyMilestones = [4, 8, 12].map((week) => {
    const progress = week / 12;
    return {
      week,
      targetWeight: Math.round((currentWeight + sign * goalChange * progress) * 10) / 10,
      focus: week === 4 ? "Routine locked" : week === 8 ? "Visible change" : "Goal achieved",
    };
  });

  const lunch = mealFor(foodPreference, foodStyle, "lunch");
  const restaurant =
    partner === "Manual"
      ? "Home Meal Prep"
      : foodPreference.includes("Vegetarian") || foodPreference.includes("Vegan")
        ? "Green Bowl Co."
        : "Lean Bowl Co.";
  const dailyPlan: DailyPlan = {
    date: new Date().toISOString().slice(0, 10),
    calories: dailyCalorieTarget,
    protein: proteinTarget,
    waterLiters,
    mealPlan: [
      mealFor(foodPreference, foodStyle, "breakfast"),
      lunch,
      mealFor(foodPreference, foodStyle, "dinner"),
    ],
    workoutPlan: `${workoutFor(workoutPreference, schedule, direction)} (${workoutAvailability})`,
    aiActions: [
      `Set ${dailyCalorieTarget} kcal nutrition target`,
      `Protected ${targetWeight}kg goal with 12-week milestones`,
      `Matched meals to ${foodPreference.toLowerCase()} preference and INR ${dailyBudget}/day budget`,
      allergy === "No Allergy" ? "No allergy restriction applied" : `Excluded meals with ${allergy.toLowerCase()}`,
      dislikedFoods === "None" ? "No disliked foods blocked" : `Blocked disliked foods: ${dislikedFoods}`,
      health === "No Issues" ? "No health restrictions detected" : `Flagged ${health.toLowerCase()} for safer planning`,
      injury === "No Injury" ? "No injury limitation detected" : `Modified workout around ${injury.toLowerCase()}`,
      medication === "No Medicines" ? "No medication timing needed" : `Added medicine-aware meal timing`,
      `Adjusted recovery around ${sleep.toLowerCase()} sleep pattern`,
    ],
    mealOrder: {
      restaurant,
      meal: lunch,
      price: Math.min(Math.max(dailyBudget - 30, 120), dailyBudget),
      calories: Math.round(dailyCalorieTarget * 0.32),
      protein: Math.max(28, Math.round(proteinTarget * 0.36)),
      etaMinutes: partner === "Manual" ? 0 : dailyBudget > 300 ? 12 : 18,
      status: partner === "Manual" ? "Planned" : "Preparing",
      partner,
      location,
      autoOrderingEnabled: autoOrdering,
    },
  };

  return {
    userName,
    generatedAt: new Date().toISOString(),
    goal,
    currentWeight,
    targetWeight,
    goalChange,
    direction,
    durationDays: 90,
    dailyCalorieTarget,
    proteinTarget,
    waterTargetLiters: waterLiters,
    recoveryPlan: `Sleep target: ${sleep}. Training adjusted around ${schedule.toLowerCase()} schedule.`,
    goalProbability,
    expectedCompletionDate,
    budgetEstimate: {
      daily: dailyBudget,
      monthly: monthlyBudget,
      fullPlan: dailyBudget * 90,
    },
    weeklyMilestones,
    monthlyMilestones,
    dailyPlan,
    recommendations: [
      `Start with ${dailyPlan.workoutPlan}.`,
      `Keep lunch execution simple: ${dailyPlan.mealOrder.meal}.`,
      `Let AI review progress every 7 days and adjust calories by 100-150 kcal if needed.`,
    ],
  };
}

export function createInitialProgress(blueprint: Blueprint): Progress {
  return {
    startedAt: new Date().toISOString(),
    lastUpdatedAt: new Date().toISOString(),
    completedDays: 0,
    currentWeight: blueprint.currentWeight,
    transformationScore: 0,
    dailyCompletion: [],
  };
}

export function buildAiAdjustment(feedback: Feedback, blueprint: Blueprint) {
  if (!feedback.completedMeals) {
    return `AI shifted unused calories into the next meal and protected the ${blueprint.expectedCompletionDate} goal date.`;
  }
  if (!feedback.completedWorkout) {
    return `AI moved workout load to tomorrow and adjusted dinner toward ${Math.max(blueprint.dailyCalorieTarget - 120, 1200)} kcal.`;
  }
  if (!feedback.likedMeal) {
    return "AI removed similar meals from future orders and selected a better restaurant match for tomorrow.";
  }
  if (feedback.fullness === "Too Full") {
    return "AI reduced tomorrow's meal volume while keeping protein stable.";
  }
  if (feedback.hunger === "High") {
    return "AI increased fiber and protein volume while keeping the goal date protected.";
  }
  if (feedback.energy === "Low") {
    return "AI lowered workout intensity and added a recovery-focused meal timing adjustment.";
  }
  return "AI kept tomorrow's plan stable because today's execution is on track.";
}
