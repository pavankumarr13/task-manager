import mongoose from "mongoose";

const uri =
  "mongodb+srv://pavankumar:hFjX5XX5m1gHMRuj@cluster0.mjpprdg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected to Db successfully");
  })
  .catch((err) => {
    console.error(err);
  });

const AuthSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", AuthSchema);

export default User;
