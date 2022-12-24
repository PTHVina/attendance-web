@echo off
 
::被复制的源文件夹
set sourceDir=D:\Csharp\attendanceWeb\dist
::目标文件夹
set tarDir=D:\Csharp\attendance\huaanClient\bin\x86\Debug\detached
 
::复制并覆盖文件及文件夹
xcopy %sourceDir% %tarDir% /s/y