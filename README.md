# ricardorato.dev
### Description:
This is my personal webpage, a place where i can show what i'm working on, and what i've been learning! Let me know what you think, and what i can improve!
### Requirements
Check if you got the latest python version.
#### Windows
On powershell:
```
> python --version
```
Then go to python website and check latest version available. If not the one installed in your system, go ahead.

#### Linux
First run:
```
$ sudo apt update
```
Then let's install python:
```
$ sudo apt install python3
```
### Procedures
Now create your project folder .venv folder within:
```
$ mkdir myproject
$ cd myproject
$ python3 -m venv .venv
```
Before you can start work in your environment, you must activate it:
```
$ . .venv/bin/activate
```
At the beginning of your command line you can now notice "venv" prefix. You're ready to start flask:
```
$ pip install Flask
```

Just run **"Flask run"** and voilá, your project is up and running