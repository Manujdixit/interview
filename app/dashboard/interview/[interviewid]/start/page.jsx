"use client";
import { getainterview } from "@/app/actions/getainterview";
import React, { useEffect, useState } from "react";
import QuestionsSection from "./_components/QuestionsSection";
import RecordAnsSec from "./_components/RecordAnsSec";

function StartInterview({ params }) {
  const [interviewdata, setInterviewdata] = useState(null);
  const [mockinterviewquestion, setMockinterviewquestion] = useState(null);
  const [activequestionindex, setActivequestionindex] = useState(1);

  useEffect(() => {
    async function fetchInterview() {
      const response = await getainterview(params.interviewid);
      setMockinterviewquestion(JSON.parse(response.data.jsonMockResp));
      setInterviewdata(response.data);
    }

    fetchInterview();
  }, [params.interviewid]);
  // console.log(mockinterviewquestion);
  // console.log(interviewdata);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <QuestionsSection
          mockinterviewquestion={mockinterviewquestion}
          activequestionindex={activequestionindex}
        />
        <RecordAnsSec
          mockinterviewquestion={mockinterviewquestion}
          activequestionindex={activequestionindex}
        />
      </div>
    </div>
  );
}

export default StartInterview;
