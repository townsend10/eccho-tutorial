import Vapi from "@vapi-ai/web";
import { useEffect, useState } from "react";

interface TranscriptMessage {
  role: "user" | "assistant";
  text: string;
}

export const useVapi = () => {
  const [vapi, setVapi] = useState<Vapi | null>(null);
  const [isConected, setIsConected] = useState(false);
  const [isConecting, setIsConecting] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState<TranscriptMessage[]>([]);

  useEffect(() => {
    const vapiInstance = new Vapi("67f6cded-6124-4b10-aa1a-604a86254464");
    setVapi(vapiInstance);

    vapiInstance.on("call-start", () => {
      (setIsConected(true), setIsConecting(false), setTranscript([]));
    });
    vapiInstance.on("call-end", () => {
      (setIsConected(false), setIsConecting(false), setIsSpeaking(false));
    });

    vapiInstance.on("speech-start", () => {
      setIsSpeaking(true);
    });
    vapiInstance.on("speech-end", () => {
      setIsSpeaking(false);
    });
    vapiInstance.on("error", (error) => {
      console.log(error);

      setIsConecting(false);
    });

    vapiInstance.on("message", (message) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        setTranscript((prev) => [
          ...prev,
          {
            role: message.role === "user" ? "user" : "assistant",
            text: message.transcript,
          },
        ]);
      }
    });

    return () => {
      vapiInstance?.stop();
    };
  }, []);

  const startCall = () => {
    setIsConecting(true);

    if (vapi) {
      vapi.start("1e9805a8-ceb8-4285-a50b-d63ca12da456");
    }
  };

  const endCall = () => {
    if (vapi) {
      vapi.stop();
    }
  };

  return {
    isSpeaking,
    isConected,
    isConecting,
    transcript,
    startCall,
    endCall,
  };
};
