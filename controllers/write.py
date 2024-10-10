from OFS import SimpleItem
from Products.PageTemplates.PageTemplateFile import PageTemplateFile
from Products.writeup.models.write_m import WriteM
import json
from passlib.hash import pbkdf2_sha256


class WriteUp(SimpleItem.SimpleItem):
    """Main controller."""

    _index = PageTemplateFile('views/index.zpt', globals())
    _signup = PageTemplateFile('views/signup.zpt', globals())
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
        genre = data['genre']
        pwd = data['password']
        pwd = pbkdf2_sha256.hash(pwd)
        # Generating avatar for users
        url_avatar = 'https://avatar.iran.liara.run/public'
        avatar = url_avatar + '/' + genre + '?username=' + user

        if self._write_model.search_user(user=user):
            msg = {'error': 'Usuario ja cadastrado.'}
            self.REQUEST.response.setStatus(400)
            return json.dumps(msg)
        else:
            self._write_model.create_user(name=name, user=user, genre=genre,
                                          password=pwd, avatar=avatar)
            self.REQUEST.response.setStatus(200)
            msg = {'ok': 'Cadastrado com sucesso.'}
            return json.dumps(msg)
