const botoes = document.querySelectorAll(".bt");
const visor = document.querySelector(".resultado");

let valorAtual = ''; // Número que o usuário está digitando
let valorAnterior = ''; // Número armazenado antes da operação
let operador = ''; // Operador atual (+, -, *, /)

// Atualiza o visor com o valor atual
function atualizarVisor() {
    visor.textContent = valorAtual || '0'; // Se valorAtual estiver vazio, mostra '0'
}

// Função para adicionar número ao visor
function adicionarNumero(numero) {
    if (valorAtual === '' && numero === '.') {
        return; // Não permite adicionar ponto se o visor estiver vazio
    }
    valorAtual += numero; // Adiciona o número ao visor
    atualizarVisor();
}

// Função para selecionar um operador
function selecionarOperador(op) {
    if (valorAtual === '') return; // Não faz nada se não houver número no visor

    if (valorAnterior !== '') {
        calcularResultado(); // Se houver valor anterior, calcula o resultado
    }

    operador = op; // Armazena o operador
    valorAnterior = valorAtual; // Armazena o valor antes do operador
    valorAtual = ''; // Limpa o visor para o próximo número
    atualizarVisor();
}

// Função para calcular o resultado
function calcularResultado() {
    let resultado;
    const num1 = parseFloat(valorAnterior);
    const num2 = parseFloat(valorAtual);

    switch (operador) {
        case '+':
            resultado = num1 + num2;
            break;
        case '-':
            resultado = num1 - num2;
            break;
        case '*':
            resultado = num1 * num2;
            break;
        case '/':
            console.log("dividir");
             if(num2===0) {resultado= "Error";
             } else{resultado = num1 / num2;}
            break;
        default:
            resultado = 'Erro';
    }

    valorAtual = resultado.toString();
    valorAnterior = '';
    operador = '';
    atualizarVisor();
}

// Função para limpar tudo
function limparTudo() {
    valorAtual = '';
    valorAnterior = '';
    operador = '';
    atualizarVisor();
}

// Função para apagar o último caractere
// Função para apagar o último caractere
function apagarUltimo() {
    console.log("apagar")
    valorAtual = valorAtual.slice(0, -1); // Remove o último caractere de valorAtual
    if (valorAtual === '') {
        valorAtual = '0'; // Se valorAtual ficar vazio, coloca "0" no visor
    }
    atualizarVisor(); // Atualiza o visor após a alteração
}


// Função para alternar o sinal do número
function alternarSinal() {
    console.log("mudarSinal");
    if (valorAtual !== '') {
        valorAtual = (parseFloat(valorAtual) * -1).toString();
        atualizarVisor();
    }
}
//função para elevar ao quadrado
function elevarQuadrado(){
    console.log("elevando");
    const n1= parseFloat(valorAtual); //converter string em numero
    const resultado= n1  **2; // elevar a 2
    valorAtual= resultado.toString(); //volta a string
    atualizarVisor();
}
function porcentagem(){
    console.log("porcentando");
    const porcentagemDoNumero = parseFloat(valorAtual);
    const resultado = porcentagemDoNumero/100; //transformo o valor em decimal
    valorAtual = resultado.toString();
    atualizarVisor()

}

// Captura os eventos de clique nos botões
botoes.forEach(botao => {
    botao.addEventListener("click", function () {
        const valor = this.textContent; // Pega o texto do botão clicado

        // Mapeamento de ações
        if (!isNaN(valor) || valor === '.') {
            adicionarNumero(valor); // Chama a função de adicionar número
        } else if (['+', '-', '*', '/'].includes(valor)) {
            selecionarOperador(valor); // Chama a função de selecionar operador
        } else if (valor === '=') {
            calcularResultado(); // Chama a função de calcular resultado
        } else if (valor === 'C') {
            limparTudo(); // Chama a função de limpar tudo
        } else if (valor === '←') {
            apagarUltimo(); // Chama a função de apagar o último caractere
        } else if (valor === '+/-') {
            alternarSinal(); // Chama a função de alternar sinal
        } else if(valor ==='X²'){
            elevarQuadrado() // chama a função de elevar ao 
        } else if(valor ==='%'){
            porcentagem()
        }
    });
});
//capturando as teclas
document.addEventListener("keydown", function(event){
    const tecla= event.key // ganho o valor da tecla presionada
    if (!isNaN(tecla)){
        adicionarNumero(tecla);
    }
    else if (["+", "-", "*", "/"].includes(tecla)) {
        selecionarOperador(tecla) // define o operador
    } else if(tecla === "Enter"){
        event.preventDefault(); //evitando quaisquer ação padrao
        calcularResultado();
    }
    // Verifica se é Backspace (apagar o último caractere)
    else if (tecla === "Backspace") {
        apagarUltimo(); // Remove o último número ou caractere
    }
    // Verifica se é Escape (limpar tudo)
    else if (tecla === "Escape") {
        limparTudo(); // Limpa o visor e variáveis
    }
});
