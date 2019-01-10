# poltergeist

A website thing for firebase

## Quickstart

Install poltergeist CLI:

    npm install -g @poltergeist/cli

Bootstrap new project:

    poltergeist bootstrap yourprojectname

Create config.json and .env in your project directory:

    poltergeist configure

If you want to use the default theme (television) with your own logos, create a
'logos' folder in your project directory and label them 'minilogo.svg' and 'biglogo.svg'.

Pack your theme for consuption in Firebase Cloud Functions:

    npx @poltergeist/television pack yourpackagedtheme logos/

Move packaged theme into 'functions/' folder (the .tgz archive will get deployed
to Firebase Cloud Functions).

    mv yourpackagedtheme.tgz functions/

Install theme in BOTH project root and functions/ folder:

    npm i functions/yourpackagedtheme.tgz
    cd functions/
    npm i yourpackagedtheme.tgz

Add "theme" key in config.json and functions/.runtimeconfig.json:

    "theme": "yourpackagedtheme"
