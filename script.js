// Dados dos cursos
const cursos = {
    gratuito: {
        titulo: 'Curso Gratuito',
        preco: 0,
        descricao: 'Vídeo gratis de como criar sua loja'
    },
    aovivo: {
        titulo: 'Loja Entregue',
        preco: 10,
        descricao: 'Sua loja pronta em menos de 24h com recursos VIP'
    }
};

// Abrir modal de checkout
function abrirCheckout(tipo, preco) {
    const modal = document.getElementById('checkoutModal');
    const curso = cursos[tipo];
    
    document.getElementById('modalTitulo').textContent = `Finalize sua Compra - ${curso.titulo}`;
    document.getElementById('checkoutDescricao').textContent = curso.descricao;
    
    if (preco === 0) {
        document.getElementById('precoTotal').textContent = 'Grátis';
    } else {
        document.getElementById('precoTotal').textContent = `R$ ${preco.toFixed(2)}`;
    }
    
    document.getElementById('checkoutForm').dataset.cursoTipo = tipo;
    document.getElementById('checkoutForm').dataset.preco = preco;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Fechar modal de checkout
function fecharCheckout() {
    const modal = document.getElementById('checkoutModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Fechar modal ao clicar fora
window.onclick = function(event) {
    const modal = document.getElementById('checkoutModal');
    if (event.target == modal) {
        fecharCheckout();
    }
}

// Copiar chave Pix
function copiarPix() {
    const pixKey = document.getElementById('pixKey').textContent;
    navigator.clipboard.writeText(pixKey).then(() => {
        const btn = event.target;
        const textOriginal = btn.textContent;
        btn.textContent = '✓ Copiado!';
        
        setTimeout(() => {
            btn.textContent = textOriginal;
        }, 2000);
    });
}

// Processar pagamento
function processarPagamento(e) {
    e.preventDefault();
    
    const form = document.getElementById('checkoutForm');
    const nome = form.querySelector('input[type="text"]').value;
    const email = form.querySelector('input[type="email"]').value;
    const cursoTipo = form.dataset.cursoTipo;
    const preco = form.dataset.preco;
    const curso = cursos[cursoTipo];
    
    if (!nome || !email) {
        alert('Por favor, preencha todos os campos!');
        return;
    }
    
    const precoNum = parseFloat(preco);
    
    if (precoNum === 0) {
        mostrarSucesso(nome, email, curso, 0);
        return;
    }
    
    // Mostrar tela de envio de comprovante
    mostrarTelaComprovante(nome, email, curso, precoNum);
}

// Mostrar tela de envio de comprovante
function mostrarTelaComprovante(nome, email, curso, preco) {
    const modal = document.getElementById('checkoutModal');
    const modalContent = modal.querySelector('.modal-content');
    
    const mensagem = `
        <div style="text-align: center; padding: 30px;">
            <div style="font-size: 48px; margin-bottom: 20px;">💳</div>
            <h2 style="color: #e50914; margin-bottom: 10px;">Envie o Comprovante</h2>
            <p style="color: #6b7280; margin-bottom: 10px;">
                Pagamento de <strong>R$ ${preco.toFixed(2)}</strong> do ${curso.titulo}
            </p>
            <p style="color: #9ca3af; margin-bottom: 30px; font-size: 14px;">
                Clique no botão verde abaixo para enviar o comprovante via WhatsApp
            </p>
            <button onclick="enviarComprovanteWhatsApp('${nome}', '${email}', '${curso.titulo}', '${preco}')" style="
                background: #25d366;
                color: white;
                border: none;
                padding: 16px 40px;
                border-radius: 8px;
                cursor: pointer;
                font-weight: 600;
                font-size: 16px;
                margin-bottom: 15px;
                width: 100%;
                transition: all 0.3s ease;
            " onmouseover="this.style.background='#20ba58'" onmouseout="this.style.background='#25d366'">
                📱 Enviar Comprovante via WhatsApp
            </button>
            <button onclick="fecharCheckout()" style="
                background: #6366f1;
                color: white;
                border: none;
                padding: 12px 30px;
                border-radius: 8px;
                cursor: pointer;
                font-weight: 600;
                width: 100%;
            ">Fechar</button>
        </div>
    `;
    
    modalContent.innerHTML = mensagem;
}

// Enviar comprovante via WhatsApp
function enviarComprovanteWhatsApp(nome, email, cursoTitulo, preco) {
    const mensagem = `Olá! Realizei o pagamento do ${cursoTitulo} (R$ ${preco.toFixed(2)}).\n\nDados:\nNome: ${nome}\nEmail: ${email}\n\nEstou enviando o comprovante em anexo. Aguardo a confirmação!`;
    const urlWhatsApp = `https://wa.me/15996945451?text=${encodeURIComponent(mensagem)}`;
    
    window.open(urlWhatsApp, '_blank');
    
    setTimeout(() => {
        fecharCheckout();
    }, 1000);
}

// Mostrar mensagem de sucesso
function mostrarSucesso(nome, email, curso, preco) {
    const modal = document.getElementById('checkoutModal');
    const modalContent = modal.querySelector('.modal-content');
    
    let mensagem = `
        <div style="text-align: center; padding: 20px;">
            <div style="font-size: 48px; margin-bottom: 20px;">✓</div>
            <h2 style="color: #10b981; margin-bottom: 10px;">Compra Confirmada!</h2>
            <p style="color: #6b7280; margin-bottom: 20px;">
                Obrigado, ${nome}!
            </p>
    `;
    
    if (preco === 0) {
        mensagem += `
            <p style="color: #6b7280; margin-bottom: 20px;">
                Você agora tem acesso ao ${curso.titulo}!
            </p>
            <p style="color: #6b7280; margin-bottom: 20px;">
                Um email de confirmação foi enviado para ${email}
            </p>
        `;
    } else {
        mensagem += `
            <p style="color: #6b7280; margin-bottom: 20px;">
                Você será redirecionado para o WhatsApp para confirmar o pagamento.
            </p>
            <p style="color: #6b7280; margin-bottom: 20px;">
                Valor: R$ ${preco.toFixed(2)}
            </p>
        `;
    }
    
    mensagem += `
            <button onclick="fecharCheckout()" style="
                background: #6366f1;
                color: white;
                border: none;
                padding: 12px 30px;
                border-radius: 8px;
                cursor: pointer;
                font-weight: 600;
                margin-top: 20px;
            ">Fechar</button>
        </div>
    `;
    
    modalContent.innerHTML = mensagem;
}

// Animação de scroll suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Inicializar quando o documento carregar
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.curso-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = this.classList.contains('destaque') 
                ? 'scale(1.05) translateY(-10px)' 
                : 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = this.classList.contains('destaque') 
                ? 'scale(1.05)' 
                : 'translateY(0)';
        });
    });
});


