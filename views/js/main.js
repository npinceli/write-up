var registrationModule = {
    signupProcess: function(event) {
        event.preventDefault();

        const form = document.getElementById('registration_form');
        const formData = new FormData(form);
        const alertDiv = document.getElementById('alert');

        alertDiv.classList.add('hidden');
        alertDiv.classList.remove('visible');
        alertDiv.textContent = '';

        const pass1 = formData.get('pass1');
        const pass2 = formData.get('pass2');

        this.setLoading(true);

        setTimeout(() => {
            validation = this.validatePassword(pass1, pass2)
            if (validation.valid === false) {
                alertDiv.classList.add('visible');
                alertDiv.classList.remove('hidden');
                alertDiv.textContent = validation.message;
                this.setLoading(false);
                return;
            }
    
            fetch('signup_process',{
                    method: 'POST',
                    body: formData,
                    credentials: 'same-origin'
                })
                .then(response => response.json())
                .then(data => {
                    alertDiv.classList.add('visible');
                    alertDiv.classList.remove('hidden');
                    alertDiv.textContent = 'Bem-vindo ' + data.name;
                })
                .catch(error => {
                    console.error('Erro:', error);
                })
                .finally(() => {
                    this.setLoading(false);
                })
        }, 1500)
        
    },

    validatePassword: function(password1, password2) {
        if (password1 != password2){
            return {valid: false, message: "As senhas sao diferentes"}
        } else {
            if (password1.length < 8) {
                return {valid: false, message: "A senha precisa ter no minimo 8 caracteres"}
            }
        }
        return {valid: true}
    },

    setLoading: function(loading){

        const submitButton = document.getElementById('cadastrar_usuario');

        if (loading) {
            submitButton.disabled = true;
            submitButton.textContent = 'Carregando...';
        } else {
            submitButton.disabled = false;
            submitButton.textContent = 'Cadastrar'
        }
    }
}