<dtml-if "action == 'toggle_on'">
	INSERT INTO likes (
		id_post,
		id_user
	) 
	VALUES (
		<dtml-sqlvar post_id type="int">,
		<dtml-sqlvar user_id type="int">
	)
	RETURNING 1
<dtml-elif "action == 'toggle_off'">
	DELETE FROM
		likes
	WHERE
		id_like = <dtml-sqlvar like_id type="int">
<dtml-else>
</dtml-if>