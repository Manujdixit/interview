"use client";
import { getainterview } from "@/app/actions/getainterview";
import { Button } from "@/components/ui/button";
import { WebcamIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";

function Interview({ params }) {
  const [interviewdata, setInterviewdata] = useState(null);
  const [webcamenabled, setWebcamenabled] = useState(false);

  useEffect(() => {
    console.log(params.interviewid);

    async function fetchInterview() {
      const response = await getainterview(params.interviewid);
      setInterviewdata(response);
    }
    // fetchInterview();
  }, [params.interviewid]);
  //   if (!interviewdata) return <div>Loading...</div>;
  console.log(interviewdata);

  return (
    <>
      {/* <div>Interview: {JSON.stringify(interviewdata)}</div> */}
      <div className="my-10 flex justify-center flex-col items-center">
        <h2 className="font-bold text-2xl">Let's Get Started</h2>
        <div>
          {webcamenabled ? (
            <Webcam
              mirrored={true}
              onUserMedia={() => setWebcamenabled(true)}
              onUserMediaError={() => setWebcamenabled(false)}
              style={{ height: 300, width: 300 }}
            />
          ) : (
            <>
              <WebcamIcon className="h-72 w-full my-7 p-20 bg-secondary rounded-lg border" />
              <Button onClick={() => setWebcamenabled(true)}>
                Enable webcam and microphone
              </Button>
            </>
          )}
        </div>
        <div className="flex flex-col my-5">
          <h2>
            <strong>Job role/ position:</strong>
            {interviewdata.jobposition}
          </h2>
        </div>
      </div>
    </>
  );
}

export default Interview;
