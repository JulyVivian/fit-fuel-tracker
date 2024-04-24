<template>
    <h2>货物运输合同</h2>
    <a-form :disabled="saved" :model="formState" name="basic" :label-col="{ span: 4 }" :wrapper-col="{ span: 14 }" autocomplete="off"
 layout="horizontal">
        <a-form-item v-for="item in details" :label="item.value" :name="item.label"
            :rules="[{ required: true, message: 'Please input text!' }]">
            <a-input v-if="item.label !== 'remark'" v-model:value="formState[item.label]" />
            <a-textarea :rows="6" v-else v-model:value="formState[item.label]" />
        </a-form-item>

        <p style="text-align: right">荆门市荆顺达物流</p>
        <p style="text-align: right">联系电话:13093213488</p>
        <p style="text-align: right">{{ formattedDate }}</p>

    </a-form>
    <a-float-button :style="{ overflow: 'hidden', right: '320px' }" @click="onFinish" description="保存"></a-float-button>
    <a-float-button type="primary" :style="{ overflow: 'hidden', right: '270px' }" @click="clickCopyData" description="复制"></a-float-button>
    <a-float-button :style="{ overflow: 'hidden', right: '220px' }" @click="handleEdit" description="编辑"></a-float-button>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { details, defaultRemark } from '@/constants/deal'
import dayjs from 'dayjs';
import useClipBoard from 'vue-clipboard3'
import { EditOutlined } from '@ant-design/icons-vue';

interface FormState {
    carrier: string;
    license: string;
    id: string;
    phone: string;
    name: string;
    weight: string;
    fee: string;
    shipping_address: string;
    delivery_address: string;
    remark: string;
}

const formState = reactive<FormState>({
    carrier: '',
    license: '',
    id: '',
    phone: '',
    name: '',
    weight: '',
    fee: '',
    shipping_address: '',
    delivery_address: '',
    remark: defaultRemark
});

const formattedDate = dayjs().format('YYYY年MM月DD日');

const saved = ref(false)

const { toClipboard } = useClipBoard()

const onFinish = (values: any) => {
    console.log('Success:', values);
    saved.value = true
};
// 复制表格
const clickCopyData = async () => {
  try {
    let str = '  货物运输合同\n'
    details.forEach(item => {
        str += `${item.value}: ${formState[item.label]}\n`
    });
    str += '            荆门市荆顺达物流\n'
    str += '   联系电话:13093213488\n'
    str += `          ${formattedDate}\n`
    await toClipboard(str)
  } catch (err) {
    console.log(err)
  }
}

const handleEdit = () => {
    saved.value = false
}
</script>
<style lang="less">
h2 {
    margin-top: 10px;
}
.ant-form {
    padding: 0 5px;
    .ant-form-item {
        margin-bottom: 0;
        .ant-form-item-label {
            max-width: 80px;
        }

        .ant-form-item-control {
            max-width: calc(100% - 100px);
        }
    }
}
</style>
<style lang="less">
* {
    margin: 0 !important;
    padding: 0;
    overflow-x: hidden;
}
</style>