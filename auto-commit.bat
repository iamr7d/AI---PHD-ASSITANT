@echo off
:loop
git add .
git commit -m "🔄 Auto-save: %date% %time%"
git push origin main
timeout /t 300 /nobreak
goto loop
