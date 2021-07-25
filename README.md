# SoulShot

[SoulShot](https://soulshot.herokuapp.com/) is a photojournalism site focused cultivating a community of storytellers through the sharing and discussion of moments in time through photos.

## Description

SoulShot's goal is to help people share the stories behind the photos they take. It is a clone of Flickr but with a focus on photojournalism and story-telling through community discussion.

It was created with Javascript, Express, Sequelize, React, and Redux.

### Screenshots

Login

Homepage
<img src='(https://imgur.com/ZBuyJNZ'></img>

Image Detail / Comments
<img src='https://imgur.com/l0tRN6e'></img>

Albums

<img src='https://imgur.com/3t5QuSm'></img>

## Getting Started

### Installing

* Download project from https://github.com/makon57/soulshot
```
npm install
```

## Features

* Login / Signup / Demo Login
* Add / Update / Delete images
* Organize images into albums
* Add / Update / Delete albums
* Add / Update / Delete comments

## Technologies

* React.js
* Redux
* Javascript
* JSON API
* PostgreSQL
* Heroku

## Technical Details

The most difficult part was figuring out how to edit/update the images, albums, and comments. It was especially hard to figure out how to connect the albums and images in my joins table. After wrappig my head around it the first time around the idea of the joins table and how to key into other models were made simpler with the other features.

<img src='https://imgur.com/uUnngwL' alt='code1'></img>

Another difficlty I had was with the comments and the functionality as well as visibilty of editing and deleting a comment. Each comment was particular to a user, so with these conditions, I tried my best to make sure that the function of editing and deleting a comment was only visible and available to the user that made the comment. 

<img src='https://imgur.com/QdCUApc' alt='code2'></img>

## To-do / Future Features

* Tags
* Search Bar
* Follow
* AWS

## Acknowledgments

Inspiration, code snippets, etc.
* [Pexels](https://www.pexels.com/)
* [Flickr](https://www.flickr.com/)
