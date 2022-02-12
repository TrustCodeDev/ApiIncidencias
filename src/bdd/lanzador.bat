@echo off 
color 0A
TITLE Bienvenid@ al Lanzador
cls
echo Ejecutando Lanzador version 0.1.0
echo %DATE% ^| %TIME%
echo   ______                    __     ______            __
echo  /_  __/_____ __  __ _____ / /_   / ____/____   ____/ /___
echo   / /  / ___// / / // ___// __/  / /    / __ \ / __  // _ \
echo  / /  / /   / /_/ /(__  )/ /_   / /___ / /_/ // /_/ //  __/
echo /_/  /_/    \__,_//____/ \__/   \____/ \____/ \__,_/ \___/

rem ========================================================================================
@echo off
Setlocal enabledelayedexpansion
rem menu
set user="vacio"
set pass="vacio"
set bd_name_old="vacio"
echo "usuario antes -> " %user%
rem funcion para pedir el nombre del usuario
call:FUNC_INPUT_PARAMETER_USER 
goto:EOF

call:FUNC_INPUT_PARAMETER_PASS 
goto:EOF

call:FUNC_INPUT_PARAMETER_BDNAME_OLD 
goto:EOF


rem if [%3]==[/?] goto BLANK_BD

:FUNC_INPUT_PARAMETER_USER
	rem echo %~1
	echo.
	echo "ingrese su nombre de usuario de Mysql"
	Set /p user=
	rem echo el nombre ingresado fue: %user%	

:FUNC_INPUT_PARAMETER_PASS
	rem echo %~1
	echo.
	echo "ingrese su constrasena de Mysql"
	Set /p pass=
	rem echo la constrasena ingresada fue: %pass%	

:FUNC_INPUT_PARAMETER_BDNAME_OLD
	rem echo %~1
	echo.
	echo "ingrese el nombre actual de Base de datos(Schema)"
	Set /p bd_name_old=
	rem echo el nombre de la BD ingresada fue: %bd_name_old%	


if [%user%] == [] (
	goto BLANK_USER
	goto:EOF
) 

if [%pass%] == [] (
	goto BLANK_PASS
	goto:EOF
)

if [%bd_name_old%] == [] (
	goto BLANK_BD_NAME_OLD
	goto:EOF
)


rem mysql -u%user% -p%pass% -e "show databases;" rem "DROP DATABASE %bd_name_old%;CREATE database IF NOT exists incidencias;"
rem mysql --user=%user% --password=%pass% --database=%bd_name_old% --execute="DROP DATABASE %bd_name_old%; CREATE DATABASE %bd_name_old%;"
mysql --user=%user% --password=%pass% --database=%bd_name_old% --execute="drop database %bd_name_old%;"
mysql --user=%user% --password=%pass% --execute="show databases;"
mysql --user=%user% --password=%pass% --execute="create database incidencias;"
mysql --user=%user% --password=%pass% --execute="show databases;"
rem mysql --user=%user% --password=%pass% --execute="incidencias < Dump_incidencias20220205.sql;"
mysql --user=%user% --database="incidencias" --password=%pass% < +"Dump20220212.sql"
goto CLOSE_PROGRAM
goto:EOF

:BLANK_USER
	echo El usuario de Base de datos no puede ser vacio
	rem goto FUNC_INPUT_PARAMETER_USER

:BLANK_PASS
	echo El nombre de la base de datos actual no puede ser vacio
	rem goto CLOSE_PROGRAM

:BLANK_BD_NAME_OLD
	echo El nombre de la base de datos actual no puede ser vacio

:CLOSE_PROGRAM
	pause
	rem echo Pulse una tecla para finalizar .....
	rem exit /b