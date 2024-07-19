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

function AddNewInterview() {
  const [open, setOpen] = React.useState(false);
  const [jobposition, setJobposition] = useState("");
  const [jobdescription, setJobdescription] = useState("");
  const [jobexperience, setJobexperience] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const interviewData = {
      jobposition,
      jobdescription,
      jobexperience,
    };
    console.log(interviewData);
    setOpen(false);
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
                  <Button type="submit">Start Interview</Button>
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
