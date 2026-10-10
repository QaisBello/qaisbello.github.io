-- How many items, and how much, did each member spend before joining?
SELECT s.customer_id, COUNT(*) AS items, SUM(m.price) AS spent
FROM sales s
JOIN members mb ON mb.customer_id = s.customer_id
JOIN menu m ON m.product_id = s.product_id
WHERE s.order_date < mb.join_date
GROUP BY s.customer_id
ORDER BY s.customer_id;
