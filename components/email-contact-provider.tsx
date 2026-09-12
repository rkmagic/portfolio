"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { site } from "@/lib/site";

type EmailContactContextValue = {
  openEmailDialog: () => void;
};

const EmailContactContext = createContext<EmailContactContextValue | null>(
  null,
);

export function useEmailContact() {
  const ctx = useContext(EmailContactContext);
  if (!ctx) {
    throw new Error("useEmailContact must be used within EmailContactProvider");
  }
  return ctx;
}

function CopyIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

const actionBtnClass =
  "min-h-[44px] w-full rounded border border-[var(--star-yellow)] bg-[var(--star-yellow)] px-4 py-2 text-sm font-medium text-black hover:bg-[#e6b800] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--star-yellow)]";

const copyBtnClass =
  "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded border border-[var(--card-border)] text-[var(--text-muted)] transition-colors hover:bg-[var(--card-hover)] hover:text-[var(--text-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--star-yellow)]";

export function EmailContactProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const titleId = useId();
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const toastTimerRef = useRef<number | null>(null);

  const openEmailDialog = useCallback(() => setOpen(true), []);
  const closeDialog = useCallback(() => {
    setOpen(false);
  }, []);

  const showCopiedToast = useCallback(() => {
    setToastVisible(true);
    if (toastTimerRef.current !== null) {
      window.clearTimeout(toastTimerRef.current);
    }
    toastTimerRef.current = window.setTimeout(() => {
      setToastVisible(false);
      toastTimerRef.current = null;
    }, 2200);
  }, []);

  useEffect(() => {
    setMounted(true);
    return () => {
      if (toastTimerRef.current !== null) {
        window.clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    closeBtnRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDialog();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, closeDialog]);

  const copyText = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      showCopiedToast();
    } catch {
      /* clipboard blocked */
    }
  };

  const sendEmail = () => {
    window.location.href = `mailto:${site.email}`;
    closeDialog();
  };

  const openWhatsApp = () => {
    window.open(
      `https://wa.me/${site.whatsappNumber}`,
      "_blank",
      "noopener,noreferrer",
    );
    closeDialog();
  };

  const dialog =
    open && mounted ? (
      <div
        className="fixed inset-0 z-[200] flex items-center justify-center p-4"
        role="presentation"
      >
        <button
          type="button"
          className="absolute inset-0 bg-black/75 backdrop-blur-sm"
          aria-label="Close dialog"
          onClick={closeDialog}
        />
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className="relative z-10 w-full max-w-md rounded-lg border border-[var(--card-border)] bg-[var(--bg-deep)] p-6 shadow-xl"
        >
          <h2
            id={titleId}
            className="font-[family-name:var(--font-outfit)] text-xl font-semibold text-[var(--text-primary)]"
          >
            Contact me
          </h2>

          <div className="mt-6 flex flex-col gap-5">
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-[var(--text-muted)]">
                Email
              </p>
              <div className="flex items-center gap-2">
                <p className="min-w-0 flex-1 break-all font-[family-name:var(--font-mono)] text-sm text-[var(--text-primary)]">
                  {site.email}
                </p>
                <button
                  type="button"
                  className={copyBtnClass}
                  aria-label="Copy email address"
                  onClick={() => copyText(site.email)}
                >
                  <CopyIcon />
                </button>
              </div>
              <button
                type="button"
                className={`${actionBtnClass} mt-3`}
                onClick={sendEmail}
              >
                Send email
              </button>
            </div>

            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-[var(--text-muted)]">
                WhatsApp
              </p>
              <div className="flex items-center gap-2">
                <p className="min-w-0 flex-1 font-[family-name:var(--font-mono)] text-sm text-[var(--text-primary)]">
                  {site.whatsappDisplay}
                </p>
                <button
                  type="button"
                  className={copyBtnClass}
                  aria-label="Copy WhatsApp number"
                  onClick={() => copyText(site.whatsappDisplay)}
                >
                  <CopyIcon />
                </button>
              </div>
              <button
                type="button"
                className={`${actionBtnClass} mt-3`}
                onClick={openWhatsApp}
              >
                Message on WhatsApp
              </button>
            </div>
          </div>

          <button
            ref={closeBtnRef}
            type="button"
            className="mt-4 w-full min-h-[44px] rounded border border-[var(--card-border)] px-4 py-2 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--star-yellow)]"
            onClick={closeDialog}
          >
            Cancel
          </button>
        </div>
      </div>
    ) : null;

  const toast =
    mounted && toastVisible ? (
      <div
        role="status"
        aria-live="polite"
        className="fixed bottom-6 left-1/2 z-[300] -translate-x-1/2 rounded-md border border-[var(--card-border)] bg-[var(--bg-deep)] px-4 py-2.5 text-sm font-medium text-[var(--text-primary)] shadow-lg"
      >
        Copied
      </div>
    ) : null;

  return (
    <EmailContactContext.Provider value={{ openEmailDialog }}>
      {children}
      {mounted ? createPortal(dialog, document.body) : null}
      {mounted ? createPortal(toast, document.body) : null}
    </EmailContactContext.Provider>
  );
}

type EmailLinkProps = React.ComponentPropsWithoutRef<"button">;

/** Opens the email dialog instead of navigating to mailto directly. */
export function EmailLink({ className, children, ...rest }: EmailLinkProps) {
  const { openEmailDialog } = useEmailContact();
  return (
    <button
      type="button"
      className={className}
      onClick={openEmailDialog}
      {...rest}
    >
      {children}
    </button>
  );
}
