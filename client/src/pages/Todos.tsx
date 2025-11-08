import { useTodos } from "../hooks/useTodos";
import { useAuth } from "../hooks/useAuth";
import Header from "../components/Header/Header";
import Container from "../components/container/Container";
import TodoList from "../components/TodoList";
import AddTodoForm from "../components/AddTodoForm";

const Todos: React.FC = () => {
    const { todos, isLoading, error } = useTodos();
    const { user } = useAuth();

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <Header />
            <Container>
                <div className="max-w-2xl mx-auto py-8">
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">
                            Welcome, {user?.username || "User"}!
                        </h1>
                        <p className="text-gray-600">
                            Manage your tasks and stay organized
                        </p>
                    </div>

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                            {error}
                        </div>
                    )}

                    <AddTodoForm />
                    
                    {isLoading && todos.length === 0 ? (
                        <div className="text-center py-8">
                            <div className="text-gray-600">Loading todos...</div>
                        </div>
                    ) : (
                        <TodoList todos={todos} />
                    )}
                </div>
            </Container>
        </div>
    );
};

export default Todos;

