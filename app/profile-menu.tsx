"use client";

import { useClerk, useSession, useSessionList, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  getSavedAccounts,
  removeAccount,
  saveAccount,
  SAVED_ACCOUNTS_UPDATED_EVENT,
  setActiveAccount,
  signOutCurrentAccount,
  switchAccount,
  type SavedAccount,
} from "./saved-accounts";

function getAccountInitial(name: string) {
  return name.charAt(0).toUpperCase();
}

function afterDropdownClose(callback: () => void | Promise<void>) {
  requestAnimationFrame(() => {
    void callback();
  });
}

export default function ProfileMenu() {
  const { openUserProfile, signOut } = useClerk();
  const { user } = useUser();
  const { session } = useSession();
  const sessionList = useSessionList();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [showAccounts, setShowAccounts] = useState(false);
  const [savedAccounts, setSavedAccounts] = useState<SavedAccount[]>(() =>
    getSavedAccounts(),
  );
  const [switchingAccountId, setSwitchingAccountId] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [savingName, setSavingName] = useState(false);
  const [nameError, setNameError] = useState("");
  const [accountError, setAccountError] = useState("");
  const [lastProfile, setLastProfile] = useState<{
    name: string;
    email?: string;
    imageUrl?: string;
  } | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user || !session) return;

    const email = user.primaryEmailAddress?.emailAddress;
    if (!email) return;

    const updatedAccounts = saveAccount({
      id: user.id,
      name: user.fullName?.trim() || "NEW USER",
      email,
      avatar: user.imageUrl,
      sessionKey: session.id,
    });

    queueMicrotask(() => setSavedAccounts(updatedAccounts));
  }, [session, user]);

  useEffect(() => {
    if (!user) return;

    const nextName = user.fullName?.trim();
    const nextEmail = user.primaryEmailAddress?.emailAddress;

    if (nextName || nextEmail) {
      queueMicrotask(() => {
        setLastProfile({
          name: nextName || nextEmail || "NEW USER",
          email: nextEmail,
          imageUrl: user.imageUrl,
        });
      });
    }
  }, [user]);

  useEffect(() => {
    const refreshAccounts = () => {
      queueMicrotask(() => setSavedAccounts(getSavedAccounts()));
    };

    window.addEventListener(SAVED_ACCOUNTS_UPDATED_EVENT, refreshAccounts);
    window.addEventListener("storage", refreshAccounts);

    return () => {
      window.removeEventListener(SAVED_ACCOUNTS_UPDATED_EVENT, refreshAccounts);
      window.removeEventListener("storage", refreshAccounts);
    };
  }, []);

  useEffect(() => {
    const close = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const profileName = user?.fullName?.trim();
  const email = user?.primaryEmailAddress?.emailAddress || lastProfile?.email;
  const displayName = profileName || lastProfile?.name || "NEW USER";
  const imageUrl = user?.imageUrl || lastProfile?.imageUrl;
  const initial = getAccountInitial(displayName);
  const shouldAskForName = Boolean(user && !profileName);
  const availableSessions = useMemo(
    () => (sessionList.isLoaded ? sessionList.sessions : []),
    [sessionList],
  );

  const allAccounts = useMemo(() => {
    const accountsByKey = new Map<string, SavedAccount>();

    savedAccounts.forEach((account) => {
      accountsByKey.set(account.id || account.email, account);
    });

    availableSessions.forEach((item) => {
      const sessionEmail =
        item.user?.primaryEmailAddress?.emailAddress ||
        item.publicUserData?.identifier;

      if (!sessionEmail) return;

      const sessionName =
        item.user?.fullName?.trim() ||
        item.publicUserData?.firstName?.trim() ||
        "NEW USER";

      const account: SavedAccount = {
        id: item.user?.id || sessionEmail,
        name: sessionName,
        email: sessionEmail,
        avatar: item.user?.imageUrl || item.publicUserData?.imageUrl,
        sessionKey: item.id,
      };

      accountsByKey.set(account.id, {
        ...accountsByKey.get(account.id),
        ...account,
      });
    });

    return Array.from(accountsByKey.values());
  }, [availableSessions, savedAccounts]);

  const otherAccounts = allAccounts.filter((account) => account.id !== user?.id);

  const findSessionForAccount = (account: SavedAccount) =>
    availableSessions.find((item) => {
      const sessionEmail =
        item.user?.primaryEmailAddress?.emailAddress ||
        item.publicUserData?.identifier;

      return item.id === account.sessionKey || item.user?.id === account.id || sessionEmail === account.email;
    });

  const saveProfileName = async () => {
    const trimmedName = nameInput.trim();

    if (!user || !trimmedName) {
      setNameError("Please enter your name.");
      return;
    }

    setSavingName(true);
    setNameError("");

    try {
      const [firstName, ...rest] = trimmedName.split(/\s+/);
      await user.update({
        firstName,
        lastName: rest.join(" ") || undefined,
      });
      await user.reload();
      setNameInput("");
    } catch (error) {
      setNameError(
        error instanceof Error
          ? error.message
          : "Could not save your name. Please try again.",
      );
    } finally {
      setSavingName(false);
    }
  };

  const switchToAccount = async (account: SavedAccount) => {
    if (!sessionList.isLoaded) return;

    const accountSession = findSessionForAccount(account);

    if (!accountSession) {
      removeAccount(account.id);
      setSavedAccounts(getSavedAccounts());
      setOpen(false);
      setShowAccounts(false);
      afterDropdownClose(() => {
        router.push(`/sign-in?addAccount=true&email=${encodeURIComponent(account.email)}`);
      });
      return;
    }

    setSwitchingAccountId(account.id);
    setShowAccounts(false);
    setOpen(false);
    afterDropdownClose(async () => {
      await sessionList.setActive({ session: accountSession.id });
      switchAccount(account.id);
      setSwitchingAccountId("");
    });
  };

  const addOtherAccount = () => {
    setAccountError("");
    setOpen(false);
    setShowAccounts(false);

    afterDropdownClose(async () => {
      try {
        if (session) {
          await signOut({ sessionId: session.id, redirectUrl: "/sign-in?addAccount=true" });
          return;
        }

        router.push("/sign-in?addAccount=true");
      } catch {
        setAccountError("Could not open add account. Please try again.");
        setOpen(true);
        setShowAccounts(true);
      }
    });
  };

  const signOutActiveAccount = async () => {
    setOpen(false);
    setShowAccounts(false);

    if (!user || !session) {
      afterDropdownClose(async () => {
        await signOut({ redirectUrl: "/" });
      });
      return;
    }

    const nextSession = availableSessions.find((item) => item.id !== session.id);

    afterDropdownClose(async () => {
      await signOut({ sessionId: session.id });
      const remainingAccounts = signOutCurrentAccount(user.id);
      setSavedAccounts(remainingAccounts);

      if (nextSession && sessionList.isLoaded) {
        const nextEmail =
          nextSession.user?.primaryEmailAddress?.emailAddress ||
          nextSession.publicUserData?.identifier;
        const nextAccountId = nextSession.user?.id || nextEmail;

        if (nextAccountId) {
          setActiveAccount(nextAccountId);
        }

        await sessionList.setActive({ session: nextSession.id });
        return;
      }

      router.push("/");
    });
  };

  return (
    <>
      <div ref={menuRef} className="relative">
        <button
          type="button"
          aria-label="Open account menu"
          onClick={() => setOpen((value) => !value)}
          className="grid h-9 w-9 place-items-center overflow-hidden rounded-full bg-violet-600 text-sm font-black text-white ring-2 ring-white/20"
        >
          {imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={imageUrl} alt="" className="h-full w-full object-cover" />
          ) : (
            initial
          )}
        </button>

        {open ? (
            <div
  onMouseDown={(event) => event.stopPropagation()}
  onClick={(event) => event.stopPropagation()}
  className="absolute right-0 top-12 z-50 w-80 overflow-hidden rounded-lg border border-slate-200 bg-white text-slate-900 shadow-2xl"
>
            <div className="flex items-center gap-3 border-b border-slate-200 p-4">
              <div className="grid h-10 w-10 place-items-center overflow-hidden rounded-full bg-violet-600 text-sm font-black text-white">
                {imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={imageUrl} alt="" className="h-full w-full object-cover" />
                ) : (
                  initial
                )}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">
                  {displayName}
                  {!profileName ? (
                    <span className="ml-2 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-black text-emerald-700">
                      NEW
                    </span>
                  ) : null}
                </p>
                {email ? <p className="truncate text-sm text-slate-500">{email}</p> : null}
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setOpen(false);
                setShowAccounts(false);
                afterDropdownClose(() => {
                  openUserProfile();
                });
              }}
              className="flex w-full items-center gap-3 border-b border-slate-100 px-5 py-4 text-left text-sm text-slate-700 hover:bg-slate-50"
            >
              Manage account
            </button>
            <button
  type="button"
  onClick={(event) => {
    event.preventDefault();
    event.stopPropagation();
    setSavedAccounts(getSavedAccounts());
    setShowAccounts((value) => !value);
  }}
  className="flex w-full items-center gap-3 border-b border-slate-100 px-5 py-4 text-left text-sm text-slate-700 hover:bg-slate-50"
>
  Switch account
</button>
            {showAccounts ? (
              <div className="border-b border-slate-100 bg-slate-50">
                {!sessionList.isLoaded ? (
                  <p className="px-5 py-4 text-sm text-slate-500">Loading accounts...</p>
                ) : (
                  <>
                    <div className="px-5 pb-2 pt-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                      Other accounts
                    </div>
                    {accountError ? (
                      <p className="border-t border-amber-100 bg-amber-50 px-5 py-3 text-sm leading-5 text-amber-800">
                        {accountError}
                      </p>
                    ) : null}
                    {otherAccounts.map((account) => {
                      const accountSession = findSessionForAccount(account);
                      const isExpired = !accountSession;

                      return (
                        <button
                          key={account.id}
                          type="button"
                          onClick={() => switchToAccount(account)}
                          disabled={switchingAccountId === account.id}
                          className="flex w-full items-center gap-3 border-t border-slate-100 bg-white px-5 py-4 text-left text-sm text-slate-700 hover:bg-slate-50 disabled:opacity-60"
                        >
                          <span className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-full bg-violet-600 text-sm font-black text-white">
                            {account.avatar ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={account.avatar} alt="" className="h-full w-full object-cover" />
                            ) : (
                              getAccountInitial(account.name)
                            )}
                          </span>
                          <span className="min-w-0">
                            <span className="block truncate font-medium">
                              {switchingAccountId === account.id ? "Switching..." : account.name}
                            </span>
                            <span className="block truncate text-xs text-slate-500">
                              {isExpired ? `${account.email} - sign in again` : account.email}
                            </span>
                          </span>
                        </button>
                      );
                    })}
                    {otherAccounts.length === 0 ? (
                      <p className="border-t border-slate-100 bg-white px-5 py-3 text-sm text-slate-500">
                        No other saved accounts yet
                      </p>
                    ) : null}
                    <button
                      type="button"
                      onClick={addOtherAccount}
                      className="flex w-full items-center gap-3 border-t border-slate-100 bg-white px-5 py-4 text-left text-sm text-slate-700 hover:bg-slate-50"
                    >
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-emerald-100 text-sm font-black text-emerald-700">
                        +
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate font-medium text-emerald-700">
                          Other account
                        </span>
                        <span className="block truncate text-xs text-slate-500">
                          Sign in with another account
                        </span>
                      </span>
                    </button>
                  </>
                )}
              </div>
            ) : null}
            <button
              type="button"
              onClick={signOutActiveAccount}
              className="flex w-full items-center gap-3 px-5 py-4 text-left text-sm text-slate-700 hover:bg-slate-50"
            >
              Sign out
            </button>
          </div>
        ) : null}
      </div>
      {shouldAskForName ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4">
          <div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="new-user-title"
            aria-describedby="new-user-description"
            className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 text-slate-950 shadow-2xl"
          >
            <div className="space-y-2">
              <h2 id="new-user-title" className="text-lg font-semibold">
                Welcome, new user
              </h2>
              <p id="new-user-description" className="text-sm leading-6 text-slate-600">
                Enter your name so your profile shows your name above your email.
              </p>
            </div>
            <div className="mt-5 space-y-2">
              <label htmlFor="new-user-name" className="text-sm font-medium text-slate-700">
                Your name
              </label>
              <input
                id="new-user-name"
                value={nameInput}
                onChange={(event) => {
                  setNameInput(event.target.value);
                  setNameError("");
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    void saveProfileName();
                  }
                }}
                className="h-11 w-full rounded-md border border-slate-300 px-3 text-sm outline-none ring-emerald-500 transition focus:border-emerald-500 focus:ring-2"
                placeholder="Enter your name"
                autoFocus
              />
              {nameError ? <p className="text-sm text-red-600">{nameError}</p> : null}
            </div>
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={saveProfileName}
                disabled={savingName}
                className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 disabled:opacity-60"
              >
                {savingName ? "Saving..." : "Save name"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
