#
# Makefile for Next.js Project
#

#! Function to read the your local ip address
define get_ip
	$(shell hostname -I | cut -d' ' -f1)
endef

generate_build_no := \
		current_build_no=$$(grep -oP 'export const APP_BUILD_NO = \K\d+' src/app/utils/build_no.ts); \
		new_build_no=$$((current_build_no + 1)); \
		sed -i "s/export const APP_BUILD_NO = $$current_build_no;/export const APP_BUILD_NO = $$new_build_no;/" src/app/utils/build_no.ts; \
		git add .; \
		# git commit -m "Increment APP_BUILD_NO to $$new_build_no" --no-verify

#! Variables
NODE_VERSION=18
NEXT_VERSION=14.2.1

# Load environment variables from .env file
include .env.example

# Targets
.PHONY: ip run build rmn i test lint dc-up dc-down

#! System Commands
ip:
	@echo $(call get_ip)

#! Next.js Commands
run-dev:
	@npm run dev -- -H $(SERVER_HOST_IP) -p $(SERVER_PORT)

build:
	@npm run build

run-prod:
	@npm run start -- -H $(SERVER_HOST_IP) -p $(SERVER_PORT)


rmn:
	rm -rf node_modules

i:
	@npm install

test:
	@npm test

lint:
	@npm run lint

#! Docker Cli Commands
dc-up:
	sudo docker-compose up --remove-orphans

dc-down:
	sudo docker-compose down

dc-remove-all:
	sudo docker system prune -a

#! Git/Phabricators commands
diff:
	arc diff --preview
build_no:
	$(generate_build_no)

#! Prisma Migrations
prisma-init:
	@npx prisma init --datasource-provider sqlite
prisma-migration:
	@npx prisma migrate dev --name init
prisma-reset-db:
	@npx prisma db push --force-reset



#! Default target
.DEFAULT_GOAL := serve
