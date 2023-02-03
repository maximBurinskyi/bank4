
create TABLE account (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    balance INTEGER
);

create TABLE transactions (
    id SERIAL PRIMARY KEY,
    amount INTEGER,
    purpose VARCHAR(255),
    account_id INTEGER,
    FOREIGN KEY (account_id) REFERENCES account (id)
);


create TABLE transactions2 (
    id SERIAL PRIMARY KEY,
    amount INTEGER,
    account_id INTEGER,
    FOREIGN KEY (account_id) REFERENCES account (id)
);