// src/services/internal/loggerService.ts

export const logError = (message: string, error?: unknown) => {
  console.error(`[ERROR]: ${message}`);
  if (error) console.error(error);
};

export const logInfo = (message: string) => {
  console.log(`[INFO]: ${message}`);
};

export const logWarning = (message: string) => {
  console.warn(`[WARNING]: ${message}`);
};
