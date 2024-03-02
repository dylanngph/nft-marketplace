"use client";

import { signOut, useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { useAccount } from "wagmi";

const ValidateProvider = ({ children }: { children: React.ReactNode }) => {
  const { isConnected } = useAccount();
  const { data: session } = useSession();

  useEffect(() => {
    if (!isConnected && session) {
      signOut();
    }
  }, [isConnected, session]);

  return <>{children}</>;
};

export default ValidateProvider;
