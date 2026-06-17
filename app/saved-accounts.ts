"use client";

export type SavedAccount = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  sessionKey?: string;
};

const ACCOUNTS_KEY = "mytrine:savedAccounts";
const ACTIVE_ACCOUNT_KEY = "mytrine:activeAccountId";
export const SAVED_ACCOUNTS_UPDATED_EVENT = "mytrine:savedAccountsUpdated";

const canUseStorage = () => typeof window !== "undefined";

export function getSavedAccounts(): SavedAccount[] {
  if (!canUseStorage()) return [];

  try {
    const raw = window.localStorage.getItem(ACCOUNTS_KEY);
    return raw ? (JSON.parse(raw) as SavedAccount[]) : [];
  } catch {
    return [];
  }
}

function writeSavedAccounts(accounts: SavedAccount[]) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
  window.dispatchEvent(new CustomEvent(SAVED_ACCOUNTS_UPDATED_EVENT));
}

function upsertAccounts(accounts: SavedAccount[], incomingAccounts: SavedAccount[]) {
  incomingAccounts.forEach((account) => {
    const index = accounts.findIndex(
      (item) => item.id === account.id || item.email === account.email,
    );

    if (index >= 0) {
      accounts[index] = { ...accounts[index], ...account };
    } else {
      accounts.push(account);
    }
  });

  return accounts;
}

export function saveAccount(account: SavedAccount, options?: { setActive?: boolean }) {
  const accounts = getSavedAccounts();
  upsertAccounts(accounts, [account]);

  writeSavedAccounts(accounts);
  if (options?.setActive !== false) {
    setActiveAccount(account.id);
  }
  return accounts;
}

export function saveAccounts(accountsToSave: SavedAccount[], activeAccountId?: string) {
  const accounts = upsertAccounts(getSavedAccounts(), accountsToSave);

  writeSavedAccounts(accounts);
  if (activeAccountId) {
    setActiveAccount(activeAccountId);
  }

  return accounts;
}

export function getActiveAccount() {
  if (!canUseStorage()) return null;
  const activeAccountId = window.localStorage.getItem(ACTIVE_ACCOUNT_KEY);
  return getSavedAccounts().find((account) => account.id === activeAccountId) || null;
}

export function setActiveAccount(accountId: string) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(ACTIVE_ACCOUNT_KEY, accountId);
}

export function switchAccount(accountId: string) {
  setActiveAccount(accountId);
  return getActiveAccount();
}

export function removeAccount(accountId: string) {
  const accounts = getSavedAccounts().filter((account) => account.id !== accountId);
  writeSavedAccounts(accounts);

  if (canUseStorage() && window.localStorage.getItem(ACTIVE_ACCOUNT_KEY) === accountId) {
    if (accounts[0]) {
      setActiveAccount(accounts[0].id);
    } else {
      window.localStorage.removeItem(ACTIVE_ACCOUNT_KEY);
    }
  }

  return accounts;
}

export function signOutCurrentAccount(accountId: string) {
  return removeAccount(accountId);
}

export function signOutAllAccounts() {
  if (!canUseStorage()) return;
  window.localStorage.removeItem(ACCOUNTS_KEY);
  window.localStorage.removeItem(ACTIVE_ACCOUNT_KEY);
}
