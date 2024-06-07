import { NextResponse } from "next/server";
import connectDB from "@/utils/db";
import User from "@/model/user";

//getting single user using id
export const POST = async (request, { params }) => {
  try {
    const { id } = params;
    await connectDB();

    const allUsers = await User.find();

    const modelId = allUsers[0]._id;

    // Find user by ID and filter based on userInfo criteria using $elemMatch
    const singleUser = await User.findById(
      { _id: modelId },
      {
        userInfo: {
          $elemMatch: { _id: id }, // Replace with your actual criteria
        },
      }
    );

    let responseBody;

    if (singleUser !== "") {
      responseBody = {
        message: "User found",
        singleUser: singleUser,
      };
      return new NextResponse(JSON.stringify(responseBody), { status: 200 });
    } else {
      responseBody = {
        message: "No User found",
      };
      return new NextResponse(JSON.stringify(responseBody), { status: 404 });
    }
  } catch (error) {
    return new NextResponse("Error in getting Single user", { status: 500 });
  }
};


