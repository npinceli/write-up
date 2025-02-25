from OFS import SimpleItem
from Products.ZSQLMethods.SQL import SQL
from Globals import package_home
import os
global product_path
product_path = os.path.join(package_home(globals())) + '/'


class FeedM(SimpleItem.SimpleItem):
    """Feed Model,"""

    def search_suggestions(self, user_id):
        """Returns 5 random users"""
        return self._sql_search_suggestions(user_id=user_id)

    def follow_user(self, user_id, following_id):
        """."""
        self._sql_insert_follower(user_id=user_id,
                                  following_id=following_id)

    def unfollow_user(self, user_id, unfollowing_id):
        """."""
        self._sql_del_follower(user_id=user_id, unfollowing_id=unfollowing_id)

    def create_post(self, user_id, post_text):
        """."""
        return self._sql_ins_post(user_id=user_id, post_text=post_text)

    def post_list(self):
        """."""
        return self._sql_sel_posts()

    def like_post(self, post_id, user_id):
        """."""
        return self._sql_ins_like_post(post_id=post_id, user_id=user_id)

    def get_user_info(self, user_id):
        """."""
        return self._sql_sel_user_info(user_id=user_id)

    def ins_notification(self, notifier_id, notified_id, type, message,
                         post_id=None):
        """."""
        return self._sql_ins_notification(notifier_id=notifier_id,
                                          notified_id=notified_id, 
                                          message=message, type=type,
                                          post_id=post_id)

    _sql_search_suggestions = SQL(
        id='zsql_search_suggestions', title='', connection_id='connection',
        arguments='user_id', template=open(
            product_path + 'sql/sql_search_suggestions.sql').read()
    )

    _sql_insert_follower = SQL(
        id='zsql_insert_follower', title='', connection_id='connection',
        arguments='user_id\nfollowing_id', template=open(
            product_path + 'sql/sql_insert_follower.sql').read()
    )

    _sql_del_follower = SQL(
        id='zsql_del_follower', title='', connection_id='connection',
        arguments='user_id\nunfollowing_id', template=open(
            product_path + 'sql/sql_del_follower.sql').read()
    )

    _sql_ins_post = SQL(
        id='zsql_ins_post', title='', connection_id='connection',
        arguments='user_id\npost_text', template=open(
            product_path + 'sql/sql_ins_post.sql').read()
    )

    _sql_sel_posts = SQL(
        id='zsql_sel_posts', title='', connection_id='connection',
        arguments='', template=open(
            product_path + 'sql/sql_sel_posts.sql').read()
    )

    _sql_ins_like_post = SQL(
        id='zsql_ins_like_post', title='', connection_id='connection',
        arguments='post_id\nuser_id', template=open(
            product_path + 'sql/sql_ins_like_post.sql').read()
    )

    _sql_sel_user_info = SQL(
        id='zsql_sel_user_info', title='', connection_id='connection',
        arguments='user_id', template=open(
            product_path + 'sql/sql_sel_user_info.sql').read()
    )

    _sql_ins_notification = SQL(
        id='zsql_ins_notification', title='', connection_id='connection',
        arguments='notifier_id\nnotified_id\ntype\nmessage\nmessage',
        template=open(
            product_path + 'sql/sql_ins_notification.sql').read()
    )

    _sql_sel_post_info = SQL(
        id='zsql_sel_post_info', title='', connection_id='connection',
        arguments='post_id', template=open(
            product_path + 'sql/sql_sel_post_info.sql').read()
    )
