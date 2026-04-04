"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "../lib/utils";
import { authClient } from "@/lib/auth-client"; 

export default function Home() {
  const {
    data : session
  } = authClient.useSession();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = () =>{
    authClient.signUp.email({ name, email, password },
      {
        onSuccess: () => {
          console.log("User created successfully");
        },
        onError: (error) => {
          console.log("Error creating user", error);
        }
      }
    );

  }

  if (session) {
    return (
      <div className="p-4 flex flex-col gap-y-4">
        <p>Logged in as {session.user.name}</p>
        <Button onClick={() => authClient.signOut()}>Sign Out</Button>
      </div>
    );
  }
  return (
    <div className="p-4 flex flex-col gap-y-4">
      <input type="text" placeholder="name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button onClick={onSubmit}>Create User</Button>
    </div>
  );
};
