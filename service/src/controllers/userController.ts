import { Request, Response } from "express";
import UserBalance from "../models/userBalance";

const userController = {
  // Get user balance by user ID
  getUserBalanceById: async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.id, 10);
      const userBalance = await UserBalance.findByPk(userId);

      if (!userBalance) {
        return res.status(404).json({ message: "User balance not found" });
      }

      return res.status(200).json(userBalance);
    } catch (error) {
      console.error("Error fetching user balance:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },

  topUpBalance: async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.id, 10);
      const { amount, currency } = req.body;

      let userBalance = await UserBalance.findByPk(userId);

      if (!userBalance) {
        userBalance = await UserBalance.create({ user_id: userId });
      }

      switch (currency.toLowerCase()) {
        case "euro":
          userBalance.euro_balance += amount;
          break;
        case "gbp":
          userBalance.gbp_balance += amount;
          break;
        case "jpy":
          userBalance.jpy_balance += amount;
          break;
        case "usd":
          userBalance.usd_balance += amount;
          break;
        default:
          return res.status(400).json({ message: "Invalid currency" });
      }

      await userBalance.save();

      return res.status(200).json(userBalance);
    } catch (error) {
      console.error("Error topping up balance:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },

  convertCurrency: async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.id, 10);
      const { fromCurrency, toCurrency, amount } = req.body;

      const userBalance = await UserBalance.findByPk(userId);

      if (!userBalance) {
        return res.status(404).json({ message: "User balance not found" });
      }

      if (!isValidCurrency(fromCurrency) || !isValidCurrency(toCurrency)) {
        return res.status(400).json({ message: "Invalid currency" });
      }

      let sourceBalance: number;

      switch (fromCurrency.toLowerCase()) {
        case "euro":
          sourceBalance = userBalance.euro_balance;
          break;
        case "gbp":
          sourceBalance = userBalance.gbp_balance;
          break;
        case "jpy":
          sourceBalance = userBalance.jpy_balance;
          break;
        case "usd":
          sourceBalance = userBalance.usd_balance;
          break;
        default:
          return res.status(400).json({ message: "Invalid currency" });
      }

      if (sourceBalance < amount) {
        return res.status(400).json({ message: "Insufficient balance" });
      }

      const exchangeRate = getExchangeRate(fromCurrency, toCurrency);
      const convertedAmount = amount * exchangeRate;

      // Update the balances of the user after conversion
      switch (fromCurrency.toLowerCase()) {
        case "euro":
          userBalance.euro_balance -= amount;
          break;
        case "gbp":
          userBalance.gbp_balance -= amount;
          break;
        case "jpy":
          userBalance.jpy_balance -= amount;
          break;
        case "usd":
          userBalance.usd_balance -= amount;
          break;
      }

      switch (toCurrency.toLowerCase()) {
        case "euro":
          userBalance.euro_balance += convertedAmount;
          break;
        case "gbp":
          userBalance.gbp_balance += convertedAmount;
          break;
        case "jpy":
          userBalance.jpy_balance += convertedAmount;
          break;
        case "usd":
          userBalance.usd_balance += convertedAmount;
          break;
      }

      // Save updated user balance after conversion

      await userBalance.save();

      return res.status(200).json({ convertedAmount });
    } catch (error) {
      console.error("Error converting currency:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },
};

// Helper function to check if a currency is valid and in the list
function isValidCurrency(currency: string): boolean {
  return ["euro", "gbp", "jpy", "usd"].includes(currency.toLowerCase());
}

// Helper function to get exchange rate with a random fixed rate
function getExchangeRate(fromCurrency: string, toCurrency: string): number {
  const exchangeRates: { [key: string]: { [key: string]: number } } = {
    euro: { euro: 1, gbp: 0.85, jpy: 130, usd: 1.12 },
    gbp: { euro: 1.18, gbp: 1, jpy: 150, usd: 1.3 },
    jpy: { euro: 0.0077, gbp: 0.0067, jpy: 1, usd: 0.009 },
    usd: { euro: 0.89, gbp: 0.77, jpy: 111, usd: 1 },
  };
  return exchangeRates[fromCurrency.toLowerCase()][toCurrency.toLowerCase()];
}

export default userController;
