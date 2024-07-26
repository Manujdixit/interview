// // app/api/create-interview/route.js
import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { auth, currentUser } from "@clerk/nextjs/server";

export async function POST(request) {
  const { userId } = auth();
  if (!userId) {
    return NextResponse.json(
      { success: false, error: "User not authenticated" },
      { status: 401 }
    );
  }

  const user = await currentUser();
  if (!user) {
    return NextResponse.json(
      { success: false, error: "User data not available" },
      { status: 400 }
    );
  }

  const formData = await request.formData();
  const jobposition = formData.get("jobposition");
  const jobdescription = formData.get("jobdescription");
  const jobexperience = formData.get("jobexperience");
  const questions = formData.get("questions");
  const mockId = formData.get("mockId");

  try {
    const userEmail = user.emailAddresses[0]?.emailAddress;
    if (!userEmail) {
      return NextResponse.json(
        { success: false, error: "User email not available" },
        { status: 400 }
      );
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

    return NextResponse.json({ success: true, data: interview });
  } catch (error) {
    console.error("Failed to create interview:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// app/api/createInterview/route.js
// import { NextResponse } from "next/server";

// export async function POST(request) {
//   return NextResponse.json({ message: "API is working" });
// }
