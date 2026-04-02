import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';
import { Move, Task, TaskCategory } from '../types';
import { getPresets } from '../data/presets';

interface MoveState {
  move: Move | null;
  tasks: Task[];
  createMove: (moveDate: string, region: 'jp' | 'global') => void;
  updateMoveDate: (moveDate: string) => void;
  toggleTask: (taskId: string) => void;
  addCustomTask: (title: string, category: TaskCategory, timingDays: number, description?: string) => void;
  updateTaskNote: (taskId: string, note: string) => void;
  deleteTask: (taskId: string) => void;
  getCompletionStats: () => { done: number; total: number; percent: number };
  getCategoryStats: (category: TaskCategory) => { done: number; total: number; percent: number };
}

export const useMoveStore = create<MoveState>()(
  persist(
    (set, get) => ({
      move: null,
      tasks: [],

      createMove: (moveDate, region) => {
        const moveId = uuidv4();
        const move: Move = {
          id: moveId,
          moveDate,
          region,
          createdAt: new Date().toISOString(),
        };
        const presets = getPresets(region);
        const tasks: Task[] = presets.map((p) => ({
          id: uuidv4(),
          moveId,
          title: p.title,
          description: p.description,
          category: p.category,
          timingDays: p.timingDays,
          isCompleted: false,
          isCustom: false,
        }));
        set({ move, tasks });
      },

      updateMoveDate: (moveDate) => {
        const { move } = get();
        if (!move) return;
        set({ move: { ...move, moveDate } });
      },

      toggleTask: (taskId) => {
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === taskId
              ? {
                  ...t,
                  isCompleted: !t.isCompleted,
                  completedAt: !t.isCompleted ? new Date().toISOString() : undefined,
                }
              : t
          ),
        }));
      },

      addCustomTask: (title, category, timingDays, description) => {
        const { move } = get();
        if (!move) return;
        const task: Task = {
          id: uuidv4(),
          moveId: move.id,
          title,
          description,
          category,
          timingDays,
          isCompleted: false,
          isCustom: true,
        };
        set((state) => ({ tasks: [...state.tasks, task] }));
      },

      updateTaskNote: (taskId, note) => {
        set((state) => ({
          tasks: state.tasks.map((t) => (t.id === taskId ? { ...t, note } : t)),
        }));
      },

      deleteTask: (taskId) => {
        set((state) => ({
          tasks: state.tasks.filter((t) => t.id !== taskId),
        }));
      },

      getCompletionStats: () => {
        const { tasks } = get();
        const total = tasks.length;
        const done = tasks.filter((t) => t.isCompleted).length;
        return { done, total, percent: total === 0 ? 0 : Math.round((done / total) * 100) };
      },

      getCategoryStats: (category) => {
        const { tasks } = get();
        const filtered = tasks.filter((t) => t.category === category);
        const total = filtered.length;
        const done = filtered.filter((t) => t.isCompleted).length;
        return { done, total, percent: total === 0 ? 0 : Math.round((done / total) * 100) };
      },
    }),
    {
      name: 'move-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
