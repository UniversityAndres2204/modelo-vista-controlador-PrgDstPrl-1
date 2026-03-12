// utils/generarPDF.ts

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { analizarDatos} from "./analisisReporte";
import { Carro, Infraccion, Propietario } from "../lib/interfaces";

export function generarReportePDF(
  carros: Carro[],
  propietarios: Propietario[],
  infracciones: Infraccion[]
) {

  console.log(carros, propietarios, infracciones);
  const analisis = analizarDatos(carros, propietarios, infracciones);
  const doc = new jsPDF();
  const fechaHoy = new Date().toLocaleDateString("es-CO", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // --- Encabezado ---
  doc.setFillColor(220, 38, 38); // rojo
  doc.rect(0, 0, 210, 28, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("Secretaría de Tránsito de Sabaneta", 14, 12);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Reporte Estadístico del Sistema de Tránsito", 14, 20);
  doc.text(`Fecha: ${fechaHoy}`, 150, 20);

  let y = 38;

  // --- Helper para secciones ---
  const seccion = (titulo: string) => {
    doc.setFillColor(243, 244, 246);
    doc.rect(14, y - 5, 182, 9, "F");
    doc.setTextColor(30, 30, 30);
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text(titulo, 16, y + 1);
    y += 8;
  };

  const fila = (label: string, value: string) => {
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(60, 60, 60);
    doc.text(`${label}:`, 18, y);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(30, 30, 30);
    doc.text(value, 100, y);
    y += 7;
  };

  // --- Sección: Vehículos ---
  seccion("Análisis de Vehículos");
  y += 2;

  fila("Tipo más común", analisis.tipoMasComun);
  fila("Marca más común", analisis.marcaMasComun);
  y += 2;

  autoTable(doc, {
    startY: y,
    head: [["Tipo de Vehículo", "Cantidad"]],
    body: Object.entries(analisis.carrosPorTipo).map(([k, v]) => [k, v]),
    theme: "striped",
    headStyles: { fillColor: [220, 38, 38] },
    margin: { left: 14, right: 14 },
  });
  y = (doc as any).lastAutoTable.finalY + 6;

  autoTable(doc, {
    startY: y,
    head: [["Marca", "Cantidad"]],
    body: Object.entries(analisis.carrosPorMarca).map(([k, v]) => [k, v]),
    theme: "striped",
    headStyles: { fillColor: [220, 38, 38] },
    margin: { left: 14, right: 14 },
  });
  y = (doc as any).lastAutoTable.finalY + 10;

  // --- Sección: Infracciones ---
  seccion("Análisis de Infracciones");
  y += 2;

  fila("Vehículos con al menos 1 infracción", String(analisis.carrosConInfracciones));
  y += 2;

  autoTable(doc, {
    startY: y,
    head: [["Accionado por", "Infracciones"]],
    body: Object.entries(analisis.infraccionesPorAcicionado).map(([k, v]) => [k, v]),
    theme: "striped",
    headStyles: { fillColor: [220, 38, 38] },
    margin: { left: 14, right: 14 },
  });
  y = (doc as any).lastAutoTable.finalY + 10;

  // --- Sección: Propietarios ---
  seccion("Análisis de Propietarios");
  y += 2;

  fila("Tipo de propietario más común", analisis.tipoPropietarioMasComun);
  fila("Promedio de vehículos por propietario", String(analisis.promedioCárrosPorPropietario));
  fila("Promedio de infracciones por propietario", String(analisis.promedioInfraccionesPorPropietario));
  y += 2;

  autoTable(doc, {
    startY: y,
    head: [["Tipo de Propietario", "Cantidad"]],
    body: Object.entries(analisis.propietariosPorTipo).map(([k, v]) => [k, v]),
    theme: "striped",
    headStyles: { fillColor: [220, 38, 38] },
    margin: { left: 14, right: 14 },
  });

  // --- Pie de página ---
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text(
      `Secretaría de Tránsito de Sabaneta — Página ${i} de ${pageCount}`,
      105,
      290,
      { align: "center" }
    );
  }

  doc.save(`reporte-transito-${new Date().toISOString().slice(0, 10)}.pdf`);
}