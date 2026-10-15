
/* =========================================
   VAPES BY XANDER
   Funciones e interactividad
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

    // 1. AÑO AUTOMÁTICO EN EL PIE DE PÁGINA
    const anio = document.getElementById("anio");

    if (anio) {
        anio.textContent = new Date().getFullYear();
    }

    // 2. MENÚ RESPONSIVE
    const menuToggle = document.getElementById("menuToggle");
    const menuPrincipal = document.getElementById("menuPrincipal");

    function cerrarMenu() {
        if (!menuToggle || !menuPrincipal) return;

        menuPrincipal.classList.remove("activo");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menú");
    }

    if (menuToggle && menuPrincipal) {

        menuToggle.addEventListener("click", () => {
            const estaAbierto =
                menuToggle.getAttribute("aria-expanded") === "true";

            menuToggle.setAttribute(
                "aria-expanded",
                String(!estaAbierto)
            );

            menuToggle.setAttribute(
                "aria-label",
                estaAbierto ? "Abrir menú" : "Cerrar menú"
            );

            menuPrincipal.classList.toggle("activo", !estaAbierto);
        });

        // Cerrar el menú al seleccionar una sección
        menuPrincipal.querySelectorAll("a").forEach((enlace) => {
            enlace.addEventListener("click", cerrarMenu);
        });

        // Cerrar con Escape
        document.addEventListener("keydown", (evento) => {
            if (evento.key === "Escape") {
                cerrarMenu();
            }
        });

        // Restaurar el menú al cambiar a escritorio
        window.addEventListener("resize", () => {
            if (window.innerWidth > 640) {
                cerrarMenu();
            }
        });
    }

    // 3. FICHAS INFORMATIVAS DEL CATÁLOGO
    const detalleProducto = document.getElementById("detalleProducto");
    const detalleTitulo = document.getElementById("detalleTitulo");
    const detalleTexto = document.getElementById("detalleTexto");
    const cerrarDetalle = document.getElementById("cerrarDetalle");

    const fichas = {
        compacto: {
            titulo: "Dispositivo compacto",
            texto:
                "Esta ficha está pendiente de completar con datos " +
                "verificados del fabricante: dimensiones, materiales, " +
                "componentes, contenido declarado y advertencias."
        },

        electronico: {
            titulo: "Dispositivo electrónico",
            texto:
                "Esta ficha está pendiente de completar con información " +
                "verificable sobre alimentación eléctrica, batería, " +
                "componentes, mantenimiento y precauciones."
        },

        tecnico: {
            titulo: "Ficha técnica",
            texto:
                "Añade aquí el nombre del fabricante, modelo exacto, " +
                "especificaciones documentadas, composición declarada " +
                "y advertencias proporcionadas por una fuente fiable."
        }
    };

    document.querySelectorAll("[data-producto]").forEach((boton) => {

        boton.addEventListener("click", () => {
            const identificador = boton.dataset.producto;
            const ficha = fichas[identificador];

            if (!ficha || !detalleProducto ||
                !detalleTitulo || !detalleTexto) {
                return;
            }

            detalleTitulo.textContent = ficha.titulo;
            detalleTexto.textContent = ficha.texto;

            detalleProducto.hidden = false;

            detalleProducto.scrollIntoView({
                behavior: window.matchMedia(
                    "(prefers-reduced-motion: reduce)"
                ).matches ? "auto" : "smooth",
                block: "nearest"
            });
        });

    });

    // 4. CERRAR UNA FICHA
    if (cerrarDetalle && detalleProducto) {

        cerrarDetalle.addEventListener("click", () => {
            detalleProducto.hidden = true;
        });

    }

    // 5. CERRAR FICHA CON ESCAPE
    document.addEventListener("keydown", (evento) => {
        if (evento.key === "Escape" && detalleProducto) {
            detalleProducto.hidden = true;
        }
    });

});
