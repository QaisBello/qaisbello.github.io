-- With 2x points on everything in a member's first week, how many points do A and B have at the end of January?
SELECT s.customer_id,
       SUM(m.price * 10 *
           CASE
             WHEN s.order_date BETWEEN mb.join_date AND DATE(mb.join_date, '+6 days') THEN 2
             WHEN m.product_name = 'sushi' THEN 2
             ELSE 1
           END) AS points
FROM sales s
JOIN members mb ON mb.customer_id = s.customer_id
JOIN menu m ON m.product_id = s.product_id
WHERE s.order_date <= '2021-01-31'
GROUP BY s.customer_id
ORDER BY s.customer_id;
