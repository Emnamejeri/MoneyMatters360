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

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

interface Balance {
  currency: string;
  amount: number;
}

export default defineComponent({
  data() {
    return {
      balances: [
        { currency: "EUR", amount: 0 },
        { currency: "USD", amount: 0 },
        { currency: "GBP", amount: 0 },
        { currency: "JPY", amount: 0 },
      ] as Balance[],
      topUpAmount: "",
      selectedCurrency: "EUR" as string,
      fromCurrency: "EUR" as string,
      toCurrency: "USD" as string,
      conversionAmount: "",
      showAlert: false,
      alertType: "",
      alertMessage: "",
    };
  },
  methods: {
    topUp() {
      //@ts-ignore
      if (!isNaN(parseFloat(this.topUpAmount)) && isFinite(this.topUpAmount)) {
        const amount = parseFloat(this.topUpAmount);
        const selectedBalance = this.balances.find(
          (balance) => balance.currency === this.selectedCurrency
        );
        if (selectedBalance) {
          selectedBalance.amount += amount;
          this.topUpAmount = "";

          // Update balances in the backend db
          this.updateBalances();
        } else {
          alert("Balance not found!");
        }
      } else {
        alert("Please enter a valid amount!");
      }
    },

    //@ts-ignore
    showErrorAlert(message) {
      this.alertType = "alert-danger";
      this.alertMessage = message;
      this.showAlert = true;
      setTimeout(() => {
        this.showAlert = false;
      }, 5000);
    },
    convert() {
      if (
        isNaN(parseFloat(this.conversionAmount)) ||
        //@ts-ignore
        !isFinite(this.conversionAmount)
      ) {
        alert("Please enter a valid numeric value for the conversion amount.");
        return;
      }

      if (this.fromCurrency === this.toCurrency) {
        alert("You cannot convert between the same currency.");
        return;
      }

      const fromBalance = this.balances.find(
        (balance) => balance.currency === this.fromCurrency
      );
      const toBalance = this.balances.find(
        (balance) => balance.currency === this.toCurrency
      );
      if (fromBalance && toBalance) {
        if (fromBalance.amount >= parseFloat(this.conversionAmount)) {
          fromBalance.amount -= parseFloat(this.conversionAmount);
          toBalance.amount += parseFloat(this.conversionAmount);
          this.conversionAmount = "";

          // Update balances in the backend
          this.updateBalances();
        } else {
          alert("Insufficient balance in the selected currency!");
        }
      } else {
        alert("Selected currencies not found!");
      }
    },
    updateBalances() {
      axios
        .post("/update-balances", { balances: this.balances })
        .then((response) => {
          console.log("Balances updated successfully:", response.data);
        })
        .catch((error) => {
          console.error("Error updating balances:", error);
        });
    },
  },
});
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
