import mongoose from "mongoose";

// Schema is structure for our data. in mongoose a model is a wrapper
// for the schema
const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Must provide name!"],
    trim: true,
    maxlength: [21, "Name cannot be more than 21 characters!"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});
// only properties that we set here in our schema will be passed to db
// everything else will be ignored

export default mongoose.model("task", taskSchema);
// in case above will cause of an error ↑ do this ↓ instead
// export default mongoose.model('Blacklist', new Blacklist)
