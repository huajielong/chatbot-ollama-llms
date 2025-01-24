from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    OLLAMA_API_URL: str = "http://192.168.31.65:11434/api/chat"
    MODEL_NAME: str = "qwen:0.5b"
    MAX_HISTORY: int = 10
    
    # 系统提示词
    SYSTEM_PROMPT: str = """你是一个专业的客服代表，名字叫小智。
    请遵循以下规则：
    1. 保持礼貌和专业的态度
    2. 回答要简洁明了
    3. 不确定的信息要诚实说明
    4. 涉及具体价格和政策时，建议用户咨询在线人工客服
    """

settings = Settings() 