// Chat Atendente
const respostasBot = {
    'oi': 'Olá! Bem-vindo à Shelby Store! Como posso ajudá-lo?',
    'olá': 'Olá! Bem-vindo à Shelby Store! Como posso ajudá-lo?',
    'curso gratuito': 'O Curso Gratuito é perfeito para iniciantes! Você terá acesso a vídeo grátis de como criar sua loja e produtos que vender!',
    'loja entregue': 'A Loja Entregue é o mais popular! Por apenas R$ 10/mês, você ganha aulas ao vivo semanais, sua loja entregue em menos de 24h, recursos VIP e atendimento prioritário!',
    'preço': 'Temos 2 opções: Curso Gratuito (R$ 0) e Loja Entregue (R$ 10/mês). Qual te interessa?',
    'pagamento': 'Aceitamos pagamento via Pix! Após clicar em Já Paguei, você receberá a chave Pix para transferir. Simples e rápido!',
    'pix': 'Sim! Usamos Pix para pagamentos. É seguro, rápido e sem taxas!',
    'suporte': 'Oferecemos suporte prioritário para o Loja Entregue. Como posso ajudar?',
    'acesso': 'O acesso é vitalício! Você pode estudar no seu próprio ritmo, quando quiser.',
    'dúvida': 'Claro! Qual é sua dúvida? Estou aqui para ajudar!',
    'obrigado': 'De nada! Se tiver mais dúvidas, é só chamar!',
    'valeu': 'De nada! Fico feliz em ajudar!'
};

let chatAberto = false;

function abrirChat() {
    const chatContainer = document.getElementById('chatContainer');
    const chatToggle = document.getElementById('chatToggle');
    
    if (chatAberto) {
        chatContainer.style.display = 'none';
        chatToggle.style.display = 'flex';
        chatAberto = false;
    } else {
        chatContainer.style.display = 'flex';
        chatToggle.style.display = 'none';
        chatAberto = true;
        document.getElementById('chatMessages').scrollTop = document.getElementById('chatMessages').scrollHeight;
    }
}

function fecharChat() {
    const chatContainer = document.getElementById('chatContainer');
    const chatToggle = document.getElementById('chatToggle');
    chatContainer.style.display = 'none';
    chatToggle.style.display = 'flex';
    chatAberto = false;
}

function enviarMensagem() {
    const input = document.getElementById('chatInput');
    const mensagem = input.value.trim();
    
    if (!mensagem) return;
    
    const chatMessages = document.getElementById('chatMessages');
    
    // Adicionar mensagem do usuário
    const userDiv = document.createElement('div');
    userDiv.className = 'chat-message user';
    userDiv.textContent = mensagem;
    chatMessages.appendChild(userDiv);
    
    input.value = '';
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Simular resposta do bot
    setTimeout(() => {
        const mensagemLower = mensagem.toLowerCase();
        let resposta = 'Desculpe, não entendi sua pergunta. Pode reformular?';
        
        for (const [chave, valor] of Object.entries(respostasBot)) {
            if (mensagemLower.includes(chave)) {
                resposta = valor;
                break;
            }
        }
        
        const botDiv = document.createElement('div');
        botDiv.className = 'chat-message bot';
        botDiv.textContent = resposta;
        chatMessages.appendChild(botDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 500);
}

// Permitir enviar com Enter
document.addEventListener('DOMContentLoaded', function() {
    const chatInput = document.getElementById('chatInput');
    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                enviarMensagem();
            }
        });
    }
});
