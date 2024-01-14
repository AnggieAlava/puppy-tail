REGISTRY = registry.gitlab.com/anggieprojects

##@ Help
help:                ## Shows this help.
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n"} /^[a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)


reset_db:
	@pipenv run reset_db

load_data:
	python src/seedData.py -f seedData.json

##@ Data

reset-app: reset_db load_data ## Deletes data and reseed database.
	
##@ Backend
start: ## Starts backend.
	@docker-compose up -d
	@pipenv run start

stop: ## Stops postgresql
	@docker-compose down

##@ Build
build-frontend: ## Builds frontend image
	@BACKEND_URL=https://puppy-api.angeles.rocks npm run build 
	@docker build -f Dockerfile.front -t $(REGISTRY)/puppy-tail:front .
	@docker push $(REGISTRY)/puppy-tail:front

build-backend: ## Builds backend image
	@docker build -f Dockerfile.back -t $(REGISTRY)/puppy-tail:back .
	@docker push $(REGISTRY)/puppy-tail:back
