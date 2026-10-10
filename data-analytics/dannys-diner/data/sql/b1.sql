-- Bonus: join everything into one table with a member flag.
SELECT s.customer_id, s.order_date, m.product_name, m.price,
       CASE WHEN mb.join_date IS NOT NULL AND s.order_date >= mb.join_date THEN 'Y' ELSE 'N' END AS member
FROM sales s
JOIN menu m ON m.product_id = s.product_id
LEFT JOIN members mb ON mb.customer_id = s.customer_id
ORDER BY s.customer_id, s.order_date, m.product_name;
