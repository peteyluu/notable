DROP TABLE IF EXISTS doctors;

CREATE TABLE doctors (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT localtimestamp,
  modified_at TIMESTAMP NOT NULL DEFAULT localtimestamp
);

INSERT INTO doctors (first_name, last_name) VALUES ('Michelle', 'Benoit');
