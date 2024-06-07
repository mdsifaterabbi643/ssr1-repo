import mongoose from "mongoose";

const faqSchema = mongoose.Schema(
  {
    faqInfo: [
      {
        fruit: { type: String },
        game: { type: String },
      },
    ],
  },
  { timestamps: true }
);

//check previour model with the same name

const FAQ = mongoose.models.FAQ || mongoose.model("FAQ", faqSchema);

export default FAQ;
