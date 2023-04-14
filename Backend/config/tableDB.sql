---BD
create database uptaskease;
use uptaskease;

-- Usuario

-- userID binary(16) NOT NULL DEFAULT(UUID_TO_BIN(UUID())),

create table
    usuario(
        userID VARCHAR(36) NOT NULL DEFAULT (UUID()),
        nombre VARCHAR(50) NOT NULL,
        password VARCHAR(70) NOT NULL,
        email VARCHAR(50) UNIQUE NOT NULL,
        token VARCHAR(255),
        confirmado BOOLEAN DEFAULT false,
        PRIMARY KEY (userID)
    );

-- Proyecto

-- proyectoID INT NOT NULL AUTO_INCREMENT,

CREATE TABLE
    proyecto (
        proyectoID VARCHAR(36) NOT NULL DEFAULT (UUID()),
        nombre VARCHAR(50) NOT NULL,
        descripcion VARCHAR(200) NOT NULL,
        fechaCreacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        fechaEntrega DATE DEFAULT (CURRENT_DATE),
        cliente VARCHAR(50) NOT NULL,
        creadorID VARCHAR(36),
        colaboradores VARCHAR(36),
        PRIMARY KEY (proyectoID),
        CONSTRAINT fk_usuario_id FOREIGN KEY (creadorID) REFERENCES usuario(userID)
    );

CREATE TABLE
    tarea (
        tareaID VARCHAR(36) NOT NULL DEFAULT (UUID()),
        nombre VARCHAR(50) NOT NULL,
        descripcion VARCHAR(50) NOT NULL,
        estado BOOLEAN DEFAULT FALSE,
        fechaCreacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        fechaEntrega DATE DEFAULT (CURRENT_DATE),
        prioridad VARCHAR(10) NOT NULL CHECK (
            prioridad IN ('baja', 'media', 'alta')
        ),
        proyectoID VARCHAR(36),
        PRIMARY KEY (tareaID),
        CONSTRAINT fk_Tarea_Proyecto_id FOREIGN KEY (proyectoID) REFERENCES proyecto(proyectoID)
    );
