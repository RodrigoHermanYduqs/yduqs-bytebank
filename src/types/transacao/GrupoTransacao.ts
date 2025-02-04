import { Transacao } from "../../model/Transacao.js";

export type GrupoTransacao = {
    label: string;
    transacoes: Transacao[];
}