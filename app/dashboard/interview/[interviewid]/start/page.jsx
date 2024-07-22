"use client";
import { getainterview } from "@/app/actions/getainterview";
import React, { useEffect, useState } from "react";
import QuestionsSection from "./_components/QuestionsSection";
import RecordAnsSec from "./_components/RecordAnsSec";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
  console.log(mockinterviewquestion);
  console.log(activequestionindex);

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
          interviewdata={interviewdata}
        />
      </div>
      <div className="flex justify-end gap-6">
        {activequestionindex > 0 && (
          <Button
            onClick={() => setActivequestionindex(activequestionindex - 1)}
          >
            Previous
          </Button>
        )}
        {activequestionindex != mockinterviewquestion?.length - 1 && (
          <Button
            onClick={() => setActivequestionindex(activequestionindex + 1)}
          >
            Next
          </Button>
        )}
        {activequestionindex == mockinterviewquestion?.length - 1 && (
          <Link href={`/dashboard/interview/${interviewdata?.mockId}/feedback`}>
            <Button>End interview</Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default StartInterview;
