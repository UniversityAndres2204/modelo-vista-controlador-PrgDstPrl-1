"use client";

import { useState } from "react";

type TipoAccionado = "agente" | "camara";

interface Infraccion {
  id: number;
  placa_carro: string;
  accionado: TipoAccionado;
  fecha: string;
}

const accionadoIcono: Record<TipoAccionado, string> = {
  agente: "👮",
  camara: "📷",
};

const accionadoBadgeColor: Record<TipoAccionado, string> = {
  agente: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  camara: "bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300",
};

const infracciones: Infraccion[] = [
  { id: 1, placa_carro: "ABC123", accionado: "agente", fecha: "2024-01-15" },
  { id: 2, placa_carro: "XYZ789", accionado: "camara", fecha: "2024-02-20" },
  { id: 3, placa_carro: "DEF456", accionado: "agente", fecha: "2024-03-10" },
  { id: 4, placa_carro: "GHI321", accionado: "camara", fecha: "2024-04-05" },
];

export default function InfracccionesList() {
  const [lista, setLista] = useState<Infraccion[]>(infracciones);
  const [editando, setEditando] = useState<number | null>(null);
  const [temp, setTemp] = useState<Partial<Infraccion>>({});

  const handleEditar = (infraccion: Infraccion) => {
    setEditando(infraccion.id);
    setTemp({ placa_carro: infraccion.placa_carro, accionado: infraccion.accionado, fecha: infraccion.fecha });
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
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">Infracciones</h1>
          <p className="text-sm text-zinc-400 dark:text-zinc-500 mt-1">{lista.length} infracciones registradas</p>
        </div>
        <button
          onClick={handleCrear}
          className="flex items-center gap-2 px-5 py-2.5 bg-zinc-900 hover:bg-zinc-700 dark:bg-zinc-100 dark:hover:bg-zinc-300 dark:text-zinc-900 text-white text-sm font-medium rounded-xl transition-colors cursor-pointer"
        >
          <span className="text-lg leading-none">+</span>
          Nueva infracción
        </button>
      </div>

      {/* Tabla header */}
      <div className="grid grid-cols-[0.5fr_1.5fr_1fr_1fr_auto] gap-4 px-4 pb-2 mb-1">
        {["ID", "Placa", "Accionado", "Fecha", "Acciones"].map((col) => (
          <span key={col} className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
            {col}
          </span>
        ))}
      </div>

      {/* Lista */}
      <ul className="flex flex-col gap-2">
        {lista.map((infraccion) => (
          <li
            key={infraccion.id}
            className="grid grid-cols-[0.5fr_1.5fr_1fr_1fr_auto] gap-4 items-center
              bg-white dark:bg-zinc-800/60
              border border-zinc-100 dark:border-zinc-700
              hover:border-zinc-300 dark:hover:border-zinc-500
              rounded-xl px-4 py-4 transition-all shadow-sm"
          >
            {/* ID */}
            <span className="font-mono font-bold text-zinc-800 dark:text-zinc-100 text-sm">
              #{infraccion.id}
            </span>

            {/* Placa */}
            {editando === infraccion.id ? (
              <input
                className="border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 focus:border-zinc-400 focus:outline-none rounded-lg px-3 py-1.5 text-sm w-full"
                value={temp.placa_carro}
                onChange={(e) => setTemp({ ...temp, placa_carro: e.target.value })}
              />
            ) : (
              <span className="font-mono font-bold text-zinc-700 dark:text-zinc-300 text-sm tracking-wider">
                {infraccion.placa_carro}
              </span>
            )}

            {/* Accionado */}
            {editando === infraccion.id ? (
              <select
                className="border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 focus:border-zinc-400 focus:outline-none rounded-lg px-3 py-1.5 text-sm w-full"
                value={temp.accionado}
                onChange={(e) => setTemp({ ...temp, accionado: e.target.value as TipoAccionado })}
              >
                <option value="agente">Agente</option>
                <option value="camara">Cámara</option>
              </select>
            ) : (
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold w-fit ${accionadoBadgeColor[infraccion.accionado]}`}>
                {accionadoIcono[infraccion.accionado]} {infraccion.accionado}
              </span>
            )}

            {/* Fecha */}
            {editando === infraccion.id ? (
              <input
                type="date"
                className="border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 focus:border-zinc-400 focus:outline-none rounded-lg px-3 py-1.5 text-sm w-full"
                value={temp.fecha}
                onChange={(e) => setTemp({ ...temp, fecha: e.target.value })}
              />
            ) : (
              <span className="text-zinc-400 dark:text-zinc-500 text-sm">{infraccion.fecha}</span>
            )}

            {/* Acciones */}
            <div className="flex gap-2">
              {editando === infraccion.id ? (
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
                    onClick={() => handleEditar(infraccion)}
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