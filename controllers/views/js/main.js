var registrationModule = {
    signupProcess: function(event) {
        event.preventDefault();

        const form = document.getElementById('registration_form');
        const formData = new FormData(form);
        const alertDiv = document.getElementById('alert');

        alertDiv.classList.add('hidden');
        alertDiv.classList.remove('visible');
        alertDiv.textContent = '';

        const password = formData.get('password');
        const confirm_password = formData.get('confirm_password');
        const user = formData.get('user');

        this.setLoading(true);

        setTimeout(() => {
            let passwordV = this.validatePassword(password, confirm_password)
            if (passwordV.valid === false) {
                alertDiv.classList.add('visible');
                alertDiv.classList.remove('hidden');
                alertDiv.textContent = passwordV.message;
                this.setLoading(false);
                return;
            }

            let userV = this.validateUser(user)
            if (userV.valid === false) {
                alertDiv.classList.add('visible');
                alertDiv.classList.remove('hidden');
                alertDiv.textContent = userV.message;
                this.setLoading(false);
                return;
            }
    
            fetch('signup_process',{
                    method: 'POST',
                    body: formData,
                    credentials: 'same-origin'
                })
                .then(response => {
                    if (!response.ok) {
                        return response.json().then(err => {
                            throw new Error(err.error);
                        });
                    }
                    return response.json();
                })
                .then(data => {
                    alertDiv.classList.add('visible');
                    alertDiv.classList.remove('hidden');
                    alertDiv.textContent = data.ok;
                })
                .catch(error => {
                    console.log(error)
                    alertDiv.classList.add('visible');
                    alertDiv.classList.remove('hidden');
                    alertDiv.textContent = error.message;
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

    validateUser: function(user) {
        if (user.length < 3) {
            return {valid: false, message: "Seu usuario precisa ter no minimo 3 caracteres"}
        }
        return {valid: true}
    },

    setLoading: function(loading){

        const submitButton = document.getElementById('register_user');

        if (loading) {
            submitButton.disabled = true;
            submitButton.textContent = 'Carregando...';
        } else {
            submitButton.disabled = false;
            submitButton.textContent = 'Cadastrar'
        }
    }
}