import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema(
  {
    location: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    email1: {
      type: String,
      required: true,
    },
    email2: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      required: true,
    },
    workingHours: {
      type: String,
      required: true,
    },
    followLinks: [
      {
        url: { type: String, required: true },
        platform: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

const Contact = mongoose.model("Contact", ContactSchema);
export default Contact;
