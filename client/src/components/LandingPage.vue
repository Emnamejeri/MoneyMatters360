<template>
  <div class="landing-page">
    <header>
      <h1>Welcome to MoneyMatters360</h1>
    </header>
    <main>
      <section class="values">
        <h2>Our Core Values</h2>
        <div class="card">
          <h3>Integrity</h3>
          <p>
            We believe in honesty, transparency, and doing the right thing,
            always.
          </p>
        </div>
        <div class="card">
          <h3>Innovation</h3>
          <p>
            We're always looking for new and better ways to help you manage your
            finances.
          </p>
        </div>
        <div class="card">
          <h3>Customer Focus</h3>
          <p>
            Your needs are our top priority. We're here to listen, understand,
            and support you.
          </p>
        </div>
      </section>
      <section class="mission">
        <h2>Our Mission</h2>
        <div class="mission-card">
          <p>
            We're on a mission to make managing your finances easy, accessible,
            and empowering for everyone.
          </p>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
body {
  font-family: Arial, sans-serif;
  justify-content: center;
  align-items: center;
  height: 60vh;
}

.landing-page {
  padding: 20px;
  text-align: center;
}

header {
  margin-bottom: 3px;
}

h1 {
  color: #1867b6;
  font-size: 2rem;
}

.values,
.mission {
  margin-bottom: 40px;
}

h2 {
  color: #0a243d;
  font-size: 1.5rem;
  margin-bottom: 20px;
}

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.card,
.mission-card {
  background-color: #e0f2f1;
  color: #3399cc;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s, box-shadow 0.3s;
  width: 45%;
  margin-top: 30px;
  margin: 0 auto;
}

.card h3 {
  color: #1867b6;
  font-size: 1.2rem;
  margin-bottom: 10px;
}

.card p,
.mission-card p {
  margin: 0;
  color: #333;
}

.card:hover,
.mission-card:hover {
  background-color: #5ef3da;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
</style>
