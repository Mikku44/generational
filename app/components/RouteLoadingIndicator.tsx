import { useEffect } from "react";
import { useNavigation } from "react-router";

// Fixed top-left logo + loading indicator on every client-side page transition.
// Mount once in root App; driven by React Router navigation state.
// While loading, the cursor is also switched to the loading (wait) cursor.
export default function RouteLoadingIndicator() {
  const navigation = useNavigation();
  const isLoading = navigation.state !== "idle";

  useEffect(() => {
    if (!isLoading) return;
    const root = document.documentElement;
    const body = document.body;
    const prevRootCursor = root.style.cursor;
    const prevBodyCursor = body.style.cursor;
    root.style.cursor = "wait";
    body.style.cursor = "wait";

    // Force all elements (links, buttons, etc.) to show the wait cursor.
    const style = document.createElement("style");
    style.id = "route-loading-cursor";
    style.textContent = "* { cursor: wait !important; }";
    document.head.appendChild(style);

    return () => {
      root.style.cursor = prevRootCursor;
      body.style.cursor = prevBodyCursor;
      style.remove();
    };
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed top-4 left-4 z-[100] flex cursor-wait items-center gap-2.5 bg-black text-white pl-2 pr-3 py-2 shadow-lg"
    >
      <img src="/logo.png" alt="GENERATIONAL — loading" className="size-5 invert" />
      <span className="size-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
      <span className="text-[11px] uppercase tracking-[0.25em]">Loading</span>
    </div>
  );
}
