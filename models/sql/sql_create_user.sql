INSERT INTO users (
                name,
                username,
                password
            )
VALUES (<dtml-sqlvar name type="string">, <dtml-sqlvar user type="string">, <dtml-sqlvar password type="string">)