# SNAKE

<p align='center'><img src="./public/imgs/snake_logo.jpg" alt= "ini"></p>
<div id='id0'/>
# Index

1. [Enlace](#id1)
2. [Descripción](#id2)
3. [Estructura proyecto](#id4)
4. [Tecnologías empleadas](#id3)
5. [Recursos](#id5)
6. [Compilacion y Ejecución](#id6)
7. [Referencias](#id7)
8. [Licencias](#id7)
9. [Agradecimientos](#id8)

[![WebCam Capture](https://img.youtube.com/vi/OYXPH796qXE/0.jpg)](https://www.youtube.com/embed/OYXPH796qXE?start=127)

<div id='id1'/>

## Enlace al juego:

<a href='https://oobonioo.github.io/snake'>https://oobonioo.github.io/snake</a>

<div id='id2'/>

## Descripción

<p>Juego basádo en el clásico de la serpiente del antiguo movil Nokia 3310. Se han añadido algunas texturas y objetos en el juego con los que poder interactuar.</p>

<p>El movimiento en el area de juego trata de imitar el movimiento por "bloques" que se efectuava en el movil. </p>
<p align='center'><img src="./public/imgs/gameOver1.png" alt= "ini"></p>
<p align='center'><img src="./public/imgs/gameOver2.png" alt= "ini"></p>
<p align='center'><img src="./public/imgs/gameOver3.png" alt= "ini"></p>
<p>Los objetos "feed" suman puntos al marcador, mientras que cualquier choque con un obstáculo, borde o el propio cuerpo de la serpiente, forzará la finalización del juego. </p>

<p>TOdavia queda pendiente la incrporación de algún actor mas al juego.</p>

<div id='id3'/>

## Tecnología empleada

- NodeJS https://nodejs.org/
- Typescript https://www.typescriptlang.org/
- Lodash https://www.npmjs.com/package/lodash

[Inicio](#id0)

<div id='id4'/>

## Estructura proyecto

<p>El proyecto esta dividido en directorios con los archivos ts a su vez separados por actores, script principal, utilidades y controladores.
  
  Para los archivos multimedia y hojas de estilos se ha utilizado el directorio "public"</p>

[Inicio](#id0)

<div id='id5'/>

## Compilacion y Ejecución

Si queremos ejecutar con parcel:

```sh
git clone https://github.com/oOBoniOo/serpiente_mid_cnwd.git
cd serpiente_mid_cnwd
yarn init -y
yarn install
yarn run dev
```

Para el despliegue en ghPages:

```sh
  yar run ghbuild
```

[Inicio](#id0)

<div id='id6'/>

## Recursos

### Sprites

<p align='center'><img src="./public/imgs/snake_64.png" alt= "ini"></p>
<p align='center'><img src="./public/imgs/numbers.png" alt= "ini"></p>
<p align='center'><img src="./public/imgs/walls.png" alt= "ini"></p>

<div id='id7'/>

## Referencias:

Me sirvió de orientacion para el mapa y el "recorte" de los sprites este repositorio:

<a href='  https://github.com/CodingWith-Adam/snake/blob/main/index.js
'> https://github.com/CodingWith-Adam/snake/blob/main/index.js
</a>

[Inicio](#id0)

<div id='id7'/>

## Licencias

[Inicio](#id0)

<div id='id8'/>

## Agradecimientos

[Inicio](#id0)
