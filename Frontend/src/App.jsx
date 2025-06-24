import React from "react";
import { Button, Typography, Input } from "antd";
import MicIcon from "@mui/icons-material/Mic";
import StopIcon from "@mui/icons-material/Stop";
import useDeepgram from "./hooks/useDeepgram";
import Lottie from "lottie-react";
// import listenAnim from "./assets/listen.json";

const { Title } = Typography;
const { TextArea } = Input;
import MicRecorder from './components/MicRecorder';
const App = () => {
  const { transcript, isListening, startListening, stopListening } = useDeepgram();

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <Title>🎙️ Live Speech-to-Text</Title>
      {/* <Lottie animationData={listenAnim} style={{ height: 200 }} /> */}
      <MicRecorder />
      
    </div>
  );
};

export default App;
