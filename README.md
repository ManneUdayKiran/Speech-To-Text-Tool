
# 🗣️ Live Speech-to-Text App with Deepgram

A real-time speech recognition app built with **React (Vite)** and **Express**, using the **Deepgram API** for accurate transcription. Speak into your microphone and watch your words appear live!

---

## Screenshots

![image](https://github.com/user-attachments/assets/6a2a7202-b07f-473a-95a0-ae8a14b0cd01)
![image](https://github.com/user-attachments/assets/31dabfd8-3558-4591-83c6-3799348b7d20)
![image](https://github.com/user-attachments/assets/ea95789d-092e-4ef5-bc8b-41cbe47976a9)

---


## 🚀 Features

- 🎤 Real-time voice transcription using Deepgram WebSocket API
- 📝 Transcript displayed in an editable Ant Design `TextArea`
- 🔁 Start/Stop recording toggle
- 📁 Export transcript as `.txt` file
- 🔄 Reset transcript with one click
- 🔊 Lottie animation while listening

---

## 🛠️ Tech Stack

- **Frontend**: React + Vite, Ant Design, LottieFiles
- **Backend**: Express.js, WebSocket, Deepgram SDK
- **Speech API**: [Deepgram Live Streaming](https://deepgram.com/product/speech-to-text)

---

## 📁 Folder Structure

```

speech-to-text-app/
├── Frontend/                     # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   └── MicRecorder.jsx
│   │   └── App.jsx
│   └── vite.config.js
├── Backend/                     # Express backend
│   ├── server.js
│   └── .env
├── .gitignore
├── README.md
└── package.json

````

---

## 🧪 Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/yourusername/speech-to-text-app.git
cd speech-to-text-app
````

### 2. Install Dependencies

**Server (Express + Deepgram):**

```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:

```
DEEPGRAM_API_KEY=your_deepgram_api_key_here
```

**Client (React + AntD + Lottie):**

```bash
cd ../Frontend
npm install
```

---

### 3. Run the App

**Start the server:**

```bash
cd backend
node server.js
```

**Start the frontend:**

```bash
cd ../Frontend
npm run dev
```

Open [`http://localhost:5173`](http://localhost:5173) in your browser.

---

## 📸 Demo Preview

> *"Live mic input and animated feedback while transcribing in real time!"*

![demo-gif](demo-preview.gif) <!-- Optional -->

---

## 📦 Built With

* [`@deepgram/sdk`](https://www.npmjs.com/package/@deepgram/sdk)
* [`@lottiefiles/dotlottie-react`](https://www.npmjs.com/package/@lottiefiles/dotlottie-react)
* [`antd`](https://ant.design/)
* `WebSockets`, `MediaRecorder`, `getUserMedia`

---

## 📜 License

MIT © 2025 \[M.Uday Kiran]

```

