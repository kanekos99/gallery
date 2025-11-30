@echo off
REM Safe cherry-pick with path remapping
REM Maps gallery/* --> public/gallery/*
REM Usage: cherry-pick-remap.bat <commit-hash>

IF "%~1"=="" (
    echo Usage: cherry-pick-remap.bat ^<commit-hash^>
    exit /b 1
)

SET COMMIT=%1

REM Enable delayed variable expansion for paths
setlocal enabledelayedexpansion

echo Cherry-picking commit %COMMIT% with gallery/* remapped to public/gallery/*

REM Step 1: Cherry-pick without committing
git cherry-pick %COMMIT% --no-commit
IF ERRORLEVEL 1 (
    echo Cherry-pick failed! Resolve conflicts manually.
    exit /b 1
)

REM Step 2: Make destination folder
mkdir public\gallery 2>nul

REM Step 3: Move only files under gallery/ to public/gallery/, preserving subfolders
for /R gallery %%F in (*) do (
    REM get the full file path
    set "FILE=%%F"
    REM get path relative to gallery\
    set "REL=!FILE:gallery\=!"
    REM create target folder if it doesn't exist
    for %%P in ("!REL!") do (
        mkdir "public\gallery\%%~dpP" 2>nul
    )
    REM move the file
    move "%%F" "public\gallery\!REL!" >nul
)

REM Step 4: Remove old gallery/ paths from staging
git reset HEAD gallery

REM Step 5: Stage new paths
git add public/gallery

endlocal
echo Done! 
pause
