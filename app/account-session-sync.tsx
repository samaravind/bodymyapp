"use client";

import { useSession, useSessionList, useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { saveAccounts } from "./saved-accounts";

export default function AccountSessionSync() {
  const { user } = useUser();
  const { session } = useSession();
  const sessionList = useSessionList();

  useEffect(() => {
    if (!sessionList.isLoaded) return;

    const accounts = sessionList.sessions
      .map((item) => {
        const email =
          item.user?.primaryEmailAddress?.emailAddress ||
          item.publicUserData?.identifier;

        if (!email) return null;

        const name =
          item.user?.fullName?.trim() ||
          item.publicUserData?.firstName?.trim() ||
          email;

        return {
          id: item.user?.id || email,
          name,
          email,
          avatar: item.user?.imageUrl || item.publicUserData?.imageUrl,
          sessionKey: item.id,
        };
      })
      .filter((account): account is NonNullable<typeof account> => Boolean(account));

    const activeEmail = user?.primaryEmailAddress?.emailAddress;
    const activeAccountId = user?.id || activeEmail || undefined;

    if (accounts.length === 0 && user && session && activeEmail) {
      accounts.push({
        id: user.id,
        name: user.fullName?.trim() || activeEmail,
        email: activeEmail,
        avatar: user.imageUrl,
        sessionKey: session.id,
      });
    }

    queueMicrotask(() => {
      saveAccounts(accounts, activeAccountId);
    });
  }, [session, sessionList.isLoaded, sessionList.sessions, user]);

  return null;
}
