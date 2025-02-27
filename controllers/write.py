from OFS import SimpleItem
from Products.PageTemplates.PageTemplateFile import PageTemplateFile
from Products.writeup.models.write_m import WriteM
import json
from passlib.hash import pbkdf2_sha256
import requests


class WriteUp(SimpleItem.SimpleItem):
    """Main controller."""
    _index = PageTemplateFile('views/index.zpt', globals())
    _signup = PageTemplateFile('views/signup.zpt', globals())
    _login = PageTemplateFile('views/login.zpt', globals())
    _avatar = PageTemplateFile('views/avatar.zpt', globals())
    main_js = PageTemplateFile('views/js/main.js', globals())
    main_css = PageTemplateFile('views/css/main.css', globals())
    components_css = PageTemplateFile('views/css/components.css', globals())

    def _write_model(self):
        """."""
        return WriteM(
            id='write',
            connection=self.connection)

    def index_html(self):
        """Homepage."""
        return self._index()

    def create_session(self, key, value):
        """."""
        self.REQUEST.SESSION.set(key, value)

    def signup(self):
        """SignUp view."""
        return self._signup()

    def signup_process(self):
        """Process user signup."""
        write_model = self._write_model()

        data = self.REQUEST.form
        name = data['name']
        user = data['user']
        pwd = data['password']

        if ((not name or name == '') or (not user or user == '') or (
                not pwd or pwd == '')):
            msg = {'error': 'Preencha todos os campos.'}
            self.REQUEST.response.setStatus(400)
            return json.dumps(msg)

        pwd = pbkdf2_sha256.hash(pwd)

        verify_user = write_model.search_user(user=user)
        if verify_user:
            msg = {'error': 'Usuario ja cadastrado.'}
            self.REQUEST.response.setStatus(400)
            return json.dumps(msg)

        try:
            write_model.create_user(name=name, user=user, password=pwd)
        except Exception:
            msg = {'error': 'Erro ao criar o usuario'}
            self.REQUEST.response.setStatus(500)
            return json.dumps(msg)

        self.create_session('signup_complete', True)

        msg = {'success': 'Cadastrado com sucesso.'}
        self.REQUEST.response.setStatus(200)

        return json.dumps(msg)

    def login(self):
        """View de login."""
        return self._login()

    def login_process(self):
        """Process user login."""
        write_model = self._write_model()

        data = self.REQUEST.form
        user = data['user']
        password = data['password']

        if (not user or user == '') or (not password or password == ''):
            msg = {'error': 'Preencha todos os campos.'}
            self.REQUEST.response.setStatus(400)
            return json.dumps(msg)

        user_info = write_model.search_user_info(user=user)

        if not user_info or len(user_info) == 0:
            self.REQUEST.response.setStatus(404)
            msg = {'error': 'Usuario nao encontrado'}
            return json.dumps(msg)

        user_info = user_info[0]

        if pbkdf2_sha256.verify(password, user_info['password']):
            self.create_session('authenticated', True)
            self.create_session('user_id', user_info['id'])

            self.REQUEST.response.setStatus(200)
            msg = {'success': 'Login realizado com sucesso.'}
            return json.dumps(msg)
        else:
            msg = {'error': 'Senha incorreta'}
            self.REQUEST.response.setStatus(401)
            return json.dumps(msg)

    def upload_avatar(self):
        """."""
        data = self.REQUEST.form
        user_id = data['user_id']
        photo = data['file']

        photo.filename = 'pp{}.jpg'.format(user_id)

        url = 'http://localhost:5000/upload'

        files = {'file': photo}
        payload = {'user_id': user_id, 'type': 1}

        response = requests.post(url, data=payload, files=files)

        if response.status_code == 200:
            return self.REQUEST.RESPONSE.redirect('/w/write/login')
        else:
            raise Exception(2)

    # def avatar(self):
    #     """."""
    #     write_model = self._write_model()

    #     signup_complete = self.REQUEST.SESSION.get('signup_complete')

    #     user_info = write_model.search_user_info(user_id=user)[0]

    #     return self._avatar(user_id=user_info['id'])

    #     if signup_complete:
    #         return self._avatar()
    #     else:
    #         return self.REQUEST.RESPONSE.redirect('/w/write')
