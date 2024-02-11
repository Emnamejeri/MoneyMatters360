<template>
  <div class="container">
    <div class="message">
      <p>
        Thank you for trusting us and becoming our client <br />
        Your profile has been successfully created. <br />
        Now - Please access the Sign in page to authenticate and login.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
<style>
body,
html {
  height: 60%;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  text-align: center;
}

.message {
  background-color: #f39292;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>
