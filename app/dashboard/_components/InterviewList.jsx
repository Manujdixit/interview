"use client";
import { getInterviewList } from "@/app/actions/getInterviewList";
import React, { useEffect, useState } from "react";
import InterviewItemCard from "./InterviewItemCard";

function InterviewList() {
  const [InterviewList, setInterviewList] = useState([]);
  // console.log(params);
  useEffect(() => {
    async function getInterviewListFunction() {
      const response = await getInterviewList();
      console.log(response);
      setInterviewList(response.data);
    }
    getInterviewListFunction();
  }, []);

  return (
    <div>
      <h2 className="font-medium text-xl">Previous mock interviews</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3">
        {InterviewList &&
          InterviewList.map((interview, index) => (
            <InterviewItemCard key={index} interview={interview} />
          ))}
      </div>
    </div>
  );
}

export default InterviewList;
