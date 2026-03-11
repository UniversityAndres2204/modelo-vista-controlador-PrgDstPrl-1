export type TipoCarro = "automovil" | "moto" | "carro pesado";
export type Tabla = "carro" | "propietario" | "infraccion";
export type Crud = "create" | "read" | "update" | "delete";

export interface Carro {
  id: number;
  placa: string;
  marca: string;
  tipo: TipoCarro;
  fecha_matricula: string;
}

export interface RequestModel{
    tipoRequest: string;
    dato: any[];
}

export interface RequestController{
    tipoRequest: string;
    tipoDato: Tabla|null;
    dato: any[];
}

export type TipoPropietario = "persona" | "empresa";

export interface Propietario {
  id: number;
  identificacion: number;
  tipo: TipoPropietario;
  nombre: string;
  direccion: string;
}

export type TipoAccionado = "agente" | "camara";

export interface Infraccion {
  id: number;
  placa_carro: string;
  accionada: TipoAccionado;
  fecha: string;
}

export interface ReportData {
    carros: Carro[]
    propietarios: Propietario[]
    infracciones: Infraccion[]
}