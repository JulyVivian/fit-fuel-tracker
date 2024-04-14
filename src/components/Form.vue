<template>
    <a-form :form="form" @finish="handleSubmit">
      <a-form-item label="Username" name="username" :rules="[{ required: true, message: 'Please input your username' }]">
        <a-input v-model:value="username" placeholder="Username" />
      </a-form-item>
      <a-form-item label="Password" name="password" :rules="[{ required: true, message: 'Please input your password' }]">
        <a-input type="password" v-model:value="password" placeholder="Password" />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit">{{ btnText }}</a-button>
      </a-form-item>
    </a-form>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, PropType } from 'vue';
  import { Form, Input, Button } from 'ant-design-vue';
  
  export default defineComponent({
    props: {
    btnText: {
      type: String as PropType<string>,
      required: true,
      default: ''
    }
  },
    components: {
      'a-form': Form,
      'a-form-item': Form.Item,
      'a-input': Input,
      'a-button': Button
    },
    setup() {
      const form = ref<any>(null);
      const username = ref<string>('');
      const password = ref<string>('');
  
      const handleSubmit = () => {
        form.value.validateFields().then(() => {
          // 在这里处理登录逻辑
          console.log('Username:', username.value);
          console.log('Password:', password.value);
        }).catch(() => {
          console.error('Validation failed');
        });
      };
  
      return {
        form,
        username,
        password,
        handleSubmit
      };
    }
  });
  </script>
  