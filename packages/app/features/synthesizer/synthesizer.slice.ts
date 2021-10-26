import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API_URL } from '../../config';

interface SynthesizerState {
  loading: boolean;
  articles: any;
  pipeline: any;
  pipelineSegmentIndex: any;
  status: any;
}

const initialState: SynthesizerState = {
  loading: false,
  articles: {
    'OnDeviceSynth': [],
    'de-DE-Standard-C': [],
    'de-DE-Wavenet-A': [],
    'de-DE-Wavenet-B': [],
  },
  pipeline: null,
  pipelineSegmentIndex: null,
  status: {},
};

export const fetchSynthForArticle = createAsyncThunk(
  'synthesizer/fetchSynthForArticle',
  async ({
    article,
    voice,
  }: {
    article: { pageID: string };
    voice: string;
  }) => {
    const synthesizerRequest = await fetch(
      `${API_URL}/synthesizer/${article.pageID}?voice=${voice}`,
    );
    return {
      ...(await synthesizerRequest.json()),
      voice,
      pageID: article.pageID,
    };
  },
);

const synthesizerSlice = createSlice({
  name: 'synthesizer',
  initialState,
  reducers: {
    playSynth: (state, action) => {
      state.pipeline = action.payload;
      state.pipelineSegmentIndex = 0;
      state.status = {};
    },
    nextSynthSegment: (state, action) => {
      state.status = {};
      state.pipelineSegmentIndex = action.payload;
    },
    updateSynth: (state, action) => {
      console.log(action.payload);
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSynthForArticle.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchSynthForArticle.fulfilled, (state, action) => {
      state.loading = false;
      state.articles[action.payload.voice][action.payload.pageID] =
        action.payload;
    });
    builder.addCase(fetchSynthForArticle.rejected, (state) => {});
  },
});

export const { nextSynthSegment, playSynth, updateSynth } =
  synthesizerSlice.actions;

export default synthesizerSlice.reducer;
