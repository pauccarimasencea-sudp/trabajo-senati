document.addEventListener('DOMContentLoaded', function() {

    // 1. FILTRADO DINÁMICO DE TARJETAS (DOM + GRID)
    const botonesFiltro = document.querySelectorAll('.filter-btn');
    const tarjetas = document.querySelectorAll('.item-carrera');

    botonesFiltro.forEach(btn => {
        btn.addEventListener('click', function() {
            botonesFiltro.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filtro = this.getAttribute('data-filter');
            tarjetas.forEach(tarjeta => {
                if(filtro === 'todos' || tarjeta.getAttribute('data-category') === filtro) {
                    tarjeta.style.display = 'block';
                } else {
                    tarjeta.style.display = 'none';
                }
            });
        });
    });

    // 2. VALIDACIÓN DEL FORMULARIO Y ALERTA DE CARGA POST
    const formulario = document.getElementById('formularioPostulante');
    const mensajeExito = document.getElementById('mensajeExito');
    const datosSimulados = document.getElementById('datosSimulados');

    formulario.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nombre = document.getElementById('nombre').value.trim();
        const correo = document.getElementById('correo').value.trim();
        const telefono = document.getElementById('telefono').value.trim();
        const programa = document.getElementById('programa').value;

        // RegEx estrictos para validar cadenas completas
        const regexNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{4,40}\$/;
        const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+\$/;
        const regexTelefono = /^9[0-9]{8}\$/; // Estándar Perú

        let valido = true;

        if(!regexNombre.test(nombre)) {
            document.getElementById('error-nombre').style.display = 'block';
            document.getElementById('nombre').classList.add('is-invalid');
            valido = false;
        } else {
            document.getElementById('error-nombre').style.display = 'none';
            document.getElementById('nombre').classList.remove('is-invalid');
            document.getElementById('nombre').classList.add('is-valid');
        }

        if(!regexCorreo.test(correo)) {
            document.getElementById('error-correo').style.display = 'block';
            document.getElementById('correo').classList.add('is-invalid');
            valido = false;
        } else {
            document.getElementById('error-correo').style.display = 'none';
            document.getElementById('correo').classList.remove('is-invalid');
            document.getElementById('correo').classList.add('is-valid');
        }

        if(!regexTelefono.test(telefono)) {
            document.getElementById('error-telefono').style.display = 'block';
            document.getElementById('telefono').classList.add('is-invalid');
            valido = false;
        } else {
            document.getElementById('error-telefono').style.display = 'none';
            document.getElementById('telefono').classList.remove('is-invalid');
            document.getElementById('telefono').classList.add('is-valid');
        }

        if(programa === "") {
            document.getElementById('error-programa').style.display = 'block';
            document.getElementById('programa').classList.add('is-invalid');
            valido = false;
        } else {
            document.getElementById('error-programa').style.display = 'none';
            document.getElementById('programa').classList.remove('is-invalid');
            document.getElementById('programa').classList.add('is-valid');
        }

        if(valido) {
            mensajeExito.classList.remove('d-none');
            datosSimulados.innerHTML = `Los datos del postulante <strong>${nombre}</strong> fueron empaquetados en la carga útil HTTP POST de forma segura y exitosa hacia el servidor de bases de datos académico.`;
            formulario.reset();
            document.querySelectorAll('.form-control, .form-select').forEach(el => el.classList.remove('is-valid'));
        } else {
            mensajeExito.classList.add('d-none');
        }
    });
});
