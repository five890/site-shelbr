// Configurações
const PIX_KEY = '4cd768c3-b51e-4ec5-b64b-f9ed40be6561';
const WHATSAPP_NUMBER = '5515996945451';

// Dados dos cursos
const courses = {
    basico: {
        name: 'Curso Básico',
        price: 7.00
    },
    avancado: {
        name: 'Curso Avançado',
        price: 15.00
    },
    aovivo: {
        name: 'Curso Ao Vivo',
        price: 50.00
    }
};

// Variável para armazenar o curso selecionado
let selectedCourse = null;
let selectedPrice = null;

// Gerar QR Code Pix
function generatePixQRCode() {
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(PIX_KEY)}`;
    const qrCodeImg = document.getElementById('qrCode');
    if (qrCodeImg) {
        qrCodeImg.src = qrCodeUrl;
    }
}

// Selecionar curso e abrir modal de pagamento
function selectCourse(courseId, price) {
    selectedCourse = courseId;
    selectedPrice = price;
    
    const courseName = courses[courseId].name;
    document.getElementById('courseName').textContent = courseName;
    document.getElementById('coursePrice').textContent = `R$ ${price.toFixed(2)}`;
    
    generatePixQRCode();
    openPaymentModal();
}

// Abrir modal de pagamento
function openPaymentModal() {
    const modal = document.getElementById('paymentModal');
    modal.classList.add('active');
}

// Fechar modal de pagamento
function closePaymentModal() {
    const modal = document.getElementById('paymentModal');
    modal.classList.remove('active');
}

// Copiar chave Pix
function copyPixKey() {
    navigator.clipboard.writeText(PIX_KEY).then(() => {
        alert('Chave Pix copiada com sucesso!');
    }).catch(err => {
        console.error('Erro ao copiar:', err);
    });
}

// Scroll para seção de cursos
function scrollToCourses() {
    const coursesSection = document.getElementById('cursos');
    coursesSection.scrollIntoView({ behavior: 'smooth' });
}

// Fechar modal ao clicar fora
window.addEventListener('click', function(event) {
    const modal = document.getElementById('paymentModal');
    if (event.target === modal) {
        closePaymentModal();
    }
});

// Chatbot IA
const chatbotResponses = {
    'oi': 'Olá! 👋 Bem-vindo à Shelby Store. Como posso ajudá-lo?',
    'olá': 'Olá! 👋 Bem-vindo à Shelby Store. Como posso ajudá-lo?',
    'preço': 'Temos 3 opções de cursos: Básico (R$ 7), Avançado (R$ 15) e Ao Vivo (R$ 50). Qual você prefere?',
    'valor': 'Temos 3 opções de cursos: Básico (R$ 7), Avançado (R$ 15) e Ao Vivo (R$ 50). Qual você prefere?',
    'quanto custa': 'Temos 3 opções de cursos: Básico (R$ 7), Avançado (R$ 15) e Ao Vivo (R$ 50). Qual você prefere?',
    'pix': `Sim! Aceitamos Pix. A chave é: ${PIX_KEY}. Após pagar, envie o comprovante via WhatsApp.`,
    'pagamento': `Aceitamos pagamento via Pix. Chave: ${PIX_KEY}. Após pagar, envie o comprovante via WhatsApp.`,
    'como pagar': `Você pode pagar via Pix usando a chave: ${PIX_KEY}. Após pagar, clique no botão "Enviar Comprovante via WhatsApp" para confirmar sua compra.`,
    'whatsapp': `Após pagar, clique no botão verde "Enviar Comprovante via WhatsApp" ou acesse: https://wa.me/${WHATSAPP_NUMBER}`,
    'garantia': 'Temos garantia de 7 dias! Se não estiver satisfeito, devolvemos seu dinheiro.',
    'certificado': 'Sim! Os cursos Avançado e Ao Vivo incluem certificado.',
    'acesso': 'Após confirmar o pagamento, você terá acesso imediato ao curso.',
    'módulos': 'O Curso Básico tem 10 aulas, o Avançado tem 30 aulas e o Ao Vivo tem aulas semanais.',
    'suporte': 'Oferecemos suporte 24/7 via IA e WhatsApp. Estou aqui para ajudar!',
    'dúvida': 'Claro! Qual é sua dúvida? Estou aqui para ajudar.',
    'obrigado': 'De nada! Se tiver mais dúvidas, é só chamar! 😊',
    'obrigada': 'De nada! Se tiver mais dúvidas, é só chamar! 😊',
    'básico': 'O Curso Básico custa R$ 7 e inclui 10 aulas em vídeo, material de apoio, acesso vitalício e suporte por chat.',
    'avançado': 'O Curso Avançado custa R$ 15 e inclui 30 aulas, projetos práticos, certificado, comunidade exclusiva e suporte prioritário.',
    'ao vivo': 'O Curso Ao Vivo custa R$ 50 e inclui aulas semanais ao vivo, passo a passo detalhado, interação com instrutor, gravações, suporte 24/7 e certificado premium.',
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
    return 'Desculpe, não entendi sua pergunta. Você pode me perguntar sobre preço, cursos, pagamento, garantia, certificado ou suporte. 😊';
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
        addMessageToChat('Olá! 👋 Bem-vindo à Shelby Store. Como posso ajudá-lo?', false);
    }
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    generatePixQRCode();
});
