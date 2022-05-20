import { createAction } from "@reduxjs/toolkit";
import { PlayingCard } from "../types";

export const updateProfileNickname = createAction<string>(
  "profile/changeNickname"
);
export const updateProfileAvatar = createAction<PlayingCard>(
  "profile/changeAvatar"
);
