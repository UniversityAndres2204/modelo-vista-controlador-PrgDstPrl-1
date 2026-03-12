// components/GenerarReporteButton.tsx
"use client";

import { useEffect, useState } from "react";
import { generarReportePDF } from "@/utils/generarPDF";
import { Carro, Infraccion, Propietario } from "@/lib/interfaces";
import {obtenerCarros} from "@/lib/models/carroModel";
import {obtenerPropietarios} from "@/lib/models/propietarioModel";
import {obtenerInfracciones} from "@/lib/models/infraccionModel";

export default function GenerarReporteButton() {
  const [loading, setLoading] = useState(false);
  const [listaCarros, setListaCarros] = useState<Carro[]>([]);
  const [listaPropietarios, setListaPropietarios] = useState<Propietario[]>([]);
  const [listaInfracciones, setListaInfracciones] = useState<Infraccion[]>([]);

  useEffect(() => {
    const fetchCarros = async () => {
      const carros = await obtenerCarros();
      const propietarios = await obtenerPropietarios();
      const infracciones = await obtenerInfracciones();
      setListaCarros(carros);
      setListaPropietarios(propietarios);
      setListaInfracciones(infracciones);
    };
    fetchCarros();
    }, []);
  

  const handleClick = () => {
    setLoading(true);
    try {
      generarReportePDF(listaCarros, listaPropietarios, listaInfracciones);
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