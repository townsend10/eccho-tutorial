"use client";

import { Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import { AuthLayout } from "../layouts/auth-layout";
import { SignInIView } from "../views/sign-in-view";
export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AuthLoading>
        <AuthLayout>
          <p>loading...</p>
        </AuthLayout>
      </AuthLoading>
      <Authenticated>{children}</Authenticated>
      <Unauthenticated>
        <AuthLayout>
          <SignInIView />
        </AuthLayout>
      </Unauthenticated>
    </>
  );
};
