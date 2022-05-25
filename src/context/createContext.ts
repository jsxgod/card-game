import { createContext } from "react";
import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

const socket = io("https://main--clever-dango-965480.netlify.app/");
const SocketContext = createContext<Socket<
  DefaultEventsMap,
  DefaultEventsMap
> | null>(socket);

export const SocketProvider = SocketContext.Provider;
export default SocketContext;
