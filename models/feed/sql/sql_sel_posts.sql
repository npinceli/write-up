SELECT
    p.id_user,
    p.id_post,
    p.post_text,
    TO_CHAR(p.created_at, 'DD/MM/YYYY HH24:MI') AS created_at_f,
    u.name,
    u.username,
    u.avatar
FROM 
    post p
    INNER JOIN users u ON u.id = p.id_user
ORDER BY
    created_at DESC