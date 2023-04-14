# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---
## [0.1.0] - 2023/04/09

### Added
* [#3] Created `RoutineManagerClient` to extend from discord.js's `Client`.
  Handles the setup for the client.
  * Setup slash command framework with reference to
    [this](https://discordjs.guide/creating-your-bot/slash-commands.html#creating-slash-commands)
    but slightly modified.
  * To add a new command, add the .js file to the "src/commands" folder.
* Added documentation on how to create a command in
  [README.md](README.md#creating-a-command).
* Created the `ReloadCommand` command that allows developers to reload a command
  without restarting the whole bot.
* [Utility] Added type related function helpers to identify if an object/type
  is derived from one another, the same as one another, etc..
* [Utility] Added enum helpers so that it'll be easier to define type safe enums
  down the line.
* [Logging] Added logging functionalities.
* [#1] Created `CompletionStatus` that is meant to emulate an enum class for
  `Actionable`'s completion status.

---
## [0.0.0] - 2023/04/09

### Added
* [Documentation] Added README.md to introduce the project to users and
  developers.
* [Documentation] Added CHANGELOG.md to track changes. Will be adhereing to
  [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
* [git] Added .gitignore to ignore node modules folder.
* [Node.js] Setup package dependencies.
* [Node.js] Setup Javascript project settings and linting.
* [VS Code] IDE Setup with settings.json for formatting and launch.json for
  launch job.
* Added basic entry point for bot login.
