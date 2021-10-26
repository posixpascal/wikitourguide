import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface SettingsState {
  colors: any;
  voice: any;
  duration: string;
  pitch: number;
  rate: number;
}

export const hydrateSettings = createAsyncThunk(
  'settings/hydrate',
  async () => {
    const colors = await AsyncStorage.getItem('colors');
    const voice = await AsyncStorage.getItem('voice');
    const duration = await AsyncStorage.getItem('duration');
    const rate = parseFloat(await AsyncStorage.getItem('rate'));
    const pitch = parseFloat(await AsyncStorage.getItem('pitch'));

    return {
      colors: JSON.parse(colors),
      voice,
      duration,
      rate,
      pitch
    };
  },
);

const settingsSlice = createSlice<SettingsState, any, any>({
  name: 'settings',
  initialState: {
    colors: {
      primary: '#4585c4',
      primary1: '#56BCD7',
      primary2: '#1F4EA1',
    },
    voice: 'OnDeviceSynth',
    duration: 'medium',
    pitch: 1,
    rate: 1,
  },
  reducers: {
    setColor: (state, action) => {
      state.colors = action.payload;
    },
    setVoice: (state, action) => {
      state.voice = action.payload;
    },
    setDuration: (state, action) => {
      state.duration = action.payload;
    },
    setRate: (state, action) => {
      state.rate = action.payload;
    },
    setPitch: (state, action) => {
      state.pitch = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(hydrateSettings.fulfilled, (state, action) => {
      state.colors = action.payload.colors || {
        primary: '#4585c4',
        primary1: '#56BCD7',
        primary2: '#1F4EA1',
      };

      state.voice = action.payload.voice || 'OnDeviceSynth';
      state.duration = action.payload.duration || 'medium';
      state.pitch = action.payload.pitch || 1;
      state.rate = action.payload.rate || 1;

    });

    builder.addCase(hydrateSettings.rejected, (state, err) => {
      console.log(err);
    });
  },
});

export const { setDuration, setPitch, setRate, setColor, setVoice }: any = settingsSlice.actions;
export default settingsSlice.reducer;
