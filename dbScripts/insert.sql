-- Insert sample data into Users table
INSERT INTO Users (userId, username, password, email, role)
VALUES
  (1, 'john_doe', 'password123', 'john.doe@example.com', 'customer'),
  (2, 'jane_smith', 'pass456', 'jane.smith@example.com', 'customer'),
  (3, 'admin_user', 'admin_pass', 'admin@example.com', 'admin');

-- Insert sample data into product table
INSERT INTO product (prodId, name, shortDesc, price)
VALUES
  (1, 'Gaming Laptop', 'Powerful laptop for an immersive gaming experience', 1200.00),
  (2, 'Mechanical Keyboard', 'RGB mechanical keyboard with customizable lighting', 99.99),
  (3, 'Gaming Mouse', 'Precision gaming mouse with adjustable DPI settings', 49.99),
  (4, 'Graphics Card', 'High-performance graphics card for advanced gaming', 499.99),
  (5, 'Gaming Headset', 'Immersive gaming headset with surround sound', 79.99);

-- Insert sample data into cart table
INSERT INTO cart (Users_userId) VALUES (1);

-- Insert sample data into description table
INSERT INTO description (descId, "desc", product_prodId)
VALUES
  (1, 'Experience the power of this gaming laptop with a high-end graphics card, delivering seamless performance for your favorite games.', 1),
  (2, 'Enhance your gaming setup with this RGB mechanical keyboard, featuring customizable lighting options for a personalized gaming experience.', 2),
  (3, 'Achieve precision in your gameplay with this gaming mouse, equipped with adjustable DPI settings to suit your gaming style.', 3),
  (4, 'Upgrade your gaming rig with this high-performance graphics card, ensuring smooth graphics and optimal gaming performance.', 4),
  (5, 'Immerse yourself in the gaming world with this high-quality headset, delivering crystal-clear audio and surround sound for a lifelike experience.', 5),
  (6, 'Take your gaming to the next level with this advanced gaming laptop, offering unparalleled graphics and processing power.', 1),
  (7, 'Elevate your typing experience with this mechanical keyboard, featuring responsive keys and a sleek design for both work and play.', 2),
  (8, 'Dominate the battlefield with this gaming mouse, designed for precision and speed to give you the competitive edge.', 3),
  (9, 'Unleash the full potential of your gaming PC with this cutting-edge graphics card, delivering stunning visuals and realistic gameplay.', 4),
  (10, 'Experience immersive soundscapes with this gaming headset, providing clear communication and deep bass for an immersive gaming experience.', 5);

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
