#!/bin/bash

# Script untuk buang file duplicate dan unused

echo "🗑️  Membersihkan file duplicate dan unused..."

# Buang file .md dari root (sudah dipindah ke docs/)
rm -f CHANGES.md
rm -f DUPLICATE_DETECTION.md
rm -f PANDUAN_MY.md
rm -f PWA_SETUP.md
rm -f QUICKSTART.md
rm -f SECURITY_FIX.md
rm -f SETUP.md
rm -f VERCEL_DEPLOYMENT.md

# Buang file duplicate
rm -f server.ts
rm -f setup.sh
rm -rf illusionTable

echo "✅ Selesai! File yang dibuang:"
echo "   - File .md dari root (dipindah ke docs/)"
echo "   - server.ts (duplicate, yang betul di api/)"
echo "   - setup.sh (tidak diperlukan)"
echo "   - illusionTable folder (jika masih ada)"
