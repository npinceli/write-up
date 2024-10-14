from OFS import SimpleItem
from Products.PageTemplates.PageTemplateFile import PageTemplateFile


class Feed(SimpleItem.SimpleItem):
    """Feed Controller."""
    _index = PageTemplateFile('views/index.zpt', globals())
    feed_js = PageTemplateFile('views/js/feed.js', globals())
    feed_css = PageTemplateFile('views/css/feed.css', globals())

    def index_html(self):
        """."""
        return self._index()
