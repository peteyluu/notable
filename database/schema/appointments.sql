DROP TABLE IF EXISTS appointments;

CREATE TABLE appointments (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  date_time TIMESTAMP NOT NULL,
  kind VARCHAR(255) NOT NULL CHECK (kind = 'New Patient' OR kind = 'Follow-up'),
  created_at TIMESTAMP NOT NULL DEFAULT localtimestamp,
  modified_at TIMESTAMP NOT NULL DEFAULT localtimestamp,
  patient_id BIGINT NOT NULL REFERENCES patients (id),
  doctor_id BIGINT NOT NULL REFERENCES doctors (id)
);

INSERT INTO appointments (date_time, kind, patient_id, doctor_id) VALUES ('2020-09-23 14:30:00-07', 'New Patient', 1, 1);
INSERT INTO appointments (date_time, kind, patient_id, doctor_id) VALUES ('2020-09-23 14:30:00-07', 'New Patient', 2, 1);
INSERT INTO appointments (date_time, kind, patient_id, doctor_id) VALUES ('2020-09-23 14:30:00-07', 'Follow-up', 3, 1);
