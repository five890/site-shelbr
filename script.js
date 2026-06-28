// Configurações
const PIX_KEY = '4cd768c3-b51e-4ec5-b64b-f9ed40be6561';
const COURSE_PRICE = '97.00';
const WHATSAPP_NUMBER = '5515996945451';

// Gerar QR Code Pix (usando API externa)
function generatePixQRCode() {
    const pixData = {
        key: PIX_KEY,
        name: 'Shelbr',
        city: 'São Paulo',
        amount: COURSE_PRICE
    };

    // Usando a API do Pix (EMV)
    // Para um QR Code real, você precisaria de uma API de geração
    // Aqui estou usando uma API pública de exemplo
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(PIX_KEY)}`;
    
    const qrCodeImg = document.getElementById('qrCode');
    qrCodeImg.src = qrCodeUrl;
}

// Copiar chave Pix
function copyPixKey() {
    const pixKey = PIX_KEY;
    navigator.clipboard.writeText(pixKey).then(() => {
        alert('Chave Pix copiada com sucesso!');
    }).catch(err => {
        console.error('Erro ao copiar:', err);
    });
}

// Scroll para seção de pagamento
function scrollToPayment() {
    const paymentSection = document.getElementById('pagamento');
    paymentSection.scrollIntoView({ behavior: 'smooth' });
}

// Chatbot IA
const chatbotResponses = {
    'oi': 'Olá! 👋 Bem-vindo ao Shelbr. Como posso ajudá-lo?',
    'olá': 'Olá! 👋 Bem-vindo ao Shelbr. Como posso ajudá-lo?',
    'preço': `O curso custa R$ ${COURSE_PRICE}. Você pode pagar via Pix com a chave: ${PIX_KEY}`,
    'valor': `O curso custa R$ ${COURSE_PRICE}. Você pode pagar via Pix com a chave: ${PIX_KEY}`,
    'quanto custa': `O curso custa R$ ${COURSE_PRICE}. Você pode pagar via Pix com a chave: ${PIX_KEY}`,
    'pix': `Sim! Aceitamos Pix. A chave é: ${PIX_KEY}. Após pagar, envie o comprovante via WhatsApp: https://wa.me/${WHATSAPP_NUMBER}`,
    'pagamento': `Aceitamos pagamento via Pix. Chave: ${PIX_KEY}. Após pagar, envie o comprovante via WhatsApp.`,
    'como pagar': `Você pode pagar via Pix usando a chave: ${PIX_KEY}. Após pagar, clique no botão "Enviar Comprovante via WhatsApp" para confirmar sua compra.`,
    'whatsapp': `Após pagar, clique no botão verde "Enviar Comprovante via WhatsApp" ou acesse: https://wa.me/${WHATSAPP_NUMBER}`,
    'garantia': 'Temos garantia de 7 dias! Se não estiver satisfeito, devolvemos seu dinheiro.',
    'certificado': 'Sim! Você recebe um certificado ao final do curso.',
    'acesso': 'Após confirmar o pagamento, você terá acesso imediato ao curso.',
    'módulos': 'O curso tem vários módulos com conteúdo completo e atualizado.',
    'suporte': 'Oferecemos suporte 24/7 via IA e WhatsApp. Estou aqui para ajudar!',
    'dúvida': 'Claro! Qual é sua dúvida? Estou aqui para ajudar.',
    'obrigado': 'De nada! Se tiver mais dúvidas, é só chamar! 😊',
    'obrigada': 'De nada! Se tiver mais dúvidas, é só chamar! 😊',
};

// Respostas padrão para perguntas não reconhecidas
function getAIResponse(userMessage) {
    const message = userMessage.toLowerCase().trim();
    
    // Buscar resposta exata
    if (chatbotResponses[message]) {
        return chatbotResponses[message];
    }
    
    // Buscar resposta parcial
    for (const [key, value] of Object.entries(chatbotResponses)) {
        if (message.includes(key)) {
            return value;
        }
    }
    
    // Resposta padrão
    return 'Desculpe, não entendi sua pergunta. Você pode me perguntar sobre preço, pagamento, garantia, certificado ou suporte. 😊';
}

// Adicionar mensagem ao chat
function addMessageToChat(message, isUser) {
    const chatbotMessages = document.getElementById('chatbotMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user' : 'bot'}`;
    messageDiv.textContent = message;
    chatbotMessages.appendChild(messageDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Enviar mensagem do chat
function sendChatMessage() {
    const userInput = document.getElementById('userInput');
    const message = userInput.value.trim();
    
    if (message === '') return;
    
    // Adicionar mensagem do usuário
    addMessageToChat(message, true);
    userInput.value = '';
    
    // Simular delay de resposta
    setTimeout(() => {
        const response = getAIResponse(message);
        addMessageToChat(response, false);
    }, 500);
}

// Lidar com Enter no input
function handleChatInput(event) {
    if (event.key === 'Enter') {
        sendChatMessage();
    }
}

// Toggle do chatbot
function toggleChatbot() {
    const chatbotContainer = document.getElementById('chatbotContainer');
    chatbotContainer.classList.toggle('active');
    
    // Mensagem de boas-vindas
    if (chatbotContainer.classList.contains('active') && document.getElementById('chatbotMessages').children.length === 0) {
        addMessageToChat('Olá! 👋 Bem-vindo ao Shelbr. Como posso ajudá-lo?', false);
    }
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    generatePixQRCode();
    
    // Configurar Git
    setupGitConfig();
});

// Configurar Git (para facilitar commits)
function setupGitConfig() {
    // Esta função é apenas informativa
    console.log('Para fazer push das alterações, use:');
    console.log('git add .');
    console.log('git commit -m "Adicionar sistema de pagamento Pix e chatbot IA"');
    console.log('git push origin main');
}
