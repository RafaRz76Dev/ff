//Função para ler um arquivo txt
const fs = require("fs");
const readline = require("readline");

// Cria uma interface para ler o arquivo
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

//Função para verificar se uma string contém apenas números
const hasOnlyNumbers = (str) => /^\d+$/.test(str);

// Função para calcular a soma dos números em uma linha
const sumNumbersInLine = (line) => {
  const numbers = line.match(/\d+/g);
  if (!numbers) return 0;
  return numbers.map(Number).reduce((sum, num) => sum + num, 0);
};

//Função para calcular a soma dos números por ele mesmo em um array
const numbers = [5, 4, 10, 14];
const doubledPositiveNumbers = numbers.reduce((accumulator, currentValue) => {
  if (currentValue > 0) {
    const doubled = currentValue * 2;
    accumulator.push(doubled);
  }
  return accumulator;
}, []);

// Função para somar os números contidos em um arquivo txt
var totalSum = [...numbers].reduce(
  (acumulator, valorAtual) => acumulator + valorAtual,
  0
);

// Função para processar o arquivo e exibir o resumo
const processFile = (filePath) => {
  let numLinesWithNumbers = 0;
  let numLinesWithText = 0;
  let sumOfNumbers = 0;

  // Inicia a contagem do tempo de execução
  const start = Date.now();
  // Cria um stream de leitura do arquivo
  const readStream = fs.createReadStream(filePath, { encoding: "utf8" });

  // Para cada linha do arquivo, verifica se contém apenas números
  readStream.on("data", (chunk) => {
    const lines = chunk.split("\n");
    lines.forEach((line) => {
      if (hasOnlyNumbers(line)) {
        numLinesWithNumbers++;
        sumOfNumbers += sumNumbersInLine(line);
      } else {
        numLinesWithText++;
      }
    });
  });

  //  Finalizar o processamento do arquivo
  readStream.on("end", () => {
    const end = Date.now();
    const executionTime = (end - start) / 1000; // Converter para segundos

    //  Cria um objeto com o resumo
    const archive = {
      meuNome: "RafaRz76Dev",
      totalSoma: totalSum,
      somadosNumeros: sumOfNumbers,
      numerosdeLinhascomTexto: numLinesWithText,
      tempodeExecucao: executionTime,
      NumerosPositivosDobrados: doubledPositiveNumbers,
    };

    // Exibe o resumo
    console.log(archive);

    // Pergunta se deseja continuar
    rl.question("Deseja continuar (s/n)? ", (answer) => {
      if (answer.toLowerCase() === "s") {
        rl.question("Digite o caminho do próximo arquivo txt: ", (filePath) => {
          processFile(filePath);
        });
      } else {
        rl.close();
      }
    });
  });
};

// Pergunta o caminho do arquivo ao usuário
rl.question("Digite o caminho do arquivo txt: ", (filePath) => {
  processFile(filePath);
});

// Comando para teste: node index.js

//Caminho do arquivo txt: c:\modulo-node-js-RafaRz76Dev-main\soma.txt
