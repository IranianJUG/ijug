<template >
  <div class="page-container mt-auto">
    <div class="content">
    </div>
    <footer class="footer">
      <div class="footer-inner">
        <p>&copy; Iranian Java User Group</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
}

.content {
  flex: 1;
}

.footer {
  background: linear-gradient(45deg, #1e3c72, #2a5298);
  color: white;
  padding: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.footer-inner {
  text-align: center;
}

.footer p {
  margin: 0;
}

.footer a {
  color: #b3c7e6;
  text-decoration: none;
  margin: 0 5px;
}

.footer a:hover {
  color: white;
  text-decoration: underline;
}
</style>
