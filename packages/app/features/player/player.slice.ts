import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PlayerState {
  playing: boolean;
  currentArticle: any;
}

const playerSlice = createSlice<PlayerState, any, any>({
  name: 'player',
  initialState: {
    playing: false,
    currentArticle: null,
  },
  reducers: {
    toggle(state) {
      state.playing = !state.playing;
    },
  },
});

export const { toggle }: any = playerSlice.actions;
export default playerSlice.reducer;
