const { readFileSync } = require('fs');

const Repositorio = require('./Repositorio')
const ServicoCalculoFatura = require('./servico');
var gerarFaturaStr = require("./apresentacao.js");

// function gerarFaturaHTML(fatura, pecas) {
//   let faturaHTML = `<html>\n`;
//   faturaHTML += `<p>Fatura ${fatura.cliente}</p>\n`;
//   faturaHTML += `<ul>\n`;
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
const calc = new ServicoCalculoFatura(new Repositorio);
const faturaStr = gerarFaturaStr(faturas, calc);
console.log(faturaStr);
// const faturaHTML =  gerarFaturaHTML(faturas, pecas);
// console.log(faturaHTML);