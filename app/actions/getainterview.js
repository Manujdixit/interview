"use server";
import prisma from "@/lib/db";

export async function getainterview(mockId) {
  try {
    console.log("Attempting to create interview...");
    const interview = await prisma.mockInterview.findFirst({
      where: {
        mockId,
      },
    });
    return { success: true, data: interview };
  } catch (error) {
    console.error("Failed to create interview:", error);
    return { success: false, error: error.message };
  }
}
