export type AnswerRecord = {
  answer: string;
  question: string;
  section: string;
};

export type ConsultationAnswers = {
  completedAt: string;
  userName: string;
  responses: AnswerRecord[];
};

export type WeeklyMilestone = {
  week: number;
  targetWeight: number;
  focus: string;
};

export type MealOrder = {
  restaurant: string;
  meal: string;
  price: number;
  calories: number;
  protein: number;
  etaMinutes: number;
  status: "Planned" | "Ordering" | "Preparing" | "Arriving" | "Delivered";
  partner: "Swiggy" | "Zomato" | "Manual";
  location: string;
  autoOrderingEnabled: boolean;
};

export type DailyPlan = {
  date: string;
  calories: number;
  protein: number;
  waterLiters: number;
  mealPlan: string[];
  workoutPlan: string;
  aiActions: string[];
  mealOrder: MealOrder;
};

export type Blueprint = {
  userName: string;
  generatedAt: string;
  goal: string;
  currentWeight: number;
  targetWeight: number;
  goalChange: number;
  direction: "loss" | "gain" | "maintenance";
  durationDays: number;
  dailyCalorieTarget: number;
  proteinTarget: number;
  waterTargetLiters: number;
  recoveryPlan: string;
  goalProbability: number;
  expectedCompletionDate: string;
  budgetEstimate: {
    daily: number;
    monthly: number;
    fullPlan: number;
  };
  weeklyMilestones: WeeklyMilestone[];
  monthlyMilestones: WeeklyMilestone[];
  dailyPlan: DailyPlan;
  recommendations: string[];
};

export type Feedback = {
  date: string;
  energy: string;
  hunger: string;
  fullness: string;
  likedMeal: boolean;
  completedMeals: boolean;
  completedWorkout: boolean;
  completedWater: boolean;
  note: string;
  aiAdjustment: string;
};

export type Progress = {
  startedAt: string;
  lastUpdatedAt: string;
  completedDays: number;
  currentWeight: number;
  transformationScore: number;
  beforePhoto?: string;
  afterPhoto?: string;
  dailyCompletion: {
    date: string;
    meals: boolean;
    workout: boolean;
    water: boolean;
  }[];
};

export const STORAGE_KEYS = {
  consultationAnswers: "mytrine:consultationAnswers",
  transformationBlueprint: "mytrine:transformationBlueprint",
  dailyFeedback: "mytrine:dailyFeedback",
  userProgress: "mytrine:userProgress",
} as const;
