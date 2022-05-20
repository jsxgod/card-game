import { createContext } from "react";
import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

const socket = io("/", { transports: ["websocket"], upgrade: false });
const SocketContext = createContext<Socket<
  DefaultEventsMap,
  DefaultEventsMap
> | null>(socket);

export const SocketProvider = SocketContext.Provider;
export default SocketContext;
