import Task from '../models/taskModel.js';
import { configureOpenAI } from "../config/openai-config.js";

const openai = configureOpenAI();
// Create a new task
export const createTask = async (req, res) => {
  try {
    const { title, description, dueDate, priority } = req.body;

    // Validate inputs
    if (!title || !description || !dueDate || !priority) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    console.log("creating task");
    const task = await Task.create({
      title,
      description,
      dueDate,
      priority,
      user: req.user._id,
    });
    console.log("created task");
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get tasks with pagination and filtering
export const getTasks = async (req, res) => {
  try {
    const { page = 1, limit = 10, priority, dueDate } = req.query;

    const query = { user: req.user._id };
    if (priority) query.priority = priority;
    if (dueDate) query.dueDate = new Date(dueDate);

    const tasks = await Task.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Task.countDocuments(query);

    res.json({ tasks, total, page: parseInt(page), limit: parseInt(limit) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get task by ID
export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task || task.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update task
export const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task || task.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const { title, description, dueDate, priority } = req.body;

    if (title) task.title = title;
    if (description) task.description = description;
    if (dueDate) task.dueDate = dueDate;
    if (priority) task.priority = priority;

    await task.save();

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete task
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task || task.userId.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: 'Task not found' });
    }

    await task.remove();

    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Generate one-sentence summary for a task
// @route   POST /api/tasks/:taskId/summarize
// @access  Private


export const summarizeTask = async (req, res) => {
  const taskId = req.params.id;
  const userId = req.user._id;

  console.log(`Incoming summarize request | Task ID: ${taskId} | User ID: ${userId}`);

  try {
    const task = await Task.findOne({ _id: taskId, user: userId });
    if (!task) {
      console.warn(`Task not found | taskId: ${taskId} | userId: ${userId}`);
      return res.status(404).json({ message: 'Task not found' });
    }

    console.log(`Task found: ${JSON.stringify(task, null, 2)}`);

    const prompt = `Summarize the following task description in one sentence: ${task.description}`;

    let summary;
    try {
      console.log('Sending prompt to OpenAI:', prompt);

      const chatResponse = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: prompt },
        ]
      });

      summary = chatResponse.choices[0].message.content.trim();
      console.log(`Summary generated: ${summary}`);
    } catch (openaiError) {
      console.error('OpenAI API Error:', openaiError.message || openaiError);
      return res.status(500).json({ message: 'OpenAI summarization failed' });
    }

    // Save the generated summary
    task.summary = summary;
    await task.save();
    console.log('Summary saved to task');

    res.status(200).json({ taskId: task._id, summary });
  } catch (error) {
    console.error('Error summarizing task:', error.message || error);
    res.status(500).json({ message: 'Failed to summarize task' });
  }
};


