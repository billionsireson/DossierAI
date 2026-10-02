import { randomUUID } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import path from "path";

export type StoredObject = {
  storageKey: string;
  sizeBytes: number;
};

export interface StorageDriver {
  put(args: {
    fileName: string;
    mimeType: string;
    data: Buffer;
  }): Promise<StoredObject>;
}

/** Local-filesystem driver for dev. S3-compatible driver lands with credentials. */
export const localStorageDriver: StorageDriver = {
  async put({ fileName, data }) {
    const dir = path.join(process.cwd(), ".uploads");
    await mkdir(dir, { recursive: true });
    const safe = fileName.replace(/[^a-zA-Z0-9._-]+/g, "_").slice(0, 120);
    const key = `${randomUUID()}-${safe}`;
    await writeFile(path.join(dir, key), data);
    return { storageKey: key, sizeBytes: data.length };
  },
};

export function getStorageDriver(): StorageDriver {
  // When S3 env is present we still use local in M3; interface keeps the swap safe.
  return localStorageDriver;
}
