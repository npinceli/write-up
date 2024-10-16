from OFS import SimpleItem
from Products.PageTemplates.PageTemplateFile import PageTemplateFile
from Products.writeup.models.write_m import WriteM


class Feed(SimpleItem.SimpleItem):
    """Feed Controller."""
    _index = PageTemplateFile('views/index.zpt', globals())
    feed_js = PageTemplateFile('views/js/feed.js', globals())
    feed_css = PageTemplateFile('views/css/feed.css', globals())

    _write_model = WriteM()

    def index_html(self):
        """."""
        signed = self.REQUEST.SESSION.get('1')
        user_id = self.REQUEST.SESSION.get('user_id')

        data = self._write_model.search_user_info(user_id=user_id)[0]

        if signed:
            return self._index(data={
                'name': data.name,
                'username': data.username,
                'avatar': data.avatar
            })
        else:
            return self.REQUEST.RESPONSE.redirect('/w/write')
