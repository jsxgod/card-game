import { createContext } from "react";
import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

const socket = io("https://germanwhist-ksdev.herokuapp.com/");
const SocketContext = createContext<Socket<
  DefaultEventsMap,
  DefaultEventsMap
> | null>(socket);

export const SocketProvider = SocketContext.Provider;
export default SocketContext;
