SELECT
    u.id,
    u.name,
    u.username,
    u.avatar
FROM
    users u
WHERE
    u.id != <dtml-sqlvar user_id type="int">
    AND NOT EXISTS (
        SELECT 
            1
        FROM
            followers f1
        WHERE
            f1.following_id = u.id AND f1.follower_id = <dtml-sqlvar user_id type="int">
    )
ORDER BY RANDOM()
LIMIT 5