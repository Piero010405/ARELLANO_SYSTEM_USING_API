import { Modal } from "../ui/modal";
import { Store } from "@/lib/types/global";
import { useState, useRef, useEffect, type ChangeEvent } from "react";
import { toast } from 'nextjs-toast-notify';


const reasonOptions: Record<string, Record<string, string[]>> = {
    CANCELLED: {
        "CIERRE DEFINITIVO": [
            "TEMAS ECONOMICOS/BAJAS VENTAS - NEGOCIO DEJO DE SER RENTABLE",
            "TEMAS ECONOMICOS/BAJAS VENTAS - FALTA DE CAPITAL PARA INVERTIR",
            "TEMAS ECONOMICOS/INCREMENTO-NO RENOVACIÓN DEL ALQUILER", 
            "COLABORADOR/FAMILIAR DELICADO DE SALUD",
            "FALLECIMIENTO DEL COLABORADOR/FAMILIAR",
            "INSEGURIDAD CIUDADANA (ROBOS FRECUENTES, EXTORSIÓN)",
            "PROBLEMAS CON LA LICENCIA MUNICIPALIDAD/MINSA",
            "COLABORADOR CON FALTA DE TIEMPO PORQUE SE DEDICA A OTRA ACTIVIDAD ECONOMICA"
        ],
        "MALA COLABORACIÓN": [
            "NO GUARDA LAS COMPRAS/IMPIDE CONTEO EN ALGUNAS ZONAS DE LA TIENDA",
            "POR FALTA DE TIEMPO DEL COLABORADOR",
            "INCONFORMIDAD CON INCENTIVO",
            "MALA RELACIÓN CON AUDITOR",
            "REPROGRAMACIÓN CONSTANTE",
            "CONTADOR SE LLEVA LOS DOCUMENTOS DE COMPRA"
        ],
        "CAMBIO DE RUBRO": [
            "CAMBIÓ A BODEGA GENERALISTA",
            "CAMBIÓ A KIOSCO",
            "CAMBIÓ A ON PREMISE",
            "CAMBIÓ A BODEGA DE ASEO",
            "CAMBIÓ A LICORERÍA",
            "CAMBIÓ A OTRO TIPO DE TIENDA NO ESPECIFICADA ANTERIORMENTE"
        ],
        "MALA CONTRATACIÓN": [
            "GESTIÓN DE CONTRATACIÓN SE REALIZO DE MANERA INCOMPLETA",
            "NO GUARDA LAS COMPRAS/IMPIDE CONTEO EN ALGUNAS ZONAS DE LA TIENDA"
        ],
        "CAMBIO DE DUEÑO/ADMINISTRADOR SIN ÉXITO EN RECONTRATO": [],
        "DEJÓ DE MANEJAR EL ÍNDICE": [
            "BAJAS VENTAS",
            "ESPACIO REDUCIDO",
            "PERMISOS MUNICIPALES",
            "OTRAS RAZONES"
        ],
        "NEGOCIO COMPARTE MERCADERÍA": [],
        "COLABORADOR(A) EN VIAJE PROLONGADO": [],
        "COLABORADOR(A) SIN UBICAR": [],
        "ZONA PELIGROSA": [],
        "CIERRE POR REMODELACIÓN INTERNA/EXTERNA PROLONGADO": [],
    },
    NOTAUDITED: {
        "COLABORADOR(A) SIN UBICAR": [],
        "COLABORADOR(A) DE VIAJE": [],
        "COLABORADOR(A) DE VACACIONES": [],
        "PROBLEMAS FAMILIARES O DE SALUD": [],
        "CIERRE POR REMODELACIÓN INTERNA/EXTERNA": [],
        "SIN PRODUCTOS AUDITABLES ESTE PERIODO": [],
        "CAMBIO DE DUEÑO/ADMINISTRADOR": [],
        "COLABORADOR CERRO TEMPORALMENTE PORQUE SE DEDICA A OTRA ACTIVIDAD ECONOMICA": [],
        "MALA COLABORACIÓN": [
            "NO GUARDA LAS COMPRAS/IMPIDE CONTEO EN ALGUNAS ZONAS DE LA TIENDA",
            "POR FALTA DE TIEMPO DEL COLABORADOR"
        ],
        "NEGOCIO SE ENCONTRÓ CERRADO - ABRE SIGUIENTE MES": [],
        "SIN DOCUMENTOS DE COMPRA": [],
        "TIENDA EXCEDIÓ LOS 40 DT": [],
        "TIENDA CERRADA POR PARO/HUELGA": [],
        "TIENDA CERRADA POR FENÓMENOS NATURALES": [],
        "OTRAS RAZONES": [],
    },
    "FUERA DE DT": {
        "COLABORADOR(A) DE VIAJE": [],
        "COLABORADOR REPROGRAMÓ CITA DE ATENCIÓN": [],
        "PROBLEMAS FAMILIARES O DE SALUD": [],
        "DESCUIDO DE AUDITOR": [],
        "LICENCIA MEDICA DE AUDITOR": [],
        "ROBO DEL EQUIPO DE AUDITOR": [],
        "MEJORA DE TFA / ZONIFICACIÓN": [],
        "CIERRE POR REMODELACIÓN INTERNA/EXTERNA": [],
        "COLABORADOR(A) SIN UBICAR": [],
        "TIENDA CERRADA TEMPORALMENTE POR PARO/HUELGAS": [],
        "TIENDA CERRADA TEMPORALMENTE POR FENOMENOS NATURALES": [],
        "OTRAS RAZONES": [],
    }
};


