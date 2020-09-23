DROP TABLE IF EXISTS patients;

CREATE TABLE patients (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT localtimestamp,
  modified_at TIMESTAMP NOT NULL DEFAULT localtimestamp
);

INSERT INTO patients (first_name, last_name) VALUES ('Peter', 'Luu');
INSERT INTO patients (first_name, last_name) VALUES ('Richard', 'Williams');
INSERT INTO patients (first_name, last_name) VALUES ('John', 'Brown');
