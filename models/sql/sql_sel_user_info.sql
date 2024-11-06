SELECT
    id,
    name,
    username,
    avatar,
    password
FROM 
    users
WHERE 
    <dtml-if user_id>
        id = <dtml-sqlvar user_id type="int">
    <dtml-else>
        username = <dtml-sqlvar user type="string">
    </dtml-if>