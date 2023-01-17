
create table projects
(
    id serial PRIMARY KEY,
    name varchar not null,
    description text null,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);