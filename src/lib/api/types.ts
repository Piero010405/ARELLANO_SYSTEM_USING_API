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
    PERIOD_ID: number;
    E2E_PERIOD_ID: string;
    SMS_ID: number;
    IS_AMP_STORE: string;
    AS_NAME: string;
    AUDITOR_NAME: string;
    CLUSTER_NAME: string;
    DEPARTMENT_NAME: string;
    PROVINCE_NAME: string;
    DISTRICT_NAME: string;
    STORE_TYPE: string;
    LOCATION: string;
    STATUS_PREV: string;
    STATUS_E2E: string;
    STATUS_PROJECTED: string;
    STATUS_REPORT: string;
    PREV_VISIT_DATE: string;
    ADJUSTED_VISIT_DATE: string;
    EFFECTIVE_DAYS: number;
    FUERA_DT_41_MAS: string;
    DT_PROJECTED: string;
    DT_REPORT: string;
    REASON_TYPE: string;
    REASON: string;
    COMMENT: string;
    REASON_DETAIL: string;
    STORE_NAME: string;
    CONTRACT_MONTH_NAME: string;
}

export interface LastUpdateFile {
    ARCHIVO: string;
    fecha_actual: Date;
    fecha: Date;
    hora: Int16Array,
    minutos: Int16Array
}