![](https://github.com/newyorker/github-sound-notifications/blob/master/readme/head.png)

# Sound Notification Bot

Notify your team with sound when your Github repository changes. 

## Getting started

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy?template=https://github.com/newyorker/github-sound-notifications)

1. Set up a Heroku instance of the Github Sound Notifications repository with your custom URL. 

2. Set up a Github webhook to your Heroku endpoint. The heroku endpoint is `http://{{your-heroku-name}}.herokuapp.com/listen`. 

3. Set up the webhook with "everything".
Example Webhook: `http://your-heroku-name.herokuapp.com/listen`

4. Open the bot up on the machine that will notify. 
Example URL: `http://your-heroku-name.herokuapp.com/`

![](https://github.com/newyorker/github-sound-notifications/blob/master/readme/webhook.png)


## Credits

Code from [New Yorker](http://www.github.com/newyorker).

[Assets from theses awesome folks](https://github.com/newyorker/github-sound-notifications/blob/master/readme/credits.md).

## Issues or questions

[Submit an issue](https://github.com/newyorker/most-popular/issues) or [email Leonard Bogdonoff](mailto:leonard_bogdonoff@condenast.com)

## License

License: [The MIT License (MIT)](http://opensource.org/licenses/MIT)
