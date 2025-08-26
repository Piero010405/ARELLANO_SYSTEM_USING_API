// src/lib/api/types.ts
export interface Metrics {
    notaudited: number;
    cancelled: number;
    fueraDT: number;
    fullAudit: number;
    tiendasFaltantes: number;
    totalTiendas: number;
}

export interface Store {
    PERIOD: string;
    CODIGO: number;
    AMP: string;
    AS: string;
    NOMBRE_AUDITOR: string;
    CLUSTER: string;
    TERRITORIO: string;
    PROVINCIA: string;
    DISTRITO: string;
    CANAL: string;
    UBICACION: string;
    STATUS_ACTUAL_EFECTIVO_E2E: string;
    STATUS_PROYECTADO: string;
    OOEE_A_REPORTAR: string;
    RAZON_OOEE: string;
    COMENTARIO_OOEE: string;
    FECHA_DE_VISITA_PERIODO_ANTERIOR_E2E: string; // Date en formato string
    FECHA_DE_VISITA_AJUSTADA_CALC: string; // Date en formato string
    DIAS_TRANSCURRIDOS_EFECTIVOS: number;
    DT_PROYECTADO: string;
    DT_A_REPORTAR: string;
    RAZON_DT: string;
    COMENTARIO_DT: string;
    NOMBRE_TIENDA: string;
    MES_CONTRATO: string;
}