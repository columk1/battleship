# Battleship

## Overview

A javascript Battleship game built with webpack. Users can play against the computer which uses an attack algorithm to locate the user's ships.

## Project Notes

This project was intended to combine much of what we have learned so far, with a focus on TDD. I implemented it using the MVC design pattern. The model is a number of factory functions which were built using TDD with Jest.

#### Live Link: [Battleship](https://top-battleship.netlify.app/)

## Features

- Rotate, drag and drop each ship to set up the board
- Autoplace ships button provides a random layout
- Recieve feedback when an enemy ship is destroyed
- Hunt and target algorithm with even parity attacks the player's ships

## To Do

- Accessibility
- Animation
- Button to clear board and start over when placing ships
- Allow users to move ships after they are placed or to undo a placement
- Improve attack algorithm using heatmaps
- Touch screen ship placement
