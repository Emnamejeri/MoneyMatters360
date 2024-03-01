<template>
  <div class="login-page">
    <header>
      <h1>Login</h1>
    </header>
    <main>
      <form class="login-form" @submit.prevent="login">
        <div class="form-group">
          <label for="username">Username or Email:</label>
          <input
            type="text"
            v-model="username"
            id="username"
            name="username"
            required
          />
        </div>

        <div class="form-group">
          <label for="password">Password:</label>
          <input
            type="password"
            v-model="password"
            id="password"
            name="password"
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import trpcClient from "../services/trpcClient";

const username = ref("");
const password = ref("");
const router = useRouter();

const login = async () => {
  try {
    const response = await trpcClient.mutations.loginUser({
      username: username.value,
      password: password.value,
    });

    const token = response.token;
    localStorage.setItem("token", token);

    router.push({ name: "MainPage" });
  } catch (error) {
    console.error("Login failed:", error);
    alert("Login failed. Please try again.");
  }
};
</script>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.login-page {
  font-family: Arial, sans-serif;
  text-align: center;

  margin: 0 auto;
  padding: 20px;
  max-width: 400px;
  border-radius: 8px;
}

h1,
h2 {
  color: #333;
}

form {
  margin-top: 20px;
}

.form-group {
  margin-bottom: 20px;
  text-align: left;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input {
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 100%;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 20px;
  width: 100%;
}

button:hover {
  background-color: #0056b3;
}
</style>
