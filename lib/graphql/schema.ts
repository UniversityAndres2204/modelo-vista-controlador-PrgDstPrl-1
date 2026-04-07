export const typeDefs = /* GraphQL */ `
  type Propietario {
    id: ID!
    identificacion: Float!
    tipo: String!
    nombre: String!
    direccion: String!
    carros: [Carro!]!
  }

  type Carro {
    id: ID!
    tipo: String!
    marca: String!
    fecha_matricula: String!
    placa: String!
    propietario: Propietario!
    propietarioIdentificacion: String!
    infracciones: [Infraccion!]!
  }
  
  input PropietarioInput {
    id: String!
  }

  type Infraccion {
    id: ID!
    fecha: String!
    accionada: String!
    carro: Carro!
    carroPlaca: String
  }

  type Query {
    propietarios: [Propietario!]!
    carros: [Carro!]!
    carrosPorPropietario(propietario: String!): [Carro!]!
    carroByPlaca(placa: String!): Carro
    infracciones: [Infraccion!]!
  }

  type Mutation {
    crearPropietario(
      nombre: String!
      direccion: String!
      tipo: String!
    ): Propietario!

    updatePropietario(
      identificacion: String!
      nombre: String
      tipo: String
      direccion: String
    ): Propietario!

    deletePropietario(identificacion: String!): Boolean!

    crearCarro(
      placa: String!
      marca: String!
      tipo: String!
      fecha_matricula: String!
      propietario: PropietarioInput!
    ): Carro!
    
    updateCarro(
      placa: String!
      marca: String
      tipo: String
      fecha_matricula: String
    ): Carro!

    deleteCarro(placa: String!): Boolean!

    crearInfraccion(
      placa_carro: String!
      fecha: String!
      accionada: String!
    ): Infraccion!

    updateInfraccion(
      id: ID!
      placa_carro: String
      accionada: String
      fecha: String
    ): Infraccion!

    deleteInfraccion(id: ID!): Boolean!
  }
`;