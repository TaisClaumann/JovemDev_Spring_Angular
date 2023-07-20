import { Corrida } from "../../corridas/models/corrida";

export interface CorridasPaisAno{
    ano: number,
    country: string,
    corridas: Corrida[]
}