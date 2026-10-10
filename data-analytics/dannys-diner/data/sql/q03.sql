-- What was the first item each customer bought?
WITH ranked AS (
  SELECT s.customer_id, s.order_date, m.product_name,
         DENSE_RANK() OVER (PARTITION BY s.customer_id ORDER BY s.order_date) AS rnk
  FROM sales s
  JOIN menu m ON m.product_id = s.product_id
)
SELECT DISTINCT customer_id, product_name
FROM ranked
WHERE rnk = 1
ORDER BY customer_id, product_name;
