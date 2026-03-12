import { ReportData, RequestModel } from "@/lib/interfaces";
import { read } from "./models/crud";

export async function operacionCarro(request: RequestModel){
    if (request.tipoRequest === "read"){
        return read("carro")
    }
}

export async function operacionPropietario(request: RequestModel){
    if (request.tipoRequest === "read"){
        return read("propietario")
    }
}

export async function operacionInfraccion(request: RequestModel){
    if (request.tipoRequest === "read"){
        return read("infraccion")
    }
}

export async function operacionReporte(){
    const [carros, propietarios, infracciones] = await Promise.all([
    read("carro"),
    read("propietario"),
    read("infraccion")
  ]);
  return { carros, propietarios, infracciones };
}