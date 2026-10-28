export type PauseState = {
  paused: boolean;
  admin: string;
  msig: string;
};

export function canUnpause(state: PauseState, caller: string): boolean {
  if (!state.paused) return false;
  return caller === state.admin || caller === state.msig;
}

export function applyPause(state: PauseState, caller: string): PauseState {
  if (caller !== state.admin) throw new Error("not admin");
  return { ...state, paused: true };
}
