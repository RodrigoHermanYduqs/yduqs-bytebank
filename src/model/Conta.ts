import { Transacao } from "../types/transacao/Transacao.js";
import { TipoTransacao } from "../types/transacao/TipoTransacao.js";
import { GrupoTransacao } from "../types/transacao/GrupoTransacao.js";

export class Conta
{
    private titular: string;
    private saldo: number = JSON.parse(localStorage.getItem("saldo")) || 0;
    private transacoes: Transacao[] = JSON.parse(localStorage.getItem("transacoes"), (key: string, value: string) => {
        if (key === "data") {
            return new Date(value);
        }
        return value;
    }) || [];

    constructor (titular: string)
    {
        this.titular = titular;
    }

    getSaldo() {
        return this.saldo;
    }

    getDataAcesso(): Date {
        return new Date();
    }

    getGruposTransacoes(): GrupoTransacao[] {
        const gruposTransacoes: GrupoTransacao[] = [];
        const listaTransacoes: Transacao[] = structuredClone(this.transacoes);
        const transacoesOrdenadas: Transacao[] = listaTransacoes.sort((t1, t2) => t2.data.getTime() - t1.data.getTime());
        let labelAtualGrupoTransacao: string = "";

        for (let transacao of transacoesOrdenadas) {
            let labelGrupoTransacao: string = transacao.data.toLocaleDateString("pt-br", { month: "long", year: "numeric" });
            if (labelAtualGrupoTransacao !== labelGrupoTransacao) {
                labelAtualGrupoTransacao = labelGrupoTransacao;
                gruposTransacoes.push({
                    label: labelGrupoTransacao,
                    transacoes: []
                });
            }
            gruposTransacoes.at(-1).transacoes.push(transacao);
        }

        return gruposTransacoes;
    }

    registrarTransacao(novaTransacao: Transacao): void {
        if (novaTransacao.tipoTransacao == TipoTransacao.DEPOSITO) {
            this.depositar(novaTransacao.valor);
        } 
        else if (novaTransacao.tipoTransacao == TipoTransacao.TRANSFERENCIA || novaTransacao.tipoTransacao == TipoTransacao.PAGAMENTO_BOLETO) {
            this.debitar(novaTransacao.valor);
            novaTransacao.valor *= -1;
        } 
        else {
            throw new Error("Tipo de Transação é inválido!");
        }

        this.transacoes.push(novaTransacao);
        console.log(this.getGruposTransacoes());
        localStorage.setItem("transacoes", JSON.stringify(this.transacoes));
    }

    debitar(valor: number): void {
        if (valor <= 0) {
            throw new Error("O valor a ser debitado deve ser maior que zero!");
        }
        if (valor > this.saldo) {
            throw new Error("Saldo insuficiente!");
        }
    
        this.saldo -= valor;
        localStorage.setItem("saldo", this.saldo.toString());
    }
    
    depositar(valor: number): void {
        if (valor <= 0) {
            throw new Error("O valor a ser depositado deve ser maior que zero!");
        }
    
        this.saldo += valor;
        localStorage.setItem("saldo", this.saldo.toString());
    }
}

const conta = new Conta("Rodrigo Herman");

