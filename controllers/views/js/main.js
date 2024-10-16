var registrationModule = {
    signupProcess: function(event) {
        event.preventDefault();

        const form = document.getElementById('registration_form');
        const formData = new FormData(form);
        const alert = document.getElementById('alert');

        alert.classList.add('hidden');
        alert.classList.remove('visible');
        alert.textContent = '';

        const user = formData.get('user');
        const name = formData.get('name');
        const genre = formData.get('genre');
        const password = formData.get('password');
        const confirm_password = formData.get('confirm_password');

        this.setLoading(true);

        setTimeout(() => {
            let fieldsV = this.validateFields(user, name, genre, password, confirm_password)
            if (fieldsV.valid === false) {
                alert.classList.add('visible');
                alert.classList.remove('hidden');
                alert.textContent = fieldsV.message;
                this.setLoading(false);
                return;
            }

            let passwordV = this.validatePassword(password, confirm_password)
            if (passwordV.valid === false) {
                alert.classList.add('visible');
                alert.classList.remove('hidden');
                alert.textContent = passwordV.message;
                this.setLoading(false);
                return;
            }

            let userV = this.validateUser(user)
            if (userV.valid === false) {
                alert.classList.add('visible');
                alert.classList.remove('hidden');
                alert.textContent = userV.message;
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
                    console.log(data.success);
                })
                .catch(error => {
                    console.log(error)
                    alert.classList.add('visible');
                    alert.classList.remove('hidden');
                    alert.textContent = error.message;
                })
                .finally(() => {
                    this.setLoading(false);
                })
        }, 1500)
        
    },

    validateFields: function(user, name, genre, password, confirm_password) {
        if (user === '' || name === '' || genre === '' || password === '' || confirm_password === '') {
            return {valid: false, message: "Preencha todos os campos"}
        }
        return {valid: true}
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

        const submitButton = document.getElementById('btn_submit');

        if (loading) {
            submitButton.disabled = true;
            submitButton.innerHTML = `
                <svg id="spinner" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-loader"><path d="M12 2v4"/><path d="m16.2 7.8 2.9-2.9"/><path d="M18 12h4"/><path d="m16.2 16.2 2.9 2.9"/><path d="M12 18v4"/><path d="m4.9 19.1 2.9-2.9"/><path d="M2 12h4"/><path d="m4.9 4.9 2.9 2.9"/></svg>
            `
            submitButton.querySelector('#spinner').style.animation = 'rotate 2s linear infinite'

        } else {
            submitButton.disabled = false;
            submitButton.textContent = 'Cadastrar'
        }
    }
}

var loginModule = {
    loginProcess: function(event){
        event.preventDefault();

        const form = document.getElementById('login_form');
        const formData = new FormData(form);
        const alert = document.getElementById('alert');

        alert.classList.add('hidden');
        alert.classList.remove('visible');
        alert.textContent = '';

        const user = formData.get('user');
        const password = formData.get('password');

        this.setLoading(true);

        setTimeout(() => {
            if(user === '' || password === ''){
                alert.classList.add('visible');
                alert.classList.remove('hidden');
                alert.textContent = 'Preencha todos os campos';
                this.setLoading(false);
                return;
            }
            fetch('login_process',{
                method: 'POST',
                body: formData,
                credentials: 'same-origin'
            }).then(response => {
                if (!response.ok) {
                    return response.json().then(err => {
                        throw new Error(err.error);
                    });
                }
            }).then(data => {
                window.location = '/w/write/feed/'
            }).catch(error => {
                alert.classList.add('visible');
                alert.classList.remove('hidden');
                alert.textContent = error.message;
                this.setLoading(false);
                return;
            }).finally(() => {
                this.setLoading(false);
            })

        }, 1500);
    },

    setLoading: function(loading){

        const submitButton = document.getElementById('btn_submit');

        if (loading) {
            submitButton.disabled = true;
            submitButton.innerHTML = `
                <svg id="spinner" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-loader"><path d="M12 2v4"/><path d="m16.2 7.8 2.9-2.9"/><path d="M18 12h4"/><path d="m16.2 16.2 2.9 2.9"/><path d="M12 18v4"/><path d="m4.9 19.1 2.9-2.9"/><path d="M2 12h4"/><path d="m4.9 4.9 2.9 2.9"/></svg>
            `
            submitButton.querySelector('#spinner').style.animation = 'rotate 2s linear infinite'

        } else {
            submitButton.disabled = false;
            submitButton.textContent = 'Entrar'
        }
    }
}