from OFS import SimpleItem
from Products.PageTemplates.PageTemplateFile import PageTemplateFile
import json


class WriteUp(SimpleItem.SimpleItem):
    """Controller principal."""

    _index = PageTemplateFile('views/index.zpt', globals())
    _signup = PageTemplateFile('views/signup.zpt', globals())
    main_js = PageTemplateFile('views/js/main.js', globals())
    main_css = PageTemplateFile('views/css/main.css', globals())

    def index_html(self):
        """Homepage."""
        return self._index()

    def signup(self):
        """SignUp view."""
        return self._signup()

    def signup_process(self):
        """Process user signup."""
        self.REQUEST.response.setHeader('Content-Type', 'application/json')

        dados = self.REQUEST.form

        return json.dumps(dados)
