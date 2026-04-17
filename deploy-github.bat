@echo off
echo ========================================
echo   LeadAIMind Portfolio - Deployment
echo ========================================
echo.

REM Verificar que este script esta en la carpeta correcta
cd /d "%~dp0"

echo [1/5] Inicializando repositorio Git...
git init
git add .
git commit -m "Initial commit - LeadAIMind Portfolio v1.0.0"

echo [2/5] Configurando branch main...
git branch -M main

echo [3/5] Agregando remote...
git remote add origin https://github.com/JesusArritola/leadaimind-portfolio.git

echo [4/5] Subiendo a GitHub...
git push -u origin main

echo.
echo ========================================
echo   Despliegue completado!
echo ========================================
echo.
echo Ahora sigue estos pasos en Vercel:
echo 1. Ve a https://vercel.com
echo 2. Click "Add New" > "Project"
echo 3. Importa tu repositorio GitHub
echo 4. Click "Deploy"
echo.
pause