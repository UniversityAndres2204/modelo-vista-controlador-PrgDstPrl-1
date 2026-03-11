// utils/analisisReporte.ts

import { Carro, Infraccion, Propietario } from "./interfaces";


export interface AnalisisReporte {
  // Carros
  carrosPorTipo: Record<string, number>;
  carrosPorMarca: Record<string, number>;
  tipoMasComun: string;
  marcaMasComun: string;
  // Infracciones
  carrosConInfracciones: number;
  infraccionesPorAcicionado: Record<string, number>;
  // Propietarios
  propietariosPorTipo: Record<string, number>;
  tipoPropietarioMasComun: string;
  promedioCárrosPorPropietario: number;
  promedioInfraccionesPorPropietario: number;
}

export function analizarDatos(
  carros: Carro[],
  propietarios: Propietario[],
  infracciones: Infraccion[]
): AnalisisReporte {
  // --- Carros ---
  const carrosPorTipo: Record<string, number> = {};
  const carrosPorMarca: Record<string, number> = {};

  for (const carro of carros) {
    carrosPorTipo[carro.tipo] = (carrosPorTipo[carro.tipo] || 0) + 1;
    carrosPorMarca[carro.marca] = (carrosPorMarca[carro.marca] || 0) + 1;
  }

  const tipoMasComun = Object.entries(carrosPorTipo).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "N/A";
  const marcaMasComun = Object.entries(carrosPorMarca).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "N/A";

  // --- Infracciones ---
  const placasConInfraccion = new Set(infracciones.map((i) => i.placa_carro));
  const carrosConInfracciones = placasConInfraccion.size;

  const infraccionesPorAcicionado: Record<string, number> = {};
  for (const inf of infracciones) {
    infraccionesPorAcicionado[inf.accionada] = (infraccionesPorAcicionado[inf.accionada] || 0) + 1;
  }

  // --- Propietarios ---
  const propietariosPorTipo: Record<string, number> = {};
  for (const prop of propietarios) {
    propietariosPorTipo[prop.tipo] = (propietariosPorTipo[prop.tipo] || 0) + 1;
  }

  const tipoPropietarioMasComun =
    Object.entries(propietariosPorTipo).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "N/A";

  const promedioCárrosPorPropietario =
    propietarios.length > 0
      ? parseFloat((carros.length / propietarios.length).toFixed(2))
      : 0;

  const promedioInfraccionesPorPropietario =
    propietarios.length > 0
      ? parseFloat((infracciones.length / propietarios.length).toFixed(2))
      : 0;

  return {
    carrosPorTipo,
    carrosPorMarca,
    tipoMasComun,
    marcaMasComun,
    carrosConInfracciones,
    infraccionesPorAcicionado,
    propietariosPorTipo,
    tipoPropietarioMasComun,
    promedioCárrosPorPropietario,
    promedioInfraccionesPorPropietario,
  };
}