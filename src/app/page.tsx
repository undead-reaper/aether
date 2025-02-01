import React from "react";
import {
  files as FileSchema,
  folders as FolderSchema,
} from "~/server/db/schema";
import DriveContent from "./DriveContent";
import { db } from "~/server/db";

async function AetherApp() {
  const files = await db.select().from(FileSchema);
  const folders = await db.select().from(FolderSchema);
  return <DriveContent files={files} folders={folders} />;
}

export default AetherApp;
