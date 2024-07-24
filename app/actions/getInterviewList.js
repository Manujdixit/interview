"use server";
import prisma from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

export async function getInterviewList() {
  try {
    const user = await currentUser();
    if (!user) {
      return {
        success: false,
        // mockId: formData.get("mockId"),
        error: "User data not available",
      };
    }

    console.log("Attempting to get interview list...");
    const interview = await prisma.mockInterview.findMany({
      where: { createdBy: user.emailAddresses[0]?.emailAddress },
      orderBy: { createdAt: "desc" },
    });
    return { success: true, data: interview };
  } catch (error) {
    console.error("Failed to create interview:", error);
    return { success: false, error: error.message };
  }
}
