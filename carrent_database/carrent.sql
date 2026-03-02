--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5
-- Dumped by pg_dump version 17.5

-- Started on 2026-03-02 17:44:35

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 6 (class 2615 OID 16384)
-- Name: carrent; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA carrent;


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 219 (class 1259 OID 16386)
-- Name: carrent_users; Type: TABLE; Schema: carrent; Owner: -
--

CREATE TABLE carrent.carrent_users (
    user_id integer NOT NULL,
    username character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    full_name character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    phone character varying(10) NOT NULL,
    users_role character varying(20) DEFAULT 'customer'::character varying,
    is_active boolean DEFAULT true,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);


--
-- TOC entry 218 (class 1259 OID 16385)
-- Name: carrent_users_user_id_seq; Type: SEQUENCE; Schema: carrent; Owner: -
--

ALTER TABLE carrent.carrent_users ALTER COLUMN user_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME carrent.carrent_users_user_id_seq
    START WITH 10000
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 221 (class 1259 OID 16402)
-- Name: cars; Type: TABLE; Schema: carrent; Owner: -
--

CREATE TABLE carrent.cars (
    cars_id integer NOT NULL,
    brand character varying(50) NOT NULL,
    model character varying(50) NOT NULL,
    license_plate character varying(20) NOT NULL,
    year integer,
    price_per_day numeric(10,2),
    price_per_week numeric(10,2),
    status character varying(20) DEFAULT 'available'::character varying,
    image_url text
);


--
-- TOC entry 220 (class 1259 OID 16401)
-- Name: cars_cars_id_seq; Type: SEQUENCE; Schema: carrent; Owner: -
--

CREATE SEQUENCE carrent.cars_cars_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4930 (class 0 OID 0)
-- Dependencies: 220
-- Name: cars_cars_id_seq; Type: SEQUENCE OWNED BY; Schema: carrent; Owner: -
--

ALTER SEQUENCE carrent.cars_cars_id_seq OWNED BY carrent.cars.cars_id;


--
-- TOC entry 223 (class 1259 OID 16414)
-- Name: rentals; Type: TABLE; Schema: carrent; Owner: -
--

CREATE TABLE carrent.rentals (
    rentals_id integer NOT NULL,
    user_id integer NOT NULL,
    cars_id integer NOT NULL,
    start_date date NOT NULL,
    end_date date NOT NULL,
    total_price numeric(10,2) NOT NULL,
    status character varying(20) DEFAULT 'completed'::character varying,
    created_at timestamp without time zone DEFAULT now(),
    rental_type character varying(20),
    CONSTRAINT rentals_check CHECK ((end_date > start_date)),
    CONSTRAINT rentals_status_check CHECK (((status)::text = ANY ((ARRAY['pending'::character varying, 'confirmed'::character varying, 'completed'::character varying, 'cancelled'::character varying])::text[])))
);


--
-- TOC entry 222 (class 1259 OID 16413)
-- Name: rentals_rentals_id_seq; Type: SEQUENCE; Schema: carrent; Owner: -
--

CREATE SEQUENCE carrent.rentals_rentals_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4931 (class 0 OID 0)
-- Dependencies: 222
-- Name: rentals_rentals_id_seq; Type: SEQUENCE OWNED BY; Schema: carrent; Owner: -
--

ALTER SEQUENCE carrent.rentals_rentals_id_seq OWNED BY carrent.rentals.rentals_id;


--
-- TOC entry 4757 (class 2604 OID 16405)
-- Name: cars cars_id; Type: DEFAULT; Schema: carrent; Owner: -
--

ALTER TABLE ONLY carrent.cars ALTER COLUMN cars_id SET DEFAULT nextval('carrent.cars_cars_id_seq'::regclass);


--
-- TOC entry 4759 (class 2604 OID 16417)
-- Name: rentals rentals_id; Type: DEFAULT; Schema: carrent; Owner: -
--

ALTER TABLE ONLY carrent.rentals ALTER COLUMN rentals_id SET DEFAULT nextval('carrent.rentals_rentals_id_seq'::regclass);


--
-- TOC entry 4765 (class 2606 OID 16400)
-- Name: carrent_users carrent_users_email_key; Type: CONSTRAINT; Schema: carrent; Owner: -
--

ALTER TABLE ONLY carrent.carrent_users
    ADD CONSTRAINT carrent_users_email_key UNIQUE (email);


--
-- TOC entry 4767 (class 2606 OID 16396)
-- Name: carrent_users carrent_users_pkey; Type: CONSTRAINT; Schema: carrent; Owner: -
--

ALTER TABLE ONLY carrent.carrent_users
    ADD CONSTRAINT carrent_users_pkey PRIMARY KEY (user_id);


--
-- TOC entry 4769 (class 2606 OID 16398)
-- Name: carrent_users carrent_users_username_key; Type: CONSTRAINT; Schema: carrent; Owner: -
--

ALTER TABLE ONLY carrent.carrent_users
    ADD CONSTRAINT carrent_users_username_key UNIQUE (username);


--
-- TOC entry 4771 (class 2606 OID 16412)
-- Name: cars cars_license_plate_key; Type: CONSTRAINT; Schema: carrent; Owner: -
--

ALTER TABLE ONLY carrent.cars
    ADD CONSTRAINT cars_license_plate_key UNIQUE (license_plate);


--
-- TOC entry 4773 (class 2606 OID 16410)
-- Name: cars cars_pkey; Type: CONSTRAINT; Schema: carrent; Owner: -
--

ALTER TABLE ONLY carrent.cars
    ADD CONSTRAINT cars_pkey PRIMARY KEY (cars_id);


--
-- TOC entry 4775 (class 2606 OID 16423)
-- Name: rentals rentals_pkey; Type: CONSTRAINT; Schema: carrent; Owner: -
--

ALTER TABLE ONLY carrent.rentals
    ADD CONSTRAINT rentals_pkey PRIMARY KEY (rentals_id);


--
-- TOC entry 4777 (class 2606 OID 16425)
-- Name: rentals rentals_user_id_cars_id_start_date_end_date_key; Type: CONSTRAINT; Schema: carrent; Owner: -
--

ALTER TABLE ONLY carrent.rentals
    ADD CONSTRAINT rentals_user_id_cars_id_start_date_end_date_key UNIQUE (user_id, cars_id, start_date, end_date);


--
-- TOC entry 4778 (class 2606 OID 16431)
-- Name: rentals rentals_cars_id_fkey; Type: FK CONSTRAINT; Schema: carrent; Owner: -
--

ALTER TABLE ONLY carrent.rentals
    ADD CONSTRAINT rentals_cars_id_fkey FOREIGN KEY (cars_id) REFERENCES carrent.cars(cars_id);


--
-- TOC entry 4779 (class 2606 OID 16426)
-- Name: rentals rentals_user_id_fkey; Type: FK CONSTRAINT; Schema: carrent; Owner: -
--

ALTER TABLE ONLY carrent.rentals
    ADD CONSTRAINT rentals_user_id_fkey FOREIGN KEY (user_id) REFERENCES carrent.carrent_users(user_id);


-- Completed on 2026-03-02 17:44:35

--
-- PostgreSQL database dump complete
--

