-- What is the total amount each customer spent?
SELECT s.customer_id, SUM(m.price) AS total_spent
FROM sales s
JOIN menu m ON m.product_id = s.product_id
GROUP BY s.customer_id
ORDER BY s.customer_id;
