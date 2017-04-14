CREATE TABLE room (room_id int NOT NULL PRIMARY KEY auto_increment, name varchar(50), width int, height int);
INSERT INTO room VALUES (DEFAULT, "Dining Room", 20, 20);
INSERT INTO room VALUES (DEFAULT, "Living Room", 30, 25);
SELECT * FROM room;

CREATE TABLE furniture (furniture_id int NOT NULL PRIMARY KEY auto_increment, name varchar(50), width int, height int);
INSERT INTO furniture VALUES (DEFAULT, "Dining Table", 3, 7);
INSERT INTO furniture VALUES (DEFAULT, "Dining Chair", 2, 2);
SELECT * FROM furniture;

CREATE TABLE furniture_placement (placement_id int NOT NULL PRIMARY KEY auto_increment, furniture_id int, x_pos int, y_pos int, rotation int);
INSERT INTO furniture_placement VALUES (DEFAULT, 1, 5, 5, 0);
INSERT INTO furniture_placement VALUES (DEFAULT, 2, 1, 1, 45);
SELECT * FROM furniture_placement;

CREATE TABLE layout (layout_id int NOT NULL PRIMARY KEY auto_increment, name varchar(50), room_id int, placement_id int);
INSERT INTO layout VALUES (DEFAULT, "Dining Room 1", 1, 1);
INSERT INTO layout VALUES (DEFAULT, "Dining Room 1", 1, 2);
SELECT * FROM layout;

SELECT r.name, r.height, r.width FROM room r; 


