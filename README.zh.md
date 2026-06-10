<p align="center">
  <img src="https://img.shields.io/badge/version-1.0.0-blue" alt="v1.0"/>
  <img src="https://img.shields.io/badge/license-MIT-green" alt="MIT"/>
  <img src="https://img.shields.io/badge/python-3.10+-orange" alt="Python 3.10+"/>
  <img src="https://img.shields.io/badge/React-18+-61DAFB" alt="React 18+"/>
  <img src="https://img.shields.io/badge/Ollama-✓-brightgreen" alt="Ollama"/>
  <img src="https://img.shields.io/badge/FastAPI-✓-009688" alt="FastAPI"/>
</p>

<h1 align="center">💬 多模型聊天机器人 Chatbot — Ollama LLMs</h1>
<p align="center"><b>基于 Ollama 的多模型聊天机器人 — FastAPI + React 全栈，本地 LLM 私有化部署</b></p>
<p align="center">
  🤖 本地 LLM · 💬 流式对话 · 🎨 现代前端 · 🔒 数据私密
</p>

<p align="center">
  <a href="#-快速开始">🚀 快速开始</a> •
  <a href="#-系统架构">🏗️ 架构</a> •
  <a href="#-核心功能">⚡ 核心功能</a> •
  <a href="#-配置指南">⚙️ 配置指南</a> •
  <a href="#-常见问题">❓ 常见问题</a>
</p>

---

## 🤔 想搭建私有的 AI 客服系统？

使用公有云 API 有隐私顾虑，自行开发又太复杂：

| 你可能遇到的问题 | Chatbot Ollama LLMs 帮你解决 |
|:-----------------|:----------------------------|
| ❓ 数据不能出内网，不能用公有云 API | ✅ **全本地运行** — Ollama 私有化部署，数据不出门 |
| ❓ 自己搭聊天界面太麻烦 | ✅ **开箱即用** — FastAPI 后端 + React 前端完整方案 |
| ❓ 想用不同模型做对比 | ✅ **多模型支持** — 一键切换 Ollama 上的任何模型 |
| ❓ 需要定制客服话术 | ✅ **自定义人设** — 系统提示词可配置 |

---

## 🚀 快速开始

### 环境要求

| 依赖 | 版本 | 说明 |
|:-----|:----:|:-----|
| Python | 3.10+ | 后端运行环境 |
| Node.js | 18+ | 前端构建 |
| Ollama | 最新 | 本地 LLM 服务 |

### 安装与运行

```bash
# 1. 克隆项目
git clone https://github.com/huajielong/chatbot-ollama-llms.git
cd chatbot-ollama-llms

# 2. 启动 Ollama（确保已安装）
ollama pull qwen:0.5b  # 下载模型
ollama serve           # 启动服务

# 3. 启动后端
pip install -r llms/requirements.txt
python llms/main.py    # 启动 FastAPI（端口 8000）

# 4. 启动前端（新终端）
cd react
npm install
npm start              # 启动 React（端口 3000）
```

打开浏览器访问 `http://localhost:3000` 即可开始对话。

---

## 🏗️ 系统架构

```
┌──────────────┐     ┌──────────────────┐     ┌──────────────┐
│   React 前端  │────>│  FastAPI 后端     │────>│   Ollama     │
│  (端口 3000)  │<────│  (端口 8000)     │<────│  (本地 LLM)  │
└──────────────┘     └──────────────────┘     └──────────────┘
```

### 后端结构

```
llms/
├── main.py                  # FastAPI 应用入口
├── config/
│   └── settings.py          # 配置（Ollama URL、模型、人设）
├── controllers/
│   └── chat_controller.py   # 聊天 API 路由
├── services/
│   └── chat_service.py      # Ollama API 调用逻辑
└── models/
    └── chat.py              # 数据模型定义
```

### 前端结构

```
react/
├── src/                     # React 源码
├── public/                  # 静态资源
├── scripts/                 # 构建脚本
├── package.json             # 依赖配置
└── README.md                # 前端文档
```

---

## ⚡ 核心功能

| 功能 | 说明 |
|:-----|:------|
| 🤖 **本地 LLM** | 基于 Ollama，支持所有开源模型（Qwen、Llama、Mistral 等） |
| 💬 **实时对话** | 前端与后端流式交互 |
| 🎨 **现代界面** | React 18 构建的响应式 UI |
| 🔒 **数据私密** | 全本地运行，对话数据不出内网 |
| 🧠 **对话记忆** | 支持历史上下文（可配置最大轮数） |
| 🎭 **自定义人设** | 系统提示词可配置，打造专属 AI 客服 |
| ⚡ **FastAPI 高性能** | 异步架构，低延迟 |

---

## ⚙️ 配置指南

编辑 `llms/config/settings.py`：

```python
# Ollama 服务地址
OLLAMA_API_URL = "http://192.168.31.65:11434/api/chat"

# 模型名称（需已在 Ollama 中下载）
MODEL_NAME = "qwen:0.5b"

# 最大历史对话轮数
MAX_HISTORY = 10

# 系统提示词（AI 人设）
SYSTEM_PROMPT = """你是一个专业的客服代表，名字叫小智。
请保持礼貌和专业，回答简洁明了。"""
```

### 切换模型

```bash
ollama pull llama3.2:3b    # 下载新模型
# 修改 settings.py 中的 MODEL_NAME = "llama3.2:3b"
# 重启后端即可
```

---

## ❓ 常见问题

<details>
<summary><b>Ollama 怎么安装？</b></summary>
访问 <a href="https://ollama.ai">ollama.ai</a> 下载安装包，或使用 <code>curl -fsSL https://ollama.ai/install.sh | sh</code> 一键安装。
</details>

<details>
<summary><b>支持哪些模型？</b></summary>
Ollama 支持的所有模型都兼容：Qwen2、Llama 3、Mistral、Gemma、Phi 等。只需修改配置中的 MODEL_NAME 即可切换。
</details>

<details>
<summary><b>可以在公网访问吗？</b></summary>
默认仅供内网使用。如需公网访问，请在 FastAPI 配置中添加认证机制，并配置 HTTPS。
</details>

<details>
<summary><b>对话记录会保存吗？</b></summary>
对话历史保存在内存中（可配置 MAX_HISTORY），重启后清空。如需持久化保存，可自行扩展数据库支持。
</details>

---

## 🤝 贡献

欢迎提交 Issue 或 Pull Request！

<a href="https://github.com/huajielong/chatbot-ollama-llms/graphs/contributors">
  <img src="https://img.shields.io/badge/contributions-welcome-brightgreen" alt="Contributions Welcome"/>
</a>

## 📄 License

MIT © [huajielong](https://github.com/huajielong)

---

<p align="center">
  ⭐ 如果这个项目对你有帮助，请点个 Star 支持一下！
</p>
