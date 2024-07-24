import { useRouter } from "next/navigation";
import React from "react";

function InterviewItemCard({ interview }) {
  console.log(interview);

  const formattedDate = new Date(interview.createdAt).toLocaleDateString();

  const router = useRouter();

  const handleClick = () => {
    router.push(`/dashboard/interview/${interview.mockId}/feedback`);
  };

  return (
    <div
      className="border shadow-sm rounded-lg p-3 hover:scale-105 hover:shadow-md cursor-pointer transition-all"
      onClick={handleClick}
    >
      <h2 className="font-bold text-[#007DFC]">{interview?.jobPosition}</h2>
      <h2 className="h2 text-sm text-gray-600">
        {interview.jobExperience} Years of experience
      </h2>
      <h2 className="text-xs text-gray-400">Created at: {formattedDate}</h2>
    </div>
  );
}

export default InterviewItemCard;
