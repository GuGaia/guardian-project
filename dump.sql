-- Criação das tabelas

CREATE TABLE client (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(254) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    default_message TEXT,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    have_plus BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE communication_channel (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE contact (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    client_id INTEGER NOT NULL REFERENCES client(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    plataform VARCHAR(20) NOT NULL,
    relationship VARCHAR(50) NOT NULL,
    channel_id INTEGER NOT NULL REFERENCES communication_channel(id) ON DELETE CASCADE
);

-- Inserção de canais de comunicação
INSERT INTO communication_channel (name) VALUES ('WhatsApp');
INSERT INTO communication_channel (name) VALUES ('Email');
INSERT INTO communication_channel (name) VALUES ('Telegram');

-- Inserção de clientes
INSERT INTO client (name, email, password, default_message, active, have_plus)
VALUES 
('João Silva', 'joao@example.com', 'hashed_password_1', 'Olá, posso te ajudar?', 1, 0),
('Maria Souza', 'maria@example.com', 'hashed_password_2', 'Bom dia, tudo bem?', 1, 1);

-- Inserção de contatos para João Silva (id=1)
INSERT INTO contact (client_id, name, phone_number, plataform, relationship, channel_id)
VALUES 
(1, 'Carlos Oliveira', '+5511999999999', 'Mobile', 'Amigo', 1),
(1, 'Ana Costa', '+5511988888888', 'Web', 'Cliente', 2);

-- Inserção de contatos para Maria Souza (id=2)
INSERT INTO contact (client_id, name, phone_number, plataform, relationship, channel_id)
VALUES 
(2, 'Pedro Lima', '+5511977777777', 'Mobile', 'Colega', 3),
(2, 'Fernanda Torres', '+5511966666666', 'Web', 'Parente', 1);
