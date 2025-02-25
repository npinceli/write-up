INSERT INTO likes (
	id_post,
	id_user
) 
VALUES (
	<dtml-sqlvar post_id type="int">,
	<dtml-sqlvar user_id type="int">
)
RETURNING 1