-- Bonus: rank each member's purchases (non-members get NULL).
WITH joined AS (
  SELECT s.customer_id, s.order_date, m.product_name, m.price,
         CASE WHEN mb.join_date IS NOT NULL AND s.order_date >= mb.join_date THEN 'Y' ELSE 'N' END AS member
  FROM sales s
  JOIN menu m ON m.product_id = s.product_id
  LEFT JOIN members mb ON mb.customer_id = s.customer_id
)
SELECT *,
       CASE WHEN member = 'Y'
            THEN RANK() OVER (PARTITION BY customer_id, member ORDER BY order_date) END AS ranking
FROM joined
ORDER BY customer_id, order_date, product_name;
