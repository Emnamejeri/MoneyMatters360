<template>
  <div class="balance-container">
    <div class="balance-card" v-for="(balance, index) in balances" :key="index">
      <h3>{{ balance.currency }} Balance</h3>
      <p>Balance: {{ balance.amount }}</p>
    </div>
    <div v-if="showAlert" :class="[alertType, 'alert']">
      {{ alertMessage }}
    </div>
    <div class="top-up-card">
      <h3>Top Up Balance</h3>
      <input type="number" v-model="topUpAmount" placeholder="Enter amount" />
      <select v-model="selectedCurrency">
        <option value="EUR">EUR</option>
        <option value="USD">USD</option>
        <option value="GBP">GBP</option>
        <option value="JPY">JPY</option>
      </select>
      <button @click="topUp">Top Up</button>
    </div>
    <div class="conversion-card">
      <h3>Currency Conversion</h3>
      <input
        type="number"
        v-model="conversionAmount"
        placeholder="Enter amount"
      />
      <select v-model="fromCurrency">
        <option v-for="balance in balances" :value="balance.currency">
          {{ balance.currency }}
        </option>
      </select>
      <select v-model="toCurrency">
        <option v-for="balance in balances" :value="balance.currency">
          {{ balance.currency }}
        </option>
      </select>
      <button @click="convert">Convert</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import trpcClient from "../services/trpcClient";

interface Balance {
  currency: string;
  amount: number;
}

const balances = ref<Balance[]>([
  { currency: "EUR", amount: 0 },
  { currency: "USD", amount: 0 },
  { currency: "GBP", amount: 0 },
  { currency: "JPY", amount: 0 },
]);

const topUpAmount = ref("");
const selectedCurrency = ref("EUR");
const fromCurrency = ref("EUR");
const toCurrency = ref("USD");
const conversionAmount = ref("");
const showAlert = ref(false);
const alertType = ref("");
const alertMessage = ref("");

const topUp = async () => {
  if (
    !isNaN(parseFloat(topUpAmount.value)) &&
    isFinite(parseFloat(topUpAmount.value))
  ) {
    const amount = parseFloat(topUpAmount.value);
    const selectedBalance = balances.value.find(
      (balance) => balance.currency === selectedCurrency.value
    );
    if (selectedBalance) {
      selectedBalance.amount += amount;
      topUpAmount.value = "";
      try {
        await trpcClient.mutations.topUp({
          amount,
          currency: selectedCurrency.value,
        });
        updateBalances();
      } catch (error) {
        showErrorAlert("Error topping up balance.");
      }
    } else {
      showErrorAlert("Balance not found!");
    }
  } else {
    showErrorAlert("Please enter a valid amount!");
  }
};

const convert = async () => {
  if (
    isNaN(parseFloat(conversionAmount.value)) ||
    !isFinite(parseFloat(conversionAmount.value))
  ) {
    showErrorAlert(
      "Please enter a valid numeric value for the conversion amount."
    );
    return;
  }

  if (fromCurrency.value === toCurrency.value) {
    showErrorAlert("You cannot convert between the same currency.");
    return;
  }

  const fromBalance = balances.value.find(
    (balance) => balance.currency === fromCurrency.value
  );
  const toBalance = balances.value.find(
    (balance) => balance.currency === toCurrency.value
  );
  if (fromBalance && toBalance) {
    if (fromBalance.amount >= parseFloat(conversionAmount.value)) {
      fromBalance.amount -= parseFloat(conversionAmount.value);
      toBalance.amount += parseFloat(conversionAmount.value);
      conversionAmount.value = "";

      try {
        await trpcClient.mutations.convertCurrency({
          fromCurrency: fromCurrency.value,
          toCurrency: toCurrency.value,
          amount: parseFloat(conversionAmount.value),
        });
        updateBalances();
      } catch (error) {
        showErrorAlert("Error converting currency.");
      }
    } else {
      showErrorAlert("Insufficient balance in the selected currency!");
    }
  } else {
    showErrorAlert("Selected currencies not found!");
  }
};

const updateBalances = async () => {
  try {
    await trpcClient.mutations.updateBalances({ balances: balances.value });
  } catch (error) {
    console.error("Error updating balances:", error);
  }
};

const showErrorAlert = (message: string) => {
  alertType.value = "alert-danger";
  alertMessage.value = message;
  showAlert.value = true;
  setTimeout(() => {
    showAlert.value = false;
  }, 5000);
};
</script>

<style>
.balance-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.balance-card,
.top-up-card,
.conversion-card {
  width: calc(32% - 20px);
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.top-up-card {
  background-color: #f0f0f0;
}

.input-group {
  display: flex;
  margin-bottom: 10px;
}

input[type="number"],
select {
  flex: 1;
  margin-right: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

button {
  padding: 8px 15px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
.alert {
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 4px;
  color: #fff;
  font-size: 16px;
}

.alert-success {
  background-color: #28a745;
}

.alert-warning {
  background-color: #ffc107;
}

.alert-danger {
  background-color: #dc3545;
}

.alert-info {
  background-color: #17a2b8;
}
</style>
