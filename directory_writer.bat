@echo off
powershell -NoProfile -Command "Get-ChildItem -Recurse | ForEach-Object { $_.FullName.Substring((Get-Location).Path.Length + 1) } | Out-File -Encoding utf8 directory.txt"