-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2024-01-20 16:31:16.101

-- tables
-- Table: Users
CREATE TABLE Users (
    userId integer NOT NULL CONSTRAINT Users_pk PRIMARY KEY,
    username varchar(50) NOT NULL,
    password varchar(50) NOT NULL,
    email varchar(50) NOT NULL,
    role varchar(50) NOT NULL
);

-- Table: cart
CREATE TABLE cart (
    Users_userId integer NOT NULL CONSTRAINT cart_pk PRIMARY KEY,
    CONSTRAINT cart_Users FOREIGN KEY (Users_userId)
    REFERENCES Users (userId)
);

-- Table: description
CREATE TABLE description (
    descId integer NOT NULL CONSTRAINT description_pk PRIMARY KEY,
    "desc" varchar(300) NOT NULL,
    product_prodId integer NOT NULL,
    CONSTRAINT description_product FOREIGN KEY (product_prodId)
    REFERENCES product (prodId)
);

-- Table: order
CREATE TABLE "order" (
    orderID integer NOT NULL CONSTRAINT order_pk PRIMARY KEY,
    Users_userId integer NOT NULL,
    CONSTRAINT order_Users FOREIGN KEY (Users_userId)
    REFERENCES Users (userId)
);

-- Table: orderProd
CREATE TABLE orderProd (
    id integer NOT NULL CONSTRAINT orderProd_pk PRIMARY KEY,
    amount integer NOT NULL,
    order_orderID integer NOT NULL,
    product_prodId integer NOT NULL,
    CONSTRAINT orderProd_order FOREIGN KEY (order_orderID)
    REFERENCES "order" (orderID),
    CONSTRAINT orderProd_product FOREIGN KEY (product_prodId)
    REFERENCES product (prodId)
);

-- Table: prodInCart
CREATE TABLE prodInCart (
    id integer NOT NULL CONSTRAINT prodInCart_pk PRIMARY KEY,
    amount integer NOT NULL,
    product_prodId integer NOT NULL,
    cart_Users_userId integer NOT NULL,
    CONSTRAINT prodInCart_product FOREIGN KEY (product_prodId)
    REFERENCES product (prodId),
    CONSTRAINT prodInCart_cart FOREIGN KEY (cart_Users_userId)
    REFERENCES cart (Users_userId)
);

-- Table: product
CREATE TABLE product (
    prodId integer NOT NULL CONSTRAINT product_pk PRIMARY KEY,
    name varchar(50) NOT NULL,
    price decimal(10,2) NOT NULL
);

-- End of file.

