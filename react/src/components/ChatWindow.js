import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';  // 需要安装: npm install uuid
import './ChatWindow.css';

function ChatWindow() {
  // 存储聊天记录
  const [messages, setMessages] = useState([
    { text: '你好！我是聊天机器人，很高兴为您服务！', isBot: true }
  ]);
  // 存储输入框的值
  const [inputValue, setInputValue] = useState('');
  // 用于自动滚动
  const messagesEndRef = useRef(null);
  // 为会话生成一个固定的user_id
  const [userId] = useState(uuidv4());
  const [isLoading, setIsLoading] = useState(false);

  // 创建 axios 实例
  const api = axios.create({
    baseURL: 'http://192.168.31.65:8000/api',
    timeout: 30000,  // 设置为30秒
  });

  // 处理发送消息
  const handleSendMessage = async () => {
    if (inputValue.trim() === '' || isLoading) return;
    
    // 添加用户消息
    const userMessage = { text: inputValue, isBot: false };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // 发送请求到后端，添加user_id
      const response = await api.post('/chat', {
        user_id: userId,
        message: userMessage.text
      });

      // 添加机器人回复
      setMessages(prev => [...prev, {
        text: response.data.response,
        isBot: true
      }]);
    } catch (error) {
      console.error('Error:', error);
      let errorMessage = '抱歉，我遇到了一些问题，请稍后再试。';
      
      if (error.code === 'ECONNABORTED') {
        errorMessage = '请求超时，请稍后重试。';
      } else if (error.response) {
        if (error.response.status === 422) {
          errorMessage = '请求格式错误，请检查输入。';
        } else {
          errorMessage = `服务器错误 (${error.response.status})，请稍后重试。`;
        }
      } else if (error.request) {
        errorMessage = '无法连接到服务器，请检查网络连接。';
      }

      setMessages(prev => [...prev, {
        text: errorMessage,
        isBot: true
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // 处理按键事件
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // 阻止默认的换行行为
      handleSendMessage();
    }
  };

  // 自动滚动到底部
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="chat-window">
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`message ${message.isBot ? 'bot' : 'user'}`}
          >
            {message.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="chat-input-area">
        <textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="请输入消息..."
          rows="3"
        />
        <button onClick={handleSendMessage}>发送</button>
      </div>
    </div>
  );
}

export default ChatWindow;