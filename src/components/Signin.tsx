"use client";

import { ClientSafeProvider, signIn } from "next-auth/react";
import ColorButton from "./ui/ColorButton";

type Props = {
  providers: Record<string, ClientSafeProvider>;
  callbackUrl: string;
};

const Signin = ({ providers, callbackUrl }: Props) => {
  return (
    <>
      {Object.values(providers).map(({ id, name }) => (
        <ColorButton
          key={name}
          text={`Sign in with ${name}`}
          onClick={() => signIn(id, { callbackUrl })}
          size="big"
        />
      ))}
    </>
  );
};

export default Signin;
