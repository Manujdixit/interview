import { Button } from "@/components/ui/button";
import { chatSession } from "@/utils/GeminiAi";
import { Mic, VideoOff } from "lucide-react";
import React, { useEffect, useState } from "react";
import useSpeechToText from "react-hook-speech-to-text";
import Webcam from "react-webcam";
import { toast } from "sonner";

function RecordAnsSec({ mockinterviewquestion, activequestionindex }) {
  const [useranser, setUseranser] = useState("");
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
    speechRecognitionProperties: { interimResults: true },
    googleApiKey: null,
    googleCloudRecognitionConfig: null,
    engine: "browser",
  });

  useEffect(() => {
    results.map((result) =>
      setUseranser((prevAns) => prevAns + result?.transcript)
    );
  }, [results]);

  const SaveUserAnswer = async () => {
    if (isRecording) {
      stopSpeechToText();
      // if (useranser.length < 10) {
      //   toast(`Response is too short, try to elaborate it.`);
      //   return;
      // }
      const feedbackPrompt = `Question: ${mockinterviewquestion[activequestionindex]?.question}, User answer: ${useranser}, depends on question and user answer for given interview question, please give us rating and feedback as area of improvement if any in just 3 to 5 lines to improve it in JSON format with rating field and feedback field.`;

      const result = await chatSession.sendMessage(feedbackPrompt);
      const input = result;

      function extractJson(text) {
        const match = text.match(/```json\n([\s\S]*?)\n```/);
        return match ? match[1] : null;
      }

      const mockjson = extractJson(
        input.response.candidates[0].content.parts[0].text
      );
      // console.log(mockjson);
      const jsonfeedbackresponse = JSON.parse(mockjson);
    } else {
      startSpeechToText();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex p-1 flex-col justify-center items-center bg-black rounded-lg mt-10">
        <VideoOff className="text-white w-48 h-48 absolute" />
        <Webcam
          className="rounded-lg"
          mirrored={true}
          style={{ height: 300, width: "100%", zIndex: 10 }}
        />
      </div>
      <Button variant="outline" className="my-10" onClick={SaveUserAnswer}>
        {isRecording ? (
          <h2 className="text-red-500 flex items-center gap-3">
            <Mic /> <h1>Stop Recording</h1>
          </h2>
        ) : (
          "Record response"
        )}
      </Button>

      {/* <ul>
        {results.map((result) => (
          <li key={result.timestamp}>{result.transcript}</li>
        ))}
        {interimResult && <li>{interimResult}</li>}
      </ul> */}
      <Button onClick={() => console.log(useranser)}></Button>
      {error && <p className="text-red-700">Error: {error}</p>}
    </div>
  );
}

export default RecordAnsSec;
