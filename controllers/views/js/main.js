var registrationModule = {
    signupProcess: function(event) {
        event.preventDefault();
        componentsModule.setLoading(true);

        const form = document.getElementById('registration_form');
        const formData = new FormData(form);

        setTimeout(() => {

            const password = formData.get('password');
            const confirm_password = formData.get('confirm_password');

            if (password != confirm_password){
                let msg = 'As senhas precisam ser iguais.'
                componentsModule.showToast(msg, 2)
                componentsModule.setLoading(false);
                return false;
            }

            fetch('signup_process',{
                    method: 'POST',
                    body: formData,
                    credentials: 'same-origin'
                })
                .then(response => {
                    if (!response.ok) {
                        return response.json().then(data => {
                            const errorMessage = data.error;
                            const status = response.status;
                            const error = new Error(errorMessage);
                            error.status = status
                            throw error;
                        })
                    }
                    return response.json();
                })
                .then(data => {
                    window.location = '/w/write/avatar/'
                })
                .catch(error => {
                    let type = '';
                    if (error.status == 400 || error.status == 404 || error.status == 500) {
                        type = 2
                    } else if (error.status == 401) {
                        type = 3
                    }
                    componentsModule.showToast(error.message, type)
                    componentsModule.setLoading(false);
                    return false;
                    })
                .finally(() => {
                    componentsModule.setLoading(false);
                })
        }, 1500)
    },

    avatar: function(event){
        event.preventDefault();

        const form = document.getElementById('avatar');
        const formData = new FormData(form);

        fetch('/w/write/upload_avatar', {
            method: 'POST',
            body: formData,
            credentials: 'same-origin'
        })
    }
}

var loginModule = {
    loginProcess: function(event){
        event.preventDefault();

        const form = document.getElementById('login_form');
        const formData = new FormData(form);

        componentsModule.setLoading(true);

        setTimeout(() => {
            fetch('login_process',{
                method: 'POST',
                body: formData,
                credentials: 'same-origin'
            }).then(response => {
                if (!response.ok){
                    return response.json().then(data => {
                        const errorMessage = data.error;
                        const status = response.status;
                        const error = new Error(errorMessage);
                        error.status = status
                        throw error;
                    })
                }
                return response.json()
            }).then((data) => {
                window.location = '/w/feed/'
            }).catch((error) => {
                let type = '';
                if (error.status == 400 || error.status == 404 || error.status == 500) {
                    type = 2
                } else if (error.status == 401) {
                    type = 3
                }
                componentsModule.showToast(error.message, type)
                componentsModule.setLoading(false);
                return false;
            }).finally(() => {
                componentsModule.setLoading(false);
            })

        }, 1500);
    }
}

var componentsModule = {
    toastIcon: function(type){
        let success = '<i class="fa-solid fa-circle-check" style="color: green;"></i>';
        let error = '<i class="fa-solid fa-circle-xmark" style="color: red;"></i>';
        let invalid = '<i class="fa-solid fa-circle-exclamation" style="color: orange"></i>';

        if (type == 1) {
            return success
        } else if (type == 2){
            return error
        } else if (type == 3) {
            return invalid
        }
    },

    showToast: function(msg, type){
        let toastBox = document.getElementById('toastBox');
        let toast = document.createElement('div');
        let content = this.toastIcon(type) + msg;
        toast.classList.add('toast');
        toast.innerHTML = content;
        toastBox.appendChild(toast);

        if (toastBox.childElementCount == 4) {
            const firstToast = toastBox.firstChild;
            firstToast.remove();
        }

        setTimeout(() => {
            toast.remove();
        }, 3000)
    },

    setLoading: function(loading){

        const submitButton = document.getElementById('btn_submit');

        if (loading) {
            submitButton.disabled = true;
            submitButton.innerHTML = `<i class="fa-solid fa-spinner fa-spin" style="font-size: 18px"></i>`
            submitButton.querySelector('.fa-spin').style.animation = 'rotate 1.5s linear infinite'
        } else {
            submitButton.disabled = false;
            submitButton.textContent = 'Enviar'
        }
    }
}