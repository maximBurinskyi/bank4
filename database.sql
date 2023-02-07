
create TABLE account (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    balance INTEGER,
    bank_id INTEGER,
    FOREIGN KEY (bank_id) REFERENCES bank (id)
);


create TABLE transactions (
    id SERIAL PRIMARY KEY,
    amount INTEGER,
    account_id INTEGER,
    type VARCHAR(255),
    FOREIGN KEY (account_id) REFERENCES account (id)
);

create TABLE transactions3 (
    id SERIAL PRIMARY KEY,
    date TIMESTAMP WITH TIME ZONE,
    amount INTEGER,
    account_id INTEGER,
    category_id INTEGER,
    type VARCHAR(255),
    FOREIGN KEY (account_id) REFERENCES account (id),
    FOREIGN KEY (category_id) REFERENCES category (id)
);

create TABLE bank (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255)
);

create TABLE category (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255)
);



SELECT c.name, t.date, s.sum_transactions
FROM category AS c
JOIN (SELECT SUM(amount) AS sum_transactions, category_id FROM transactions3 GROUP BY category_id) AS s
ON c.id = s.category_id
JOIN transactions3 AS t
ON c.id = t.category_id