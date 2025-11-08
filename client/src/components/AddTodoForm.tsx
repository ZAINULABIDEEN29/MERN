import React, { useState } from "react";
import type { FormEvent } from "react";
import { useTodos } from "../hooks/useTodos";

const AddTodoForm: React.FC = () => {
    const [content, setContent] = useState("");
    const [error, setError] = useState("");
    const { createTodo, isCreating, createError } = useTodos();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setError("");

        if (!content.trim()) {
            setError("Please enter a todo");
            return;
        }

        createTodo(
            { content: content.trim() },
            {
                onSuccess: () => {
                    setContent("");
                    setError("");
                },
                onError: (err: any) => {
                    // Handle validation errors from API
                    if (err?.response?.data?.errors && Array.isArray(err.response.data.errors)) {
                        const errorMessages = err.response.data.errors.map((e: any) => e.message).join(", ");
                        setError(errorMessages);
                    } else if (err?.response?.data?.message) {
                        setError(err.response.data.message);
                    } else if (typeof err === 'string') {
                        setError(err);
                    } else {
                        setError("Failed to create todo");
                    }
                },
            }
        );
    };

    return (
        <div className="mb-6">
            <form
                onSubmit={handleSubmit}
                className="flex gap-2 items-start"
            >
                <div className="flex-1">
                    <input
                        type="text"
                        value={content}
                        onChange={(e) => {
                            setContent(e.target.value);
                            setError("");
                        }}
                        placeholder="Add a new todo..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        disabled={isCreating}
                    />
                    {error && (
                        <p className="mt-1 text-sm text-red-600">{error}</p>
                    )}
                    {createError && (
                        <p className="mt-1 text-sm text-red-600">
                            {(createError as any)?.response?.data?.message ||
                                "Failed to create todo"}
                        </p>
                    )}
                </div>
                <button
                    type="submit"
                    disabled={isCreating || !content.trim()}
                    className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                >
                    {isCreating ? "Adding..." : "Add Todo"}
                </button>
            </form>
        </div>
    );
};

export default AddTodoForm;