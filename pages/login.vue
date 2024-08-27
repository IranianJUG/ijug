<template>
    <div class="auth-container">
      <h2>ورود</h2>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="username">نام کاربری</label>
          <input type="text" id="username" v-model="username" required />
        </div>
        <div class="form-group">
          <label for="password">گذرواژه</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <button type="submit">ورود</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const username = ref('');
  const password = ref('');
  
  function login() {
    // Logic for login
    console.log('Logging in with', username.value, password.value);
  }
  </script>
  
  <style scoped>
  .auth-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
  }
  
  input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  button {
    background-color: #1e3c72;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #2a5298;
  }
  </style>
  