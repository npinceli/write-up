DELETE FROM
    followers
WHERE
    follower_id = <dtml-sqlvar user_id type="int"> AND
    following_id = <dtml-sqlvar unfollowing_id type="int">