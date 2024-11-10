WITH inserted_post AS (
    INSERT INTO post (
        id_user,
        post_text
    ) 
    VALUES (
        <dtml-sqlvar user_id type="int">,
        <dtml-sqlvar post_text type="string">
    )
    RETURNING id_user, created_at
)
SELECT 
    inserted_post.id_user,
    TO_CHAR(inserted_post.created_at, 'DD/MM/YYYY HH24:MI') AS created_at_f,
    users.name,
    users.username,
    users.avatar
FROM 
    inserted_post
JOIN users ON users.id = inserted_post.id_user;
