-- Insert sample data into Users table
INSERT INTO Users (userId, username, password, email, role)
VALUES
  (1, 'john_doe', 'password123', 'john.doe@example.com', 'customer'),
  (2, 'jane_smith', 'pass456', 'jane.smith@example.com', 'customer'),
  (3, 'admin_user', 'admin_pass', 'admin@example.com', 'admin');

-- Insert sample data into product table
INSERT INTO product (prodId, name, price)
VALUES
  (1, 'Gaming Laptop', 1200.00),
  (2, 'Mechanical Gaming Keyboard', 99.99),
  (3, 'Gaming Mouse', 49.99),
  (4, 'High-Performance Graphics Card', 499.99),
  (5, 'Gaming Headset', 79.99);

-- Insert sample data into cart table
INSERT INTO cart (Users_userId) VALUES (1);

-- Insert sample data into description table
INSERT INTO description (descId, "desc", product_prodId)
VALUES
  (1, 'Powerful gaming laptop with high-end graphics card.', 1),
  (2, 'Mechanical keyboard with customizable RGB lighting.', 2),
  (3, 'Precision gaming mouse with adjustable DPI settings.', 3),
  (4, 'Upgrade your gaming rig with this graphics card for superior performance.', 4),
  (5, 'Immersive gaming experience with this high-quality headset.', 5);

-- Insert sample data into "order" table
INSERT INTO "order" (orderID, Users_userId) VALUES (1, 2);

-- Insert sample data into orderProd table
INSERT INTO orderProd (id, amount, order_orderID, product_prodId)
VALUES
  (1, 2, 1, 1),
  (2, 1, 1, 3),
  (3, 3, 2, 2),
  (4, 1, 2, 5);

-- Insert sample data into prodInCart table
INSERT INTO prodInCart (id, amount, product_prodId, cart_Users_userId)
VALUES
  (1, 2, 3, 1),
  (2, 1, 2, 1);
