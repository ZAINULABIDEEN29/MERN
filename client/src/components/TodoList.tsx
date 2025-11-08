import React from "react";
import TodoItem from "./TodoItem";
import type { Todo } from "../types/types";

interface TodoListProps {
    todos: Todo[];
}

const TodoList: React.FC<TodoListProps> = ({ todos }) => {
    if (todos.length === 0) {
        return (
            <div className="bg-white rounded-lg shadow p-8 text-center">
                <p className="text-gray-500 text-lg">
                    No todos yet. Add one above to get started!
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {todos.map((todo) => (
                <TodoItem key={todo._id} todo={todo} />
            ))}
        </div>
    );
};

export default TodoList;
