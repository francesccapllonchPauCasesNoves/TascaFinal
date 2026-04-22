# TascaFinal
Funcionament de la prova:
● Inici de la tasca: 15 d’abril
● Data límit d’entrega: 30 d’abril
● No es pot fer ús de cap intel·ligència artificial.
S’ha d’entregar:
● Projecte complet amb arxius HTML, JS i CSS.
● S’ha de poder veure a través de Github pages.
Enunciat
Desenvolupar una aplicació web modular que permeti planificar, gestionar i fer seguiment
de tasques personals mitjançant formularis, visualització gràfica i persistència de dades.
Aquesta aplicació simula un gestor personal d’activitats, posant en pràctica tots els
coneixements apresos durant el curs.

Requisits i funcionalitats mínims:
L’aplicació ha d’estar composta per 3 pàgines HTML amb les funcionalitats següents:
index.html – Vista principal
● Ha de tenir un menú de navegació.
● Mostra un llistat de totes les activitats.
● Permet:
○ crear, eliminar, marcar com a realitzades.
● Mostra un gràfic amb Chart.js amb les tasques realitzades per mes.
● Carrega les activitats des de:
○ localStorage
○ un fitxer activitats.json (importació amb fetch(), evitant duplicats).

crear-tasca.html – Formulari per afegir activitats
● Ha de tenir un menú de navegació.
● Inclou un formulari amb validació:
○ títol, descripció, data, categoria (selector de categories), prioritat (selector de Baixa,
Mitjana, Alta)

● Guarda les activitats a localStorage amb un id únic amb el format “task-001” i el camp
realitzada: false.
categories.html – Gestor de categories
● Ha de tenir un menú de navegació.
● Permet afegir i eliminar categories que es poden usar al formulari.
● Les categories es guarden a localStorage.
Organització del projecte:


**Rúbrica:**

Criteri Punts HTML (20%) CSS (20%) JS (60%)


**Pagines web d'interés:**

Nomenclatura GIT: https://www.conventionalcommits.org/en/v1.0.0/#summary

Biblioteca js per entendre el codi: https://www.chartjs.org/

**Estructura del commit**
Un missatge de commit seguint aquesta norma ha de tenir l'estructura següent:

Tipus (Type): Un substantiu que indica la intenció del canvi (com feat o fix).

Àmbit (Scope): Opcional, es posa entre parèntesis i indica la secció del codi afectada (ex: feat(parser):).

Descripció: Una explicació curta del canvi després dels dos punts i un espai.

Cos (Body): Opcional, per a informació contextual més detallada, separat per una línia en blanc.

Peu (Footer): Opcional, utilitzat per a metadades o per indicar canvis importants (BREAKING CHANGES).ç

Tipus Principals i SemVer
Aquesta nomenclatura està directament relacionada amb el Versionat Semàntic (SemVer):

fix: S'utilitza quan es corregeix un error. Equival a un increment de la versió PATCH.

feat: S'utilitza quan s'afegeix una nova funcionalitat. Equival a un increment de la versió MINOR.

BREAKING CHANGE: Indica un canvi que trenca la compatibilitat amb versions anteriors. Es comunica afegint un ! després del tipus/àmbit o amb una entrada al peu de pàgina. Equival a un increment de la versió MAJOR.

**Altres Tipus Permesos**
L'especificació permet l'ús d'altres tipus basats en convencions populars (com la d'Angular), entre els quals destaquen:

docs: Canvis només en la documentació.
style: Canvis que no afecten el significat del codi (espais, format, etc.).
refactor: Canvis de codi que ni corregeixen un error ni afegeixen una funcionalitat.
perf: Canvis per millorar el rendiment.
test: Afegir o corregir proves.
chore / build / ci: Actualitzacions de tasques de manteniment, sistemes de construcció o configuracions d'integració contínua.

**Regles Clau**
Majúscules i minúscules: Els tipus generalment s'escriuen en minúscules per consistència, tot i que l'especificació només obliga a posar en majúscules el text BREAKING CHANGE.
Unicitat del commit: Si un commit conté més d'un tipus de canvi (per exemple, una millora i una correcció), es recomana dividir-lo en diversos commits per mantenir l'organització.
Footers: Els peus de pàgina han de fer servir guions en lloc d'espais per als noms dels tokens (ex: Reviewed-by), excepte per a BREAKING CHANGE.
L'ús d'aquesta nomenclatura ajuda els equips a comunicar millor la naturalesa dels canvis i a fer que l'historial del projecte sigui més fàcil d'explorar per a nous col·laboradors.
