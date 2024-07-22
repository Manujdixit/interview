"use server";
import prisma from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

export async function createAnswer(formData) {
  const user = await currentUser();
  if (!user) {
    return {
      success: false,
      // mockId: formData.get("mockId"),
      error: "User data not available",
    };
  }

  const mockIdRef = formData.get("mockIdRef");
  const question = formData.get("question");
  const correctAns = formData.get("correctAns");
  const userAns = formData.get("userAns");
  const feedback = formData.get("feedback");
  const rating = formData.get("rating");

  try {
    const userEmail = user.emailAddresses[0]?.emailAddress;
    if (!userEmail) {
      return { success: false, error: "User email not available" };
    }

    console.log("Attempting to create interview...");
    const answer = await prisma.userAnswer.create({
      data: {
        mockIdRef,
        question,
        correctAns,
        userAns,
        feedback,
        rating,
        userEmail,
      },
    });
    return { success: true, data: answer };
  } catch (error) {
    console.error("Failed to create interview:", error);
    return { success: false, error: error.message };
  }
}
