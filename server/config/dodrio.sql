--
-- PostgreSQL database dump
--

-- Dumped from database version 11.7 (Raspbian 11.7-0+deb10u1)
-- Dumped by pg_dump version 12.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

--
-- Name: 会话; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."会话" (
    sid text NOT NULL,
    "用户id" integer NOT NULL,
    "创建日期" time with time zone DEFAULT now() NOT NULL,
    "最近登录日期" timestamp(0) with time zone DEFAULT now()
);


--
-- Name: 用户; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."用户" (
    id integer NOT NULL,
    "账号" character varying(32) NOT NULL,
    "密码" text NOT NULL,
    "用户名" character varying(32),
    "电子邮箱" character varying(32) NOT NULL,
    "创建日期" time with time zone DEFAULT now() NOT NULL,
    CONSTRAINT "用户_密码_check" CHECK ((length("密码") > 8)),
    CONSTRAINT "用户_电子邮箱_check" CHECK ((regexp_match(("电子邮箱")::text, '\w+@\w+'::text) IS NOT NULL))
);


--
-- Name: 用户_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."用户_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: 用户_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."用户_id_seq" OWNED BY public."用户".id;


--
-- Name: 用户 id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."用户" ALTER COLUMN id SET DEFAULT nextval('public."用户_id_seq"'::regclass);


--
-- Name: 会话 会话_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."会话"
    ADD CONSTRAINT "会话_pkey" PRIMARY KEY (sid);


--
-- Name: 会话 会话_用户id_un; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."会话"
    ADD CONSTRAINT "会话_用户id_un" UNIQUE ("用户id");


--
-- Name: 用户 用户_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."用户"
    ADD CONSTRAINT "用户_pkey" PRIMARY KEY (id);


--
-- Name: 用户 用户_账号_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."用户"
    ADD CONSTRAINT "用户_账号_key" UNIQUE ("账号");


--
-- Name: 会话_用户id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "会话_用户id_idx" ON public."会话" USING btree ("用户id");


--
-- Name: 会话 会话_用户id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."会话"
    ADD CONSTRAINT "会话_用户id_fkey" FOREIGN KEY ("用户id") REFERENCES public."用户"(id);


--
-- PostgreSQL database dump complete
--

