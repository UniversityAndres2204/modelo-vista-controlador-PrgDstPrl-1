import { RequestController } from "@/utils/interfaces";
import { operacionCarro, operacionInfraccion, operacionPropietario, operacionReporte } from "./model";

export default async function handleRequest(request: RequestController): Promise<any> {
    if (request.tipoDato == "carro"){
           return operacionCarro({tipoRequest: request.tipoRequest, dato: request.dato})
    }
    if (request.tipoDato == "propietario"){
           return operacionPropietario({tipoRequest: request.tipoRequest, dato: request.dato})
    }
    if (request.tipoDato == "infraccion"){
           return operacionInfraccion({tipoRequest: request.tipoRequest, dato: request.dato})
    }
    if (request.tipoRequest == "report"){
           return operacionReporte()
    }
}