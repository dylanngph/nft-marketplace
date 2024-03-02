"use client";

import { cn } from "@/libs/utils/cn";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useAccount, useConnect, useSignMessage } from "wagmi";
import Image from "next/image";
import { connectorsHelper } from "@/libs/utils/web3-connectors";
import { SiweMessage } from "siwe";
import { getCsrfToken, signIn, useSession } from "next-auth/react";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const UserAuthForm = ({ className, ...props }: UserAuthFormProps) => {
  const { connectors, connect, isPending } = useConnect();
  const [selectedConnector, setSelectedConnector] = useState<string>();

  const { signMessageAsync } = useSignMessage();
  const { chain, address, isConnected } = useAccount();

  const { data: session, status } = useSession();

  const handleLogin = async () => {
    try {
      const message = new SiweMessage({
        domain: window.location.host,
        address: address,
        statement: "Sign in to continue to Portfolio",
        uri: window.location.origin,
        version: "1",
        chainId: chain?.id,
        nonce: await getCsrfToken(),
      });

      const signature = await signMessageAsync({
        message: message.prepareMessage(),
      });

      signIn("credentials", {
        message: JSON.stringify(message),
        redirect: true,
        signature,
        callbackUrl: "/",
      });
    } catch (error) {
      console.error(error);
      console.log(error);
    }
  };

  useEffect(() => {
    if (isConnected && !session) {
      handleLogin();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, session]);

  const renderConnectors = () => {
    return connectors.map((connector) => (
      <Button
        key={connector.uid}
        variant="secondary"
        onClick={() => {
          setSelectedConnector(connector.id);
          return connect({ connector });
        }}
        className="justify-between items-center rounded-lg py-4 h-fit"
        disabled={isPending}
      >
        <div className="flex items-center gap-4">
          <Image
            src={
              connectorsHelper.find((item) => item.id === connector.id)?.icon ??
              ""
            }
            alt={connector.name}
            width={25}
            height={25}
          />
          <span>{connector.name}</span>
        </div>
        {isPending && selectedConnector === connector.id && (
          <p className="text-sm">Connecting...</p>
        )}
      </Button>
    ));
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <div className="flex flex-col gap-2">{renderConnectors()}</div>
    </div>
  );
};

export default UserAuthForm;
