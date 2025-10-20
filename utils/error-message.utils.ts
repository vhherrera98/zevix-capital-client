import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export const errorMessage = (error: unknown) => {
  const err = error as FetchBaseQueryError | SerializedError;

  const message =
    'data' in err && typeof err.data === 'object' && err.data !== null && 'message' in err.data
      ? (err.data as { message: string }).message
      : 'INTERNAL ERROR';

  return message;
}