from OFS import SimpleItem
from Products.PageTemplates.PageTemplateFile import PageTemplateFile
from Products.writeup.models.write_m import WriteM
import json
from passlib.hash import pbkdf2_sha256


class WriteUp(SimpleItem.SimpleItem):
    """Main controller."""
    _index = PageTemplateFile('views/index.zpt', globals())
    _signup = PageTemplateFile('views/signup.zpt', globals())
    _login = PageTemplateFile('views/login.zpt', globals())
    main_js = PageTemplateFile('views/js/main.js', globals())
    main_css = PageTemplateFile('views/css/main.css', globals())

    _write_model = WriteM()

    def index_html(self):
        """Homepage."""
        return self._index()

    def signup(self):
        """SignUp view."""
        return self._signup()

    def signup_process(self):
        """Process user signup."""
        self.REQUEST.response.setHeader('Content-Type', 'application/json')

        data = self.REQUEST.form

        name = data['name']
        user = data['user']
        pwd = data['password']
        pwd = pbkdf2_sha256.hash(pwd)
        # Generating avatar for users
        genre = data['genre']
        if genre == '1':
            genre = 'boy'
        elif genre == '2':
            genre = 'girl'
        url_avatar = 'https://avatar.iran.liara.run/public'
        avatar = url_avatar + '/' + genre + '?username=' + user

        verify_user = self._write_model.search_user(user=user)[0]
        if verify_user.results == 1:
            msg = {'error': 'Usuario ja cadastrado.'}
            self.REQUEST.response.setStatus(400)
            return json.dumps(msg)
        else:
            self._write_model.create_user(name=name, user=user, genre=genre,
                                          password=pwd, avatar=avatar)
            self.REQUEST.response.setStatus(200)
            msg = {'success': 'Cadastrado com sucesso.'}
            return json.dumps(msg)

    def login(self):
        """View de login."""
        return self._login()

    def login_process(self):
        """Process user login."""
        self.REQUEST.response.setHeader('Content-Type', 'application/json')

        data = self.REQUEST.form

        user = data['user']
        password = data['password']

        user_info = self._write_model.search_user_info(user=user)

        if user_info:
            if pbkdf2_sha256.verify(password, user_info[0]['password']):
                self.REQUEST.SESSION.set('1', True)
                self.REQUEST.SESSION.set('user_id', user_info[0]['id'])
                self.REQUEST.response.setStatus(200)
            else:
                self.REQUEST.response.setStatus(400)
                msg = {'error': 'Senha incorreta'}
                return json.dumps(msg)
        else:
            self.REQUEST.response.setStatus(400)
            msg = {'error': 'Usuario nao encontrado'}
            return json.dumps(msg)
