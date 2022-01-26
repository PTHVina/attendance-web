@echo off
 
::被复制的源文件夹
set sourceDir=D:\CSharp\attendanceWeb\dist
::目标文件夹
set tarDir=D:\CSharp\attendance1\huaanClient\bin\x86\Debug\detached
 
::复制并覆盖文件及文件夹
xcopy %sourceDir% %tarDir% /s/y