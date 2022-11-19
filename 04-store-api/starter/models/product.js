import mongoose from "mongoose";
const { Schema } = mongoose;

const productsSchema = new Schema({
  name: {
    type: String,
    required: [true, "product name must be provided"],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "product price must be provided"],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Number,
    default: Date.now(),
  },
  rating: {
    type: Number,
    default: 4.9,
  },
  company: {
    type: String,
    enum: {
      values: ["ikea", "liddy", "caressa", "marcos"],
      massage: "{VALUE} is not supported", // custom error message.
      // {VALUE} <-- will access whatever the user will provide
    },
  },
});

export default mongoose.model("Products", productsSchema);
