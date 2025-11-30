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

REM Step 0.5: Make sure assets folder exists in Git root
mkdir "assets" 2>nul

REM Step 1: Cherry-pick without committing
git cherry-pick %COMMIT% --no-commit

IF ERRORLEVEL 1 (
    echo Resolving rename/delete conflicts automatically...

    REM Stage all normal moved files
    for /R public\gallery\assets %%F in (*) do (
        git add "%%F"
    )

    REM Automatically remove files deleted in the cherry-picked commit
    for /F "delims=" %%F in ('git diff-tree --no-commit-id --name-status -r %COMMIT% ^| findstr /B "D"') do (
        for /F "tokens=2" %%A in ("%%F") do (
            git rm "public/gallery/%%A" 2>nul
            echo Deleted: public/gallery/assets/%%A
        )
    )
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

REM Step 4: Delete assets folder
rd /s /q "assets"

REM Step 5: Remove old gallery/ paths from staging
git reset HEAD gallery

REM Step 6: Stage new paths
git add public/gallery


endlocal
echo Done! 
pause
