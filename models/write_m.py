from OFS import SimpleItem
from Products.ZSQLMethods.SQL import SQL
from Globals import package_home
import os
global product_path
product_path = os.path.join(package_home(globals())) + '/'


class WriteM(SimpleItem.SimpleItem):
    """Main model."""

    def __init__(self, id, connection=None):
        """."""
        self.id = id
        if connection:
            self.connection = connection

    def create_user(self, name, user, password):
        """."""
        return self._sql_create_user(
            name=name, user=user, password=password)

    def search_user(self, user):
        """."""
        return self._sql_search_user(user=user)

    def search_user_info(self, user_id=None, user=None):
        """."""
        return self._sql_sel_user_info(user_id=user_id, user=user)

    _sql_create_user = SQL(
        id='zsql_create_user', title='', connection_id='connection',
        arguments='name\nuser\npassword', template=open(
            product_path + 'sql/sql_create_user.sql').read()
    )

    _sql_search_user = SQL(
        id='zsql_search_user', title='', connection_id='connection',
        arguments='user', template=open(
            product_path + 'sql/sql_search_user.sql').read()
    )

    _sql_sel_user_info = SQL(
        id='zsql_sel_user_info', title='', connection_id='connection',
        arguments='user_id\nuser', template=open(
            product_path + 'sql/sql_sel_user_info.sql').read()
    )
