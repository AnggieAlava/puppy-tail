rm -R -f ./migrations &&
pipenv run init &&
dropdb -h localhost -p 5433 -U angeles puppy_tail || true &&
createdb -h localhost -p 5433 -U angeles puppy_tail || true &&
psql -h localhost -p 5433 puppy_tail -U angeles -c 'CREATE EXTENSION unaccent;' || true &&
pipenv run migrate &&
pipenv run upgrade
