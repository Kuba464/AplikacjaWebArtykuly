create table if not exists users(
	id serial primary key,
	username varchar(50) unique not null,
	password_hash varchar(255) not null,
	email varchar(50) unique not null,
	role varchar(20) default 'admin'		
);

create table if not exists authors (
	id serial primary key,
	name varchar(50) not null,
	surname varchar(50) not null
);

create table if not exists categories (
	id serial primary key,
	category varchar(30) not null,
	symbol varchar(2) unique not null 
);

create table if not exists articles (
	id serial primary key,
	title varchar(500) not null,
	pages_from int not null,
	pages_to int not null,
	publication_date date not null default current_date,
	id_category int references categories(id) on delete set null,
	pdf_path varchar(200) not null,
	extra_file_path varchar(200) not null
);

create table if not exists stats (
	id serial primary key,
	id_article int references articles(id) on delete cascade,
	viewed_at timestamp default current_timestamp
);

create table if not exists author_articles (
	id_article int references articles(id) on delete cascade,
	id_author int references authors(id) on delete cascade,
	primary key (id_article, id_author)
);

create table if not exists tags (
	id serial primary key,
	name varchar(100) unique not null
);

create table if not exists article_tags (
	id_article int references articles(id) on delete cascade,
	id_tag int references tags(id) on delete cascade,
	primary key (id_article, id_tag)
);

insert into categories (category, symbol) values
	('Matematyka', 'M'),
	('Informatyka', 'I'),
	('Dydaktyka', 'D'),
	('Popularyzacja nauki', 'P')
on conflict (symbol) do nothing;
 

alter table articles add column if not exists extra_file_path varchar(200) not null default null;
alter table articles add column if not exists publication_date date not null default current_date;

create table if not exists keywords (
	id serial primary key,
	keyword varchar(50) unique not null
);

create table if not exists article_keywords (
	id_article int references articles(id) on delete cascade,
	id_keyword int references keywords(id) on delete cascade,
	primary key (id_article, id_keyword)
);