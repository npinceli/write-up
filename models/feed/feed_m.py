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

    _sql_search_suggestions = SQL(
        id='zsql_search_suggestions', title='', connection_id='connection',
        arguments='user_id', template=open(
            product_path + 'sql/sql_search_suggestions.sql').read()
    )
