export interface Move {
  id: string;
  name: string;
  moveDate: string; // ISO date 'YYYY-MM-DD'
  fromAddress?: string;
  toAddress?: string;
  region: 'jp' | 'global';
  createdAt: string;
  note?: string;
}

export interface Task {
  id: string;
  moveId: string;
  title: string;
  description?: string;
  category: TaskCategory;
  timingDays: number; // moveDate からの相対日数（負=前、0=当日、正=後）
  isCompleted: boolean;
  isCustom: boolean;
  note?: string;
  photos?: string[]; // local URIs
  completedAt?: string;
}

export type TaskCategory = 'procedures' | 'packing' | 'cancellation' | 'new_home' | 'other';

export interface TimingSection {
  key: string;
  labelKey: string; // i18n key
  minDays: number;
  maxDays: number;
}

export const TIMING_SECTIONS: TimingSection[] = [
  { key: '2months', labelKey: 'timeline.2monthsBefore', minDays: -90, maxDays: -31 },
  { key: '1month', labelKey: 'timeline.1monthBefore', minDays: -30, maxDays: -15 },
  { key: '2weeks', labelKey: 'timeline.2weeksBefore', minDays: -14, maxDays: -8 },
  { key: '1week', labelKey: 'timeline.1weekBefore', minDays: -7, maxDays: -1 },
  { key: 'day', labelKey: 'timeline.moveDay', minDays: 0, maxDays: 0 },
  { key: 'after', labelKey: 'timeline.afterMove', minDays: 1, maxDays: 90 },
];
