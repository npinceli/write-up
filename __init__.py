import writeconfig


def initialize(context):
    """Initialize the product"""
    context.registerClass(
        writeconfig.Write,
        constructors=(
            # Displays a form to enter instance data when a product is added.
            writeconfig.manage_add_write_form,
            writeconfig.manage_add_write,
        )
    )
