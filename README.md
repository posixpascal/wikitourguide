<p align="center">
<img src="https://raw.githubusercontent.com/posixpascal/wikitourguide/trunk/resources/appstore/logo_alt_small.png" width="256px" />
<h2 align="center">Wiki Tour Guide</h2>
<h3 align="center">your smart storyteller - powered by WikiPedia.org</h3>
</p>

----------------

This monorepo contains the source of the HypeStack (MongoDB, React Native, Nest.JS, Gatsby SSG) powered Wikipedia Story Teller aka **Wiki Tour Guide**.

It synthesizes nearby `Wikipedia Articles` automagically using Google WaveNet APIs and is available on [iOS](https://apps.apple.com/de/app/wikitourguide/id1587761365), [Android](https://play.google.com/store/apps/details?id=org.wikitourguide.app) and also on the [web](https://wikitour.guide/app/player).

Uses React Native for the Android, iOS and Web Version, Gatsby for the website and NestJS for the backend.
Data is stored on a MongoDB database.

-----------------

## 🚀 Download

You can download the app using the following links. Do note that the **iOS version is not released as of now** due to apple's nitpicking.

 - iOS: [https://apps.apple.com/de/app/wikitourguide/id1587761365](https://apps.apple.com/de/app/wikitourguide/id1587761365) 
 - Android: [https://play.google.com/store/apps/details?id=org.wikitourguide.app](https://play.google.com/store/apps/details?id=org.wikitourguide.app)
 - Web: [https://wikitour.guide/app/player](https://wikitour.guide/app/player)

## 🏞 Screenshots

<details>
 <summary>Expand Screenshots </summary>\

![https://raw.githubusercontent.com/posixpascal/wikitourguide/trunk/resources/screenshots/1.PNG](https://raw.githubusercontent.com/posixpascal/wikitourguide/trunk/resources/screenshots/1.PNG)
![https://raw.githubusercontent.com/posixpascal/wikitourguide/trunk/resources/screenshots/2.PNG](https://raw.githubusercontent.com/posixpascal/wikitourguide/trunk/resources/screenshots/2.PNG)
![https://raw.githubusercontent.com/posixpascal/wikitourguide/trunk/resources/screenshots/3.PNG](https://raw.githubusercontent.com/posixpascal/wikitourguide/trunk/resources/screenshots/3.PNG)
![https://raw.githubusercontent.com/posixpascal/wikitourguide/trunk/resources/screenshots/4.PNG](https://raw.githubusercontent.com/posixpascal/wikitourguide/trunk/resources/screenshots/4.PNG)
![https://raw.githubusercontent.com/posixpascal/wikitourguide/trunk/resources/screenshots/5.PNG](https://raw.githubusercontent.com/posixpascal/wikitourguide/trunk/resources/screenshots/5.PNG)
![https://raw.githubusercontent.com/posixpascal/wikitourguide/trunk/resources/screenshots/6.PNG](https://raw.githubusercontent.com/posixpascal/wikitourguide/trunk/resources/screenshots/6.PNG)

</details>

## 🎒 Requirements

- Google Cloud Platform Account (with Activated Maps & Synthesizer APIs)
- MongoDB with populated articles
- Active Expo Installation

## 💻 Installation

Install using `yarn` from the root repository:

```
yarn install --frozen-lockfile
```

Then follow the instructions dependening on what service you want to start:


### 📱 App

The app is built on React Native and uses a Managed Expo Setup.
Make sure that you have the Expo CLI installed and then execute:

```bash
# in packages/app/
expo start
```

Then follow the instructions in the console to start emulators or built the app for the web platform.

### 🎗 API

First create an `.env` file in the `packages/api` package (copy the contents from `.env.example`).
Then you can launch NestJS using:
```
# in packages/web/
yarn run start:dev
```

### 🌎 Website

The Gatsby site can be launched normally using:
```
# in packages/web/
gatsby develop
```

### 🦺 Jobs
The jobs package contains various scripts for populating a mongoDB database or crawling wikipedia's api. Normally you don't have to launch it therefore we'll skip this for now until documentation is completed for the various other parts of the application.

## 👩‍⚖️ License

Licensed under GPL. See `License.md`. 
*Note: This is subject to change depending on my research on this.*

## 🕹 Contribution

Contribution is appreciated. Feel free to ask any questions in Github Issues or by E-mail (posixpascal@googlemail.com).

-----

Authors Note:
*Schön, dass es dich gibt.*
