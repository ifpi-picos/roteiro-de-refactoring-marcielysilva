const { readFileSync } = require('fs');

const Repositorio = require('./Repositorio')

const ServicoCalculoFatura = require('./ServicoCalculoFatura');

const calc = new ServicoCalculoFatura(new Repositorio);

// função extraída
function formatarMoeda(valor) {
  return new Intl.NumberFormat("pt-BR",
    {
      style: "currency", currency: "BRL",
      minimumFractionDigits: 2
    }).format(valor / 100);
}

function gerarFaturaStr(fatura, calc) {
  let faturaStr = `Fatura ${fatura.cliente}\n`;

  // corpo principal (após funções aninhadas)

  for (let apre of fatura.apresentacoes) {
    faturaStr += `  ${calc.repo.getPeca(apre).nome}: ${formatarMoeda(calc.calcularTotalApresentacao(apre))} (${apre.audiencia} assentos)\n`;
  }
  faturaStr += `Valor total: ${formatarMoeda(calc.calcularTotalFatura(fatura.apresentacoes))}\n`;
  faturaStr += `Créditos acumulados: ${calc.calcularTotalCreditos(fatura.apresentacoes)} \n`;
  return faturaStr;
}

// function gerarFaturaHTML(fatura, pecas) {
//   let faturaHTML = `<html>\n`;
//   faturaHTML += `<p>Fatura ${fatura.cliente}</p>\n`;
//   faturaHTML += `<ul>\n`;
//   // corpo principal (após funções aninhadas)

//   for (let apre of fatura.apresentacoes) {
//     faturaHTML += `<li>  ${getPeca(pecas, apre).nome}: ${formatarMoeda(servicoCalculoFatura.calcularTotalApresentacao(pecas, apre))} (${apre.audiencia} assentos)</li>\n`;
//   }
//   faturaHTML += `</ul>\n`;
//   faturaHTML += `<p>Valor total: ${formatarMoeda(servicoCalculoFatura.calcularTotalFatura(pecas, fatura.apresentacoes))} </p>\n`;
//   faturaHTML += `<p>Créditos acumulados: ${servicoCalculoFatura.calcularTotalCreditos(fatura.apresentacoes)} </p>\n`;
//   faturaHTML += `</html>\n`;
//   return faturaHTML;
// }

const faturas = JSON.parse(readFileSync('./faturas.json'));
const faturaStr = gerarFaturaStr(faturas, calc);
// const faturaHTML =  gerarFaturaHTML(faturas, pecas);
console.log(faturaStr);
// console.log(faturaHTML);