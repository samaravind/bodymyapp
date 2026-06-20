import { NextResponse } from "next/server";

type ChatMessage = {
  role?: string;
  content?: string;
};

const questions = [
  {
    section: "Personal Details",
    question: "What is your name?",
    options: [],
    inputType: "text",
    placeholder: "Enter your name",
  },
  {
    section: "Personal Details",
    question: "What is your age?",
    options: [],
    inputType: "number",
    placeholder: "Enter your age",
  },
  {
    section: "Personal Details",
    question: "Choose your gender",
    options: ["Male", "Female"],
  },
  {
    section: "Personal Details",
    question: "What is your main fitness goal?",
    options: ["Weight Loss", "Weight Gain", "Healthy Maintenance", "Muscle Gain"],
  },
  {
    section: "Personal Details",
    question: "What is your height?",
    options: [],
    inputType: "number",
    placeholder: "Enter height in cm",
  },
  {
    section: "Personal Details",
    question: "What is your current weight?",
    options: [],
    inputType: "number",
    placeholder: "Enter current weight in kg",
  },
  {
    section: "Personal Details",
    question: "What is your target weight?",
    options: [],
    inputType: "number",
    placeholder: "Enter target weight in kg",
  },

  {
    section: "Health Details",
    question: "Do you have any health condition?",
    options: ["No Issues", "Diabetes / BP", "Thyroid / PCOS", "Other Health Issue"],
  },
  {
    section: "Health Details",
    question: "Are you taking any medicines currently?",
    options: ["No Medicines", "Daily Medicines", "Sometimes", "Not Sure"],
  },
  {
    section: "Health Details",
    question: "Do you have any food allergy?",
    options: ["No Allergy", "Milk Allergy", "Gluten Allergy", "Nuts / Seafood Allergy"],
  },
  {
    section: "Health Details",
    question: "Have you followed any diet plan before?",
    options: ["Never Tried", "Tried But Stopped", "Currently Following", "Need Guidance"],
  },

  {
    section: "Food Preferences",
    question: "What is your food preference?",
    options: ["Vegetarian", "Non-Vegetarian", "Eggetarian", "Vegan"],
  },
  {
    section: "Food Preferences",
    question: "Which food style do you prefer?",
    options: ["South Indian", "North Indian", "Mixed Indian", "International"],
  },
  {
    section: "Food Preferences",
    question: "What type of food do you prefer?",
    options: ["Home Food", "Restaurant Food", "Both", "Diet Meal Service"],
  },
  {
    section: "Food Preferences",
    question: "How many meals do you eat per day?",
    options: ["2 Meals", "3 Meals", "4 Meals", "5+ Meals"],
  },

  {
    section: "Lifestyle Analysis",
    question: "What is your activity level?",
    options: ["Low", "Medium", "High", "Very Active"],
  },
  {
    section: "Lifestyle Analysis",
    question: "Do you exercise currently?",
    options: ["No Exercise", "Walking Only", "Gym", "Yoga / Sports"],
  },
  {
    section: "Lifestyle Analysis",
    question: "What is your daily schedule like?",
    options: ["Student", "Office 9-5", "Shift Work", "Freelance / Flexible"],
  },
  {
    section: "Lifestyle Analysis",
    question: "How many hours do you sleep?",
    options: ["Less than 5 Hours", "5-6 Hours", "7-8 Hours", "More than 8 Hours"],
  },
  {
    section: "Lifestyle Analysis",
    question: "How much water do you drink daily?",
    options: ["Less than 1L", "1-2L", "2-3L", "More than 3L"],
  },

  {
    section: "Budget Analysis",
    question: "What is your daily food budget?",
    options: ["Below ₹150", "₹150-₹300", "₹300-₹500", "Above ₹500"],
  },
  {
    section: "Budget Analysis",
    question: "What is your monthly food budget?",
    options: ["Below ₹5,000", "₹5,000-₹10,000", "₹10,000-₹15,000", "Above ₹15,000"],
  },
  {
    section: "Budget Analysis",
    question: "Which food ordering option do you prefer?",
    options: ["Swiggy", "Zomato", "Both", "I Prefer Home Food"],
  },
  {
    section: "Budget Analysis",
    question: "What should AI create for you?",
    options: ["Diet Plan", "Workout Plan", "Full 3-Month Plan", "Budget Estimate"],
  },
];

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { messages?: unknown };
    const messages: ChatMessage[] = Array.isArray(body.messages)
      ? body.messages
      : [];

    const userAnswerCount = messages.filter(
      (msg) => msg.role === "user"
    ).length;

    const nextQuestion = questions[userAnswerCount];

    if (!nextQuestion) {
      return NextResponse.json({
        section: "Completed",
        question:
          "Great, I have collected all your details. Your consultation is completed.",
        options: [],
        completed: true,
        questionNumber: questions.length,
        totalQuestions: questions.length,
      });
    }

    return NextResponse.json({
      ...nextQuestion,
      questionNumber: userAnswerCount + 1,
      totalQuestions: questions.length,
    });
  } catch (error) {
    console.error("QUESTION FLOW ERROR:", error);

    return NextResponse.json({
      section: "Error",
      question: "Something went wrong. Please restart the consultation.",
      options: ["Restart", "Try Again", "Go Back", "Continue"],
    });
  }
}
