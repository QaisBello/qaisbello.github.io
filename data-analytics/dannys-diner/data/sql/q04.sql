-- What is the most purchased item, and how many times was it bought?
SELECT m.product_name, COUNT(*) AS times_purchased
FROM sales s
JOIN menu m ON m.product_id = s.product_id
GROUP BY m.product_name
ORDER BY times_purchased DESC
LIMIT 1;
