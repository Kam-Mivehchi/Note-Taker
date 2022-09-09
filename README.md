# Note-Taker

## Updates
Application was refactored on September 8, 2022. Application backend was rebuilt from the ground up. This version utilizes async/await pattern to handle all ansychronous requests and functions. Additionally, the codebase has been consolodated and standardized throught the use of a Notes and Storage object Class. Overall, these changes improved code readability and memory usage.

## Description
 - application establishes express backend to serve front end html
 - upon launch the user is presented with a landing/home page.
 - upon selecting the 'Get started' button, the user is routed to the /notes end point
 - user is presented with a split column layout in which all their previous notes are displayed along the left
 - user can enter a new note by selecting the save icon in the top right after entering a title and message
 - additonally user can delete notes they no longer need by selecting the trashcan icon
 - application stores user note data in json database
 - Deployed on heroku

## Links
### Deployment
    - heroku:https://notetaker-km.herokuapp.com/
### Repository
    -github:https://github.com/Kam-Mivehchi/Note-Taker

## Screenshot
![image](https://user-images.githubusercontent.com/90432404/148446165-53a29a98-1cb8-4caa-8413-c7d1306acce5.png)
![image](https://user-images.githubusercontent.com/90432404/148446227-dab37e14-67ab-48a5-9942-3360fad2f678.png)
![image](https://user-images.githubusercontent.com/90432404/148446238-cc7ac275-470e-4cb0-95de-0f9eef87323e.png)
![image](https://user-images.githubusercontent.com/90432404/148446240-e2a0b54c-2b09-4821-adf0-c7fae473d217.png)



