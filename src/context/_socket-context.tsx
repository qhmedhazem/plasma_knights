"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { EventData, useProbabilityStore } from "../store/probability-store";

interface ContextInterface {
  socket: Socket;
}

interface SocketProviderProps {
  children: React.ReactNode;
}

const socket = io({});

socket.onAny((event: string, data: EventData) => {
  return useProbabilityStore.getState().pushEvent({
    event,
    data,
  });
});

socket.on("connect", () => {
  console.log("connected");
});

socket.on("disconnect", () => {
  console.log("disconnected");
});

socket.on("error", (e) => {
  console.log(e);
});

export const SocketContext = createContext<ContextInterface>({
  socket: socket,
});

export default function SocketProvider({ children }: SocketProviderProps) {
  return (
    <SocketContext.Provider
      value={{
        socket,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}
