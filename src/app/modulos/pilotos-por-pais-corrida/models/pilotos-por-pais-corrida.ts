import { PilotosPais } from "./pilotos-pais";

export interface PilotosPorPaisCorrida {
    paisId: number,
    paisNome: string,
    corridaId: number,
    pilotosPais: PilotosPais[]
}
