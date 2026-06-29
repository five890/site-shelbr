// Dados dos cursos
const cursos = {
    gratuito: {
        titulo: 'Curso Gratuito',
        preco: 0,
        descricao: 'Aprenda o básico sem investimento'
    },
    completo: {
        titulo: 'Curso Completo',
        preco: 29.90,
        descricao: 'Conteúdo completo com suporte'
    },
    aovivo: {
        titulo: 'Curso Ao Vivo',
        preco: 10,
        descricao: 'Aulas ao vivo com interação direta'
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
    const telefone = form.querySelector('input[type="tel"]').value;
    const cursoTipo = form.dataset.cursoTipo;
    const preco = form.dataset.preco;
    const curso = cursos[cursoTipo];
    
    if (!nome || !email || !telefone) {
        alert('Por favor, preencha todos os campos!');
        return;
    }
    
    if (preco === 0 || preco === '0') {
        mostrarSucesso(nome, email, telefone, curso, 0);
        return;
    }
    
    const mensagem = `Olá! Realizei o pagamento do ${curso.titulo} (R$ ${preco.toFixed(2)}).\n\nDados:\nNome: ${nome}\nEmail: ${email}\nTelefone: ${telefone}\n\nAguardo a confirmação!`;
    const urlWhatsApp = `https://wa.me/15996945451?text=${encodeURIComponent(mensagem)}`;
    
    mostrarSucesso(nome, email, telefone, curso, preco);
    
    setTimeout(() => {
        window.open(urlWhatsApp, '_blank');
    }, 2000);
}

// Mostrar mensagem de sucesso
function mostrarSucesso(nome, email, telefone, curso, preco) {
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
                Você será redirecionado para o WhatsApp para enviar o comprovante.
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
