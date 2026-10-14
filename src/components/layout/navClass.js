export function navClass({ isActive }) {
  return `block rounded-xl px-3 py-2 text-sm font-bold transition ${
    isActive
      ? 'bg-white/10 text-white'
      : 'text-slate-300 hover:bg-white/5 hover:text-white'
  }`;
}
