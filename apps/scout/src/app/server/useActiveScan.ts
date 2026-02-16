import { AsyncData } from "@tsmono/common";
import { useCallback } from "react";

import { useMapAsyncData } from "../../hooks/useMapAsyncData";
import { ActiveScanInfo } from "../../types/api-types";

import { useActiveScans } from "./useActiveScans";

export const useActiveScan = (
  scanId: string | undefined
): AsyncData<ActiveScanInfo | undefined> =>
  useMapAsyncData(
    useActiveScans(),
    useCallback(
      (activeScans: Record<string, ActiveScanInfo>) =>
        scanId ? (activeScans[scanId] ?? undefined) : undefined,
      [scanId]
    )
  );
