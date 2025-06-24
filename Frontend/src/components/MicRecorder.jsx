import { useEffect, useRef, useState } from "react";
import { Input, Button } from "antd";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const { TextArea } = Input;

export default function MicRecorder() {
  const [socket, setSocket] = useState(null);
  const [microphone, setMicrophone] = useState(null);
  const [transcript, setTranscript] = useState("");
  const isRecording = useRef(false);
  const [listening, setListening] = useState(false); // triggers Lottie animation

  useEffect(() => {
    const ws = new WebSocket("https://speech-to-text-tool-backend.onrender.com");
    ws.onopen = () => {
      console.log("🔗 Connected to server");
      setSocket(ws);
    };
    ws.onmessage = (event) => {
      if (!event.data) return;
      try {
        const data = JSON.parse(event.data);
        const text = data.channel?.alternatives?.[0]?.transcript;
        if (text) {
          setTranscript((prev) => prev + " " + text);
        }
      } catch (err) {
        console.error("JSON parse error:", err);
      }
    };
    ws.onclose = () => console.log("❌ Disconnected from server");
    return () => ws.close();
  }, []);

  const getMicrophone = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream, { mimeType: "audio/webm" });
      return recorder;
    } catch (error) {
      console.error("🎤 Mic access error:", error);
      throw error;
    }
  };

  const openMicrophone = async () => {
    if (!socket || socket.readyState !== WebSocket.OPEN) return;

    const recorder = await getMicrophone();

    recorder.ondataavailable = (event) => {
      if (event.data.size > 0 && socket.readyState === WebSocket.OPEN) {
        socket.send(event.data);
        console.log("📤 Sent audio data");
      }
    };

    recorder.onstart = () => {
      console.log("🎙 Mic recording started");
      isRecording.current = true;
      setListening(true);
    };

    recorder.onstop = () => {
      console.log("🛑 Mic recording stopped");
      isRecording.current = false;
      setListening(false);
    };

    recorder.start(1000);
    setMicrophone(recorder);
  };

  const toggleRecording = async () => {
    if (isRecording.current && microphone) {
      microphone.stop();
      setMicrophone(null);
    } else {
      await openMicrophone();
    }
  };

  const exportTranscript = () => {
  const blob = new Blob([transcript], { type: "text/plain" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "transcript.txt";
  a.click();

  URL.revokeObjectURL(url);
};
const resetTranscript = () => {
  setTranscript("");
};


  return (
    <div style={{ maxWidth: 600, margin: "2rem auto", textAlign: "center" }}>
      <Button type={listening ? "primary" : "default"} onClick={toggleRecording}>
        {listening ? "🛑 Stop Listening" : "🎤 Start Listening"}
      </Button>

      {listening && (
        <div style={{ margin: "1rem auto", maxWidth: 200 }}>
          <DotLottieReact
            src="https://lottie.host/24be2278-2ff4-47cc-a733-47357dd2a884/zh4PP8qaZ3.lottie"
            autoplay
            loop
            style={{ width: "100%" }}
          />
        </div>
      )}

      <TextArea
        rows={8}
        value={transcript}
        placeholder="Your words appear here..."
        style={{ marginTop: "1.5rem", fontSize: "1.1rem" }}
        readOnly
      />
      <Button onClick={exportTranscript} style={{ marginTop: "1rem" }}>
  📁 Export Transcript
</Button>
<Button onClick={resetTranscript} danger style={{ marginTop: "0.5rem", marginLeft: "0.5rem" }}>
  🔄 Reset
</Button>


    </div>
  );
}
