import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SubMenu } from "./types";

type MenuState = {
  subMenuOpened: SubMenu | undefined;
  nicknameSet: boolean;
};

const initialState: MenuState = {
  subMenuOpened: undefined,
  nicknameSet: false,
};

export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    openSubMenu: (state, action: PayloadAction<SubMenu>) => {
      if (state.subMenuOpened === action.payload) {
        state.subMenuOpened = "howto";
      }
      state.subMenuOpened = action.payload;
    },
    closeSubMenus: (state) => {
      state.subMenuOpened = undefined;
    },
  },
});

export const { openSubMenu, closeSubMenus } = menuSlice.actions;

export default menuSlice.reducer;
