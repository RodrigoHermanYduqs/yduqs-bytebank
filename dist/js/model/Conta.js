import { Transacao } from "./Transacao.js";
import { TipoTransacao } from "../types/transacao/TipoTransacao.js";
export class Conta {
    titular;
    dataAbertura;
    dataEncerramento;
    limite;
    saldo = JSON.parse(localStorage.getItem("saldo")) || 0;
    transacoes = JSON.parse(localStorage.getItem("transacoes"), (key, value) => {
        if (key === "data") {
            return new Date(value);
        }
        return value;
    }) || [];
    constructor(titular, dataAbertura) {
        this.titular = titular;
        this.dataAbertura = dataAbertura;
    }
    getTitular() {
        return this.titular;
    }
    getDataAbertura() {
        return this.dataAbertura;
    }
    getDataEncerramento() {
        return this.dataEncerramento;
    }
    setDataEncerramento(dataEncerramento) {
        this.dataEncerramento = dataEncerramento;
    }
    getLimite() {
        return this.limite;
    }
    setLimite(limite) {
        this.limite = limite;
    }
    getSaldo() {
        return this.saldo;
    }
    getDataAcesso() {
        return new Date();
    }
    getGruposTransacoes() {
        const gruposTransacoes = [];
        //const listaTransacoes: Transacao[] = structuredClone(this.transacoes);
        const listaTransacoes = [];
        this.transacoes.forEach(t => listaTransacoes.push(Transacao.clone(t)));
        const transacoesOrdenadas = listaTransacoes.sort((t1, t2) => t2.getData().getTime() - t1.getData().getTime());
        let labelAtualGrupoTransacao = "";
        for (let transacao of transacoesOrdenadas) {
            let labelGrupoTransacao = transacao.getData().toLocaleDateString("pt-br", { month: "long", year: "numeric" });
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
    registrarTransacao(novaTransacao) {
        if (novaTransacao.getTipoTransacao() == TipoTransacao.DEPOSITO) {
            this.depositar(novaTransacao.getValor());
        }
        else if (novaTransacao.getTipoTransacao() == TipoTransacao.TRANSFERENCIA || novaTransacao.getTipoTransacao() == TipoTransacao.PAGAMENTO_BOLETO) {
            this.debitar(novaTransacao.getValor());
            novaTransacao.setValor(novaTransacao.getValor() * -1);
        }
        else {
            throw new Error("Tipo de Transação é inválido!");
        }
        this.transacoes.push(novaTransacao);
        console.log(this.transacoes);
        localStorage.setItem("transacoes", JSON.stringify(this.transacoes));
    }
    debitar(valor) {
        if (valor <= 0) {
            throw new Error("O valor a ser debitado deve ser maior que zero!");
        }
        if (valor > this.saldo) {
            throw new Error("Saldo insuficiente!");
        }
        this.saldo -= valor;
        localStorage.setItem("saldo", this.saldo.toString());
    }
    depositar(valor) {
        if (valor <= 0) {
            throw new Error("O valor a ser depositado deve ser maior que zero!");
        }
        this.saldo += valor;
        localStorage.setItem("saldo", this.saldo.toString());
    }
}
export default Conta;
