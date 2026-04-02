export function getDaysUntilMove(moveDate: string): number {
  const today = new Date();
  const move = new Date(moveDate);
  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const moveStart = new Date(move.getFullYear(), move.getMonth(), move.getDate());
  const diff = moveStart.getTime() - todayStart.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export function getCurrentSectionKey(moveDate: string): string {
  const days = -getDaysUntilMove(moveDate); // 負にして「引越し日からの相対」に合わせる
  if (days <= -31) return '2months';
  if (days <= -15) return '1month';
  if (days <= -8) return '2weeks';
  if (days <= -1) return '1week';
  if (days === 0) return 'day';
  return 'after';
}

export function formatDate(dateStr: string, locale: string): string {
  const date = new Date(dateStr);
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  if (locale.startsWith('ja')) {
    return `${y}年${m}月${d}日`;
  }
  return `${m}/${d}/${y}`;
}
