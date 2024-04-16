<template>
    <div class="login-container">
      <h2>健康生活，从现在开始！</h2>
      <LoginForm btnText="登录" @onSubmit="GotoLogin"/>
      <p class="to-reg">没有账号，去<a href="/reg">注册</a></p>
    </div>
  </template>
  
  <script lang="ts" setup>
  import LoginForm from './Form.vue'
  import { toLogin } from '@/request/auth'
  import { useRouter } from 'vue-router'
  import { showToast, hideToast } from '@/utils/toast'
  import useLocalStorage from '@/utils/localStorage';

  const router = useRouter()
  
  // 使用自定义 hook 获取 LocalStorage 中的值
  const { setLocalStorage } = useLocalStorage<string>('token', '');

  const GotoLogin = async (param: object) => {
    try {
      showToast('登录中...', 'loading', 'log')
      let { code, msg, data } = await toLogin(param)
      if (code === '0000') {
        console.log('token:::', data)
        setLocalStorage(data)
        showToast('登录成功, 即将跳转主页~', 'success', 'log')
        setTimeout(() => {
          hideToast()
          router.push('/list')
        }, 1000);
      } else {
        showToast(msg, 'warning', 'log')
      }
    } catch (error) {
      console.log('login err::', error)
      showToast('登录失败，请稍后再试', 'warning', 'log')
    }
  }
  
  </script>
  
  <style scoped lang="less">
  .login-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 40px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #f5f5f5;
    text-align: center;
    .to-reg {
      text-align: right;
      font-size: 12px;
    }
    h1 {
      margin-bottom: 20px;
    }
  }
  
  </style>
  