SELECT 
    COALESCE(
        (SELECT 
            1 
        FROM 
            users 
        WHERE 
            username = <dtml-sqlvar user type="string">), 
        0) AS results;