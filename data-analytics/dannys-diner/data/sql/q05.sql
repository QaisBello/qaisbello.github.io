-- Which item was most popular for each customer?
WITH counts AS (
  SELECT s.customer_id, m.product_name, COUNT(*) AS orders,
         RANK() OVER (PARTITION BY s.customer_id ORDER BY COUNT(*) DESC) AS rnk
  FROM sales s
  JOIN menu m ON m.product_id = s.product_id
  GROUP BY s.customer_id, m.product_name
)
SELECT customer_id, product_name, orders
FROM counts
WHERE rnk = 1
ORDER BY customer_id, product_name;
