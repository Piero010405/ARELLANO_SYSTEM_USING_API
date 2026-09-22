import { NextRequest, NextResponse } from "next/server";
import ExcelJS from "exceljs";

import { requireSession } from "@/lib/auth/requireSession";
import { storesService } from "@/services";


export const runtime = "nodejs";
export const dynamic = "force-dynamic";


export async function GET(req: NextRequest) {

  try {
    const { session } = await requireSession(req);

    const stores = await storesService.getAllStores(session.accessToken);

    if (!stores.length) {
      return NextResponse.json(
        { error: "No existen tiendas disponibles para exportar"},
        { status: 404 }
      );
    }

    const workbook = new ExcelJS.Workbook();

    workbook.creator = "Arellano";
    workbook.created = new Date();

    const worksheet = workbook.addWorksheet(
      "Stores",
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
        header: "PERIOD_ID",
        key: "PERIOD_ID",
        width: 14
      },
      {
        header: "E2E_PERIOD_ID",
        key: "E2E_PERIOD_ID",
        width: 14
      },
      {
        header: "SMS_ID",
        key: "SMS_ID",
        width: 16
      },
      {
        header: "IS_AMP_STORE",
        key: "IS_AMP_STORE",
        width: 10
      },
      {
        header: "AS_NAME",
        key: "AS_NAME",
        width: 25
      },
      {
        header: "AUDITOR_NAME",
        key: "AUDITOR_NAME",
        width: 30
      },
      {
        header: "CLUSTER_NAME",
        key: "CLUSTER_NAME",
        width: 25
      },
      {
        header: "DEPARTMENT_NAME",
        key: "DEPARTMENT_NAME",
        width: 20
      },
      {
        header: "PROVINCE_NAME",
        key: "PROVINCE_NAME",
        width: 20
      },
      {
        header: "DISTRICT_NAME",
        key: "DISTRICT_NAME",
        width: 20
      },
      {
        header: "STORE_TYPE",
        key: "STORE_TYPE",
        width: 24
      },
      {
        header: "LOCATION",
        key: "LOCATION",
        width: 35
      },
      {
        header: "STATUS_PREV",
        key: "STATUS_PREV",
        width: 22
      },
      {
        header: "STATUS_E2E",
        key: "STATUS_E2E",
        width: 22
      },
      {
        header: "STATUS_PROJECTED",
        key: "STATUS_PROJECTED",
        width: 22
      },
      {
        header: "STATUS_REPORT",
        key: "STATUS_REPORT",
        width: 22
      },
      {
        header: "PREV_VISIT_DATE",
        key: "PREV_VISIT_DATE",
        width: 35
      },
      {
        header: "ADJUSTED_VISIT_DATE",
        key: "ADJUSTED_VISIT_DATE",
        width: 30
      },
      {
        header: "EFFECTIVE_DAYS",
        key: "EFFECTIVE_DAYS",
        width: 22
      },
      {
        header: "FUERA_DT_41_MAS",
        key: "FUERA_DT_41_MAS",
        width: 22
      },
      {
        header: "DT_PROJECTED",
        key: "DT_PROJECTED",
        width: 20
      },
      {
        header: "DT_REPORT",
        key: "DT_REPORT",
        width: 20
      },
      {
        header: "REASON_TYPE",
        key: "REASON_TYPE",
        width: 20
      },

      {
        header: "REASON",
        key: "REASON",
        width: 30
      },
      {
        header: "COMMENT",
        key: "COMMENT",
        width: 40
      },
      {
        header: "REASON_DETAIL",
        key: "REASON_DETAIL",
        width: 30
      },
      {
        header: "STORE_NAME",
        key: "STORE_NAME",
        width: 35
      },
      {
        header: "CONTRACT_MONTH_NAME",
        key: "CONTRACT_MONTH_NAME",
        width: 30
      },
    ];

    worksheet.addRows(stores);


    // ============================
    // ESTILO DEL HEADER
    // ============================
    const headerRow = worksheet.getRow(1);

    headerRow.height = 15;
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
    worksheet.getColumn("SMS_ID").numFmt = "0";

    const buffer = await workbook.xlsx.writeBuffer();

    const period =
      String(stores[0]?.PERIOD_ID || "ACTUAL")
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