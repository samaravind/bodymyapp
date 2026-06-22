import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "mytrine-food-ordering-mcp",
  version: "1.0.0",
});

server.tool(
  "searchMeals",
  {
    mealType: z.string(),
    calories: z.number(),
    protein: z.number(),
    budget: z.number(),
    foodPreference: z.string(),
    location: z.string(),
    preferredPartner: z.string(),
  },
  async (input) => {
    const meals = [
      {
        meal: "Grilled Chicken Bowl",
        restaurant: "Lean Bowl Co.",
        calories: 520,
        protein: 42,
        price: 220,
        partner: "Zomato",
        eta: "12 mins",
        available: true,
      },
      {
        meal: "Paneer Protein Bowl",
        restaurant: "Green Bowl Co.",
        calories: 540,
        protein: 38,
        price: 210,
        partner: "Swiggy",
        eta: "18 mins",
        available: true,
      },
    ];

    const bestMeal = meals.find(
      (meal) =>
        meal.price <= input.budget &&
        meal.calories <= input.calories + 100 &&
        meal.protein >= input.protein - 10
    );

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(bestMeal ?? meals[0], null, 2),
        },
      ],
    };
  }
);

server.tool(
  "createOrderDraft",
  {
    meal: z.string(),
    restaurant: z.string(),
    price: z.number(),
    partner: z.string(),
    userApprovalRequired: z.boolean(),
  },
  async (input) => {
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(
            {
              orderDraftId: `TR-${Date.now()}`,
              status: "WAITING_FOR_USER_APPROVAL",
              ...input,
            },
            null,
            2
          ),
        },
      ],
    };
  }
);

server.tool(
  "placeFoodOrder",
  {
    orderDraftId: z.string(),
    userApproved: z.boolean(),
  },
  async (input) => {
    if (!input.userApproved) {
      return {
        content: [
          {
            type: "text",
            text: "Order blocked. User approval is required.",
          },
        ],
      };
    }

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(
            {
              orderId: `ORDER-${Date.now()}`,
              orderDraftId: input.orderDraftId,
              status: "ORDER_PLACED",
              message: "Food order placed successfully.",
            },
            null,
            2
          ),
        },
      ],
    };
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);