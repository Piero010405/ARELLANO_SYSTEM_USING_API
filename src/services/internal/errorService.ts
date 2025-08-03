// src/services/internal/errorService.ts
/* eslint-disable @typescript-eslint/no-explicit-any */
export const parseApiError = (error: any): string => {
  if (error?.response?.data?.message) return error.response.data.message;
  if (error?.message) return error.message;
  return "Unknown error occurred";
};
