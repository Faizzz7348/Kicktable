#!/bin/bash

# Jalankan cleanup script
echo "🧹 Membersihkan file..."
chmod +x cleanup.sh
./cleanup.sh

# Stage semua perubahan
echo ""
echo "📦 Staging files untuk commit..."
git add -A

# Commit dengan mesej yang descriptive
echo ""
echo "💾 Committing changes..."
git commit -m "refactor: cleanup dan reorganisasi struktur projek

- Pindahkan semua dokumentasi .md ke folder docs/
- Buang file duplicate (server.ts di root, setup.sh)
- Update README dengan struktur baru
- Update .gitignore untuk better organization
- Buang folder illusionTable yang tidak diperlukan
- Setup .env dengan database credentials

Struktur baru:
- docs/ - Semua dokumentasi
- api/ - Backend serverless functions
- src/ - Frontend React app
- prisma/ - Database schema"

# Show status
echo ""
echo "✅ Commit selesai!"
echo ""
git status
