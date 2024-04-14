<template>
    <a-form :form="form" @finish="handleSubmit" layout="vertical" class="custom-form">
        <a-form-item label="Name" name="name" :rules="rules.name">
            <a-input v-model:value="itemName" />
        </a-form-item>
        <a-form-item label="Type" name="type" :rules="rules.type">
            <a-input v-model:value="itemType" />
        </a-form-item>
        <a-form-item label="Time" name="time" :rules="rules.time">
            <a-input v-model:value="itemTime" />
        </a-form-item>
        <a-form-item label="Content" name="content" :rules="rules.content">
            <a-input v-model:value="itemContent" />
        </a-form-item>
        <a-form-item label="Fuel Variety" name="fuel_variety" :rules="rules.fuel_variety">
            <a-input v-model:value="itemFuelVariety" />
        </a-form-item>
        <a-form-item label="Calories" name="calories" :rules="rules.calories">
            <a-input v-model:value="itemCalories" />
        </a-form-item>
        <a-form-item label="Remarks" name="remarks">
            <a-input v-model:value="itemRemarks" />
        </a-form-item>
        <a-form-item>
            <a-button type="primary" html-type="submit">Create Item</a-button>
        </a-form-item>
    </a-form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Form, Input, Button } from 'ant-design-vue';

interface Rules {
    [key: string]: { required: boolean, message: string, trigger: string }[];
}

export default defineComponent({
    components: {
        'a-form': Form,
        'a-form-item': Form.Item,
        'a-input': Input,
        'a-button': Button
    },
    setup() {
        const form = ref<any>(null);
        const itemKey = ref<string>('');
        const itemName = ref<string>('');
        const itemType = ref<string>('');
        const itemTime = ref<string>('');
        const itemContent = ref<string>('');
        const itemFuelVariety = ref<string>('');
        const itemCalories = ref<string>('');
        const itemRemarks = ref<string>('');

        const handleSubmit = () => {
            form.value.validateFields().then(() => {
                console.log('Item submitted:', {
                    name: itemName.value,
                    type: itemType.value,
                    time: itemTime.value,
                    content: itemContent.value,
                    fuel_variety: itemFuelVariety.value,
                    calories: itemCalories.value,
                    remarks: itemRemarks.value
                });
                // 在这里可以将 item 提交到后端或者进行其他操作
            });
        };

        const rules: Rules = {
            name: [{ required: true, message: 'Please enter name', trigger: 'blur' }],
            type: [{ required: true, message: 'Please enter type', trigger: 'blur' }],
            time: [{ required: true, message: 'Please enter time', trigger: 'blur' }],
            content: [{ required: true, message: 'Please enter content', trigger: 'blur' }],
            fuel_variety: [{ required: true, message: 'Please enter fuel variety', trigger: 'blur' }],
            calories: [{ required: true, message: 'Please enter calories', trigger: 'blur' }]
        };

        return {
            form,
            itemKey,
            itemName,
            itemType,
            itemTime,
            itemContent,
            itemFuelVariety,
            itemCalories,
            itemRemarks,
            handleSubmit,
            rules
        };
    }
});

</script>

<style scoped>
.custom-form {
    max-width: 400px;
    margin: 0 auto;
}

.custom-form .ant-form-item {
    margin-bottom: 20px;
}

.custom-form .ant-form-item-label {
    font-weight: bold;
}

.custom-form .ant-input {
    width: 100%;
}

.custom-form .ant-input-number {
    width: 100%;
}

.custom-form .ant-button {
    width: 100%;
}
</style>
