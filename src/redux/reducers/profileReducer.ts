import { createReducer } from "@reduxjs/toolkit";
import * as actions from "../actions/profileActions";
import { PlayingCard } from "../types";

type ProfileState = {
  nickname: string;
  avatar: PlayingCard;
};

const initialState: ProfileState = {
  nickname: "",
  avatar: { suit: "spades", rank: "K" },
};

export const profileReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(actions.updateProfileNickname, (state, action) => {
      state.nickname = action.payload;
    })
    .addCase(actions.updateProfileAvatar, (state, action) => {
      state.avatar = action.payload;
    });
});
