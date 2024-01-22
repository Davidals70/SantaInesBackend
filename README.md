# Sistema Integral de Gestión de Citas e Historias Médicas

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Descripción:
Este proyecto se ejecuta bajo la premisa de mejorar la atención médica mediante la implementación de soluciones tecnológicas avanzadas. El desarrollo se realiza de manera colaborativa, siguiendo las mejores prácticas de desarrollo de software, con especial atención a la calidad del código y la usabilidad de la interfaz.

---
### Arquitectura del Proyecto

-   **Backend (NestJs):**
    -   Desarrollado con NestJS y Node.js utilizando TypeScript.
    -   Estructurado en capas: Infraestructura, Aplicación y Dominio.
    -   Uso de PostgreSQL con Typeorm para la gestión de la base de datos.
 ---

### Instalación

Clonación Aplicación **Backend**:
```
$ git clone https://github.com/Davidals70/SantaInesBackend.git
$ cd ../SantaInesBackend
$ npm install
$ npm run start:dev
```

>Ademas será necesario la creación de una BD en **PostgreSQL** con la siguiente estructura de datos:
>
>![Estructura de datos](https://i.imgur.com/nkF8swB.png)
>
>Para luego seguir los siguientes pasos:
>
>1. Dentro de la carpeta del proyecto **backend**, crear un archivo .env para el manejo de las variables de entorno.
>2. Dentro del archivo .env copiar la siguientes variables, cambiando los valores por los suyos:
>```
>require('dotenv').config()      #No modificar
>POSTGRES_HOST  = nombre_host
>POSTGRES_PORT  = puerto
>POSTGRES_DB  = nombre_BD
>POSTGRES_USER  = nombre_usuario
>POSTGRES_PASSWORD  =  contraseña_BD
>```

