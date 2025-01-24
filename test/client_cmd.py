import requests
import os
import uuid  # 用于生成用户ID

SERVER_URL = "http://192.168.31.65:8000/api/chat"

def clear_screen():
    os.system('cls')

def chat():
    clear_screen()
    print("=== AI客服系统 ===")
    print("输入 'quit' 退出程序")
    print("输入 'clear' 清屏")
    print("================\n")

    # 为这个会话生成一个固定的用户ID
    user_id = str(uuid.uuid4())

    while True:
        try:
            user_input = input("\n你: ")
            
            if user_input.lower() == 'quit':
                print("再见！")
                break
                
            if user_input.lower() == 'clear':
                clear_screen()
                continue

            if not user_input.strip():
                continue

            # 修改为正确的请求格式
            payload = {
                "user_id": user_id,
                "message": user_input
            }

            response = requests.post(
                SERVER_URL,
                json=payload,
                timeout=30
            )
            
            if response.status_code == 200:
                result = response.json()
                print("\nAI: ", result.get('response', '未获得有效回复'))
            else:
                print(f"\n错误: 服务器返回状态码 {response.status_code}")
                if response.status_code == 422:
                    print("详细错误信息:", response.json())
                
        except requests.exceptions.ConnectionError:
            print("\n连接错误: 无法连接到服务器")
        except requests.exceptions.Timeout:
            print("\n错误: 请求超时")
        except Exception as e:
            print(f"\n发生错误: {e}")

if __name__ == "__main__":
    chat()