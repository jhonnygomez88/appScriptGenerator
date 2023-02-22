# QueryAppScriptGenerator

Generate the .side file (selenium) to create tables in QueryApp.

## ENV File Structure

## How to config the environment
- Configure the .env file
- Download the node dependencies (`npm install`)

## How to create a .side file
Run the following command: `node index.js [SCHEMA] [TABLE] [DC] [destination]`

Example: `node index.js HEALTHQA ROSTER_ATTENDEE_CEBNOW BDU /Users/jhonnygomez/Desktop/MY_SCRIPTS/`

## Notes: 
1. The `DC` values can be `BDU` or `JAX` or `BOTH`
2. Always end the destination with (`/`)
3. Always check if the table isn't already created in queryApp before generate and execute the side file.

## Useful links:
- [Firefox](https://www.mozilla.org/en-US/firefox/download/)
- [Selenium IDE](https://addons.mozilla.org/en-US/firefox/addon/selenium-ide/)


