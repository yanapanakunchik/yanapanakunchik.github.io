// Protección y marca de agua para Yanapanakunchik
(function() {
    'use strict';
    
    // Configuración de la marca de agua
    const watermarkConfig = {
        text: '© 2024 Yanapanakunchik - Comercio Justo Cusco',
        position: 'bottom-right',
        opacity: 0.8,
        fontSize: '12px',
        fontFamily: 'Arial, sans-serif',
        color: '#ffffff',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: '8px 12px',
        borderRadius: '6px',
        zIndex: 9999
    };
    
    // Crear marca de agua
    function createWatermark() {
        const watermark = document.createElement('div');
        watermark.id = 'yanapanakunchik-watermark';
        watermark.textContent = watermarkConfig.text;
        watermark.style.cssText = `
            position: fixed;
            bottom: 10px;
            right: 10px;
            background: ${watermarkConfig.backgroundColor};
            color: ${watermarkConfig.color};
            padding: ${watermarkConfig.padding};
            border-radius: ${watermarkConfig.borderRadius};
            font-size: ${watermarkConfig.fontSize};
            font-family: ${watermarkConfig.fontFamily};
            z-index: ${watermarkConfig.zIndex};
            pointer-events: none;
            user-select: none;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            backdrop-filter: blur(5px);
            -webkit-backdrop-filter: blur(5px);
            opacity: ${watermarkConfig.opacity};
            transition: opacity 0.3s ease;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        `;
        
        // Agregar marca de agua al body
        document.body.appendChild(watermark);
        
        // Animación de entrada
        setTimeout(() => {
            watermark.style.opacity = watermarkConfig.opacity;
        }, 100);
        
        return watermark;
    }
    
    // Protección contra copia de contenido
    function protectContent() {
        // Deshabilitar clic derecho
        document.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            showProtectionMessage('Acceso restringido');
        });
        
        // Deshabilitar teclas de acceso directo
        document.addEventListener('keydown', function(e) {
            // Ctrl+C, Ctrl+V, Ctrl+A, Ctrl+S, F12
            if ((e.ctrlKey && (e.key === 'c' || e.key === 'v' || e.key === 'a' || e.key === 's')) || 
                e.key === 'F12' || e.key === 'F5') {
                e.preventDefault();
                showProtectionMessage('Acceso restringido');
            }
        });
        
        // Deshabilitar selección de texto en elementos importantes
        const protectedElements = document.querySelectorAll('h1, h2, h3, .integrante, .persona, .hero-content');
        protectedElements.forEach(element => {
            element.style.userSelect = 'none';
            element.style.webkitUserSelect = 'none';
            element.style.mozUserSelect = 'none';
            element.style.msUserSelect = 'none';
        });
        
        // Protección contra arrastrar imágenes
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            img.addEventListener('dragstart', function(e) {
                e.preventDefault();
            });
            img.style.pointerEvents = 'none';
        });
    }
    
    // Mostrar mensaje de protección
    function showProtectionMessage(message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #ef4444;
            color: white;
            padding: 12px 20px;
            border-radius: 6px;
            font-size: 14px;
            font-weight: 600;
            z-index: 10000;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            animation: slideIn 0.3s ease;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Remover después de 3 segundos
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
    
    // Optimización de imágenes con lazy loading
    function optimizeImages() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Compresión de CSS inline
    function compressInlineStyles() {
        const styleElements = document.querySelectorAll('style');
        styleElements.forEach(style => {
            let css = style.textContent;
            // Remover comentarios y espacios innecesarios
            css = css.replace(/\/\*[\s\S]*?\*\//g, '');
            css = css.replace(/\s+/g, ' ');
            css = css.replace(/;\s*}/g, '}');
            css = css.replace(/{\s*/g, '{');
            css = css.replace(/\s*}/g, '}');
            style.textContent = css;
        });
    }
    
    // Optimización de rendimiento
    function optimizePerformance() {
        // Prevenir múltiples ejecuciones
        if (window.yanapanakunchikOptimized) return;
        window.yanapanakunchikOptimized = true;
        
        // Lazy loading para elementos
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '50px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);
        
        // Observar elementos con clase fade-in
        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });
    }
    
    // Inicialización cuando el DOM esté listo
    function init() {
        // Crear marca de agua
        const watermark = createWatermark();
        
        // Proteger contenido
        protectContent();
        
        // Optimizar imágenes
        optimizeImages();
        
        // Optimizar rendimiento
        optimizePerformance();
        
        // Comprimir estilos inline
        setTimeout(compressInlineStyles, 1000);
        
        // Log de protección activada
        console.log('%c🛡️ Yanapanakunchik - Protección activada', 'color: #3b82f6; font-weight: bold; font-size: 14px;');
        console.log('%c© 2024 Yanapanakunchik - Comercio Justo Cusco', 'color: #666; font-size: 12px;');
    }
    
    // Agregar estilos CSS para animaciones
    const protectionStyles = document.createElement('style');
    protectionStyles.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        .fade-in {
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.6s ease;
        }
        .fade-in.visible {
            opacity: 1;
            transform: translateY(0);
        }
        img[loading="lazy"] {
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        img[loading="lazy"].loaded {
            opacity: 1;
        }
    `;
    document.head.appendChild(protectionStyles);
    
    // Inicializar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // Protección adicional contra inspección
    setInterval(() => {
        if (document.hidden) return;
        
        // Verificar si se abrió la consola del desarrollador
        const devtools = {
            open: false,
            orientation: null
        };
        
        const threshold = 160;
        
        if (window.outerHeight - window.innerHeight > threshold || 
            window.outerWidth - window.innerWidth > threshold) {
            if (!devtools.open) {
                devtools.open = true;
                showProtectionMessage('Acceso no autorizado detectado');
            }
        } else {
            devtools.open = false;
        }
    }, 1000);
    
})(); 