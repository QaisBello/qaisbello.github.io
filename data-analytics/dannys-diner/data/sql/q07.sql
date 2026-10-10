-- Which item did each member buy just before joining?
WITH before_join AS (
  SELECT s.customer_id, s.order_date, m.product_name,
         RANK() OVER (PARTITION BY s.customer_id ORDER BY s.order_date DESC) AS rnk
  FROM sales s
  JOIN members mb ON mb.customer_id = s.customer_id
  JOIN menu m ON m.product_id = s.product_id
  WHERE s.order_date < mb.join_date
)
SELECT customer_id, order_date, product_name
FROM before_join
WHERE rnk = 1
ORDER BY customer_id, product_name;
