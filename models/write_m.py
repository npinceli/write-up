from OFS import SimpleItem
from Products.ZSQLMethods.SQL import SQL
from Globals import package_home
import os
global product_path
product_path = os.path.join(package_home(globals())) + '/'


class WriteM(SimpleItem.SimpleItem):
    """Main model."""
    def create_user(self, name, user, genre, password, avatar):
        """."""
        return self._sql_create_user(
            name=name, user=user, genre=genre, password=password,
            avatar=avatar)

    def search_user(self, user):
        """."""
        return self._sql_select_user(user=user)

    _sql_create_user = SQL(
        id='zsql_create_user', title='', connection_id='connection',
        arguments='name\nuser\ngenre\npassword\navatar', template=open(
            product_path + 'sql/sql_create_user.sql').read()
    )

    _sql_select_user = SQL(
        id='zsql_select_user', title='', connection_id='connection',
        arguments='user', template=open(
            product_path + 'sql/sql_select_user.sql').read()
    )
