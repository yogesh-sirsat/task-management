"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RootState } from "@/store/store";
import { checkSession } from "@/store/features/userSlice";

function withSessionCheck(WrappedComponent: React.FC) {
  const WithSessionCheck: React.FC = (props: any) => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const isAuthenticated = useAppSelector(
      (state: RootState) => state.user.isAuthenticated
    );

    useEffect(() => {
      dispatch(checkSession());
    }, [dispatch]);

    useEffect(() => {
      if (!isAuthenticated) {
        router.push("/login");
      }
    }, [isAuthenticated, router]);

    // Render the wrapped component if authenticated
    return isAuthenticated ? <WrappedComponent {...props} /> : null;
  };

  return WithSessionCheck;
}

export default withSessionCheck;
