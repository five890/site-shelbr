# Shelby Store - Plataforma de Vendas de Cursos Online

Uma plataforma moderna e segura para vender cursos online com design estilo Netflix, sistema de pagamento via Pix, chatbot IA e proteção avançada contra hacking.

## 🚀 Funcionalidades

✅ **Design Estilo Netflix**
- Tema preto com LED branco (efeito neon)
- Interface moderna e responsiva
- Animações suaves e profissionais

✅ **Três Opções de Curso**
- Curso Básico - R$ 7,00 (10 aulas)
- Curso Avançado - R$ 15,00 (30 aulas + certificado)
- Curso Ao Vivo - R$ 50,00 (Aulas semanais ao vivo)

✅ **Sistema de Pagamento Pix**
- QR Code dinâmico para pagamento
- Chave Pix configurável
- Modal de pagamento elegante
- Fluxo otimizado (só aparece ao clicar "Quero Adquirir")

✅ **Integração WhatsApp**
- Botão flutuante para envio de comprovante
- Mensagem pré-formatada
- Link direto para WhatsApp

✅ **Chatbot IA Atendente**
- Respostas inteligentes sobre os cursos
- Suporte 24/7
- Interface amigável com histórico

✅ **Proteção de Segurança Avançada**
- Bloqueio de inspeção de código (DevTools)
- Proteção contra XSS e injeção de código
- Desabilitar clique direito
- Proteção contra cópia de código
- Monitoramento de integridade do site
- Bloqueio de requisições suspeitas

## 📁 Estrutura do Projeto

```
site-shelbr/
├── index.html          # Página principal
├── style.css           # Estilos (tema Netflix)
├── script.js           # Funcionalidades (Pix, Chatbot, Cursos)
├── security.js         # Proteção de segurança
├── package.json        # Configurações do projeto
└── README.md           # Este arquivo
```

## 🛠️ Como Usar

### 1. Clonar o Repositório
```bash
git clone https://github.com/five890/site-shelbr.git
cd site-shelbr
```

### 2. Executar Localmente
```bash
# Usando Python 3
python3 -m http.server 8000

# Ou usando Node.js (se tiver instalado)
npx http-server
```

Acesse: `http://localhost:8000`

### 3. Configurar Suas Informações

Abra o arquivo `script.js` e atualize as seguintes constantes:

```javascript
const PIX_KEY = 'sua-chave-pix-aqui';
const WHATSAPP_NUMBER = 'seu-numero-whatsapp';
```

### 4. Fazer Deploy

#### Opção A: GitHub Pages (Gratuito)
1. Faça push do código para o GitHub
2. Vá em Settings → Pages
3. Selecione a branch `main` e clique em Save
4. Seu site estará disponível em `https://seu-usuario.github.io/site-shelbr`

#### Opção B: Vercel (Recomendado - Automático)
1. Acesse [vercel.com](https://vercel.com)
2. Clique em "New Project"
3. Conecte seu repositório GitHub
4. Clique em Deploy
5. **Pronto!** Qualquer mudança no GitHub atualiza automaticamente

#### Opção C: Netlify (Gratuito)
1. Acesse [netlify.com](https://netlify.com)
2. Clique em "New site from Git"
3. Conecte seu repositório GitHub
4. Clique em Deploy

## 📱 Personalização

### Alterar Cores do Tema
Edite o arquivo `style.css` e procure por `:root`:

```css
:root {
    --primary-color: #e50914;      /* Vermelho Netflix */
    --secondary-color: #221f1f;    /* Preto escuro */
    --accent-color: #00d4ff;       /* Azul LED */
    --dark-bg: #0f0f0f;            /* Fundo preto */
    --light-text: #ffffff;         /* Texto branco */
}
```

### Adicionar Mais Cursos
Edite o arquivo `index.html` e adicione um novo `curso-card`:

```html
<div class="curso-card">
    <div class="curso-header">
        <h3>Novo Curso</h3>
        <span class="badge">Novo</span>
    </div>
    <div class="curso-price">R$ XX,00</div>
    <ul class="curso-features">
        <li>✓ Recurso 1</li>
        <li>✓ Recurso 2</li>
    </ul>
    <button class="btn btn-primary" onclick="selectCourse('id', XX.00)">Quero Adquirir</button>
</div>
```

### Adicionar Mais Respostas ao Chatbot
Edite `script.js` e adicione novas respostas no objeto `chatbotResponses`:

```javascript
const chatbotResponses = {
    'sua pergunta': 'sua resposta aqui',
    'outra pergunta': 'outra resposta',
};
```

## 🔐 Segurança

O site inclui proteção contra:
- ✅ Inspeção de código (DevTools)
- ✅ Clique direito
- ✅ Atalhos de teclado (F12, Ctrl+Shift+I, etc)
- ✅ Cópia de código
- ✅ Injeção de código (XSS)
- ✅ Modificação do DOM
- ✅ Requisições suspeitas
- ✅ Acesso a variáveis críticas

**Importante:** Estas proteções são básicas. Para segurança máxima em produção, considere:
- Usar HTTPS
- Implementar CSP (Content Security Policy)
- Usar um WAF (Web Application Firewall)
- Fazer auditorias de segurança regulares

## 📊 Fluxo de Vendas

1. **Cliente acessa o site** → Vê os 3 cursos disponíveis
2. **Cliente clica em "Quero Adquirir"** → Modal de pagamento abre
3. **Cliente escaneia o QR Code Pix** → Realiza o pagamento
4. **Cliente clica em "Enviar Comprovante via WhatsApp"** → Envia para você
5. **Você confirma e libera o acesso** → Cliente recebe o curso

## 🎯 Próximos Passos

- [ ] Integrar com banco de dados para armazenar compras
- [ ] Adicionar sistema de e-mail automático
- [ ] Criar área de membros com acesso ao curso
- [ ] Integrar com Stripe ou outras formas de pagamento
- [ ] Adicionar analytics e rastreamento de conversão
- [ ] Implementar sistema de cupons de desconto
- [ ] Adicionar mais cursos dinamicamente

## 📞 Suporte

Para dúvidas ou problemas:
- WhatsApp: [15996945451](https://wa.me/5515996945451)
- Email: seu-email@exemplo.com

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

---

**Desenvolvido com ❤️ para Shelby Store**

**Última atualização:** Junho 2024
