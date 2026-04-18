@echo off
setlocal enabledelayedexpansion

echo ========================================
echo   LeadAIMind - GitHub Push Script
echo ========================================
echo.

cd /d "%~dp0"

echo Verificando conexion a GitHub...
curl -s --connect-timeout 10 https://github.com >nul 2>&1
if errorlevel 1 (
    echo [ADVERTENCIA] No se puede conectar a GitHub directamente.
    echo.
    echo Posibles soluciones:
    echo 1. Desactivar proxy/VPN temporalmente
    echo 2. Verificar configuracion de Git
    echo 3. Usar token de acceso personal (GitHub CLI)
    echo.
    echo Configurando Git para aceptar certificados...
    git config --global http.sslVerify false
    echo.
)

echo [1/4] Verificando estado de Git...
if not exist ".git" (
    echo Inicializando repositorio...
    git init
)

echo [2/4] Preparando archivos...
git add .
git status --short

echo.
echo [3/4] Creando commit...
git commit -m "LeadAIMind Portfolio v1.0.0 - Ready for production"

echo [4/4] Subiendo a GitHub...
echo.

set /p TOKEN="Ingresa tu GitHub Token (o presiona Enter para usar SSH): "

if defined TOKEN (
    git remote set-url origin https://JesusArritola:%TOKEN%@github.com/JesusArritola/leadaimind-portfolio.git
) else (
    echo Usando HTTPS sin token...
)

git push -u origin main --force

echo.
echo ========================================
echo   Proceso completado
echo ========================================
echo.
pause