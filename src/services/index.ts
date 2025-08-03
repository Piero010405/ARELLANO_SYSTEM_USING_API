// services/index.ts
export { authService } from './api/authService';
export { metricasService } from './api/metricasService';
export { proyeccionesService } from './api/proyeccionesService';
export { storesService } from './api/storesService';

export * as CacheService from "./internal/cacheService";
export * as LoggerService from "./internal/loggerService";
export * as ErrorService from "./internal/errorService";