-- Create a table for the production lines

CREATE TABLE production_lines (id SERIAL PRIMARY KEY,
                                                 name VARCHAR(255) NOT NULL);

-- Insert sample data into the production lines table

INSERT INTO production_lines (id, name)
VALUES (1,
        'Brewed Coffee'), (2,
                           'Iced Tea'), (3,
                                         'Souped Blueberry');

-- Create a table for the product items

CREATE TABLE product_items (id SERIAL PRIMARY KEY,
                                              name VARCHAR(255) NOT NULL,
                                                                production_line_id INTEGER REFERENCES production_lines(id),
                                                                                                      quantity INTEGER NOT NULL);

-- Create a table for the sales list

CREATE TABLE sales_list (id SERIAL PRIMARY KEY,
                                           product_item_id INTEGER REFERENCES product_items(id),
                                                                              production_line_id INTEGER REFERENCES production_lines(id),
                                                                                                                    quantity INTEGER NOT NULL);

-- Create a table for the production list

CREATE TABLE production_list (id SERIAL PRIMARY KEY,
                                                product_item_id INTEGER REFERENCES product_items(id),
                                                                                   production_line_id INTEGER REFERENCES production_lines(id),
                                                                                                                         quantity INTEGER NOT NULL);

-- Create a table for the in-production list

CREATE TABLE in_production_list (id SERIAL PRIMARY KEY,
                                                   product_item_id INTEGER REFERENCES product_items(id),
                                                                                      production_line_id INTEGER REFERENCES production_lines(id),
                                                                                                                            quantity INTEGER NOT NULL);

-- insert sales list items for production line 1

INSERT INTO sales_list (product_item_id, production_line_id, quantity)
SELECT product_items.id,
       production_lines.id, (floor(random() * 20000) + 10000)
FROM production_lines,
     product_items
WHERE production_lines.id = 1
        AND product_items.name IN ('Cappuccino',
                                   'Americano',
                                   'Espresso',
                                   'Double Espresso')
        AND product_items.production_line_id = production_lines.id;

-- insert sales list items for production line 2

INSERT INTO sales_list (product_item_id, production_line_id, quantity)
SELECT product_items.id,
       production_lines.id, (floor(random() * 20000) + 10000)
FROM production_lines,
     product_items
WHERE production_lines.id = 2
        AND product_items.name IN ('Peach',
                                   'Mango',
                                   'Mint',
                                   'Pineapple')
        AND product_items.production_line_id = production_lines.id;

-- insert sales list items for production line 3

INSERT INTO sales_list (product_item_id, production_line_id, quantity)
SELECT product_items.id,
       production_lines.id, (floor(random() * 20000) + 10000)
FROM production_lines,
     product_items
WHERE production_lines.id = 3
        AND product_items.name IN ('Licorice',
                                   'White Chocolate',
                                   'Salted Caramel',
                                   'Whip Cream')
        AND product_items.production_line_id = production_lines.id;

