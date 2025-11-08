import React, { useState } from "react";
import type { Todo } from "../types/types";
import { useTodos } from "../hooks/useTodos";

interface TodoItemProps {
    todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
    const { updateTodo, deleteTodo, isUpdating, isDeleting } = useTodos();
    const [isEditing, setIsEditing] = useState(false);
    const [content, setContent] = useState(todo.content);

    const handleToggleComplete = () => {
        updateTodo(todo._id, { completed: !todo.completed }, {
            onError: (err: any) => {
                console.error("Failed to update todo:", err);
            },
        });
    };

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this todo?")) {
            deleteTodo(todo._id, {
                onError: (err: any) => {
                    console.error("Failed to delete todo:", err);
                },
            });
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        if (content.trim() && content !== todo.content) {
            updateTodo(todo._id, { content: content.trim() }, {
                onSuccess: () => {
                    setIsEditing(false);
                },
                onError: (err: any) => {
                    console.error("Failed to update todo:", err);
                },
            });
        } else {
            setContent(todo.content);
            setIsEditing(false);
        }
    };

    const handleCancel = () => {
        setContent(todo.content);
        setIsEditing(false);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSave();
        } else if (e.key === "Escape") {
            handleCancel();
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center flex-1 gap-3">
                    <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={handleToggleComplete}
                        disabled={isUpdating}
                        className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 cursor-pointer disabled:opacity-50"
                    />
                    {isEditing ? (
                        <input
                            type="text"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            onBlur={handleSave}
                            onKeyDown={handleKeyPress}
                            className="flex-1 px-3 py-2 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            autoFocus
                        />
                    ) : (
                        <span
                            className={`flex-1 ${
                                todo.completed
                                    ? "line-through text-gray-500"
                                    : "text-gray-800"
                            } cursor-pointer`}
                            onDoubleClick={handleEdit}
                        >
                            {todo.content}
                        </span>
                    )}
                </div>
                <div className="flex items-center gap-2">
                    {!isEditing && (
                        <button
                            onClick={handleEdit}
                            className="px-3 py-1 text-sm text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 rounded transition-colors"
                            disabled={isUpdating || isDeleting}
                        >
                            Edit
                        </button>
                    )}
                    <button
                        onClick={handleDelete}
                        disabled={isDeleting || isUpdating}
                        className="px-3 py-1 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isDeleting ? "Deleting..." : "Delete"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TodoItem;