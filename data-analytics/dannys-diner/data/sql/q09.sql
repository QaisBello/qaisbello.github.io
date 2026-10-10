-- With $1 = 10 points and 2x points on sushi, how many points does each customer have?
SELECT s.customer_id,
       SUM(m.price * 10 * CASE WHEN m.product_name = 'sushi' THEN 2 ELSE 1 END) AS points
FROM sales s
JOIN menu m ON m.product_id = s.product_id
GROUP BY s.customer_id
ORDER BY s.customer_id;
