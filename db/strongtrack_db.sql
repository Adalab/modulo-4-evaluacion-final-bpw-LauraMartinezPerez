CREATE DATABASE IF NOT EXISTS strongtrack_db;
USE strongtrack_db;

CREATE TABLE usuarios (
	id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    hashed_password VARCHAR(255) NOT NULL
);

CREATE TABLE entrenamientos (
	id INT AUTO_INCREMENT PRIMARY KEY,
    fecha DATE NOT NULL,
    grupo_muscular VARCHAR(100) NOT NULL,
    equipamiento VARCHAR(255) NOT NULL,
    descripcion MEDIUMTEXT,
    series INT NOT NULL,
    repeticiones INT NOT NULL,
    tiempo_descanso TIME,
    fk_usuario INT NOT NULL,
    FOREIGN KEY (fk_usuario) REFERENCES usuarios(id)
);
ALTER TABLE entrenamientos
MODIFY COLUMN grupo_muscular VARCHAR(255) NOT NULL;

ALTER TABLE entrenamientos
MODIFY COLUMN fk_usuario INT;

INSERT INTO entrenamientos (fecha, grupo_muscular, equipamiento, descripcion, series, repeticiones, tiempo_descanso, fk_usuario)
VALUES
  ('2025-04-28', 'Pecho', 'Mancuernas, Banco plano', 'Press de banca con mancuernas', 4, 10, '00:00:30', NULL),
  ('2025-04-29', 'Espalda', 'Barra, Polea alta', 'Remo con barra y jalón al pecho', 4, 12, '00:00:30', NULL),
  ('2025-04-30', 'Piernas', 'Máquina de prensa, Mancuernas', 'Prensa de piernas y sentadillas', 4, 10, '00:01:30', NULL),
  ('2025-05-01', 'Hombros', 'Mancuernas, Máquina de hombros', 'Elevaciones laterales y press militar', 4, 12, '00:01:00', NULL);

SELECT * FROM entrenamientos;
SELECT * FROM entrenamientos WHERE id = 2;

INSERT INTO entrenamientos (fecha, grupo_muscular, equipamiento, descripcion, series, repeticiones, tiempo_descanso, fk_usuario)
VALUES
  ('2025-05-02', 'Brazos', 'Mancuernas', 'Curl de bíceps con mancuernas', 4, 12, '00:00:45', NULL);
  
UPDATE entrenamientos
SET fecha = '2025-05-03',
    grupo_muscular = 'Glúteo',
    equipamiento = 'Banco, Barra',
    descripcion = 'Hip thrust con barra',
    tiempo_descanso = '00:01:00'
WHERE id = 6;

DELETE FROM entrenamientos WHERE id = 7;