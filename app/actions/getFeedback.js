"use server";
import prisma from "@/lib/db";

export async function getFeedback(mockIdRef) {
  try {
    console.log("Attempting to get feedback...");
    const interview = await prisma.userAnswer.findMany({
      where: {
        mockIdRef: mockIdRef.interviewid,
      },
    });
    return { success: true, data: interview };
  } catch (error) {
    console.error("Failed to create interview:", error);
    return { success: false, error: error.message };
  }
}
