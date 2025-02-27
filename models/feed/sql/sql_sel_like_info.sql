SELECT
	*
FROM
	likes
WHERE
	id_post = <dtml-sqlvar post_id type="int"> AND
	id_user = <dtml-sqlvar user_id type="int">