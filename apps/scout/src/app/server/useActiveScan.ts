import { useCallback } from "react";

import { AsyncData } from "@tsmono/common";
import { useMapAsyncData } from "@tsmono/react";

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
