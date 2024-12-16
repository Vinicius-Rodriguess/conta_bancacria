import readlinesync = require("readline-sync")
import { colors } from "./src/util/Cores"
import { ContaController } from "./src/controller/ContaController"
import { ContaCorrente } from "./src/model/ContaCorrente"
import { ContaPoupanca } from "./src/model/ContaPoupanca"

export function main() {
    let opcao, agencia, numero, tipo, saldo, limite, aniversario, titular: string
    const tipoContas = ["Conta Corrente", "Conta Poupanca"]
    const contas = new ContaController()

    //Novas Instâncias da Classe ContaCorrente (Objetos)
    contas.cadastrar(new ContaCorrente(contas.gerarNumero(), 1234, 1, 'Amanda Magro', 1000000.00, 100000.00))
    contas.cadastrar(new ContaCorrente(contas.gerarNumero(), 4578, 1, 'João da Silva', 1000.00, 100.00))

    // Novas Instâncias da Classe ContaPoupança (Objetos)
    contas.cadastrar(new ContaPoupanca(contas.gerarNumero(), 5789, 2, "Geana Almeida", 10000, 10))
    contas.cadastrar(new ContaPoupanca(contas.gerarNumero(), 5698, 2, "Jean Lima", 15000, 15))

    while (true) {
        console.log(`${colors.bg.blackbright}${colors.fg.black}                                           ${colors.reset}`)
        console.log(`${colors.bg.white}${colors.fg.black}                STA BANK                   ${colors.reset}`)
        console.log(`${colors.bg.blackbright}                                           ${colors.reset}`)
        console.log(`${colors.bg.white}${colors.fg.black}   1 - Criar Conta                         ${colors.reset}`)
        console.log(`${colors.bg.white}${colors.fg.black}   2 - Listar todas as Contas              ${colors.reset}`)
        console.log(`${colors.bg.white}${colors.fg.black}   3 - Buscar Conta por Numero             ${colors.reset}`)
        console.log(`${colors.bg.white}${colors.fg.black}   4 - Atualizar Dados da Conta            ${colors.reset}`)
        console.log(`${colors.bg.white}${colors.fg.black}   5 - Apagar Conta                        ${colors.reset}`)
        console.log(`${colors.bg.white}${colors.fg.black}   6 - Sacar                               ${colors.reset}`)
        console.log(`${colors.bg.white}${colors.fg.black}   7 - Depositar                           ${colors.reset}`)
        console.log(`${colors.bg.white}${colors.fg.black}   8 - Transferir valores entre Contas     ${colors.reset}`)
        console.log(`${colors.bg.white}${colors.fg.black}   9 - Sair                                ${colors.reset}`)
        console.log(`${colors.bg.blackbright}                                           ${colors.reset}`)

        opcao = readlinesync.questionInt("Entre com a opcao desejada: ")

        if (opcao == 9) {
            console.log("\nBanco Soluções Técnicas Alternativas - Agradece por sua preferência!\n\n")
            sobre()
            process.exit(0)
        }

        switch (opcao) {
            case 1:
                console.log("\n\nCriar Conta\n\n")

                console.log("Digite o Número da Agência: ")
                agencia = readlinesync.questionInt("")

                console.log("Digite o Nome do Titular: ")
                titular = readlinesync.question("")

                console.log("Escolha o tipo da Conta: ")
                tipo = readlinesync.keyInSelect(tipoContas, "", { cancel: false }) + 1

                console.log("Digite o Saldo da Conta: ")
                saldo = readlinesync.questionFloat("")

                switch (tipo) {
                    case 1:
                        console.log("Digite o Limite da Conta: ")
                        limite = readlinesync.questionFloat("")
                        contas.cadastrar(new ContaCorrente(contas.gerarNumero(), agencia, tipo, titular, saldo, limite))
                        break
                    case 2:
                        console.log("Digite o Dia do Aniversário da Poupaça: ")
                        aniversario = readlinesync.questionFloat("")
                        contas.cadastrar(new ContaPoupanca(contas.gerarNumero(), agencia, tipo, titular, saldo, aniversario))
                        break
                }

                keyPress()
                break
            case 2:
                console.log("\n\nListar todas as Contas\n\n")
                contas.listarTodas()
                keyPress()
                break
            case 3:
                console.log("\n\nConsultar dados da Conta - por número\n\n")

                console.log("Digite o número da conta: ")
                numero = readlinesync.questionInt("")

                contas.procurarPorNumero(numero)

                keyPress()
                break
            case 4:
                console.log("\n\nAtualizar dados da Conta\n\n")

                console.log("Digite o número da conta: ")
                numero = readlinesync.questionInt("")

                let conta = contas.buscarNoArray(numero)

                if (conta !== null) {
                    console.log("Digite o novo Número da Agência: ")
                    agencia = readlinesync.questionInt("")

                    console.log("Digite o novo Nome do Titular: ")
                    titular = readlinesync.question("")

                    console.log("Digite o novo Saldo da Conta: ")
                    saldo = readlinesync.questionFloat("")

                    tipo = conta.tipo 
                    
                    switch (tipo) {
                        case 1:
                            console.log("Digite o novo Limite da Conta: ")
                            limite = readlinesync.questionFloat("")
                            contas.atualizar(new ContaCorrente(numero, agencia, tipo, titular, saldo, limite))
                            break
                        case 2:
                            console.log("Digite o novo Dia do Aniversário da Poupaça: ")
                            aniversario = readlinesync.questionFloat("")
                            contas.atualizar(new ContaPoupanca(numero, agencia, tipo, titular, saldo, aniversario))
                            break
                    }
                } else {
                    console.log("Conta não encontrada!")
                }

                keyPress()
                break
            case 5:
                console.log("\n\nApagar uma Conta\n\n")

                console.log("Digite o novo Número da Conta: ")
                numero = readlinesync.questionInt("")

                contas.deletar(numero)

                keyPress()
                break
            case 6:
                console.log("\n\nSaque\n\n")
                keyPress()
                break
            case 7:
                console.log("\n\nDepósito\n\n")
                keyPress()
                break
            case 8:
                console.log("\n\nTransferência entre Contas\n\n")
                keyPress()
                break
            default:
                console.log("\nOpção Inválida!\n")
                keyPress()
                break
        }
    }

}

export function sobre(): void {
    console.log(`${colors.bg.blackbright}                                                                                      ${colors.reset}`)
    console.log(`${colors.bg.white}${colors.fg.black}                Projeto Desenvolvido por: Vinicius Rodrigues                          ${colors.reset}`)
    console.log(`${colors.bg.white}${colors.fg.black}                Generation Brasil - generation@generation.org                         ${colors.reset}`)
    console.log(`${colors.bg.white}${colors.fg.black}                https://github.com/Vinicius-Rodriguess/conta_bancaria                 ${colors.reset}`)
    console.log(`${colors.bg.blackbright}                                                                                      ${colors.reset}`)
}

function keyPress(): void {
    console.log(colors.reset, "");
    console.log("\nPressione enter para continuar...");
    readlinesync.prompt();
}

main()