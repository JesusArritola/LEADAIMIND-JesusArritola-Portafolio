@echo off
echo ========================================
echo   Diagnostico de Conexion a GitHub
echo ========================================
echo.

echo [1] Verificando DNS...
nslookup github.com
echo.

echo [2] Verificando ping...
ping -n 4 github.com
echo.

echo [3] Verificando puerto 443...
powershell -Command "Test-NetConnection github.com -Port 443"
echo.

echo [4] Verificando proxy...
echo Proxy actual:
echo HTTP_PROXY: %HTTP_PROXY%
echo HTTPS_PROXY: %HTTPS_PROXY%
echo.

echo [5] Probando curl directo...
curl -v https://github.com
echo.

echo ========================================
echo   Diagnostico completado
echo ========================================
pause