CREATE TABLE IF NOT EXISTS bank (
    amount INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS cash (
    amount INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS expense (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title varchar(255) NOT NULL,
    amount int(11) NOT NULL,
    date datetime NOT NULL,
    label varchar(255) NOT NULL,
    account varchar(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS revenue (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title varchar(255) NOT NULL,
    amount int(11) NOT NULL,
    date datetime NOT NULL,
    label varchar(255) NOT NULL,
    account varchar(255) NOT NULL
);
