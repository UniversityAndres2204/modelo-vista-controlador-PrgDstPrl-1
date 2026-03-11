// components/GenerarReporteButton.tsx
"use client";

import { useState } from "react";
import { generarReportePDF } from "@/utils/generarPDF";

const carros = [
  { id: 1, placa: "ABC123", marca: "Toyota", tipo: "automovil", fechaMatricula: "2020-03-15" },
  { id: 2, placa: "XYZ789", marca: "Honda", tipo: "moto", fechaMatricula: "2019-07-22" },
  { id: 3, placa: "DEF456", marca: "Volvo", tipo: "carro pesado", fechaMatricula: "2018-11-05" },
  { id: 4, placa: "GHI321", marca: "Mazda", tipo: "automovil", fechaMatricula: "2021-01-30" },
];

const infracciones = [
  { id: 1, placa_carro: "ABC123", accionado: "agente", fecha: "2024-01-15" },
  { id: 2, placa_carro: "XYZ789", accionado: "camara", fecha: "2024-02-20" },
  { id: 3, placa_carro: "DEF456", accionado: "agente", fecha: "2024-03-10" },
  { id: 4, placa_carro: "GHI321", accionado: "camara", fecha: "2024-04-05" },
];

const propietarios = [
  { id: 1, identificacion: 1234567890, tipo: "persona", nombre: "Carlos Pérez", direccion: "Calle 10 #5-20, Sabaneta" },
  { id: 2, identificacion: 9876543210, tipo: "persona", nombre: "Ana Gómez", direccion: "Carrera 3 #12-45, Sabaneta" },
  { id: 3, identificacion: 900123456, tipo: "empresa", nombre: "Transportes Andinos S.A.S", direccion: "Av. El Poblado #34-10, Medellín" },
  { id: 4, identificacion: 800987654, tipo: "empresa", nombre: "Logística Sur Ltda", direccion: "Calle 75 #80-15, Itagüí" },
];

export default function GenerarReporteButton() {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    try {
      generarReportePDF(carros, propietarios, infracciones);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white text-sm font-medium px-4 py-2 rounded-md transition-colors"
    >
      {loading ? "Generando..." : "Generar Reporte"}
    </button>
  );
}