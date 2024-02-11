<template>
  <footer class="footer">
    <p>&copy; 2024 Your Financial Management App. All rights reserved.</p>
  </footer>
</template>

<style scoped>
.footer {
  background-color: #007bff;
  color: #ffffff;
  font-weight: bold;
  padding: 20px;
  border-radius: 8px;
  box-sizing: border-box;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
}

.footer p {
  margin: 0;
  font-size: 14px;
  text-align: center;
}
</style>

<script lang="ts">
export default {
  name: "FooterSection",
};
</script>
