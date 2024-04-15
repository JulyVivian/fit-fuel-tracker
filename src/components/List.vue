<template>
  <a-button class="logout-btn" type="link" @click="GoToLogout">退出登录</a-button>
    <h2>我的运动健康记录</h2>
    <p style="text-align: left"><a-button @click="goToCreate" type="link" :icon="h(PlusCircleOutlined)">添加新的活动</a-button></p>
    <a-table bordered :data-source="dataSource" :columns="columns">
      <template #bodyCell="{ column, text, record }">
        <template v-if="column.dataIndex === 'content'">
          <div class="editable-cell">
            <div v-if="editableData[record.id]" class="editable-cell-input-wrapper">
              <a-input v-model:value="editableData[record.id].content" @pressEnter="save(record)" />
              <check-outlined class="editable-cell-icon-check" @click="save(record)" />
            </div>
            <div v-else class="editable-cell-text-wrapper">
              {{ text || ' ' }}
              <edit-outlined class="editable-cell-icon" @click="edit(record.id)" />
            </div>
          </div>
        </template>
        <template v-else-if="column.dataIndex === 'operation'">
          <a-popconfirm
            v-if="dataSource.length"
            title="Sure to delete?"
            @confirm="onDelete(record.id)"
          >
            <a-button danger type="link">删除</a-button>
          </a-popconfirm>
        </template>
      </template>
    </a-table>
  </template>
  <script lang="ts" setup>
  import { computed, reactive, ref, onBeforeMount, h } from 'vue';
  import type { Ref, UnwrapRef } from 'vue';
  import { CheckOutlined, EditOutlined, PlusCircleOutlined } from '@ant-design/icons-vue';
  import { cloneDeep } from 'lodash-es';
  import { columns as columnsData } from '../constants/trackerData.js'
  
  import { toLogout } from '../request/auth'
  import { updateConsumption, getConsumptions, deleteConsumption } from '../request/consumptions'
  import { useRouter } from 'vue-router'

  interface DataItem {
    id: string
    ff_type: string
    name: string
    time: String
    content: String
    fuel_variety: String
    calories: String
  }
  
  const router = useRouter()

  const columns = columnsData
  const editableData: UnwrapRef<Record<string, DataItem>> = reactive({});

  let fuelData = ref()

  onBeforeMount(() => {
    handleGetTrackers()
  })

  const handleGetTrackers = async () => {
    try {
      let { data } = await getConsumptions()
      fuelData.value = data
      console.log('consum:::', fuelData)
    } catch (error) {
      
    }
  }
  const dataSource: Ref<DataItem[]> = ref(fuelData);
  
  const edit = (id: string) => {
    editableData[id] = cloneDeep(dataSource.value.filter(item => id === item.id)[0]);
  };

  const save = async (column: object) => {
    try {
      const { id } = column
      let res = await updateConsumption(id, { content: editableData[id].content  })
      Object.assign(dataSource.value.filter(item => id === item.id)[0], editableData[id]);
      delete editableData[id];
    } catch (error) {
      console.log('update err::', error)
    }
  };
  
  const onDelete = async (id: string) => {
    try {
      let { code } = await deleteConsumption(id)
      if (code === '0000') {
        dataSource.value = dataSource.value.filter(item => item.id !== id);
      }
    } catch (error) {
      console.log('delete err::', error)
    }
  };

  const GoToLogout = async () => {
    try {
      let { code, msg } = await toLogout()
      if (code === '0000') {
        router.push('/login')
      } else {
        console.log(msg)
      }
    } catch (error) {
      console.log('logout err::', error)
    }
  }

  const goToCreate = () => {
    router.push('/create')
  }

  </script>
  <style lang="less" scoped>
  .logout-btn {
    float: right;
  }
  .editable-cell {
    position: relative;
    .editable-cell-input-wrapper,
    .editable-cell-text-wrapper {
      padding-right: 24px;
    }
  
    .editable-cell-text-wrapper {
      padding: 5px 24px 5px 5px;
    }
  
    .editable-cell-icon,
    .editable-cell-icon-check {
      position: absolute;
      right: 0;
      width: 20px;
      cursor: pointer;
    }
  
    .editable-cell-icon {
      margin-top: 4px;
      display: none;
    }
  
    .editable-cell-icon-check {
      line-height: 28px;
    }
  
    .editable-cell-icon:hover,
    .editable-cell-icon-check:hover {
      color: #108ee9;
    }
  
    .editable-add-btn {
      margin-bottom: 8px;
    }
  }
  .editable-cell:hover .editable-cell-icon {
    display: inline-block;
  }
  </style>
  