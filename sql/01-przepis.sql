create table przepis
(
    id      integer not null
        constraint przepis_pk
            primary key autoincrement,
    subject text not null,
    skladniki text not null,
    kroki text not null
);
