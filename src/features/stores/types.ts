// * DTO (Data Transfer Object)
// DTO para proyección
export type CreateProjectionDto = {
  AS: string | number | null | undefined;
  PERIOD: string | number | null | undefined;
  SMS_ID: number;
  STATUS_PROYECTADO: string;
  RAZON: string;
  COMENTARIO: string;
  SE_ANULARA_PROXIMO_PERIODO: string | null;
  DETALLE_RAZON: string;
};