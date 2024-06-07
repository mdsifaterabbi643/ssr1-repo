import { NextResponse } from "next/server";
import connectDB from "@/utils/db";
import User from "@/model/user";

export const GET = async (request) => {
  try {
    await connectDB();

    const userData = await User.find();

    let responseBody = {
      message: "Hello world and Moon",
      userData: userData,
    };

    return new NextResponse(JSON.stringify(responseBody), { status: 200 });
  } catch (error) {
    return new NextResponse("Error occurred", { status: 200 });
  }
};

//for initially adding data to the About model
export const POST = async (request) => {
  try {
    await connectDB();
    const { username, address, phone, role } = await request.json();

    //const id = "6661ec9a1aa387e94d681e0f"; //after initially adding data, we will get id

    try {
      //const newData = new User(); //before getting id of the model
      const allUsers = await User.find();
      const idOfModel = allUsers[0]._id; // or after initially adding data, we will get model id by this way

      const newData = await User.findById({ _id: idOfModel }); //after getting id of the model

      newData.userInfo.push({
        username: username,
        address: address,
        phone: phone,
        role: role,
      });

      await newData.save();

      const responseBody = {
        username: username,
        address: address,
        phone: phone,
        role: role,
      };

      return new NextResponse(JSON.stringify(responseBody), { status: 200 });
    } catch (error) {
      return new NextResponse(
        "Couldn't find the proper index to add User data",
        { status: 404 }
      );
    }
  } catch (error) {
    return new NextResponse("Couldn't add to the User data", {
      status: 500,
    });
  }
};
export const DELETE = async (request, { params }) => {
  try {
    const { targetIndex } = await request.json();

    await connectDB();

    const allUsers = await User.find();
    const modelId = allUsers[0]._id;

    let existingUser;
    try {
      existingUser = await User.findOne({ _id: modelId });
    } catch (error) {
      return new NextResponse("Client not found to delete", { status: 404 });
    }

    let responseBody;

    if (existingUser !== null) {
      if (targetIndex >= 0 && targetIndex < existingUser?.userInfo.length) {
        existingUser.userInfo.splice(targetIndex, 1);
      } else {
        return new NextResponse("Invalid target index", { status: 400 });
      }
    }

    // Save the updated document
    await existingUser.save();

    responseBody = {
      message: "Client deleted successfully",
      deletedUser: existingUser?.userInfo[targetIndex],
    };

    return new NextResponse(JSON.stringify(responseBody), { status: 200 });
  } catch (error) {
    return new NextResponse(
      "Sorry, Error occurred in /api/user/[id] delete request",
      { status: 500 }
    );
  }
};
