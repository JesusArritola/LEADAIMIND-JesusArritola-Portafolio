#!/bin/bash

# LeadAIMind Portfolio - Deploy Script
# Ejecute: bash deploy.sh

echo "========================================"
echo "  LeadAIMind - GitHub Push"
echo "========================================"
echo ""

# Change to script directory
cd "$(dirname "$0")"

# Initialize git if needed
if [ ! -d ".git" ]; then
    echo "[1/4] Inicializando Git..."
    git init
    git add .
    git commit -m "Initial commit - LeadAIMind Portfolio v1.0.0"
else
    echo "[1/4] Git ya inicializado"
    git add .
    git commit -m "LeadAIMind Portfolio v1.0.0 - Production ready"
fi

# Set main branch
echo "[2/4] Configurando branch main..."
git branch -M main

# Set remote
echo "[3/4] Agregando repositorio..."
git remote add origin https://github.com/JesusArritola/leadaimind-portfolio.git

# Push
echo "[4/4] Subiendo a GitHub..."
echo ""

git push -u origin main

echo ""
echo "========================================"
echo "  Completado!"
echo "========================================"
echo ""
echo "Ahora ve a Vercel para deploy:"
echo "1. https://vercel.com"
echo "2. Add New > Project"
echo "3. Import your GitHub repo"
echo "4. Deploy!"
echo ""