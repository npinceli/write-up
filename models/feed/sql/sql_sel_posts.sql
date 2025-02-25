SELECT
    p.id_user,
    p.id_post,
    p.post_text,
    TO_CHAR(p.created_at, 'DD/MM/YYYY HH24:MI') AS created_at_f,
    u.name,
    u.username,
    u.avatar,
    COUNT(l.id_like) AS num_likes
FROM 
    post p
    INNER JOIN users u ON u.id = p.id_user
    LEFT JOIN likes l ON l.id_post = p.id_post
GROUP BY
    p.id_post, p.id_user, p.post_text, p.created_at, u.name, u.username, u.avatar
ORDER BY
    p.created_at DESC