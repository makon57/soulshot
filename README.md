# SoulShot

[SoulShot](https://soulshot.herokuapp.com/) is a photojournalism site focused cultivating a community of storytellers through the sharing and discussion of moments in time through photos.

## Description

SoulShot's goal is to help people share the stories behind the photos they take. It is a clone of Flickr but with a focus on photojournalism and story-telling through community discussion.

## Technologies

* React.js
* Redux
* Javascript
* JSON API
* PostgreSQL
* Heroku

## [SoulShot](https://soulshot.herokuapp.com/) (screenshots)

### Login

<img src='images/Screen Shot 2021-07-24 at 11.52.31 PM.png' />

### Homepage

<img src='images/Screen Shot 2021-07-24 at 11.50.10 PM.png' />
<img src='images/Screen Shot 2021-07-24 at 11.53.15 PM.png' />

### Image Detail / Comments

<img src='images/Screen Shot 2021-07-24 at 11.53.54 PM.png' />
<img src='images/Screen Shot 2021-07-24 at 11.54.49 PM.png' />

### Albums

<img src='images/Screen Shot 2021-07-25 at 12.47.55 AM.png' />

## Getting Started

### Installing

* Download project from https://github.com/makon57/soulshot
* Next ```npm install```
* To begin live server:
* Split two terminals and ```cd backend``` and ```cd frontend```
* Lastly,  ```npm start``` both terminals

## Features

* Login / Signup / Demo Login
* Add / Update / Delete images
* Organize images into albums
* Add / Update / Delete albums
* Add / Update / Delete comments

## Technical Details

The most difficult part was figuring out how to edit/update the images, albums, and comments. It was especially hard to figure out how to connect the albums and images in my joins table. After wrappig my head around it the first time around the idea of the joins table and how to key into other models were made simpler with the other features.

<img src='images/Screen Shot 2021-07-25 at 12.49.31 AM.png' />

Another difficlty I had was with the comments and the functionality as well as visibilty of editing and deleting a comment. Each comment was particular to a user, so with these conditions, I tried my best to make sure that the function of editing and deleting a comment was only visible and available to the user that made the comment.

<img src='images/Screen Shot 2021-07-25 at 12.42.31 AM.png' />

## To-do / Future Features

- [ ] Tags
- [ ] Search Bar
- [ ] Follow
- [ ] AWS

## Acknowledgments

Inspiration, code snippets, etc.
* [Pexels](https://www.pexels.com/)
* [Flickr](https://www.flickr.com/)
