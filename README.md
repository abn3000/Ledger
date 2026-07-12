# Ledger
An indoor and outdoor plant manger to keep track of watering, light levels, and plant health for 100+ unique species.

Hosted on Netlify: https://agent-6a52e7d8d4539--stunning-buttercream-59c616.netlify.app/


## Inspiration
Ledger was inspired by our own experiences with taking care of household plants and serves to solve a problem for busy people who may not be able to commit as much time to plant care. Plenty of information is available online, but there aren't many good resources that compile this plantkeeping knowledge.

## What it does
Ledger provides a space for users to keep track of how their plants are doing. It provides information about what each plant requires, such as light and water. Additionally, users can take photos of their plants to instantly assess health and receive curated care tips.

## How we built it
Ledger is written in JavaScript, using a JSX file in order to incorporate HTML-like components into JavaScript code. We created a database of common household plants, and assigned information about watering and light for each one. We also set up an Anthropic AI to act as a plant expert and give feedback on users' setups for their plants. This made up the majority of our back-end, and we used CSS-like styles to make our front-end.

## Challenges we ran into
The biggest challenge was definitely getting our hosting to work. It was challenging to find a host that could work with our .jsx file (GitHub pages does not work). Even when we got it working, we ran into an issue with the plants being uploaded globally, so every user shared the same garden. Thankfully, we were able to fix this to allow every user to have their own garden, which also saves on reload. Another challenge was getting the AI image analysis to work on the website, since it would keep saying the image was blurry even if it was clear. We fixed this by ensuring our code was running the image check every time, though there are some credit limits.

## Accomplishments that we're proud of
Firstly, we are proud of being able to make a functioning, hosted website that works, especially since our team members are all new to hackathons. We were also very happy with how our website looks, and we spent a lot of time perfecting the styles. Finally, the whole team was satisfied with our demo video, since, and we all feel that it did Ledger justice without being overly wordy or boring.

## What we learned
We learned a lot about deploying our own website, especially when it comes to using a .jsx file. This was especially challenging because of the AI features, which would often tend to stop working. We also learned about complex JavaScript coding, which built upon our past experiences with simple HTML websites. As a bonus, we also learned about taking care of plants properly. Hopefully, our houseplants will stay alive for longer from now on.

## What's next for Ledger
For our next steps, we plan on converting Ledger into a full-fledged app! For quality of life improvements, we want to bring Ledger to the mobile app store so that users can stay up to date via their phones.  On top of this, we would like to improve upon the photobook, allowing Ledger users to share their photobooks with friends and family.
