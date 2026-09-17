import { NextRequest, NextResponse } from "next/server";
import ExcelJS from "exceljs";

import { requireSession } from "@/lib/auth/requireSession";
import { storesService } from "@/services";


export const runtime = "nodejs";
export const dynamic = "force-dynamic";


export async function GET(req: NextRequest) {

  try {
    const { session } = await requireSession(req);

    const stores = await storesService.getAllStores(
      session.accessToken
    );


    if (!stores.length) {
      return NextResponse.json(
        {
          error: "No existen tiendas disponibles para exportar"
        },
        {
          status: 404
        }
      );

    }


    const workbook = new ExcelJS.Workbook();

    workbook.creator = "Arellano";
    workbook.created = new Date();


    const worksheet = workbook.addWorksheet(
      "Tiendas",
      {
        properties: {
          tabColor: {
            argb: "8CBB34"
          }
        },
        views: [
          {
            state: "frozen",
            ySplit: 1
          }
        ]
      }
    );


    worksheet.columns = [
      {
        header: "PERIOD",
        key: "PERIOD",
        width: 14
      },
      {
        header: "CODIGO",
        key: "CODIGO",
        width: 16
      },
      {
        header: "AMP",
        key: "AMP",
        width: 10
      },
      {
        header: "AS",
        key: "AS",
        width: 25
      },
      {
        header: "NOMBRE_AUDITOR",
        key: "NOMBRE_AUDITOR",
        width: 30
      },
      {
        header: "CLUSTER",
        key: "CLUSTER",
        width: 25
      },
      {
        header: "DEPARTAMENTO",
        key: "DEPARTAMENTO",
        width: 20
      },
      {
        header: "PROVINCIA",
        key: "PROVINCIA",
        width: 20
      },
      {
        header: "DISTRITO",
        key: "DISTRITO",
        width: 20
      },
      {
        header: "CANAL",
        key: "CANAL",
        width: 24
      },
      {
        header: "UBICACION",
        key: "UBICACION",
        width: 35
      },
      {
        header: "STATUS_ACTUAL_EFECTIVO_E2E",
        key: "STATUS_ACTUAL_EFECTIVO_E2E",
        width: 28
      },
      {
        header: "STATUS_PROYECTADO",
        key: "STATUS_PROYECTADO",
        width: 22
      },
      {
        header: "OOEE_A_REPORTAR",
        key: "OOEE_A_REPORTAR",
        width: 22
      },
      {
        header: "RAZON_OOEE",
        key: "RAZON_OOEE",
        width: 30
      },
      {
        header: "COMENTARIO_OOEE",
        key: "COMENTARIO_OOEE",
        width: 40
      },
      {
        header: "FECHA_DE_VISITA_PERIODO_ANTERIOR_E2E",
        key: "FECHA_DE_VISITA_PERIODO_ANTERIOR_E2E",
        width: 35
      },
      {
        header: "FECHA_DE_VISITA_AJUSTADA_CALC",
        key: "FECHA_DE_VISITA_AJUSTADA_CALC",
        width: 30
      },
      {
        header: "DIAS_TRANSCURRIDOS_EFECTIVOS",
        key: "DIAS_TRANSCURRIDOS_EFECTIVOS",
        width: 28
      },
      {
        header: "DT_PROYECTADO",
        key: "DT_PROYECTADO",
        width: 20
      },
      {
        header: "DT_A_REPORTAR",
        key: "DT_A_REPORTAR",
        width: 20
      },
      {
        header: "RAZON_DT",
        key: "RAZON_DT",
        width: 30
      },
      {
        header: "COMENTARIO_DT",
        key: "COMENTARIO_DT",
        width: 40
      },
      {
        header: "DETALLE_RAZON",
        key: "DETALLE_RAZON",
        width: 30
      },
      {
        header: "NOMBRE_TIENDA",
        key: "NOMBRE_TIENDA",
        width: 35
      },
      {
        header: "MES_CONTRATO",
        key: "MES_CONTRATO",
        width: 20
      },
    ];

    worksheet.addRows(stores);


    // ============================
    // ESTILO DEL HEADER
    // ============================
    const headerRow = worksheet.getRow(1);

    headerRow.height = 25;
    headerRow.eachCell((cell) => {
      cell.font = {
        bold: true,
        color: {
          argb: "FFFFFFFF"
        }
      };
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: {
          argb: "FF15253C"
        }
      };
      cell.alignment = {
        vertical: "middle",
        horizontal: "center"
      };
    });


    // ============================
    // FILTROS
    // ============================
    worksheet.autoFilter = {
      from: {
        row: 1,
        column: 1
      },
      to: {
        row: 1,
        column: worksheet.columnCount
      }
    };


    // Mantener código sin notación científica
    worksheet.getColumn("CODIGO").numFmt = "0";

    const buffer = await workbook.xlsx.writeBuffer();

    const period =
      String(stores[0]?.PERIOD || "ACTUAL")
        .replace(/[^\w-]/g, "");

    const fileName =
      `Arellano_Tiendas_${period}.xlsx`;

    return new NextResponse(
      new Uint8Array(buffer),
      {
        status: 200,
        headers: {
          "Content-Type":
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "Content-Disposition":
            `attachment; filename="${fileName}"`,
          "Cache-Control":
            "no-store",
        },
      }
    );


  } catch (error) {
    console.error(
      "Error al exportar tiendas:",
      error
    );

    return NextResponse.json(
      {
        error: "Error al generar el archivo Excel"
      },
      {
        status: 500
      }
    );

  }
}