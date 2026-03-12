"use client";

import {useEffect, useState} from "react";
import { useRouter } from "next/navigation";

import { Infraccion, TipoAccionado } from "@/lib/interfaces";
import {
  crearInfraccion,
  actualizarInfraccion,
  eliminarInfraccion, obtenerInfraccionPorPropietario,
} from "@/lib/models/infraccionModel";

const accionadaIcono: Record<TipoAccionado, string> = {
  agente: "👮",
  camara: "📷",
};

const accionadaBadgeColor: Record<TipoAccionado, string> = {
  agente: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  camara: "bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300",
};

export default function InfraccionesList({infracciones, userId}: { infracciones: Infraccion[], userId: string }) {
  const router = useRouter();

  const [lista, setLista] = useState<Infraccion[]>(infracciones);
  const [editando, setEditando] = useState<number | null>(null);
  const [creando, setCreando] = useState(false);
  const [temp, setTemp] = useState<Partial<Infraccion>>({});

  const obtenerInfracciones = async () => {
    const res = await obtenerInfraccionPorPropietario(userId);
    setLista(res as Infraccion[]);
  }

  const handleEditar = (inf: Infraccion) => {
    setEditando(inf.id);
    setTemp(inf);
  };

  const handleCrear = () => {
    setCreando(true);
    setTemp({
      placa_carro: "",
      accionada: "agente",
      fecha: "",
    });
  };

  const handleConfirmar = async () => {
    if (creando) {
      const nueva = temp as Omit<Infraccion, "id">;

      await crearInfraccion(nueva);
      setCreando(false);
    } else if (editando) {
      let res = await actualizarInfraccion(temp as Infraccion);
      if (res) {
        alert("No existe esa placa")
      }
    }
    obtenerInfracciones();
    setEditando(null);
    router.refresh();
  };

  const handleCancelar = () => {
    setCreando(false);
    setEditando(null);
  };

  const handleEliminar = async (id: number) => {
    await eliminarInfraccion(id);
    setLista(lista.filter((i) => i.id !== id));
    obtenerInfracciones();
    router.refresh();
  };

  const inputBase = "min-w-0 w-full border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 focus:border-zinc-400 focus:outline-none rounded-lg px-2 py-1 text-sm";
  const renderInputs = () => (
    <>
      <input
        className={`${inputBase} font-mono`}
        value={temp.placa_carro ?? ""}
        onChange={(e) => setTemp({ ...temp, placa_carro: e.target.value })}
      />

      <select
        className={inputBase}
        value={temp.accionada ?? "agente"}
        onChange={(e) =>
          setTemp({ ...temp, accionada: e.target.value as TipoAccionado })
        }
      >
        <option value="agente">Agente</option>
        <option value="camara">Cámara</option>
      </select>

      <input
        type="date"
        className={inputBase}
        value={temp.fecha ?? ""}
        onChange={(e) => setTemp({ ...temp, fecha: e.target.value })}
      />
    </>
  );
  return (
    <div className="w-full max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
            Infracciones
          </h1>

          <p className="text-sm text-zinc-400 mt-1">
            {lista.length} infracciones registradas
          </p>
        </div>

        <button
          onClick={handleCrear}
          className="flex items-center gap-2 px-5 py-2.5 bg-zinc-900 hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 text-white text-sm font-medium rounded-xl"
        >
          + Nueva infracción
        </button>
      </div>

      {/* Tabla header */}
      <div className="grid grid-cols-[0.5fr_1.5fr_1fr_1fr_auto] gap-4 px-4 pb-2 mb-1">
        {["ID", "Placa", "Accionada", "Fecha", "Acciones"].map((col) => (
          <span
            key={col}
            className="text-xs font-semibold text-zinc-400 uppercase"
          >
            {col}
          </span>
        ))}
      </div>

      <ul className="flex flex-col gap-2">
        {/* Crear */}
        {creando && (
          <li
            className="
            sticky top-0 z-10
            grid grid-cols-[0.5fr_1.5fr_1fr_1fr_auto]
            gap-4 items-center
            bg-green-50 dark:bg-green-900/20
            border border-green-200 dark:border-green-700
            rounded-xl px-4 py-4
          "
          >
            <span>#</span>

            {renderInputs()}

            <div className="flex gap-2">
              <button
                onClick={handleConfirmar}
                className="px-3 py-1.5 bg-emerald-600 text-white text-xs rounded-lg"
              >
                Crear
              </button>

              <button
                onClick={handleCancelar}
                className="px-3 py-1.5 bg-zinc-200 dark:bg-zinc-700 text-xs rounded-lg"
              >
                Cancelar
              </button>
            </div>
          </li>
        )}

        {/* Lista */}
        {lista.map((inf) => (
          <li
            key={inf.id}
            className="
            grid grid-cols-[0.5fr_1.5fr_1fr_1fr_auto]
            gap-4 items-center
            bg-white dark:bg-zinc-800/60
            border border-zinc-100 dark:border-zinc-700
            hover:border-zinc-300
            rounded-xl px-4 py-4
          "
          >
            <span className="font-mono font-bold text-sm">#{inf.id}</span>

            {editando === inf.id ? (
              renderInputs()
            ) : (
              <>
                <span className="font-mono font-bold text-sm">
                  {inf.placa_carro}
                </span>

                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold w-fit ${
                    accionadaBadgeColor[inf.accionada]
                  }`}
                >
                  {accionadaIcono[inf.accionada]} {inf.accionada}
                </span>

                <span className="text-sm text-zinc-400">{inf.fecha}</span>
              </>
            )}

            <div className="flex gap-2">
              {editando === inf.id ? (
                <>
                  <button
                    onClick={handleConfirmar}
                    className="px-3 py-1.5 bg-emerald-600 text-white text-xs rounded-lg"
                  >
                    Confirmar
                  </button>

                  <button
                    onClick={handleCancelar}
                    className="px-3 py-1.5 bg-zinc-200 dark:bg-zinc-700 text-xs rounded-lg"
                  >
                    Cancelar
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleEditar(inf)}
                    className="px-3 py-1.5 bg-zinc-200 dark:bg-zinc-700 text-xs rounded-lg"
                  >
                    Editar
                  </button>

                  <button
                    onClick={() => handleEliminar(inf.id)}
                    className="px-3 py-1.5 bg-red-100 text-red-600 text-xs rounded-lg"
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