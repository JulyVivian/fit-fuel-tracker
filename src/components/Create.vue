<template>
  <a-tooltip title="回到个人活动清单页面" color="green">
    <home-outlined @click="backToList" class="back"/>
  </a-tooltip>
  <h3>记录一下今天的健康生活吧～</h3>
  <a-form layout="vertical" ref="formRef" :model="formState" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
    <a-form-item label="活动类型:" name="ff_type">
      <a-select v-model:value="formState.ff_type" placeholder="please select fit or fuel type">
        <a-select-option value="sport">运动</a-select-option>
        <a-select-option value="diet">饮食</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item ref="name" label="活动名称:" name="name">
      <a-input v-model:value="formState.name" />
    </a-form-item>
    <a-form-item label="活动时间:" required name="time">
      <a-date-picker v-model:value="formState.time" show-time type="date" placeholder="Pick a date"
        style="width: 100%" />
    </a-form-item>
    <a-form-item label="热量类型:" name="fuel_variety">
      <a-radio-group v-model:value="formState.fuel_variety">
        <a-radio value="Expenditure">消耗</a-radio>
        <a-radio value="Intake">吸收</a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item label="热量值(千卡):" name="calories">
      <a-input v-model:value="formState.calories"/>
    </a-form-item>
    <a-form-item label="内容" name="content">
      <a-textarea v-model:value="formState.content" />
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="onSubmit">记录</a-button>
      <a-button style="margin-left: 10px" @click="resetForm">重置</a-button>
    </a-form-item>
  </a-form>
</template>
<script lang="ts" setup>
import { Dayjs } from 'dayjs';
import { reactive, ref, toRaw } from 'vue';
import type { UnwrapRef } from 'vue';
import type { Rule } from 'ant-design-vue/es/form';
import { createConsumptions } from '@/request/consumptions'
import { useRouter } from 'vue-router'
import { HomeOutlined } from '@ant-design/icons-vue';
import useDebounce from '@/utils/debounce';
import { showToast } from '@/utils/toast'

const router = useRouter()

interface FormState {
  name: string;
  ff_type: string | undefined;
  time: Dayjs | undefined;
  fuel_variety: string;
  content: string;
  calories: string;
}
const formRef = ref();
const labelCol = { span: 5 };
const wrapperCol = { span: 13 };
const formState: UnwrapRef<FormState> = reactive({
  name: '',
  ff_type: 'sport',
  time: undefined,
  fuel_variety: 'Expenditure',
  content: '',
  calories: null
});
const rules: Record<string, Rule[]> = {
  name: [
    { required: true, message: 'Please input Activity name', trigger: 'change' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
  ff_type: [{ required: true, message: 'Please select Activity zone', trigger: 'change' }],
  time: [{ required: true, message: 'Please pick a date', trigger: 'change', type: 'object' }],
  // type: [
  //   {
  //     type: 'array',
  //     required: true,
  //     message: 'Please select at least one activity type',
  //     trigger: 'change',
  //   },
  // ],
  fuel_variety: [{ required: true, message: 'Please select activity fuel_variety', trigger: 'change' }],
  content: [{ message: 'Please input activity form', trigger: 'blur' }],
  calories: [{ required: true, message: 'Please input calories', trigger: 'blur' }]
};
const onSubmit = useDebounce(() => {
  formRef.value
    .validate()
    .then(() => {
      console.log('values', formState, toRaw(formState));
      handleCreateLog()
    })
    .catch(error => {
      console.log('error', error);
    });
});
const resetForm = () => {
  formRef.value.resetFields();
};
const handleCreateLog = async () => {
  try {
    showToast('创建中...', 'loading', 'add')
    let { code, msg } = await createConsumptions(toRaw(formState))
    if (code === '0000') {
      showToast('创建成功，可以继续创建', 'success', 'add')
      resetForm()
    } else {
      showToast(msg, 'warning', 'add')
      if (code === '1011') {
        router.push('/login')
      }
      console.log(msg)
    }
  } catch (error) {
    console.log('login err::', error)
    showToast('创建失败，请稍后再试', 'warning', 'add')
  }
}

const backToList = () => {
  router.push('/list')
}
</script>
<style scoped lang="less">
.back {
  position: absolute;
  top: 8%;
  left: 12%;
}
</style>