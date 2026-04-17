@echo off
echo ========================================
echo   Solucion Problema GitHub - Git Bash
echo ========================================
echo.

echo [1] Verificando si Git funciona...
git --version
echo.

echo [2] Limpiando proxy de Git...
git config --global --unset http.proxy 2>nul
git config --global --unset https.proxy 2>nul
echo Proxy limpiado.
echo.

echo [3] Desactivando SSL temporalmente (para diagnostico)...
git config --global http.sslVerify false
echo.

echo [4] Aumentando buffer...
git config --global http.postBuffer 524288000
echo.

echo [5] Forzando HTTP/1.1...
git config --global http.version HTTP/1.1
echo.

echo [6] Verificando remote actual...
git remote -v
echo.

echo ========================================
echo   Probando conexion a GitHub...
echo ========================================
echo.

git push -u origin main

echo.
echo ========================================
echo   Resultado del intento
echo ========================================
pause