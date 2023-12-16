DROP TABLE IF EXISTS activity;

CREATE TABLE IF NOT EXISTS activity (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title varchar(255) NOT NULL,
    type varchar(255) NOT NULL,
    amount int(11) NOT NULL,
    date datetime NOT NULL,
    label varchar(255) NOT NULL
);
