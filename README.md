#advice on using Alexa

JUST DO IT

#How to run

```bash
# clone this repo
git clone git@github.com:JeremyCraigMartinez/figo-alexa.git
# run npm install
git clone https://github.com/matt-kruse/alexa-app-server.git
# run npm install
ln -s figo-alexa alexa-app-server/examples/apps
cd alexa-app-server/examples
node server
# and you're off!
```

##AWS setup

####Alexa app settings
* name and invocation name https://developer.amazon.com/edw/home.html#/skill/amzn1.ask.skill.5336c346-7ef3-408b-a18c-ab357fca86a3/en_US/info
* intent schema, custom slot type, sample utterances
https://developer.amazon.com/edw/home.html#/skill/amzn1.ask.skill.5336c346-7ef3-408b-a18c-ab357fca86a3/en_US/intentSchema/list
* config and arn
https://developer.amazon.com/edw/home.html#/skill/amzn1.ask.skill.5336c346-7ef3-408b-a18c-ab357fca86a3/en_US/configuration
* test enable/disable
https://developer.amazon.com/edw/home.html#/skill/amzn1.ask.skill.5336c346-7ef3-408b-a18c-ab357fca86a3/en_US/testing

####Lambda function configuration
https://console.aws.amazon.com/lambda/home?region=us-east-1#/functions/figo-alexa?tab=configuration

####Useful links
https://www.bignerdranch.com/blog/developing-alexa-skills-locally-with-nodejs-deploying-your-skill-to-staging/
https://www.youtube.com/watch?v=m6bFGiW1ICw

### Possible phrases
https://quip.com/3VMhArc0Qw5m
