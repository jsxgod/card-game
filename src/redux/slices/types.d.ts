import { PlayingCard } from "../types";

export type SubMenu = "profile" | "howto" | "about";

export type GameCard<T> = { belongsTo: T } & PlayingCard;
