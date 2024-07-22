import { createAnswer } from "@/app/actions/createAnswer";
import { Button } from "@/components/ui/button";
import { chatSession } from "@/utils/GeminiAi";
import { Mic, MicOff, VideoOff } from "lucide-react";
import React, { useEffect, useState } from "react";
import useSpeechToText from "react-hook-speech-to-text";
import Webcam from "react-webcam";
import { toast } from "sonner";

function RecordAnsSec({
  mockinterviewquestion,
  activequestionindex,
  interviewdata,
}) {
  const [useranser, setUseranser] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults,
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

  useEffect(() => {
    console.log(
      "useEffect triggered. isRecording:",
      isRecording,
      "useranser length:",
      useranser.length
    );
    if (!isRecording && useranser.length > 1) {
      UpdateUserAnswer();
      console.log("Calling UpdateUserAnswer from useEffect");
    }
  }, [useranser, isRecording]);

  const StartStopRecording = async () => {
    if (isRecording) {
      console.log("Stopping speech to text");
      stopSpeechToText();
      console.log("Speech to text stopped");
    } else {
      console.log("Starting speech to text");
      startSpeechToText();
    }
  };

  const UpdateUserAnswer = async () => {
    console.log("UpdateUserAnswer called");
    try {
      console.log(useranser);
      setLoading(true);
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
      console.log(mockjson);
      const jsonfeedbackresponse = JSON.parse(mockjson);

      console.log(interviewdata);
      console.log(mockinterviewquestion);
      console.log(activequestionindex);
      console.log(useranser);
      console.log(jsonfeedbackresponse);

      const formData = new FormData();
      formData.append("mockIdRef", interviewdata.mockId);
      formData.append(
        "question",
        mockinterviewquestion[activequestionindex]?.question
      );
      formData.append(
        "correctAns",
        mockinterviewquestion[activequestionindex]?.answer
      );
      formData.append("userAns", useranser);
      formData.append("feedback", jsonfeedbackresponse?.feedback);
      formData.append("rating", jsonfeedbackresponse?.rating);

      const response = await createAnswer(formData);

      if (response.success) {
        toast("answer saved successfully");
        setUseranser("");
        setResults([]);
      } else {
        throw new Error(response.error || "failed to save answer");
      }
      setResults([]);
      setLoading(false);
    } catch (error) {
      console.error("Error in updateduseranswer", error);
      toast.error(`Error:${error.message}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex p-1 flex-col justify-center items-center bg-black rounded-lg mt-10 mb-10">
        <VideoOff className="text-white w-48 h-48 absolute" />
        <Webcam
          className="rounded-lg"
          mirrored={true}
          style={{ height: 300, width: "100%", zIndex: 10 }}
        />
      </div>
      <Button
        variant={isRecording ? "destructive" : "outline"}
        size="lg"
        className="mb-6 transition-all duration-300 ease-in-out transform hover:scale-105"
        disabled={loading}
        onClick={StartStopRecording}
      >
        {isRecording ? (
          <span className="flex items-center gap-2">
            <MicOff className="animate-pulse" /> Stop Recording
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Mic /> Start Recording
          </span>
        )}
      </Button>

      {isRecording && (
        <div className="w-full mb-6">
          <h3 className="text-lg font-semibold mb-2">Live Transcript:</h3>
          <div className="bg-white p-4 rounded-lg shadow">
            <p>{interimResult || useranser || "Listening..."}</p>
          </div>
        </div>
      )}

      {error && (
        <div className="w-full p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg mb-6">
          <p className="font-bold">Error:</p>
          <p>{error}</p>
        </div>
      )}

      {loading && (
        <div className="w-full text-center">
          <p className="text-lg font-semibold">Processing your answer...</p>
        </div>
      )}
    </div>
  );
}

export default RecordAnsSec;
