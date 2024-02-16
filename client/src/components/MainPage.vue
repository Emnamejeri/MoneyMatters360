<template>
  <div class="balance-container">
    <div class="balance-card" v-for="(balance, index) in balances" :key="index">
      <h3>{{ balance.currency }} Balance</h3>
      <p>Balance: {{ balance.amount }}</p>
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
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

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
    };
  },
  methods: {
    topUp() {
      if (!isNaN(parseFloat(this.topUpAmount)) && isFinite(this.topUpAmount)) {
        const amount = parseFloat(this.topUpAmount);
        const selectedBalance = this.balances.find(
          (balance) => balance.currency === this.selectedCurrency
        );
        if (selectedBalance) {
          selectedBalance.amount += amount;
          this.topUpAmount = "";
        } else {
          alert("Balance not found!");
        }
      } else {
        alert("Please enter a valid amount!");
      }
    },
  },
});
</script>

<style>
.balance-container {
  display: flex;
  flex-wrap: wrap;
}

.balance-card,
.top-up-card {
  width: calc(25% - 20px);
  margin: 10px;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.top-up-card {
  background-color: #f0f0f0;
}

input[type="number"] {
  width: 100%;
  margin-bottom: 10px;
  padding: 5px;
}
</style>
