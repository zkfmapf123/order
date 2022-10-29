file := file

print-file:
	echo ${file}

## Docker
mysql:
	docker run --name mysql-local -p 3306:3306/tcp -e MYSQL_ROOT_PASSWORD=1234 -d mysql:8

redis:
	docker run --name redis-local -p 6379:6379 -d redis