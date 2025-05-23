import { Spinner } from "@nextui-org/react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Spinner size="md" color="primary" />
    </div>
  );
}
