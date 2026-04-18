@echo off
echo ========================================
echo   SUBIR A GITHUB CON GH CLI
echo ========================================
cd /d "%~dp0"

echo Verificando autenticacion GH...
gh auth status

echo.
echo ===== SUBIENDO ARCHIVOS =====
echo.

echo [1]Agregando archivos...
git add .
git status

echo [2]Haciendo commit...
git commit -m "LeadAIMind Portfolio v1.0.0"

echo [3]Subiendo a GitHub...
echo.

gh repo sync JesusArritola/LEADAIMIND-PORTAFOLIO-CORRECTO

echo.
echo ========================================
echo  COMPLETADO
echo ========================================
echo.
echo Ahora Vercel hara el deploy automaticamente.
echo Ve a https://vercel.com para ver el progresso.
pause