"use client";
import { useQuery, useMutation } from "convex/react";
import { api } from "@workspace/backend/_generated/api";
import { Button } from "@workspace/ui/components/button";
import { OrganizationSwitcher } from "@clerk/nextjs";
import { useVapi } from "@/modules/widget/hooks/use-vapi";
export default function Page() {
  const addUser = useMutation(api.users.add);

  const {
    endCall,
    isConected,
    isConecting,
    isSpeaking,
    startCall,
    transcript,
  } = useVapi();

  return (
    <div className="flex flex-col items-center justify-center min-h-svh max-w-md mx-auto w-full">
      <Button onClick={() => startCall()}>Start call</Button>
      <Button onClick={() => endCall()} variant={"destructive"}>
        End call
      </Button>
      <p>is conected: {`${isConected}`} </p>
      <p>is conecting: {`${isConecting}`} </p>
      <p>is speaking: {`${isSpeaking}`} </p>
      <p>{JSON.stringify(transcript, null, 2)}</p>
    </div>
  );
}
