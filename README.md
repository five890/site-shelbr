# Shelbr - Site de Vendas de Curso com Pagamento Pix

Um site moderno e responsivo para vender cursos online com sistema de pagamento via Pix, chatbot IA atendente e integração com WhatsApp.

## 🚀 Funcionalidades

✅ **Sistema de Pagamento Pix**
- QR Code dinâmico para pagamento
- Chave Pix configurável
- Cópia fácil da chave

✅ **Integração WhatsApp**
- Botão flutuante para envio de comprovante
- Mensagem pré-formatada
- Link direto para WhatsApp

✅ **Chatbot IA Atendente**
- Respostas inteligentes sobre o curso
- Suporte 24/7
- Interface amigável

✅ **Design Responsivo**
- Otimizado para desktop, tablet e mobile
- Animações suaves
- Carregamento rápido

## 📋 Estrutura do Projeto

```
site-shelbr/
├── index.html          # Página principal
├── style.css           # Estilos CSS
├── script.js           # Funcionalidades JavaScript
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
const COURSE_PRICE = 'seu-valor-aqui';
const WHATSAPP_NUMBER = 'seu-numero-whatsapp';
```

### 4. Fazer Deploy

#### Opção A: GitHub Pages (Gratuito)
1. Faça push do código para o GitHub
2. Vá em Settings → Pages
3. Selecione a branch `main` e clique em Save
4. Seu site estará disponível em `https://seu-usuario.github.io/site-shelbr`

#### Opção B: Netlify (Gratuito)
1. Acesse [netlify.com](https://netlify.com)
2. Clique em "New site from Git"
3. Conecte seu repositório GitHub
4. Clique em Deploy

#### Opção C: Vercel (Gratuito)
1. Acesse [vercel.com](https://vercel.com)
2. Clique em "New Project"
3. Importe seu repositório GitHub
4. Clique em Deploy

#### Opção D: Hospedagem Tradicional
1. Contrate uma hospedagem (ex: Hostinger, Bluehost)
2. Faça upload dos arquivos via FTP
3. Configure o domínio

## 📱 Personalização

### Alterar Cores
Edite o arquivo `style.css` e procure por `:root`:

```css
:root {
    --primary-color: #6366f1;      /* Cor principal */
    --secondary-color: #ec4899;    /* Cor secundária */
    --dark-bg: #0f172a;            /* Fundo escuro */
    --light-bg: #f8fafc;           /* Fundo claro */
}
```

### Adicionar Mais Respostas ao Chatbot
Edite `script.js` e adicione novas respostas no objeto `chatbotResponses`:

```javascript
const chatbotResponses = {
    'sua pergunta': 'sua resposta aqui',
    'outra pergunta': 'outra resposta',
};
```

### Modificar Conteúdo
Edite o arquivo `index.html` para alterar textos, títulos e descrições.

## 🔐 Segurança

⚠️ **Importante:** 
- Nunca compartilhe seu token do GitHub publicamente
- Mantenha sua chave Pix segura
- Use HTTPS em produção

## 📞 Suporte

Para dúvidas ou problemas:
- WhatsApp: [15996945451](https://wa.me/5515996945451)
- Email: seu-email@exemplo.com

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## 🎯 Próximos Passos

- [ ] Integrar com banco de dados para armazenar compras
- [ ] Adicionar sistema de e-mail automático
- [ ] Criar área de membros com acesso ao curso
- [ ] Integrar com Stripe ou outras formas de pagamento
- [ ] Adicionar analytics e rastreamento de conversão

---

**Desenvolvido com ❤️ para Shelbr**
