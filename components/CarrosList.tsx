"use client";

import { useState,useEffect } from "react";
import handleRequest from "./controller";
import { Carro, TipoCarro } from "@/utils/interfaces";

const tipoIcono: Record<TipoCarro, string> = {
  automovil: "🚗",
  moto: "🏍️",
  "carro pesado": "🚛",
};

const tipoBadgeColor: Record<TipoCarro, string> = {
  automovil: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  moto: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
  "carro pesado": "bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300",
};

// const carros: Carro[] = [
//   { id: 1, placa: "ABC123", marca: "Toyota", tipo: "automovil", fechaMatricula: "2020-03-15" },
//   { id: 2, placa: "XYZ789", marca: "Honda", tipo: "moto", fechaMatricula: "2019-07-22" },
//   { id: 3, placa: "DEF456", marca: "Volvo", tipo: "carro pesado", fechaMatricula: "2018-11-05" },
//   { id: 4, placa: "GHI321", marca: "Mazda", tipo: "automovil", fechaMatricula: "2021-01-30" },
// ];

export default function CarrosList() {
  const [lista, setLista] = useState<Carro[]>([]);
  const [editando, setEditando] = useState<string | null>(null);
  const [temp, setTemp] = useState<Partial<Carro>>({});

  useEffect(() => {
  const fetchCarros = async () => {
    const carros = await handleRequest({ tipoRequest: "read", tipoDato: "carro", dato: [] });
    setLista(carros);
  };
  fetchCarros();
  }, []);

  const handleEditar = (carro: Carro) => {
    setEditando(carro.placa);
    setTemp({ marca: carro.marca, tipo: carro.tipo, fecha_matricula: carro.fecha_matricula });
  };

  const handleConfirmar = () => {
    setEditando(null);
    console.log("✅ Modificación funcionando correctamente");
  };

  const handleCancelar = () => {
    setEditando(null);
    console.log("Cancelar funcionando correctamente");
  };

  const handleEliminar = () => {
    console.log("✅ El botón de eliminar funciona correctamente");
  };

  const handleCrear = () => {
    console.log("✅ El botón de crear funciona correctamente");
  };

  return (
    <div className="w-full max-w-4xl">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">Vehículos</h1>
          <p className="text-sm text-zinc-400 dark:text-zinc-500 mt-1">{lista.length} vehículos registrados</p>
        </div>
        <button
          onClick={handleCrear}
          className="flex items-center gap-2 px-5 py-2.5 bg-zinc-900 hover:bg-zinc-700 dark:bg-zinc-100 dark:hover:bg-zinc-300 dark:text-zinc-900 text-white text-sm font-medium rounded-xl transition-colors cursor-pointer"
        >
          <span className="text-lg leading-none">+</span>
          Nuevo vehículo
        </button>
      </div>

      {/* Tabla header */}
      <div className="grid grid-cols-[1fr_1.5fr_1.5fr_1.5fr_auto] gap-4 px-4 pb-2 mb-1">
        {["Placa", "Marca", "Tipo", "Matrícula", "Acciones"].map((col) => (
          <span key={col} className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
            {col}
          </span>
        ))}
      </div>

      {/* Lista */}
      <ul className="flex flex-col gap-2">
        {lista.map((carro) => (
          <li
            key={carro.placa}
            className="grid grid-cols-[1fr_1.5fr_1.5fr_1.5fr_auto] gap-4 items-center
              bg-white dark:bg-zinc-800/60
              border border-zinc-100 dark:border-zinc-700
              hover:border-zinc-300 dark:hover:border-zinc-500
              rounded-xl px-4 py-4 transition-all shadow-sm"
          >
            {/* Placa */}
            <span className="font-mono font-bold text-zinc-800 dark:text-zinc-100 tracking-wider text-sm">
              {carro.placa}
            </span>

            {/* Marca */}
            {editando === carro.placa ? (
              <input
                className="border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 focus:border-zinc-400 dark:focus:border-zinc-400 focus:outline-none rounded-lg px-3 py-1.5 text-sm w-full"
                value={temp.marca}
                onChange={(e) => setTemp({ ...temp, marca: e.target.value })}
              />
            ) : (
              <span className="text-zinc-700 dark:text-zinc-300 text-sm font-medium">{carro.marca}</span>
            )}

            {/* Tipo */}
            {editando === carro.placa ? (
              <select
                className="border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 focus:border-zinc-400 focus:outline-none rounded-lg px-3 py-1.5 text-sm w-full"
                value={temp.tipo}
                onChange={(e) => setTemp({ ...temp, tipo: e.target.value as TipoCarro })}
              >
                <option value="automovil">Automóvil</option>
                <option value="moto">Moto</option>
                <option value="carro pesado">Carro pesado</option>
              </select>
            ) : (
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold w-fit ${tipoBadgeColor[carro.tipo]}`}>
                {tipoIcono[carro.tipo]} {carro.tipo}
              </span>
            )}

            {/* Fecha */}
            {editando === carro.placa ? (
              <input
                type="date"
                className="border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 focus:border-zinc-400 focus:outline-none rounded-lg px-3 py-1.5 text-sm w-full"
                value={temp.fecha_matricula}
                onChange={(e) => setTemp({ ...temp, fecha_matricula: e.target.value })}
              />
            ) : (
              <span className="text-zinc-400 dark:text-zinc-500 text-sm">{carro.fecha_matricula}</span>
            )}

            {/* Acciones */}
            <div className="flex gap-2">
              {editando === carro.placa ? (
                <>
                  <button
                    onClick={handleConfirmar}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                  >
                    Confirmar
                  </button>
                  <button
                    onClick={handleCancelar}
                    className="px-3 py-1.5 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-700 dark:hover:bg-zinc-600 text-zinc-600 dark:text-zinc-300 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                  >
                    Cancelar
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleEditar(carro)}
                    className="px-3 py-1.5 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-700 dark:hover:bg-zinc-600 text-zinc-700 dark:text-zinc-300 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                  >
                    Editar
                  </button>
                  <button
                    onClick={handleEliminar}
                    className="px-3 py-1.5 bg-red-50 hover:bg-red-100 dark:bg-red-900/30 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                  >
                    Eliminar
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}