# Routine Manager
## Table of Contents
* [Goal](#goal)
* [Definitions](#definitions)
* [Development Guide](#development-guide)
* [Resources](#resources)

## Goal
The Routine Manager bot is intended to help with scheduling routines and
provide a summary (`Itinerary`) for what to complete for the day.

Remember, the intent of the Routine Manager is not to indicate "availability"
like you would in a calender. Its intent is to:
* help with breaking down things that have to be done (actionables) into 
  manageable collections for the day, and
* help to automatically adjust your routine if some of your planned activities
  got pushed back.

### Motivation
The motivation for making this bot was born out of my specific need to schedule
some of my routines in a way that Google Calender was unable to support.

#### Example: Haircuts
I have a planned routine of cutting my hair once every month. In Google
Calendar, I can set my haircut event to repeat every month, and this will
prompt Google Calendar to generate all of the subsequent events.

However, if I ended up getting my haircut 3 days after the date that I was
supposed to, I will now have to manually remove all of the subsequent haircut
events and update the new haircut day to be a month after I actually got my
haircut.

This manual step is what the Routine Manager is meant to handle.

## Definitions
A clear set of definitions for some of the implementations.
| Term         | Definition                                                    |
|--------------|---------------------------------------------------------------|
| `Actionable` | Something to be done and *has* to be quantifiable.            |
| `Routine`    | A set of `Actionable`s tied to a repeat cycle.                |
| `Itinerary`  | Summary of `Actionable`s for the day.                         |
| `Project`    | A group of `Actionable`s.                                     |
| `Report`     | A review of completed and skipped `Actionable`s over time.    |

## Development Guide
### Installs
* [Node.js](https://nodejs.org/en/download) (use version 16.15.1 onwards)
  * You can check if you already have Node.js by running the command `node -v`.
  * You can check if you already have npm by running the command `npm -v`.
* (Optional) [Discord](https://discord.com/download)
* (Optional) [Visual Studio Code](https://code.visualstudio.com/download)
  * Cross-platform friendly.
  * You don't have to use this IDE but it's what the project is setup to use.

### Setup
* Run the command `npm install` in the repository folder to install the
  required packages for this project.
* Create your own development Discord Bot.
  [[Guide - Step 1: Creating an app](https://discord.com/developers/docs/getting-started#step-1-creating-an-app)]
  > You're expected to use your own bot so you can sandbox your own testing
  > without interfering with other developer's changes or the deployed bot.
* Create your `config.json` at the root of the repo folder with your bot token.
    > You're expected to create and maintain your own config.json that will
    > store your own development data.
    >
    > **Expected Content:**
    > ```json
    > {
    >   "botToken": "bot-token-here",
    >   "clientID": "application-id-here"
    > }
    > ```
    > You can reference the following links on how to get each specific data:
    > * [botToken](https://discordjs.guide/creating-your-bot/#using-config-json)
    > * [clientID](https://discordjs.guide/creating-your-bot/command-deployment.html#guild-commands)

### Start Bot
> In your Discord server, you should see the bot come online if you successfully
> started the bot.

#### Visual Studio Code
Press `F5` or open the "Run and Debug" tab and run the `Launch Bot` command.

#### Command Line
Run the command `node .` to launch the bot.

### Creating a Command
Create a `.js` file for a new command in the `src/commands` folder.
> **NOTE:** Please make sure that your file names are in snake_case because some
> file systems do not play nice with casing and spaces.
```javascript
const { SlashCommandBuilder } = require('discord.js');


// Command class should extend SlashCommandBuilder
class CommandName extends SlashCommandBuilder {
  constructor(props) {
    super(props);
    // Setup command here...
    this.setName(`command_name`); // Standardise to use snake_case.
    this.setDescription(`Command description...`);
    // Any additional command settings here...
  }

  async execute(interaction) {
    // Command execution here...
  }
}


module.exports = {
  command: new CommandName()  // The export HAS to have the "command" object
                              // since it's what the client will import.
}
```

You can reference `src/commands/reload_command.js` for a working example.

## Resources
* [Discord Development](https://discord.com/developers/docs/intro)
* [discord.js](https://discordjs.guide/)
