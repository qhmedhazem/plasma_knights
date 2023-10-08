"use client";
import { SocketContext } from "@/context/_socket-context";
import { Event, EventData, Probe } from "@/store/probability-store";
import { useEffect, useState, useContext } from "react";

type eventsCallback = (event: Event) => any;

const useSocket = (eventsCallback?: eventsCallback) => {
  const { socket } = useContext(SocketContext);

  const requestData = (
    start_date: string,
    end_date: string,
    probe: Probe
  ): Promise<Boolean> => {
    return socket.emitWithAck("request_data", {
      start_date: start_date,
      end_date: end_date,
      probe: probe,
    });
  };

  const requestParamaters = (): Promise<Boolean> => {
    return socket.emitWithAck("request_parameters");
  };

  useEffect(() => {
    if (eventsCallback) {
      const handleEvent = (event: string, data: EventData) => {
        console.log(event, data);
        eventsCallback({ event: event, data: data });
      };
      socket.onAny(handleEvent);
      return () => {
        socket.offAny(handleEvent);
      };
    }
  }, []);

  return {
    socket,
    requestData,
    requestParamaters,
  };
};

export default useSocket;
