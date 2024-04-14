<template>
    <div class="login-container">
      <h1>Login</h1>
      <LoginForm btnText="Login"/>
      <p>没有账号，去<a href="/reg">注册</a></p>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import LoginForm from './Form.vue';
  
  export default defineComponent({
    components: {
      LoginForm
    }
  });
  </script>
  
  <style scoped>
  .login-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 40px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #f5f5f5;
    text-align: center;
  }
  
  h1 {
    margin-bottom: 20px;
  }
  </style>
  