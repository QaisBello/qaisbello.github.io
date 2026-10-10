-- Which item did each member buy first after joining?
WITH after_join AS (
  SELECT s.customer_id, s.order_date, m.product_name,
         RANK() OVER (PARTITION BY s.customer_id ORDER BY s.order_date) AS rnk
  FROM sales s
  JOIN members mb ON mb.customer_id = s.customer_id
  JOIN menu m ON m.product_id = s.product_id
  WHERE s.order_date >= mb.join_date   -- join day counts as 'after joining'
)
SELECT customer_id, order_date, product_name
FROM after_join
WHERE rnk = 1
ORDER BY customer_id;
