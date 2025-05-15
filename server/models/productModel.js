import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true, // to make it SEO friendly
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      // category ke liye hamare paas alag se model hai to hum wahi se use get kar lenge
      type: mongoose.ObjectId, // jab bhi ek category create hogi to ek id generate hoti hai ussi ko hum product ko pass kara denge
      ref: "Category", // ref -> category model ka naam
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    shipping: {
      type: Boolean,
    },
  },
  { timestamps: true } // when a product model will be created then it will create a timestamp for that
);

export default mongoose.model("Products", productSchema);
