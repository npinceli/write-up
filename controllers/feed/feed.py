from OFS import SimpleItem
from Products.PageTemplates.PageTemplateFile import PageTemplateFile
from Products.writeup.models.write_m import WriteM
from Products.writeup.models.feed.feed_m import FeedM
import json


class Feed(SimpleItem.SimpleItem):
    """Feed Controller."""
    _index = PageTemplateFile('views/index.zpt', globals())
    feed_macros = PageTemplateFile('views/feed_macros.zpt', globals())
    feed_js = PageTemplateFile('views/js/feed.js', globals())
    feed_css = PageTemplateFile('views/css/feed.css', globals())

    _write_model = WriteM()
    _feed_model = FeedM()

    def index_html(self):
        """."""
        signed = self.REQUEST.SESSION.get('1')
        user_id = self.REQUEST.SESSION.get('user_id')

        data = self._write_model.search_user_info(user_id=user_id)[0]
        sugg = self.suggestion_list(user_id=user_id)
        posts = self._feed_model.post_list()

        if signed:
            return self._index(
                user={
                    'name': data.name,
                    'username': data.username,
                    'avatar': data.avatar
                },
                suggestions=sugg,
                posts=posts,
                macros=self.feed_macros
            )
        else:
            return self.REQUEST.RESPONSE.redirect('/w/write')

    def suggestion_list(self, user_id):
        """."""
        return self._feed_model.search_suggestions(user_id=user_id)

    def follow_user(self):
        """."""
        self.REQUEST.response.setHeader('Content-Type', 'application/json')

        user_id = self.REQUEST.SESSION.get('user_id')
        data = self.REQUEST.get('BODY')
        data = json.loads(data)
        following_id = int(data.get('userId'))

        self._feed_model.follow_user(user_id=user_id,
                                     following_id=following_id)

        self.REQUEST.response.setStatus(200)

        return json.dumps({"msg": "Success"})

    def unfollow_user(self):
        """."""
        self.REQUEST.response.setHeader('Content-Type', 'application/json')

        user_id = self.REQUEST.SESSION.get('user_id')
        data = self.REQUEST.get('BODY')
        data = json.loads(data)
        unfollowing_id = int(data.get('userId'))

        self._feed_model.unfollow_user(user_id=user_id,
                                       unfollowing_id=unfollowing_id)

        self.REQUEST.response.setStatus(200)

        return json.dumps({"msg": "Success"})

    def create_post(self):
        """."""
        user_id = self.REQUEST.SESSION.get('user_id')
        data = self.REQUEST.get('BODY')
        data = json.loads(data)
        post_text = data.get('postText')

        post = self._feed_model.create_post(user_id=user_id,
                                            post_text=post_text)

        if post:
            ok = {
                    'msg': 'Criado com sucesso',
                    'id_user': post[0]['id_user'],
                    'name': post[0]['name'],
                    'username': post[0]['username'],
                    'avatar': post[0]['avatar'],
                    'createdAt': post[0]['created_at_f']
                }
            self.REQUEST.response.setStatus(200)
            return json.dumps(ok)
