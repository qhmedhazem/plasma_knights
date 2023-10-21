@echo off

rmdir /s /q binary_cache
rmdir /s /q binary

pyinstaller --noconfirm --onedir --console --name "mr_analyzer" --add-data "./analyzer;." --workpath="./binary_cache" --icon "./src/app/favicon.ico" --distpath "./binary" "./analyzer/main.py"

if %errorlevel% equ 0 (
    echo MR Analyzer Builder completed successfully.
    rmdir /s /q binary_cache
    echo The ./binary_cache directory has been deleted.
) else (
    echo MR Analyzer Builder encountered an error.
)

:: Run the second PyInstaller command
pyinstaller --noconfirm --onedir --console --name "predictior" --add-data "./predictior;." --icon "./src/app/favicon.ico" --workpath="./binary_cache" --distpath "./binary" "./predictior/main.py"

:: Check if the second PyInstaller was successful
if %errorlevel% equ 0 (
    echo Predictior Builder completed successfully.
    :: Delete the ./build directory
    rmdir /s /q binary_cache
    echo The ./binary_cache directory has been deleted.
) else (
    echo Predictior Builder encountered an error.
)