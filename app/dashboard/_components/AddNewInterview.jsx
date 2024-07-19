"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/GeminiAi";
import { LoaderCircle } from "lucide-react";

function AddNewInterview() {
  const [open, setOpen] = React.useState(false);
  const [jobposition, setJobposition] = useState("");
  const [jobdescription, setJobdescription] = useState("");
  const [jobexperience, setJobexperience] = useState("");
  const [loading, setLoading] = useState(false);
  const [jsonresponse, setJsonresponse] = useState("");

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const interviewData = {
      jobposition,
      jobdescription,
      jobexperience,
    };
    console.log(interviewData);

    const InputPrompt =
      "Job position: " +
      jobposition +
      ", Job Description: " +
      jobdescription +
      ", Years of Experience : " +
      jobexperience +
      ", Depends on Job Position, Job Description & Years of Experience give us " +
      process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT +
      " Interview question along with Answer in JSON format, Give us question and answer field on JSON";

    const result = await chatSession.sendMessage(InputPrompt);

    const input = result.response.text();

    function extractJson(text) {
      const match = text.match(/```json\n([\s\S]*?)\n```/);
      return match ? match[1] : null;
    }

    const mockjson = extractJson(input);
    // console.log(JSON.parse(mockjson));
    setJsonresponse(mockjson);
    setLoading(false);
  };

  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
        onClick={() => setOpen(true)}
      >
        <h2 className="text-lg text-center">+ Add New</h2>
      </div>
      <Dialog open={open}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Tell us more about your job interview
            </DialogTitle>
            <DialogDescription>
              <form onSubmit={handleSubmit}>
                <div>
                  <h2>
                    Add details about your job position/role, job description
                    and years of experience
                  </h2>
                  <div className="mt-7 my-3">
                    <label>Job role/ position</label>
                    <Input
                      type="text"
                      required
                      onChange={(e) => setJobposition(e.target.value)}
                      placeholder="Full stack developer"
                    />
                  </div>
                  <div className="my-3">
                    <label>Job description/ Tech stack</label>
                    <Textarea
                      required
                      onChange={(e) => setJobdescription(e.target.value)}
                      placeholder="React, Angular, Nodejs, Mysql, etc."
                    />
                  </div>
                  <div className="my-3">
                    <label>Years of experience</label>
                    <Input
                      required
                      onChange={(e) => setJobexperience(e.target.value)}
                      max="50"
                      type="number"
                      placeholder="5"
                    />
                  </div>
                </div>
                <div className="flex gap-5 justify-end">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button disabled={loading} type="submit">
                    {loading ? (
                      <>
                        <LoaderCircle className="animate-spin" />
                        "Generating from AI"
                      </>
                    ) : (
                      "Start Interview"
                    )}
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;
