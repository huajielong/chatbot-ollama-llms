from typing import List, Dict
import requests
from config.settings import settings
from models.chat import Message

class ChatService:
    def __init__(self):
        self.conversations: Dict[str, List[Message]] = {}
    
    def _get_conversation(self, user_id: str) -> List[Message]:
        """获取用户对话历史"""
        return self.conversations.get(user_id, [])
    
    def _update_conversation(self, user_id: str, user_message: str, bot_message: str):
        """更新对话历史"""
        if user_id not in self.conversations:
            self.conversations[user_id] = []
            
        conversation = self.conversations[user_id]
        conversation.extend([
            Message(role="user", content=user_message),
            Message(role="assistant", content=bot_message)
        ])
        
        # 保留最近的对话
        self.conversations[user_id] = conversation[-settings.MAX_HISTORY:]
    
    async def get_response(self, user_id: str, user_message: str) -> str:
        """获取AI回复"""
        conversation = self._get_conversation(user_id)
        
        messages = [
            Message(role="system", content=settings.SYSTEM_PROMPT),
            *conversation,
            Message(role="user", content=user_message)
        ]
        
        try:
            payload = {
                "model": settings.MODEL_NAME,
                "messages": [msg.dict() for msg in messages],
                "stream": False
            }
            
            response = requests.post(settings.OLLAMA_API_URL, json=payload)
            response.raise_for_status()
            
            bot_message = response.json()["message"]["content"]
            self._update_conversation(user_id, user_message, bot_message)
            
            return bot_message
            
        except Exception as e:
            raise ChatServiceError(f"聊天服务出错: {str(e)}")

class ChatServiceError(Exception):
    pass 