import readlinesync = require("readline-sync")
import { colors } from "./util/Cores"

export function main() {
    let opcao: number

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
            break
            case 2:
                console.log("\n\nListar todas as Contas\n\n")
            break
            case 3:
                console.log("\n\nConsultar dados da Conta - por número\n\n")
            break
            case 4:
                console.log("\n\nAtualizar dados da Conta\n\n")
            break
            case 5:
                console.log("\n\nApagar uma Conta\n\n")
            break
            case 6:
                console.log("\n\nSaque\n\n")
            break
            case 7:
                console.log("\n\nDepósito\n\n")
            break
            case 8:
                console.log("\n\nTransferência entre Contas\n\n")
            break
            default:
                console.log("\nOpção Inválida!\n")

            break
        }
    }

}

export function sobre(): void {
    console.log(`${colors.bg.blackbright}                                                                                      ${colors.reset}`)
    console.log(`${colors.bg.white}${colors.fg.black}                Projeto Desenvolvido por: Vinicius Rodrigues                          ${colors.reset}`)
    console.log(`${colors.bg.white}${colors.fg.black}                Generation Brasil - generation@generation.org                         ${colors.reset}`)
    console.log(`${colors.bg.white}${colors.fg.black}                https://github.com/Vinicius-Rodriguess/conta_bancacria                ${colors.reset}`)
    console.log(`${colors.bg.blackbright}                                                                                      ${colors.reset}`)
}

main()