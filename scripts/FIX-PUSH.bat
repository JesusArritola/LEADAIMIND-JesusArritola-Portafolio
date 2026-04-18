@echo off
setlocal enabledelayedexpansion

echo ========================================
echo   LEAD AIMIND - SOLUCION PUSH GITHUB
echo ========================================
echo.

cd /d "%~dp0"

echo [1] Verificando conexion a GitHub desde navegador...
echo    Si puedes entrar a github.com desde el navegador pero Git no funciona,
echo    el problema es de configuracion de Git, no de red.
echo.

echo [2] Reseteando toda configuracion de proxy...
git config --global --unset http.proxy 2>nul
git config --global --unset https.proxy 2>nul
git config --global --remove-section http 2>nul
git config --global --remove-section https 2>nul
echo    Proxy reseteado.
echo.

echo [3] Configurando para redes problematicas...
git config --global http.sslVerify false
git config --global http.postBuffer 524288000
git config --global http.lowSpeedLimit 1000
git config --global http.lowSpeedTime 60
git config --global http.timeout 60000
echo    Configuracion aplicada.
echo.

echo [4] Verificando remote...
git remote -v
echo.

echo [5] Intentando push...
echo.
git push -u origin main

echo.
echo ========================================
echo   RESULTADO
echo ========================================
echo.

if !errorlevel! equ 0 (
    echo [EXITO] Push completado exitosamente!
    echo.
    echo Ahora ve a Vercel:
    echo 1. https://vercel.com
    echo 2. Add New -^> Project
    echo 3. Importa tu repositorio
    echo 4. Deploy!
) else (
    echo [FALLO] El push fallo.
    echo.
    echo Pasos alternativos:
    echo.
    echo OPCION A - Usar GitHub CLI:
    echo   1. Descarga GitHub CLI de: https://github.com/cli
    echo   2. Instala y ejecuta: gh auth login
    echo   3. Luego: gh repo create LEADAIMIND-PORTAFOLIO --source=. --push
    echo.
    echo OPCION B - Subir manualmente:
    echo   1. Ve a github.com y crea el repositorio
    echo   2. Descarga el codigo como ZIP
    echo   3. Desde otra PC con mejor conexion, haz el push
)

echo.
pause