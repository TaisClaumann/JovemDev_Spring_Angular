import { Campeonato } from "../../campeonatos/models/campeonato";
import { Pista } from "../../pistas/models/pista";

export interface Corrida {
    id:number,
    data: string,
    pistaId: number,
    campeonatoId: number,
    campeonatoNome: string
}
