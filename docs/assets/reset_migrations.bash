rm -R -f ./migrations &&
pipenv run init &&
dropdb -h localhost -U angeles puppy_tail || true &&
createdb -h localhost -U angeles puppy_tail || true &&
psql -h localhost puppy_tail -U angeles -c 'CREATE EXTENSION unaccent;' || true &&
pipenv run migrate &&
pipenv run upgrade
