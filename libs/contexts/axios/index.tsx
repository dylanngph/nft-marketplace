"use client";

import React, { createContext, useContext, useEffect } from "react";
import axios from "axios";

const apiInstance = axios.create({
  // baseURL: "https://api.zerion.io/v1",
});

const AxiosContext = createContext(apiInstance);

const AxiosProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const requestId = apiInstance.interceptors.request.use(
      (config) => {
        // if (apiKey) {
        //   config.auth = {
        //     username: apiKey,
        //     password: "",
        //   };
        //   return config;
        // }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    const responseId = apiInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    return () => {
      apiInstance.interceptors.request.eject(requestId);
      apiInstance.interceptors.response.eject(responseId);
    };
  }, []);

  return (
    <AxiosContext.Provider value={apiInstance}>
      {children}
    </AxiosContext.Provider>
  );
};

export const useAxios = () => useContext(AxiosContext);

export default AxiosProvider;
