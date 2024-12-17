import readlinesync = require("readline-sync")
import { colors } from "./src/util/Cores"
import { ContaController } from "./src/controller/ContaController"
import { ContaCorrente } from "./src/model/ContaCorrente"
import { ContaPoupanca } from "./src/model/ContaPoupanca"

const contas = new ContaController()

// Mook
contas.cadastrar(new ContaCorrente(contas.gerarNumero(), 1234, 1, 'Amanda Magro', 1000000.00, 100000.00))
contas.cadastrar(new ContaCorrente(contas.gerarNumero(), 4578, 1, 'João da Silva', 1000.00, 100.00))
contas.cadastrar(new ContaPoupanca(contas.gerarNumero(), 5789, 2, "Geana Almeida", 10000, 10))
contas.cadastrar(new ContaPoupanca(contas.gerarNumero(), 5698, 2, "Jean Lima", 15000, 15))

const main = (): void => {

    while (true) {

        exibirMenu()

        const operacoes: { [key: number]: () => void } = {
            1: criarConta,
            2: listarContas,
            3: consultarConta,
            4: atualizarDadosDaConta,
            5: apagarConta,
            6: sacar,
            7: depositar,
            8: transferir,
            9: consultarPorTitular,
            0: sair
        }

        const opcao = readlinesync.questionInt("Entre com a opcao desejada: ")

        try {
            operacoes[opcao]()
        } catch (e) {
            console.log("\nOpção Inválida!\n")
            keyPress()
        }

    }
}

const sair = (): void => {
    console.log("\nBanco Soluções Técnicas Alternativas - Agradece por sua preferência!\n\n")
    sobre()
    process.exit(0)
}

const consultarPorTitular = () => {
    console.log("Consulta pelo Titular")

    const titular = readlinesync.question("Digite o nome do Titular: ")

    contas.procurarPorTitular(titular)
    keyPress()
}

const transferir = (): void => {
    console.log("\n\nTransferência entre Contas\n\n")

    const numero = readlinesync.questionInt("Digite o Numero da Conta de origem: ")
    const numeroDestino = readlinesync.questionInt("Digite o Numero da Conta de destino: ")
    const valor = readlinesync.questionFloat("Digite o valor do Transferencia: ")

    contas.transferir(numero, numeroDestino, valor)
    keyPress()
}

const depositar = () => {
    console.log("\n\nDepósito\n\n")

    const numero = readlinesync.questionInt("Digite o Numero da Conta: ")
    const valor = readlinesync.questionFloat("Digite o valor do Saque: ")

    contas.depositar(numero, valor)
    keyPress()
}

const sacar = (): void => {
    console.log("\n\nSaque\n\n")

    const numero = readlinesync.questionInt("Digite o Numero da Conta: ")
    const valor = readlinesync.questionFloat("Digite o valor do Saque: ")

    contas.sacar(numero, valor)
    keyPress()
}

const apagarConta = (): void => {
    console.log("\n\nApagar uma Conta\n\n")

    const numero = readlinesync.questionInt("Digite o Numero da Conta: ")

    contas.deletar(numero)
    keyPress()
}

const consultarConta = (): void => {
    console.log("\n\nConsultar dados da Conta - por numero\n\n")

    const numero = readlinesync.questionInt("Digite o numero da conta: ")

    contas.procurarPorNumero(numero)
    keyPress()
}

const listarContas = (): void => {
    console.log("\n\nListar todas as Contas\n\n")

    contas.listarTodas()
    keyPress()
}

const exibirMenu = (): void => {
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
    console.log(`${colors.bg.white}${colors.fg.black}   9 - Buscar Conta por Titular            ${colors.reset}`)
    console.log(`${colors.bg.white}${colors.fg.black}   0 - Sair                                ${colors.reset}`)
    console.log(`${colors.bg.blackbright}                                           ${colors.reset}`)
}

const criarConta = (): void => {
    console.log("\n\nCriar Conta\n\n")

    const agencia = readlinesync.questionInt("Digite o Numero da Agencia: ")
    const titular = readlinesync.question("Digite o Nome do Titular: ")

    const tipoContas = ["Conta Corrente", "Conta Poupanca"]
    const tipo = readlinesync.keyInSelect(tipoContas, "Escolha o tipo da Conta: ", { cancel: false }) + 1

    const saldo = readlinesync.questionFloat("Digite o Saldo da Conta: ")

    if (tipo === 1) {
        const limite = readlinesync.questionFloat("Digite o Limite da Conta: ")
        contas.cadastrar(new ContaCorrente(contas.gerarNumero(), agencia, tipo, titular, saldo, limite))

    } else if (tipo === 2) {
        const aniversario = readlinesync.questionFloat("Digite o Dia do Aniversário da Poupaca: ")
        contas.cadastrar(new ContaPoupanca(contas.gerarNumero(), agencia, tipo, titular, saldo, aniversario))
    }

    keyPress()
}

const atualizarDadosDaConta = () => {
    console.log("\n\nAtualizar dados da Conta\n\n")

    const numero = readlinesync.questionInt("Digite o numero da conta: ")

    const conta = contas.buscarNoArray(numero)

    if (!conta) {
        console.log("Conta não encontrada!")
        return
    }

    const agencia = readlinesync.questionInt("Digite o novo Numero da Agencia:")
    const titular = readlinesync.question("Digite o novo Nome do Titular: ")
    const saldo = readlinesync.questionFloat("Digite o novo Saldo da Conta: ")

    if (conta.tipo === 1) {
        const limite = readlinesync.questionFloat("Digite o novo Limite da Conta: ")
        contas.atualizar(new ContaCorrente(numero, agencia, conta.tipo, titular, saldo, limite))

    } else if (conta.tipo === 2) {
        const aniversario = readlinesync.questionFloat("Digite o novo Dia do Aniversário da Poupaca: ")
        contas.atualizar(new ContaPoupanca(numero, agencia, conta.tipo, titular, saldo, aniversario))
    }

    keyPress()
}

const sobre = (): void => {
    console.log(`${colors.bg.blackbright}                                                                                      ${colors.reset}`)
    console.log(`${colors.bg.white}${colors.fg.black}                Projeto Desenvolvido por: Vinicius Rodrigues                          ${colors.reset}`)
    console.log(`${colors.bg.white}${colors.fg.black}                Generation Brasil - generation@generation.org                         ${colors.reset}`)
    console.log(`${colors.bg.white}${colors.fg.black}                https://github.com/Vinicius-Rodriguess/conta_bancaria                 ${colors.reset}`)
    console.log(`${colors.bg.blackbright}                                                                                      ${colors.reset}`)
}

const keyPress = (): void => {
    console.log(colors.reset, "");
    console.log("\nPressione enter para continuar...");
    readlinesync.prompt();
}

main()