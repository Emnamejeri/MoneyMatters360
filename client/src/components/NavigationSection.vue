<template>
  <header>
    <nav class="navbar">
      <div class="nav-left">MoneyMatters360</div>
      <div class="nav-right">
        <router-link class="nav-link" to="/">Home</router-link>
        <router-link class="nav-link" to="/register">Register</router-link>
        <router-link class="nav-link" to="/authenticate">Sign In</router-link>
        <router-link class="nav-link" to="/profiletesting"
          >Profile (for testing)</router-link
        >
      </div>
    </nav>
  </header>
</template>

<style scoped>
.navbar {
  background-color: #007bff;
  color: #ffffff;
  padding: 15px;
  border-radius: 8px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-left {
  font-weight: bold;
  font-size: 1.8rem;
}

.nav-right {
  display: flex;
  align-items: center;
}

.nav-link {
  color: #ffffff;
  text-decoration: none;
  font-size: 1.2rem;
  margin-left: 20px;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #f18f6b;
}
</style>

<script lang="ts">
export default {
  name: "NavigationSection",
};
</script>
