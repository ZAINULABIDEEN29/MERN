import mongoose, { Schema, Document, Types } from "mongoose";

export interface ITodo extends Document {
    content: string;
    completed: boolean;
    createdBy: Types.ObjectId;
}

const todoSchema = new Schema<ITodo>({
    content: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
}, {
    timestamps: true
});

const Todo = mongoose.model<ITodo>('Todo', todoSchema);

export default Todo;