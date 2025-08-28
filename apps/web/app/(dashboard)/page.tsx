"use client";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";

import { api } from "@workspace/backend/_generated/api";
import { Button } from "@workspace/ui/components/button";
import { useMutation, useQuery } from "convex/react";
export default function Page() {
  const users = useQuery(api.users.getMany);
  const addUser = useMutation(api.users.add);
  return (
    <div className="flex flex-col items-center justify-center min-h-svh">
      <p>web app</p>
      <Button onClick={() => addUser()}>add</Button>
      <div className="max-w-sm w-full mx-auto">
        <UserButton />
        <OrganizationSwitcher hidePersonal={true} />

        {JSON.stringify(users, null, 2)}
      </div>
    </div>
  );
}
