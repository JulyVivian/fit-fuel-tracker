<template>
    <div class="register-container">
      <h1>开始注册～</h1>
      <RegisterForm btnText="注册" @onSubmit="GotoReg" />
    </div>
  </template>
  
  <script lang="ts" setup>
  import RegisterForm from './Form.vue';
  import { toReg } from '../request/auth'
  import { useRouter } from 'vue-router'
  import { showToast, hideToast } from '../utils/toast'
  const router = useRouter()

  const GotoReg = async (param: object) => {
    try {
      showToast('注册中...', 'loading', 'reg')
      let { code, msg } = await toReg(param)
      if (code === '0000') {
        console.log('reg:::')
        showToast('注册成功, 即将跳转登录~', 'success', 'reg')
        setTimeout(() => {
          hideToast()
          router.push('/login')
        }, 1000);
      } else {
        showToast(msg, 'warning', 'reg')
      }
    } catch (error) {
      console.log('login err::', error)
      showToast('注册失败，请稍后再试', 'warning', 'reg')
    }
  }
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
  