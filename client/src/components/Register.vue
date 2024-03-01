<template>
  <div class="registration-page">
    <main>
      <form class="registration-form" @submit.prevent="handleSubmit">
        <h2>Register</h2>
        <div class="form-group">
          <label for="fullname">Full Name:</label>
          <input
            type="text"
            id="fullname"
            name="fullname"
            v-model="fullName"
            required
          />
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            v-model="email"
            required
          />
        </div>
        <div class="form-group">
          <label for="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            v-model="username"
            required
          />
        </div>
        <div class="form-group">
          <label for="address">Country of Residence:</label>
          <select id="address" name="address" v-model="address" required>
            <option value="">Select Country</option>
            <option
              v-for="country in countries"
              :key="country.code"
              :value="country.name"
            >
              {{ country.name }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label for="dob">Date of Birth:</label>
          <input type="date" id="dob" name="dob" v-model="dob" required />
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            v-model="password"
            required
          />
        </div>
        <button type="submit">Register</button>
        <p>{{ errorMessage }}</p>
      </form>
      <RegistrationConfirmation v-if="registrationSuccessful" />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import RegistrationConfirmation from "./RegistrationConfirmation.vue";
import trpcClient from "../services/trpcClient";

const fullName = ref("");
const email = ref("");
const username = ref("");
const address = ref("");
const dob = ref("");
const password = ref("");
const errorMessage = ref("");
const registrationSuccessful = ref(false);

const countries = [
  { code: "US", name: "United States" },
  { code: "CA", name: "Canada" },
  { code: "TN", name: "Tunisia" },
  { code: "FR", name: "France" },
  { code: "DE", name: "Germany" },
  { code: "EE", name: "Estonia" },
  { code: "JP", name: "Japan" },
  { code: "SGP", name: "Singapore" },
];

const validateForm = () => {
  if (
    !fullName.value ||
    !email.value ||
    !username.value ||
    !dob.value ||
    !address.value ||
    !password.value
  ) {
    errorMessage.value = "All fields are required";
    return false;
  }

  // to check if user is less than 18 years old when registering
  const today = new Date();
  const birthDate = new Date(dob.value);
  const age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age;
  }
  if (age < 18) {
    errorMessage.value =
      "You must be at least 18 years old to register and Use our services.";
    return false;
  }

  return true;
};

const handleSubmit = async () => {
  if (validateForm()) {
    try {
      //@ts-ignore
      const response = await trpcClient.mutations.registerUser({
        fullName: fullName.value,
        email: email.value,
        username: username.value,
        address: address.value,
        dob: dob.value,
        password: password.value,
      });
      console.log(response.data);
      registrationSuccessful.value = true;
      errorMessage.value = "";
    } catch (error) {
      console.error(error);
      errorMessage.value = "An error occurred during registration";
    }
  }
};
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
  background-color: #f7f7f7;
}

.registration-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin-top: 2em;
  margin-bottom: 2em;
}

main {
  min-width: 20em;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h2 {
  font-size: 28px;
  margin-bottom: 20px;
  color: #333;
  text-align: center;
}

p {
  margin-bottom: 20px;
  line-height: 1.5;
  color: #666;
  text-align: center;
}

.registration-form {
  display: grid;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}

label {
  font-size: 16px;
  color: #333;
  text-align: center;
}

select,
input[type="text"],
input[type="email"],
input[type="password"],
input[type="date"] {
  width: 70%;
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: center;
}

button {
  padding: 12px 24px;
  font-size: 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3;
}

.error-message {
  color: red;
  margin-top: 10px;
  text-align: center;
}
</style>
