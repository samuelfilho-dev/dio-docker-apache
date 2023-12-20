DROP TABLE IF EXISTS "products";
DROP SEQUENCE IF EXISTS produtos_id_seq;
CREATE SEQUENCE produtos_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 START 4 CACHE 1;

CREATE TABLE "public"."products" (
    "id" integer DEFAULT nextval('produtos_id_seq') NOT NULL,
    "name" character varying(255) NOT NULL,
    "price" numeric(10,2) NOT NULL,
    "description" text NOT NULL,
    CONSTRAINT "produtos_pkey" PRIMARY KEY ("id")
) WITH (oids = false);


DROP TABLE IF EXISTS "users";
DROP SEQUENCE IF EXISTS users_id_seq;
CREATE SEQUENCE users_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 START 11 CACHE 1;

CREATE TABLE "public"."users" (
    "id" integer DEFAULT nextval('users_id_seq') NOT NULL,
    "first_name" character varying(50) NOT NULL,
    "last_name" character varying(50) NOT NULL,
    "username" character varying(50) NOT NULL,
    "password" character varying(255) NOT NULL,
    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
) WITH (oids = false);
