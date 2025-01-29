.PHONY: install generate-env db-up db-down db-migrate-dev

install:
	@echo "Installing dependencies..."
	pnpm install

generate-env:
	@echo "Generating .env file..."
	@cp .env.example .env

db-up:
	@echo "Starting database..."
	docker compose up -d
	sleep 5

db-down:
	@echo "Stopping database..."
	docker compose down

db-migrate-dev:
	@echo "Migrating database..."
	pnpm migrate:dev

setup-dev: install generate-env db-up db-migrate-dev

start-dev: db-up
	pnpm start:dev

stop-dev: db-down