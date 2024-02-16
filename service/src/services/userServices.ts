import UserBalance from "../models/userBalance";

const userServices = {
  getUserBalanceById: async (userId: number) => {
    try {
      const userBalance = await UserBalance.findByPk(userId);

      if (!userBalance) {
        return { success: false, message: "User balance not found" };
      }

      return { success: true, userBalance };
    } catch (error) {
      console.error("Error fetching user balance:", error);
      return { success: false, message: "Internal server error" };
    }
  },

  topUpBalance: async (userId: number, amount: number, currency: string) => {
    try {
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
          return { success: false, message: "Invalid currency" };
      }

      await userBalance.save();

      return { success: true, userBalance };
    } catch (error) {
      console.error("Error topping up balance:", error);
      return { success: false, message: "Internal server error" };
    }
  },

  convertCurrency: async (
    userId: number,
    fromCurrency: string,
    toCurrency: string,
    amount: number
  ) => {
    try {
      const userBalance = await UserBalance.findByPk(userId);

      if (!userBalance) {
        return { success: false, message: "User balance not found" };
      }

      if (!isValidCurrency(fromCurrency) || !isValidCurrency(toCurrency)) {
        return { success: false, message: "Invalid currency" };
      }

      const sourceBalance =
        userBalance[fromCurrency.toLowerCase() + "_balance"];
      if (sourceBalance < amount) {
        return { success: false, message: "Insufficient balance" };
      }

      const convertedAmount =
        amount * getExchangeRate(fromCurrency, toCurrency);

      userBalance[fromCurrency.toLowerCase() + "_balance"] -= amount;
      userBalance[toCurrency.toLowerCase() + "_balance"] += convertedAmount;

      await userBalance.save();

      return { success: true, convertedAmount };
    } catch (error) {
      console.error("Error converting currency:", error);
      return { success: false, message: "Internal server error" };
    }
  },
};

function isValidCurrency(currency: string): boolean {
  return ["euro", "gbp", "jpy", "usd"].includes(currency.toLowerCase());
}

function getExchangeRate(fromCurrency: string, toCurrency: string): number {
  const exchangeRates: { [key: string]: { [key: string]: number } } = {
    euro: { euro: 1, gbp: 0.85, jpy: 130, usd: 1.12 },
    gbp: { euro: 1.18, gbp: 1, jpy: 150, usd: 1.3 },
    jpy: { euro: 0.0077, gbp: 0.0067, jpy: 1, usd: 0.009 },
    usd: { euro: 0.89, gbp: 0.77, jpy: 111, usd: 1 },
  };
  return exchangeRates[fromCurrency.toLowerCase()][toCurrency.toLowerCase()];
}

export default userServices;
