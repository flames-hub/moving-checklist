import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Move, Task, TaskCategory } from '../types';
import { getPresets } from '../data/presets';

function generateId(): string {
  const t = Date.now().toString(36);
  const r = Math.random().toString(36).substring(2, 10);
  return `${t}-${r}`;
}

interface MoveState {
  // Multi-move
  moves: Move[];
  allTasks: Task[];
  activeMoveId: string | null;

  // Derived (computed from active)
  move: Move | null;
  tasks: Task[];

  // Actions
  createMove: (name: string, moveDate: string, region: 'jp' | 'global') => void;
  switchMove: (moveId: string) => void;
  deleteMove: (moveId: string) => void;
  renameMove: (moveId: string, name: string) => void;
  updateMoveDate: (moveDate: string) => void;
  updateMoveNote: (note: string) => void;
  toggleTask: (taskId: string) => void;
  addCustomTask: (title: string, category: TaskCategory, timingDays: number, description?: string) => void;
  updateTaskNote: (taskId: string, note: string) => void;
  addTaskPhoto: (taskId: string, uri: string) => void;
  removeTaskPhoto: (taskId: string, uri: string) => void;
  deleteTask: (taskId: string) => void;
  getCompletionStats: () => { done: number; total: number; percent: number };
  getCategoryStats: (category: TaskCategory) => { done: number; total: number; percent: number };
}

function deriveActive(moves: Move[], allTasks: Task[], activeMoveId: string | null) {
  const move = moves.find((m) => m.id === activeMoveId) ?? null;
  const tasks = move ? allTasks.filter((t) => t.moveId === move.id) : [];
  return { move, tasks };
}

export const useMoveStore = create<MoveState>()(
  persist(
    (set, get) => ({
      moves: [],
      allTasks: [],
      activeMoveId: null,
      move: null,
      tasks: [],

      createMove: (name, moveDate, region) => {
        const moveId = generateId();
        const newMove: Move = {
          id: moveId,
          name,
          moveDate,
          region,
          createdAt: new Date().toISOString(),
        };
        const presets = getPresets(region);
        const newTasks: Task[] = presets.map((p) => ({
          id: generateId(),
          moveId,
          title: p.title,
          description: p.description,
          category: p.category,
          timingDays: p.timingDays,
          isCompleted: false,
          isCustom: false,
        }));
        const moves = [...get().moves, newMove];
        const allTasks = [...get().allTasks, ...newTasks];
        const { move, tasks } = deriveActive(moves, allTasks, moveId);
        set({ moves, allTasks, activeMoveId: moveId, move, tasks });
      },

      switchMove: (moveId) => {
        const { moves, allTasks } = get();
        const { move, tasks } = deriveActive(moves, allTasks, moveId);
        set({ activeMoveId: moveId, move, tasks });
      },

      deleteMove: (moveId) => {
        const moves = get().moves.filter((m) => m.id !== moveId);
        const allTasks = get().allTasks.filter((t) => t.moveId !== moveId);
        const newActiveId = get().activeMoveId === moveId
          ? (moves[moves.length - 1]?.id ?? null)
          : get().activeMoveId;
        const { move, tasks } = deriveActive(moves, allTasks, newActiveId);
        set({ moves, allTasks, activeMoveId: newActiveId, move, tasks });
      },

      renameMove: (moveId, name) => {
        const moves = get().moves.map((m) => (m.id === moveId ? { ...m, name } : m));
        const { allTasks, activeMoveId } = get();
        const { move, tasks } = deriveActive(moves, allTasks, activeMoveId);
        set({ moves, move, tasks });
      },

      updateMoveDate: (moveDate) => {
        const { activeMoveId } = get();
        if (!activeMoveId) return;
        const moves = get().moves.map((m) =>
          m.id === activeMoveId ? { ...m, moveDate } : m
        );
        const { allTasks } = get();
        const { move, tasks } = deriveActive(moves, allTasks, activeMoveId);
        set({ moves, move, tasks });
      },

      updateMoveNote: (note) => {
        const { activeMoveId, allTasks } = get();
        if (!activeMoveId) return;
        const moves = get().moves.map((m) =>
          m.id === activeMoveId ? { ...m, note } : m
        );
        const { move, tasks } = deriveActive(moves, allTasks, activeMoveId);
        set({ moves, move, tasks });
      },

      toggleTask: (taskId) => {
        const allTasks = get().allTasks.map((t) =>
          t.id === taskId
            ? {
                ...t,
                isCompleted: !t.isCompleted,
                completedAt: !t.isCompleted ? new Date().toISOString() : undefined,
              }
            : t
        );
        const { moves, activeMoveId } = get();
        const { move, tasks } = deriveActive(moves, allTasks, activeMoveId);
        set({ allTasks, move, tasks });
      },

      addCustomTask: (title, category, timingDays, description) => {
        const { activeMoveId } = get();
        if (!activeMoveId) return;
        const task: Task = {
          id: generateId(),
          moveId: activeMoveId,
          title,
          description,
          category,
          timingDays,
          isCompleted: false,
          isCustom: true,
        };
        const allTasks = [...get().allTasks, task];
        const { moves } = get();
        const { move, tasks } = deriveActive(moves, allTasks, activeMoveId);
        set({ allTasks, move, tasks });
      },

      updateTaskNote: (taskId, note) => {
        const allTasks = get().allTasks.map((t) => (t.id === taskId ? { ...t, note } : t));
        const { moves, activeMoveId } = get();
        const { move, tasks } = deriveActive(moves, allTasks, activeMoveId);
        set({ allTasks, move, tasks });
      },

      addTaskPhoto: (taskId, uri) => {
        const allTasks = get().allTasks.map((t) =>
          t.id === taskId ? { ...t, photos: [...(t.photos ?? []), uri] } : t
        );
        const { moves, activeMoveId } = get();
        const { move, tasks } = deriveActive(moves, allTasks, activeMoveId);
        set({ allTasks, move, tasks });
      },

      removeTaskPhoto: (taskId, uri) => {
        const allTasks = get().allTasks.map((t) =>
          t.id === taskId ? { ...t, photos: (t.photos ?? []).filter((p) => p !== uri) } : t
        );
        const { moves, activeMoveId } = get();
        const { move, tasks } = deriveActive(moves, allTasks, activeMoveId);
        set({ allTasks, move, tasks });
      },

      deleteTask: (taskId) => {
        const allTasks = get().allTasks.filter((t) => t.id !== taskId);
        const { moves, activeMoveId } = get();
        const { move, tasks } = deriveActive(moves, allTasks, activeMoveId);
        set({ allTasks, move, tasks });
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
      partialize: (state) => ({
        moves: state.moves,
        allTasks: state.allTasks,
        activeMoveId: state.activeMoveId,
      }) as unknown as MoveState,
      onRehydrateStorage: () => (state: MoveState | undefined) => {
        if (state) {
          const { moves, allTasks, activeMoveId } = state;
          const { move, tasks } = deriveActive(moves, allTasks, activeMoveId);
          state.move = move;
          state.tasks = tasks;
        }
      },
    }
  )
);
