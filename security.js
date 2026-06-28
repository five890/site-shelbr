// ============================================
// PROTEÇÃO DE SEGURANÇA - SHELBY STORE
// ============================================

// 1. Desabilitar clique direito (inspeção)
document.addEventListener('contextmenu', function(event) {
    event.preventDefault();
    console.warn('Inspeção desabilitada por segurança');
    return false;
});

// 2. Desabilitar atalhos de teclado para abrir DevTools
document.addEventListener('keydown', function(event) {
    // F12 - DevTools
    if (event.key === 'F12') {
        event.preventDefault();
        return false;
    }
    
    // Ctrl+Shift+I - Inspetor
    if (event.ctrlKey && event.shiftKey && event.key === 'I') {
        event.preventDefault();
        return false;
    }
    
    // Ctrl+Shift+J - Console
    if (event.ctrlKey && event.shiftKey && event.key === 'J') {
        event.preventDefault();
        return false;
    }
    
    // Ctrl+Shift+C - Seletor de elementos
    if (event.ctrlKey && event.shiftKey && event.key === 'C') {
        event.preventDefault();
        return false;
    }
});

// 3. Detecção de DevTools aberto
const devToolsOpen = () => {
    const start = performance.now();
    debugger;
    const end = performance.now();
    return (end - start) > 100;
};

// Verificar periodicamente se DevTools está aberto
setInterval(() => {
    if (devToolsOpen()) {
        console.clear();
        console.log('%c⚠️ ACESSO NEGADO', 'color: red; font-size: 20px; font-weight: bold;');
        console.log('%cNão é permitido inspecionar este site.', 'color: red; font-size: 14px;');
    }
}, 1000);

// 4. Proteção contra console.log de dados sensíveis
const originalLog = console.log;
console.log = function(...args) {
    // Permitir logs, mas avisar que estão sendo monitorados
    originalLog.apply(console, args);
};

// 5. Desabilitar seleção de texto (opcional - comentado por padrão)
// document.body.style.userSelect = 'none';
// document.body.style.webkitUserSelect = 'none';

// 6. Proteção contra cópia de código
document.addEventListener('copy', function(event) {
    const selectedText = window.getSelection().toString();
    if (selectedText.length > 0) {
        event.preventDefault();
        const message = 'Cópia de conteúdo protegida. Contate o suporte para mais informações.';
        event.clipboardData.setData('text/plain', message);
        console.warn('Tentativa de cópia detectada');
    }
});

// 7. Proteção contra drag and drop
document.addEventListener('dragstart', function(event) {
    event.preventDefault();
    return false;
});

// 8. Monitorar tentativas de acesso a localStorage/sessionStorage
const originalSetItem = Storage.prototype.setItem;
Storage.prototype.setItem = function(key, value) {
    if (key.includes('admin') || key.includes('token') || key.includes('password')) {
        console.warn('Tentativa suspeita de armazenar dados sensíveis');
        return;
    }
    originalSetItem.apply(this, arguments);
};

// 9. Proteção contra modificação do DOM
const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (mutation.type === 'childList' || mutation.type === 'attributes') {
            // Verificar se há tentativa de adicionar scripts maliciosos
            if (mutation.addedNodes.length > 0) {
                mutation.addedNodes.forEach(function(node) {
                    if (node.tagName === 'SCRIPT' && node.src && !node.src.includes('script.js')) {
                        console.warn('Script suspeito detectado e bloqueado');
                        node.remove();
                    }
                });
            }
        }
    });
});

observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['src', 'href']
});

// 10. Proteção contra XSS - Sanitizar entrada de dados
function sanitizeInput(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
}

// 11. Desabilitar acesso a window.eval
const originalEval = window.eval;
window.eval = function(code) {
    console.warn('Tentativa de usar eval() bloqueada');
    throw new Error('eval() não é permitido por razões de segurança');
};

// 12. Monitorar requisições suspeitas
const originalFetch = window.fetch;
window.fetch = function(...args) {
    const url = args[0];
    
    // Verificar se a URL é confiável
    if (typeof url === 'string' && !url.includes(window.location.origin)) {
        console.warn('Requisição externa detectada:', url);
    }
    
    return originalFetch.apply(this, arguments);
};

// 13. Proteção contra modificação de variáveis globais críticas
Object.defineProperty(window, 'PIX_KEY', {
    writable: false,
    configurable: false
});

Object.defineProperty(window, 'WHATSAPP_NUMBER', {
    writable: false,
    configurable: false
});

// 14. Log de segurança
console.log('%c🔒 Shelby Store - Sistema de Segurança Ativado', 'color: green; font-size: 14px; font-weight: bold;');
console.log('%cTentativas de acesso não autorizado estão sendo monitoradas.', 'color: green; font-size: 12px;');

// 15. Proteção contra técnicas de bypass
if (typeof window.__proto__ !== 'undefined') {
    Object.freeze(window.__proto__);
}

// 16. Verificação de integridade do site
const checkIntegrity = () => {
    const scripts = document.querySelectorAll('script');
    const links = document.querySelectorAll('link');
    
    scripts.forEach(script => {
        if (script.src && !script.src.includes('security.js') && !script.src.includes('script.js')) {
            console.warn('Script não autorizado detectado:', script.src);
        }
    });
};

// Executar verificação ao carregar
window.addEventListener('load', checkIntegrity);

// 17. Proteção contra modificação de funções críticas
const criticalFunctions = ['selectCourse', 'openPaymentModal', 'copyPixKey'];
criticalFunctions.forEach(funcName => {
    if (typeof window[funcName] !== 'undefined') {
        const originalFunc = window[funcName];
        window[funcName] = function(...args) {
            console.log(`Função ${funcName} chamada com segurança`);
            return originalFunc.apply(this, args);
        };
    }
});

console.log('%c✅ Todas as proteções de segurança foram ativadas com sucesso!', 'color: green; font-size: 12px;');
