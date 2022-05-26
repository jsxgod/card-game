import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const profileNicknameSelector = createSelector(
  (state: RootState) => state.profile.nickname,
  (state) => state
);
export const profileAvatarSelector = createSelector(
  (state: RootState) => state.profile.avatar,
  (state) => state
);
