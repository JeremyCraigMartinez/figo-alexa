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

#Dialog

**Alexa, open Bankapizza**
*Moin digga, was gehts?*

**Let's do a bit of online shopping. What is the price of the new Samsung Galaxy Note 7?**
*The Samsung Galaxy Note 7 cost 720 Euro*

**What is my account balance**
*Which account do you mean, PayPal or Giro?*

**What is my PayPal account balance?**
*You have 1 dollar in your PayPal account*

**Woah, okay, select Giro account**
*You have 1350 euros in your Giro account*

**Do I have any upcoing payments scheduled?**
*Yes, you have 1. You owe a tremendous 600 euro to Donald Trump on the 20th of each month*

**Can I afford the Samsung phone?**
*Yes, after your purchase and payment to Donald Trump you will have 30 Euro in your account.

**Umm, that can't be right... Alexa, give me a summary**
*The Samsung Galaxy Note costs 720 Euro and your Balance is 1350 Euro. You have  outgoing payments planed of 600 Euro which means you will have 30 euro left*

**When can I expect my next paycheck?**
*Based on recent account history, your paycheck should come on the 26th*

**OK, ask my bank for a loan**
*You can fund a loan of 200 euro for 1 euro a day until October 26th*

**Alright, confirm the loan**
*Loan of 200 EUR confirmed. Expected fee for the loan is 15 Euro*

**Buy the Galaxy Note 7**
*Purchase confirmed.  Based on the purchase we strongly recommend a fire extinguisher.*

**Ok Alexa, let's wrap this up. Do we have enough to order some pizzas for everybody?**
*Honestly, you just took out a loan, should you really be buying pizza right now*

**Ah don't be so negative Alexa, order me some pizza**
*OK, what pizza would you like?*

**Tell them you want the Bob Marley, extra crispy. They'll know what you're talking about**
*OK, your pizza is coming*

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
