SELECT
    id,
    name,
    username,
    avatar
FROM
    users
WHERE
    id != <dtml-sqlvar user_id type="int">
ORDER BY RANDOM()
LIMIT 5