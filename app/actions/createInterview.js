"use server";
import prisma from "@/lib/db";
import { auth, currentUser } from "@clerk/nextjs/server";

export async function createInterview(formData) {
  const { userId } = auth();
  if (!userId) {
    return { success: false, error: "User not authenticated" };
  }

  const user = await currentUser();
  if (!user) {
    return {
      success: false,
      // mockId: formData.get("mockId"),
      error: "User data not available",
    };
  }

  const jobposition = formData.get("jobposition");
  const jobdescription = formData.get("jobdescription");
  const jobexperience = formData.get("jobexperience");
  const questions = formData.get("questions");
  const mockId = formData.get("mockId");

  try {
    const userEmail = user.emailAddresses[0]?.emailAddress;
    if (!userEmail) {
      return { success: false, error: "User email not available" };
    }

    console.log("Attempting to create interview...");
    const interview = await prisma.mockInterview.create({
      data: {
        jobPosition: jobposition,
        jobDescription: jobdescription,
        jobExperience: jobexperience,
        jsonMockResp: questions,
        createdBy: userEmail,
        mockId: mockId,
      },
    });
    return { success: true, data: interview };
  } catch (error) {
    console.error("Failed to create interview:", error);
    return { success: false, error: error.message };
  }
}
