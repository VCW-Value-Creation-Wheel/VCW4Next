# VCW4Next

## Key Features

+ Interactive interface for VCW decision-making process
+ NextLand: Earth observation services for agriculture and forestry
+ NextOcean: Sustainable fisheries and aquaculture data insights
+ Guided solution development for key decision-makers

## Project structure

This projects contains five components:
* Database
  * PostgreSQL 14
* Backend
  * Spring Boot 3.0.0 (Java 17)
* Frontend
  * Angular 15
* Object Store
  * MinIO RELEASE.2023-01-02
* Identity and Access Management (IAM)
  * Keycloak 20


## Running and deployment Instructions

### Development (local machine)
To run the entire system on a local machine it is necessary to install:
* Docker
* Docker compose
* JDK 17
* Maven
* Node.js (version 18.10)
* Yarn (version 1.22.19)

First create and run the Database, Object Store and IAM Docker containers by executing:
```bash
$ docker compose up --build -d
```

NOTE: If it's the first time the system is being built, execute the steps in section "Keycloak and MinIO configurations" then continue to the next step.

With all the above containers up and running, navigate inside the backend folder:
```bash
$ cd packages/backend
```
And execute:
```bash
$ mvn clean spring-boot:run
```
Then navigate inside the frontend folder:
```bash
$ cd packages/frontend
```
and execute:
```bash
$ yarn install && yarn start
```
From this moment the entire system is up and running.

Access http://localhost:4200 in a web browser, register a new user, and create your first VCW.

#### Keycloak and MinIO configurations (first installation)
* In a web browser go to http://localhost:8080/admin/master/console and log in using the credentials located in the .env file. Expand the drop-down menu and click on "Create Realm". Then import the realm file (packages/identity/realms/vcw-realm.json) and click "Create".
* In a web browser go to http://localhost:8080/admin/master/console and log in using the credentials located in the .env file. Expand the drop-down menu and select the vcw realm. Create a new user (vcw_admin), define a password (#vcw_admin54321#) and in the "Role mapping" section assign the role: "view-users".
* In a web browser go to http://localhost:9002/login and log in using the credentials located in the .env file. Create a new bucket (vcw4next.file.storage.bucket) and a new access key (XJP8oLyTzis0yJ3B) and secret (yH1rOrI2SSN01Idmwtyn7UENWbcJTWcn).

NOTE: The user vcw_admin, the bucket, access key, and secret are used by the backend. If you change the values above, don't forget to also change them in the backend application.properties file.

### Kubernetes cluster (Under construction)
To have the system running in a Kubernetes cluster it's necessary to perform the following steps:
* Build the Docker images.
* Push them to a Docker registry.
* Deploy them in a Kubernetes cluster using Helm.

For example, for the backend component, navigate inside the folder "infra":
```bash
$ cd packages/backend/infra
```
Build the docker image:
```bash
docker build -t vcw-backend:1.0.0 .
```
Push the image to the Docker registry (the command has to be adapted depending on the registry being used):
```bash
docker push vcw-backend:1.0.0 .
```
Deploy it on the cluster:
```bash
helm upgrade --install --create-namespace -n vcw vcw-backend ./helm
```
This is a simplification of the process. One cannot deploy the system by just running these three commands. There are other steps not metioned here that have to be taken in account (e.g. edit the ./helm/values.yaml). They were not metioned here because they depend on the specific cluster in which the system is being deployed.

## License
MIT License | © Deimos Engenharia SA