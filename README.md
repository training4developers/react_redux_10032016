# Welcome to React & Redux!

## Instructor

Eric Greene - [http://t4d.io](http://t4d.io) - [LinkedIn](https://www.linkedin.com/in/ericwgreene)

## Schedule

Class:
- Monday - Wednesday: 9:00am to 5:00pm (ending at 4pm on Wednesday)

Breaks:
- Morning: 10:35am to 10:45am
- Lunch: 12:15pm to 1pm
- Afternoon #1: 2:15pm to 2:25pm
- Afternoon #2: 3:35pm to 3:45pm

## Course Outline

- Day 1 - ES2015 (review as needed), React
- Day 2 - React / Redux
- Day 3 - Redux / Unit Testing / Quick Overview of Relay

## Links

### Instructor's Resources

- [DevelopIntelligence](http://www.developintelligence.com/)
- [Eric's Blog](http://t4d.io/)
- [WintellectNOW](https://www.wintellectnow.com/Home/Instructor?instructorId=EricGreene) - Special Offer Code: GREENE-2016
- [Microsoft Virtual Academy](https://mva.microsoft.com/search/SearchResults.aspx#!q=Eric%20Greene&lang=1033)
- [React Blog Posts](https://github.com/training4developers/react-flux-blog)
- [TopTal Angular Directive](https://www.toptal.com/angular-js/angular-js-demystifying-directives)
- [React SitePoint](http://www.sitepoint.com/author/ericgreene/)

#### Training Videos

- [Game Changing ES2015 Features](https://mva.microsoft.com/en-US/training-courses/gamechanging-features-in-es2015-16640?l=JA0gw9JrC_2206218965)
- [Introduction to React](https://mva.microsoft.com/en-US/training-courses/introduction-to-react-16635?l=4wrKgdJrC_206218965)
- [Introduction to Redux](https://www.wintellectnow.com/Videos/Watch?videoId=introduction-to-redux)

### Other Resources

- [You Don't Know JS](https://github.com/getify/You-Dont-Know-JS)
- [JavaScript Air Podcast](http://javascriptair.podbean.com/)

## Setup Instructions

This is a starter project for creating an HTML/SASS/React/Redux/Relay application.

### Application Setup

Step 0. Please completely read and thoroughly understand the instructions below before performing them.

Step 1. Download Install Node.js version 6 or higher. Version 6 or higher MUST be installed. If you have an older Node.js version that you need to keep, then use something like [NVM](https://www.npmjs.com/package/nvm) to manage multiple Node.js installations. To install Node.js click [here](https://nodejs.org).

Note: Seriously, please use Node version 6 or higher. There are certain features such as destructuring and spreads which will not work with earlier versions of Node.js. If you use an earlier version your code will fail.

Step 2. Download this repository from [here](https://github.com/training4developers/react_redux_10032016/archive/master.zip). Extract the zip file to a working folder on your system.

Step 3. Open a new terminal window, change to the folder where you extracted the zip file. You should see a **package.json** file in the folder.

On Windows, the terminal is called "Node.js Command Prompt". This will command prompt will contain the proper paths for Node.js development. DO NOT RUN the Node.js program. Click the icon named "Node.js Command Prompt". For Mac users, the Mac terminal is all you need.

Step 4. From the terminal, run the following command:

```bash
$ npm i && npm start
```

It will take a few minutes for this command to complete. If you have connection issues due to a proxy server, please edit the **.npmrc** file per the instructions in that file. Then re-run the command above.

This step has been completed successfully when you receive a message similar to this:

```bash
 Hash: 10ad47f06fa42cb3b7ee                                                                                               
[1] Version: webpack 1.13.2                                                                                                  
[1] Time: 1653ms                                                                                                             
[1]      Asset       Size  Chunks             Chunk Names                                                                    
[1]     app.js    1.89 MB       0  [emitted]  app                                                                            
[1] index.html  217 bytes          [emitted]                                                                                 
[1]     + 172 hidden modules                                                                                                 
[1] Child html-webpack-plugin for "index.html":                                                                              
[1]         + 3 hidden modules 
```

This terminal window is now running the web server, REST server, and WebPack. A second terminal window will need to be opened to run additional terminal commands.

Step 5. Open a web browser, and navigate to [http://localhost:3000](http://localhost:3000).  The starter web application should load and be usable.

Step 6. To modify the application, open your favorite text editor (such as [Atom](https://atom.io/) or [Visual Studio Code](https://code.visualstudio.com)), and modify the files in the **src/www** folder. When file changes are saved, **webpack** will automatically transpile and bundle the application code and assets, and deploy it to the **dist** folder. To see the changes, reload your web browser.

Visual Studio Code supports JSX out of the box. Atom requires the **react** package to be installed. To install it from the menu bar, go to Packages -> Settings View -> Install Packages/Themes. Search for **react**, then click **Install** (you may need to scroll down the search results to find the package). Sometimes Atom will not be able to download the package because of proxy settings. To resolve this run the following commands from a terminal window, replacing the localhost URL with your proxy URL setting:

```bash
$ apm config set proxy "http://localhost:8080"

$ apm config set https_proxy "http://localhost:8080"

$ apm config set strict-ssl false
```

Restart Atom, then re-attempt to install the **react** package again.

JavaScript & HTML linting support can be added by installing the **linter**, **linter-htmlhint**, and **linter-eslint** packages.

While other editors support JSX and other linting features (such as IntelliJ or WebStorm), I only support Visual Studio Code and Atom in class.

### NPM Scripts Command Reference

From a terminal, in the root project folder (where the **package.json** file exists), the following commands can be executed to perform various project development tasks.

- **npm start** - starts the web server
- **npm run clean** - removes the **dist** folder
- **npm run build** - removes the dist folder, builds and deploys the server app, and the web app
- **npm run webpack** - runs webpack in watch mode so web app file changes are automatically processed, and deployed to the **dist/www** folder
- **npm run webpack-once** - runs webpack once to process web app files, and deploys them to the **dist/www** folder
- **npm run server** - builds the server application, and deploys it to the **dist** folder
- **npm run update-schema** - updates the GraphQL schema for RelayQL

### Useful Resources

- [React](https://facebook.github.io/react/)
- [Redux](https://github.com/reactjs/redux)
- [GraphQL](http://graphql.org/)
- [Relay](https://facebook.github.io/relay/)
- [Babel](https://babeljs.io/)
- [Webpack](https://webpack.github.io/)
- [Babel Relay Plugin](https://facebook.github.io/relay/docs/guides-babel-plugin.html)
- [SASS](http://sass-lang.com/)
