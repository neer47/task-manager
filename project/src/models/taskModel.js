import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    dueDate: { type: Date, required: true },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      required: true,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    summary: { type: String },
  },
  {
    timestamps: true, // handles createdAt and updatedAt automatically
  }
);

const Task = mongoose.model('Task', taskSchema);
export default Task;

