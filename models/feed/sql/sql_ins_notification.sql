INSERT INTO notifications (
	notified_id,
	notifier_id,
	message,
	notification_type
	<dtml-if post_id>
		,post_id
	</dtml-if>
)
VALUES (
	<dtml-sqlvar notified_id type="int">,
	<dtml-sqlvar notifier_id type="int">,
	<dtml-sqlvar message type="string">,
	<dtml-sqlvar notification_type type="int">
	<dtml-if post_id>
			,<dtml-sqlvar post_id type="int">
	</dtml-if>
)