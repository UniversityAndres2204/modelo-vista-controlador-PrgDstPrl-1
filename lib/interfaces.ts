export type Tabla = "carro" | "propietario" | "infraccion";
export type Crud = "create" | "read" | "update" | "delete";

// table models
export type TipoPropietario = "persona" | "empresa";
export interface Propietario {
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

export type TipoCarro = "automovil" | "moto" | "carro pesado";
export interface Carro {
  placa: string;
  marca: string;
  tipo: TipoCarro;
  fecha_matricula: string;
  propietario: string;
}

// request models and controllers
export interface RequestModel{
    tipoRequest: string;
    dato: any[];
}

export interface RequestController{
    tipoRequest: string;
    tipoDato: Tabla|null;
    dato: any[];
}

export interface ReportData {
    carros: Carro[]
    propietarios: Propietario[]
    infracciones: Infraccion[]
}