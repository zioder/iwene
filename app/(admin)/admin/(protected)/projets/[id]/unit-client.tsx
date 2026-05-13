"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateUnitStatus } from "@/app/(admin)/admin/actions";
import { Button } from "@/components/ui/button";

export default function UnitClient({
  unitId,
  currentStatus,
}: {
  unitId: number;
  currentStatus: string;
}) {
  const [status, setStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function toggle() {
    setLoading(true);
    const newStatus = status === "sold" ? "available" : "sold";
    await updateUnitStatus(unitId, newStatus);
    setStatus(newStatus);
    router.refresh();
    setLoading(false);
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggle}
      disabled={loading}
    >
      {loading
        ? "..."
        : status === "sold"
          ? "Marquer disponible"
          : "Marquer vendu"}
    </Button>
  );
}
