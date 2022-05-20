import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { profileReducer } from "./reducers/profileReducer";
import playerReducer from "./slices/playerSlice";
import menuReducer from "./slices/menuSlice";
import gameReducer from "./slices/gameSlice";

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    menu: menuReducer,
    player: playerReducer,
    game: gameReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
