from fastapi import APIRouter, HTTPException
from models.chat import ChatRequest, ChatResponse
from services.chat_service import ChatService, ChatServiceError

router = APIRouter()
chat_service = ChatService()

@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    try:
        response = await chat_service.get_response(
            request.user_id,
            request.message
        )
        return ChatResponse(response=response)
    except ChatServiceError as e:
        return ChatResponse(
            response="抱歉，系统出现了问题，请稍后重试。",
            error=str(e)
        ) 