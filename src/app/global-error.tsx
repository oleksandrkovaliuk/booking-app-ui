"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div>
      <h2>Something went wrong! (GlobalError)</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
