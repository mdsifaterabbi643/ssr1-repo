import { NextResponse } from "next/server";
import connectDB from "@/utils/db";
import FAQ from "@/model/faq";

export const GET = async (request) => {
  try {
    await connectDB();

    const faqData = await FAQ.find();

    let responseBody = {
      message: "Hello FAQ",
      faqData: faqData,
    };

    return new NextResponse(JSON.stringify(responseBody), { status: 200 });
  } catch (error) {
    return new NextResponse("Error occurred in FAQ get", { status: 200 });
  }
};

//for initially adding data to the FAQ model
// export const POST = async (request) => {
//   try {
//     await connectDB();
//     const { fruit, game } = await request.json();

//     //const id = "6661ec9a1aa387e94d681e0f"; //after initially adding data, we will get id

//     try {
//       const newData = new FAQ(); //before getting id of the model
//       //const allUsers = await User.find();
//       //const idOfModel = allUsers[0]._id; // or after initially adding data, we will get model id by this way

//       //const newData = await FAQ.findById({ _id: idOfModel }); //after getting id of the model

//       newData.faqInfo.push({
//         fruit: fruit,
//         game: game,
//       });

//       await newData.save();

//       const responseBody = {
//         fruit: fruit,
//         game: game,
//       };

//       return new NextResponse(JSON.stringify(responseBody), { status: 200 });
//     } catch (error) {
//       return new NextResponse(
//         "Couldn't find the proper index to add FAQ data",
//         { status: 404 }
//       );
//     }
//   } catch (error) {
//     return new NextResponse("Couldn't add to the FAQ model", {
//       status: 500,
//     });
//   }
// };

export const PATCH = async (request, { params }) => {
  try {
    await connectDB();

    const existingData = await FAQ.find();

    let responseBody;
    if (existingData[0] !== null) {
      //now handle the update function here
      const { fruit, game } = await request.json();

      if (fruit) {
        existingData[0].faqInfo[0].fruit = fruit;
      }
      if (game) {
        existingData[0].faqInfo[0].game = game;
      }

      await existingData[0].save();

      responseBody = {
        updatedFAQ: existingData[0].faqInfo[0],
      };

      return new NextResponse(JSON.stringify(responseBody), { status: 200 });
    } else {
      return new NextResponse("Not Found", { status: 404 });
    }
  } catch (error) {
    return new NextResponse("Error in updating FAQ data", { status: 500 });
  }
};
