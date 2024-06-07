import { NextResponse } from "next/server";
import connectDB from "@/utils/db";
import User from "@/model/user";

export const PATCH = async (request, { params }) => {
  try {
    await connectDB();

    const existingData = await User.find();
    //const existingData = allUsers[0];

    let responseBody;
    if (existingData[0] !== null) {
      //now handle the update function here
      const { username, address, phone, targetIndex } = await request.json();
      const lengthOfUserInfo = existingData[0].userInfo.length;
      if (lengthOfUserInfo < targetIndex + 1) {
        return new NextResponse("targetIndex out of boundary", { status: 404 });
      }

      if (targetIndex !== null) {
        if (username) {
          existingData[0].userInfo[targetIndex].username = username;
        }
        if (address) {
          existingData[0].userInfo[targetIndex].address = address;
        }
        if (phone) {
          existingData[0].userInfo[targetIndex].phone = phone;
        }
      }

      await existingData[0].save();

      responseBody = {
        updatedUser: existingData[0].userInfo[targetIndex],
        length: existingData[0].userInfo.length,
      };

      return new NextResponse(JSON.stringify(responseBody), { status: 200 });
    } else {
      return new NextResponse("Not Found", { status: 404 });
    }
  } catch (error) {
    return new NextResponse("Error in updating Single user", { status: 500 });
  }
};
