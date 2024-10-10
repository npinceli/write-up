from OFS import SimpleItem
from Globals import DTMLFile
from Products.writeup.controllers.write import WriteUp


class Write(SimpleItem.SimpleItem):
    """Root class to initialize the product."""
    meta_type = 'Write'

    write = WriteUp()

    def __init__(self, id, connection):
        """Initialize the instance with an ID and database connection."""
        self.id = id
        self.connection = connection

    def get_database_connection(self):
        """Retrieve the database connection."""
        return self.connection


def manage_add_write(self, id, connection):
    """Create an instance of the product."""
    conn = getattr(self, connection)
    self._setObject(id, Write(id, conn))


manage_add_write_form = DTMLFile('config/add_write_form', globals())
