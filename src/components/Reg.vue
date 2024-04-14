<template>
    <div class="register-container">
      <h1>Register</h1>
      <RegisterForm btnText="register"/>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import RegisterForm from './Form.vue';
  
  export default defineComponent({
    components: {
      RegisterForm
    }
  });
  </script>
  
  <style scoped>
  .register-container {
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
  