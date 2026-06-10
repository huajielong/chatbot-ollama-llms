<p align="center">
  <img src="https://img.shields.io/badge/version-1.0.0-blue" alt="v1.0"/>
  <img src="https://img.shields.io/badge/license-MIT-green" alt="MIT"/>
  <img src="https://img.shields.io/badge/python-3.10+-orange" alt="Python 3.10+"/>
  <img src="https://img.shields.io/badge/React-18+-61DAFB" alt="React 18+"/>
  <img src="https://img.shields.io/badge/Ollama-✓-brightgreen" alt="Ollama"/>
  <img src="https://img.shields.io/badge/FastAPI-✓-009688" alt="FastAPI"/>
</p>

<h1 align="center">💬 Multi-Model Chatbot — Chatbot Ollama LLMs</h1>
<p align="center"><b>A multi-model chatbot powered by Ollama — Full-stack FastAPI + React application for private LLM deployment</b></p>
<p align="center">
  🤖 Local LLM · 💬 Streaming Chat · 🎨 Modern UI · 🔒 Data Privacy
</p>

<p align="center">
  <a href="#-quick-start">🚀 Quick Start</a> •
  <a href="#-architecture">🏗️ Architecture</a> •
  <a href="#-features">⚡ Features</a> •
  <a href="#-configuration">⚙️ Configuration</a> •
  <a href="#-faq">❓ FAQ</a>
</p>

> [中文说明](README.zh.md)

---

## 🤔 Want to build a private AI chat system?

Using public cloud APIs raises privacy concerns, and building one from scratch is too complex:

| You might be facing... | Chatbot Ollama LLMs solves it |
|:-----------------------|:-------------------------------|
| ❓ Data cannot leave the internal network; public cloud APIs are not an option | ✅ **Fully local** — Ollama private deployment, data never leaves your network |
| ❓ Building a chat UI from scratch is too much work | ✅ **Ready to use** — FastAPI backend + React frontend, complete solution |
| ❓ Want to compare different models | ✅ **Multi-model support** — Switch between any Ollama model with one click |
| ❓ Need customized chatbot personas | ✅ **Configurable system prompts** — Tailor the AI's personality to your needs |

---

## 🚀 Quick Start

### Prerequisites

| Dependency | Version | Description |
|:-----------|:-------:|:------------|
| Python | 3.10+ | Backend runtime |
| Node.js | 18+ | Frontend build |
| Ollama | Latest | Local LLM service |

### Installation & Launch

```bash
# 1. Clone the repository
git clone https://github.com/huajielong/chatbot-ollama-llms.git
cd chatbot-ollama-llms

# 2. Start Ollama (make sure it's installed)
ollama pull qwen:0.5b  # Download a model
ollama serve           # Start Ollama service

# 3. Start the backend
pip install -r llms/requirements.txt
python llms/main.py    # Start FastAPI (port 8000)

# 4. Start the frontend (new terminal)
cd react
npm install
npm start              # Start React (port 3000)
```

Open your browser and visit `http://localhost:3000` to start chatting.

---

## 🏗️ Architecture

```
┌──────────────────┐     ┌────────────────────┐     ┌──────────────┐
│  React Frontend  │────>│  FastAPI Backend    │────>│    Ollama    │
│  (Port 3000)     │<────│  (Port 8000)       │<────│  (Local LLM) │
└──────────────────┘     └────────────────────┘     └──────────────┘
```

### Backend Structure

```
llms/
├── main.py                  # FastAPI application entry point
├── config/
│   └── settings.py          # Configuration (Ollama URL, model, persona)
├── controllers/
│   └── chat_controller.py   # Chat API routes
├── services/
│   └── chat_service.py      # Ollama API invocation logic
└── models/
    └── chat.py              # Data model definitions
```

### Frontend Structure

```
react/
├── src/                     # React source code
├── public/                  # Static assets
├── scripts/                 # Build scripts
├── package.json             # Dependency configuration
└── README.md                # Frontend documentation
```

---

## ⚡ Features

| Feature | Description |
|:--------|:------------|
| 🤖 **Local LLM** | Supports all open-source models via Ollama (Qwen, Llama, Mistral, etc.) |
| 💬 **Real-time Chat** | Streaming interaction between frontend and backend |
| 🎨 **Modern UI** | Responsive interface built with React 18 |
| 🔒 **Data Privacy** | Fully local operation; conversation data never leaves your network |
| 🧠 **Conversation Memory** | Supports historical context with configurable max rounds |
| 🎭 **Custom Persona** | Configurable system prompts for tailored AI behavior |
| ⚡ **FastAPI Performance** | Async architecture for low-latency responses |

---

## ⚙️ Configuration

Edit `llms/config/settings.py`:

```python
# Ollama API URL
OLLAMA_API_URL = "http://192.168.31.65:11434/api/chat"

# Model name (must be downloaded in Ollama first)
MODEL_NAME = "qwen:0.5b"

# Maximum conversation history rounds
MAX_HISTORY = 10

# System prompt (AI persona)
SYSTEM_PROMPT = """You are a professional customer service representative named XiaoZhi.
Please remain polite and professional, and keep your answers concise."""
```

### Switching Models

```bash
ollama pull llama3.2:3b        # Download a new model
# Edit MODEL_NAME in settings.py to "llama3.2:3b"
# Restart the backend to apply the change
```

---

## ❓ FAQ

<details>
<summary><b>How do I install Ollama?</b></summary>
Visit <a href="https://ollama.ai">ollama.ai</a> to download the installer, or use <code>curl -fsSL https://ollama.ai/install.sh | sh</code> for a one-line installation.
</details>

<details>
<summary><b>Which models are supported?</b></summary>
All models supported by Ollama are compatible: Qwen2, Llama 3, Mistral, Gemma, Phi, etc. Simply change the MODEL_NAME in the configuration to switch.
</details>

<details>
<summary><b>Can I access it over the public internet?</b></summary>
By default, it is intended for internal network use only. For public internet access, add authentication mechanisms in the FastAPI configuration and set up HTTPS.
</details>

<details>
<summary><b>Are chat histories saved?</b></summary>
Conversation history is kept in memory (configurable via MAX_HISTORY) and is cleared upon restart. For persistent storage, you can extend the application with database support.
</details>

---

## 🤝 Contributing

Issues and Pull Requests are welcome!

<a href="https://github.com/huajielong/chatbot-ollama-llms/graphs/contributors">
  <img src="https://img.shields.io/badge/contributions-welcome-brightgreen" alt="Contributions Welcome"/>
</a>

## 📄 License

MIT © [huajielong](https://github.com/huajielong)

---

<p align="center">
  ⭐ If this project helps you, please give it a Star!
</p>
