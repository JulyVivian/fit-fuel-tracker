import { message, MessageType } from 'ant-design-vue';

// 封装一个函数用于显示 Toast
export const showToast = (content: string, type: MessageType = 'info', key: string | null = null) => {
  message[type]({
    content,
    // ...type === 'loading' ? {} : { duration: 2 },
    key
  });
};

export const hideToast= () => {
  message.destroy()
}