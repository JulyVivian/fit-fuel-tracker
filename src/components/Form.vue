<template>
  <a-form
    :model="formState"
    name="basic"
    :label-col="{ span: 5 }"
    :wrapper-col="{ span: 16 }"
    labelAlign="left"
    autocomplete="off"
    @finish="onFinish"
    @finishFailed="onFinishFailed"
  >
    <a-form-item
      label="用户名"
      name="username"
      :rules="[{ required: true, message: 'Please input your username!' }]"
    >
      <a-input v-model:value="formState.username" />
    </a-form-item>

    <a-form-item
      label="密码"
      name="password"
      :rules="[{ required: true, message: 'Please input your password!' }]"
    >
      <a-input-password v-model:value="formState.password" />
    </a-form-item>

    <!-- <a-form-item name="remember" :wrapper-col="{ offset: 8, span: 16 }">
      <a-checkbox v-model:checked="formState.remember">Remember me</a-checkbox>
    </a-form-item> -->

    <a-form-item :wrapper-col="{ offset: 8, span: 8 }">
      <a-button type="primary" html-type="submit">{{ btnText }}</a-button>
    </a-form-item>
  </a-form>
</template>
<script lang="ts" setup>
import { reactive, defineProps, defineEmits } from 'vue';

interface FormState {
  username: string;
  password: string;
  // remember: boolean;
}

const props = defineProps({
  btnText: {
    type: String,
    required: true,
    default: ''
  }
});

const emit = defineEmits(['onSubmit'])

const formState = reactive<FormState>({
  username: '',
  password: '',
  // remember: true,
});
const onFinish = (values: any) => {
  console.log('Success:', values);
  emit('onSubmit', values)
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};
</script>
