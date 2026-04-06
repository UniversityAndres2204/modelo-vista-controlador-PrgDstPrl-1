"use client";

import {useEffect, useState} from "react";
import {Carro, TipoCarro} from "@/lib/interfaces";
import {
  actualizarCarro,
  crearCarro,
  eliminarCarro, obtenerCarroPorPropietario,
} from "@/lib/models/carroModel";
import {useRouter} from "next/navigation";

const tipoIcono: Record<TipoCarro, string> = {
  automovil: "🚗",
  moto: "🏍️",
  "carro pesado": "🚛",
};

const tipoBadgeColor: Record<TipoCarro, string> = {
  automovil:
    "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  moto: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
  "carro pesado":
    "bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300",
};

interface Props {
  carros: Carro[],
  userId: string
}

export default function CarrosList({carros, userId}: Props) {
  const router = useRouter();

  const [lista, setLista] = useState<Carro[]>(carros);
  const [editando, setEditando] = useState<string | null>(null);
  const [temp, setTemp] = useState<Partial<Carro>>({});
  const [creando, setCreando] = useState(false);

  useEffect(() => {
    const cargarCarros = async () => {
      let res = await obtenerCarroPorPropietario(userId);
      setLista(res as Carro[]);
    }
    cargarCarros();
  }, [creando, editando, temp]);

  const handleEditar = (carro: Carro) => {
    setEditando(carro.placa);
    setTemp(carro);
  };

  const handleCrear = () => {
    setCreando(true);
    setTemp({
      placa: "",
      marca: "",
      tipo: "automovil",
      fecha_matricula: "",
      propietario: userId
    });
  };

  const handleConfirmar = async () => {
    if (creando) {
      const nuevo = temp as Carro;
      nuevo.propietario = userId;
      await crearCarro(nuevo);
      setCreando(false);
    } else if (editando) {
      await actualizarCarro(temp as Carro);
    }

    router.refresh();
    setEditando(null);
  };

  const handleCancelar = () => {
    setCreando(false);
    setEditando(null);
  };

  const handleEliminar = async (placa: string) => {
    await eliminarCarro(placa);
    router.refresh();
  };

  const inputBase =
    "min-w-0 w-full border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 focus:border-zinc-400 focus:outline-none rounded-lg px-2 py-1 text-sm";

  const renderInputs = () => (
    <>
      <input
        className={`${inputBase} font-mono`}
        value={temp.placa ?? ""}
        onChange={(e) => setTemp({...temp, placa: e.target.value})}
      />

      <input
        className={inputBase}
        value={temp.marca ?? ""}
        onChange={(e) => setTemp({...temp, marca: e.target.value})}
      />

      <select
        className={inputBase}
        value={temp.tipo}
        onChange={(e) =>
          setTemp({...temp, tipo: e.target.value as TipoCarro})
        }
      >
        <option value="automovil">Automóvil</option>
        <option value="moto">Moto</option>
        <option value="carro pesado">Carro pesado</option>
      </select>

      <input
        type="date"
        className={inputBase}
        value={temp.fecha_matricula ?? ""}
        onChange={(e) =>
          setTemp({...temp, fecha_matricula: e.target.value})
        }
      />
    </>
  );

  return (
    <div className="w-full max-w-4xl">
      {/* header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            Vehículos
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            {lista.length} vehículos registrados
          </p>
        </div>

        <button
          onClick={handleCrear}
          className="flex items-center gap-2 px-5 py-2.5 bg-zinc-900 hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 text-white text-sm font-medium rounded-xl"
        >
          + Nuevo vehículo
        </button>
      </div>

      {/* tabla header */}
      <div className="grid grid-cols-[1fr_1.5fr_1.5fr_1.5fr_auto] gap-4 px-4 pb-2 mb-1">
        {["Placa", "Marca", "Tipo", "Matrícula", "Acciones"].map((col) => (
          <span
            key={col}
            className="text-xs font-semibold text-zinc-400 uppercase"
          >
            {col}
          </span>
        ))}
      </div>

      <ul className="flex flex-col gap-2">
        {creando && (
          <li
            className="sticky top-0 z-10 grid grid-cols-[1fr_1.5fr_1.5fr_1.5fr_auto] gap-4 items-center bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-xl px-4 py-4">
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

        {lista.map((carro) => (
          <li
            key={carro.placa}
            className="grid grid-cols-[1fr_1.5fr_1.5fr_1.5fr_auto] gap-4 items-center bg-white dark:bg-zinc-800/60 border border-zinc-100 dark:border-zinc-700 hover:border-zinc-300 rounded-xl px-4 py-4"
          >
            {editando === carro.placa ? (
              <>
                {renderInputs()}

                <div className="flex gap-2">
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
                </div>
              </>
            ) : (
              <>
                <span className="font-mono font-bold text-sm">
                  {carro.placa}
                </span>

                <span className="text-sm">{carro.marca}</span>

                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold w-fit ${tipoBadgeColor[carro.tipo]}`}
                >
                  {tipoIcono[carro.tipo]} {carro.tipo}
                </span>

                <span className="text-sm text-zinc-400">
                  {carro.fecha_matricula}
                </span>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditar(carro)}
                    className="px-3 py-1.5 bg-zinc-200 dark:bg-zinc-700 text-xs rounded-lg"
                  >
                    Editar
                  </button>

                  <button
                    onClick={() => handleEliminar(carro.placa)}
                    className="px-3 py-1.5 bg-red-100 text-red-600 text-xs rounded-lg"
                  >
                    Eliminar
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}