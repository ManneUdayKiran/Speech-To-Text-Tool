import { useRef, useState } from "react";

export default function useDeepgram() {
  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);
  const mediaStream = useRef(null);
  const ws = useRef(null);
  const audioContext = useRef(null);
  const processor = useRef(null);
  const source = useRef(null);

  const connectWebSocket = () => {
    ws.current = new WebSocket("ws://localhost:3000");

    ws.current.onopen = () => console.log("🔗 WebSocket connected to backend");

    ws.current.onmessage = (msg) => {
      const data = JSON.parse(msg.data);
      console.log("🧠 Deepgram/Backend message:", data);

      const transcriptText = data.channel?.alternatives?.[0]?.transcript;
      if (transcriptText) {
        setTranscript((prev) => prev + " " + transcriptText + " ");
        console.log("📝 Transcript:", transcriptText);
      }
    };

    ws.current.onerror = (e) => console.error("❌ WebSocket error:", e);
    ws.current.onclose = (e) => console.warn("⚠️ WebSocket closed:", e);
  };

  const startListening = async () => {
    if (isListening) return;

    connectWebSocket();

    mediaStream.current = await navigator.mediaDevices.getUserMedia({
      audio: { echoCancellation: true },
    });
    console.log("🎤 Microphone access granted");

    audioContext.current = new (window.AudioContext || window.webkitAudioContext)();
    await audioContext.current.audioWorklet.addModule("/processor.js");

    processor.current = new AudioWorkletNode(audioContext.current, "pcm-worklet-processor");

    let audioBufferQueue = [];

    processor.current.port.onmessage = (event) => {
      const chunk = new Int16Array(event.data);
      audioBufferQueue.push(chunk);

      const totalLength = audioBufferQueue.reduce((sum, arr) => sum + arr.length, 0);
      if (totalLength >= 1024) {
        const combined = new Int16Array(totalLength);
        let offset = 0;
        for (const b of audioBufferQueue) {
          combined.set(b, offset);
          offset += b.length;
        }

        if (ws.current?.readyState === 1) {
          ws.current.send(combined.buffer);
          console.log("📤 [AW] Sent buffered audio chunk:", combined.length);
        }

        audioBufferQueue = [];
      }
    };

    source.current = audioContext.current.createMediaStreamSource(mediaStream.current);
    source.current.connect(processor.current);
    processor.current.connect(audioContext.current.destination);

    setIsListening(true);
  };

  const stopListening = () => {
    setIsListening(false);
    if (mediaStream.current) mediaStream.current.getTracks().forEach((t) => t.stop());
    if (source.current) source.current.disconnect();
    if (processor.current) processor.current.disconnect();
    if (audioContext.current) audioContext.current.close();
    if (ws.current?.readyState === 1) {
      ws.current.close();
    }
    console.log("🛑 Stopped listening.");
  };

  return { transcript, isListening, startListening, stopListening };
}