interface ModalEditStoreProps {
    isOpen: boolean;
    closeModal: () => void;
    selectedStore: Store | null;
}

export default function ModalEditStore({ isOpen, closeModal, selectedStore }: ModalEditStoreProps) {
    const [statusProyectar, setStatusProyectar] = useState<string>("");
    const [razon, setRazon] = useState<string>("");
    const [comentario, setComentario] = useState<string>("");
    const [detalle, setDetalle] = useState<string>("");
    const [anulacionProxPeriodo, setAnulacionProxPeriodo] = useState<string>("");
    const textAreaRef = useRef<HTMLTextAreaElement | null>(null)

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setDetalle(e.target.value)
    }

    useEffect(() => {
        if (textAreaRef.current == null) return
        textAreaRef.current.style.height = 'auto'
        textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px'
    }, [detalle])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            AS: selectedStore?.AS,
            PERIOD: selectedStore?.PERIOD,
            SMS_ID: selectedStore?.CODIGO,
            STATUS_PROYECTADO: statusProyectar,
            RAZON: razon,
            COMENTARIO: comentario,
            SE_ANULARA_PROXIMO_PERIODO: statusProyectar === "NOTAUDITED" ? anulacionProxPeriodo : null,
            DETALLE_RAZON: detalle,
        };

        try {
            const res = await fetch('/api/proyecciones', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const result = await res.json();

            if (res.ok) {
                toast.success("¡Proyección registrada exitosamente!", {
                    duration: 4000,
                    progress: true,
                    position: "bottom-right",
                    transition: "bounceIn",
                    icon: '',
                    sound: true,
                  });
                closeModal();
            } else {
                toast.error(result.message || "Error al guardar la proyección", {
                    duration: 4000,
                    progress: true,
                    position: "bottom-right",
                    transition: "bounceIn",
                    icon: '',
                    sound: true,
                  });
            }
        } catch (error) {
            console.error(error);
            toast.error("Error inesperado", {
                duration: 4000,
                progress: true,
                position: "bottom-right",
                transition: "bounceIn",
                icon: '',
                sound: true,
              });
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={closeModal}>
            <form onSubmit={handleSubmit}>

              <div className="flex flex-col overflow-y-auto custom-scrollbar px-10 py-5">
                  <div>
                    <h5 className="mb-2 font-semibold text-gray-800 modal-title text-theme-xl dark:text-white/90 lg:text-2xl">
                      Detalles de la Tienda
                    </h5>
                    <p className="text-sm text-gray-800 dark:text-gray-400">
                      Edita las proyecciones de la tienda
                    </p>
                  </div>
                  {selectedStore ? (
                    <>
                        <div className="mt-8 flex flex-col gap-y-4">
                            <div className="grid grid-cols-1 gap-x-7 gap-y-4 sm:grid-cols-2">
                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                                        Codigo
                                    </label>
                                    <input
                                        id="event-title"
                                        type="text"
                                        value={selectedStore.CODIGO}
                                        readOnly
                                        className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                                        />
                                </div>
                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                                        Tienda
                                    </label>
                                    <input
                                        id="event-title"
                                        type="text"
                                        value={selectedStore.NOMBRE_TIENDA}
                                        readOnly
                                        className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparen px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-40   focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/1    dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/3  dark:focus:border-brand-800"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-x-7 gap-y-4 sm:grid-cols-2">
                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                                        AS
                                    </label>
                                    <input
                                        id="event-title"
                                        type="text"
                                        value={selectedStore.AS}
                                        readOnly
                                        className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                                        />
                                </div>
                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                                        Territorio
                                    </label>
                                    <input
                                        id="event-title"
                                        type="text"
                                        value={selectedStore.TERRITORIO}
                                        readOnly
                                        className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-x-7 gap-y-4">
                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                                        Nombre de Auditor
                                    </label>
                                    <input
                                        id="event-title"
                                        type="text"
                                        value={selectedStore.NOMBRE_AUDITOR}
                                        readOnly
                                        className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                                        />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-x-7 gap-y-4 sm:grid-cols-2">
                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                                        Mes de Contrato
                                    </label>
                                    <input
                                        id="event-title"
                                        type="text"
                                        value={selectedStore.MES_CONTRATO}
                                        readOnly
                                        className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                                        />
                                </div>
                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                                        Días Transcurridos
                                    </label>
                                    <input
                                        id="event-title"
                                        type="text"
                                        value={selectedStore.DIAS_TRANSCURRIDOS_EFECTIVOS}
                                        readOnly
                                        className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                                        />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-x-7 gap-y-4 sm:grid-cols-2">
                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                                        Status E2E
                                    </label>
                                    <input
                                        id="event-title"
                                        type="text"
                                        value={selectedStore.STATUS_ACTUAL_EFECTIVO_E2E}
                                        readOnly
                                        className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                                    />
                                </div>
                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                                        Status A Reportar
                                    </label>
                                    <input
                                        id="event-title"
                                        type="text"
                                        value={(selectedStore.OOEE_A_REPORTAR == '0' && selectedStore.DT_A_REPORTAR == 'FUERA DE DT' ? selectedStore.DT_A_REPORTAR : selectedStore.OOEE_A_REPORTAR)}
                                        readOnly
                                        className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                                        />
                                </div>
                            </div>
                            {/* STATUS A PROYECTAR */}
                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                                    Status a Proyectar
                                </label>
                                <div className="flex flex-col sm:flex-row space-x-12 gap-y-2">
                                    {["CANCELLED", "NOTAUDITED", "FUERA DE DT"].map((status) => (
                                        <label key={status} className="flex items-center gap-2 text-sm text-gray-800 dark:text-white/90">
                                            <input
                                                type="radio"
                                                name="statusProyectar"
                                                value={status}
                                                checked={statusProyectar === status}
                                                onChange={() => {
                                                    setStatusProyectar(status);
                                                    setRazon("");
                                                }}
                                                required
                                            />
                                            {status}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Razon Dropdown */}
                            {statusProyectar && (
                                <div className="relative">
                                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                                        Razón
                                    </label>
                                    <select
                                         value={razon}
                                         onChange={(e) => {
                                             setRazon(e.target.value);
                                             setComentario("");
                                            }}
                                        className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 appearance-none pr-8"
                                        required
                                    >
                                        <option value="">Seleccione una razón</option>
                                        {Object.keys(reasonOptions[statusProyectar]).map((r) => (
                                            <option key={r} value={r}>{r}</option>
                                        ))}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-12 right-0 flex items-center px-2 text-gray-700">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                        <path d="M9.293 12.95l.707 0.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                        </svg>
                                    </div>
                                </div>
                            )}

                            {/* Comentario Dropdown */}
                            {statusProyectar && razon && reasonOptions[statusProyectar][razon].length > 0 && (
                                <div className="relative mt-4">
                                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                                        Comentario
                                    </label>
                                    <select
                                        value={comentario}
                                        onChange={(e) => setComentario(e.target.value)}
                                        required
                                        className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 appearance-none pr-8"
                                        >
                                        <option value="">Seleccione un comentario</option>
                                        {reasonOptions[statusProyectar][razon].map((c) => (
                                            <option key={c} value={c}>{c}</option>
                                        ))}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-12 right-0 flex items-center px-2 text-gray-700">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                        <path d="M9.293 12.95l.707 0.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                        </svg>
                                    </div>
                                </div>
                            )}

                            {/* Pregunta adicional solo si es NOTAUDITED */}
                            {statusProyectar === "NOTAUDITED" && (
                                <div className="mt-4">
                                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                                        ¿La tienda se anulará el próximo periodo?
                                    </label>
                                    <div className="flex space-x-6">
                                        {["SI", "NO"].map((opt) => (
                                            <label key={opt} className="flex items-center gap-2 text-sm text-gray-800 dark:text-white/90">
                                                <input
                                                    type="radio"
                                                    name="anulacionProxPeriodo"
                                                    value={opt}
                                                    checked={anulacionProxPeriodo === opt}
                                                    onChange={() => setAnulacionProxPeriodo(opt)}
                                                    required
                                                    />
                                                {opt}
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Detalle de razón */}
                            <div className="mt-4">
                                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                                    Detalle de razón
                                </label>
                                <textarea
                                    value={detalle}
                                    required
                                    className="dark:bg-dark-900 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 min-h-11 h-11 resize-none overflow-y-hidden"
                                    onChange={handleChange}
                                    rows={1}
                                    ref={textAreaRef}
                                    placeholder="Escriba el detalle aquí..."
                                    />
                            </div>  

                            <button
                                    rel="nofollow"
                                    className="flex items-center justify-center p-3 font-medium text-white rounded-lg bg-brand-500 text-theme-sm hover:bg-brand-600 w-full"
                                    type="submit"
                                    >
                                    Guardar
                            </button>
                        </div>
                    </>
                    ) : (
                        <p className="text-center text-sm font-medium text-gray-700 dark:text-gray-400">Cargando datos de la tienda...</p>
                    )}
              </div>
            </form>
            </Modal>
    )
}