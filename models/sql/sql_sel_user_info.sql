SELECT
    username,
    password
FROM 
    users
WHERE 
    username = <dtml-sqlvar user type="string">