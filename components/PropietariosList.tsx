"use client";

import { Propietario, TipoPropietario } from "@/utils/interfaces";
import { useEffect, useState } from "react";
import handleRequest from "../lib/controller";

const tipoIcono: Record<TipoPropietario, string> = {
  persona: "👤",
  empresa: "🏢",
};

const tipoBadgeColor: Record<TipoPropietario, string> = {
  persona: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  empresa: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
};

export default function PropietariosList() {
  const [lista, setLista] = useState<Propietario[]>([]);
  const [editando, setEditando] = useState<number | null>(null);
  const [temp, setTemp] = useState<Partial<Propietario>>({});

  useEffect(() => {
    const fetchCarros = async () => {
      const propietarios = await handleRequest({ tipoRequest: "read", tipoDato: "propietario", dato: [] });
      setLista(propietarios);
    };
    fetchCarros();
    }, []);

  const handleEditar = (propietario: Propietario) => {
    setEditando(propietario.identificacion);
    setTemp({ tipo: propietario.tipo, nombre: propietario.nombre, direccion: propietario.direccion });
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
    <div className="w-full max-w-5xl">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">Propietarios</h1>
          <p className="text-sm text-zinc-400 dark:text-zinc-500 mt-1">{lista.length} propietarios registrados</p>
        </div>
        <button
          onClick={handleCrear}
          className="flex items-center gap-2 px-5 py-2.5 bg-zinc-900 hover:bg-zinc-700 dark:bg-zinc-100 dark:hover:bg-zinc-300 dark:text-zinc-900 text-white text-sm font-medium rounded-xl transition-colors cursor-pointer"
        >
          <span className="text-lg leading-none">+</span>
          Nuevo propietario
        </button>
      </div>

      {/* Tabla header */}
      <div className="grid grid-cols-[1fr_1.2fr_1fr_1.8fr_1.8fr_auto] gap-4 px-4 pb-2 mb-1">
        {["Identificación", "Tipo", "Nombre", "Dirección", "Acciones"].map((col) => (
          <span key={col} className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
            {col}
          </span>
        ))}
      </div>

      {/* Lista */}
      <ul className="flex flex-col gap-2">
        {lista.map((propietario) => (
          <li
            key={propietario.identificacion}
            className="grid grid-cols-[1fr_1.2fr_1fr_1.8fr_1.8fr_auto] gap-4 items-center
              bg-white dark:bg-zinc-800/60
              border border-zinc-100 dark:border-zinc-700
              hover:border-zinc-300 dark:hover:border-zinc-500
              rounded-xl px-4 py-4 transition-all shadow-sm"
          >

            {/* Identificación */}
            <span className="font-mono font-bold text-zinc-800 dark:text-zinc-100 text-sm">
              {propietario.identificacion}
            </span>

            {/* Tipo */}
            {editando === propietario.identificacion ? (
              <select
                className="border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 focus:border-zinc-400 focus:outline-none rounded-lg px-3 py-1.5 text-sm w-full"
                value={temp.tipo}
                onChange={(e) => setTemp({ ...temp, tipo: e.target.value as TipoPropietario })}
              >
                <option value="persona">Persona</option>
                <option value="empresa">Empresa</option>
              </select>
            ) : (
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold w-fit ${tipoBadgeColor[propietario.tipo]}`}>
                {tipoIcono[propietario.tipo]} {propietario.tipo}
              </span>
            )}

            {/* Nombre */}
            {editando === propietario.identificacion ? (
              <input
                className="border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 focus:border-zinc-400 focus:outline-none rounded-lg px-3 py-1.5 text-sm w-full"
                value={temp.nombre}
                onChange={(e) => setTemp({ ...temp, nombre: e.target.value })}
              />
            ) : (
              <span className="text-zinc-700 dark:text-zinc-300 text-sm font-medium">{propietario.nombre}</span>
            )}

            {/* Dirección */}
            {editando === propietario.identificacion ? (
              <input
                className="border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 focus:border-zinc-400 focus:outline-none rounded-lg px-3 py-1.5 text-sm w-full"
                value={temp.direccion}
                onChange={(e) => setTemp({ ...temp, direccion: e.target.value })}
              />
            ) : (
              <span className="text-zinc-400 dark:text-zinc-500 text-sm">{propietario.direccion}</span>
            )}

            {/* Acciones */}
            <div className="flex gap-2">
              {editando === propietario.identificacion ? (
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
                    onClick={() => handleEditar(propietario)}
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