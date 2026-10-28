import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface TodoItem {
  id: number;
  text: string;
  done: boolean;
  createdAt: number;
}
interface TodoStore {
  todos: TodoItem[];
  addTodo: (text: string) => void;
  toggleTodo: (id: number) => void;
  removeTodo: (id: number) => void;
  clearCompleted: () => void;
}
const useTodoStore = create<TodoStore>()(
  persist(
    (set) => ({
      todos: [],
      addTodo: (text) =>
        set((state) => ({ todos: [{ id: Date.now(), text, done: false, createdAt: Date.now() }, ...state.todos] })),
      toggleTodo: (id) =>
        set((state) => ({ todos: state.todos.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo)) })),
      removeTodo: (id) => set((state) => ({ todos: state.todos.filter((todo) => todo.id !== id) })),
      clearCompleted: () => set((state) => ({ todos: state.todos.filter((todo) => !todo.done) }))
    }),
    { name: 'projekan-todos', storage: createJSONStorage(() => localStorage) }
  )
);
export default useTodoStore;
