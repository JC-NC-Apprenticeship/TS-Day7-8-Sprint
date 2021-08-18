# React and TypeScript

## Setup

If there are any issues with the vscode not recognising the --jsx flag this will be because of a conflict between vscode version and the TypeScript(TS) version in react. Solution to this problem is [here](https://www.reddit.com/r/react/comments/k0bw7y/compileroptionsjsx_must_be_reactjsx_to_support/)

Otherwise, you can run `npm start` and you're on your way!

## Instructions Day 1

The App, Posts and SinglePost components have been written but are not all type safe. Your first task is to install the necessary TS dependencies and fix the type errors shown. Try hovering over variables. If they have an `any` type, see if there is a way you can narrow it.

Following this you will be fulfilling some user stories. You will want to build pages/components using React. The API schema you created yesterday will be used to type safe responses sent from the backend and received via your frontend requests.

Feel free to use class based or hooks syntax, whichever you're more comfortable with. Of course try to stick with one or the other.

You will need to set up requests to the backend. Use the api.js and axios to make your api requests. To make requests to the backend provided, first cd into the backend directory and then run the script `npm run dev` to start the server.

- build the api request functions in `api.ts`. Be sure to type safe them! Then you can import them to the required components.

### Things to try and implement/consider

1. To reduce clutter in your code, introduce new components where there is some form of repetition.
2. Try not to repeat yourself. Remember that React/tsx is like marriage of TS and HTML, you can map over an array of data and return components/elements! You should rarely need to copy and paste lots of the same element!

### User Stories

- As a user, I would like to be able to view the comments for a single post.

- As a user, I would like to post a comment.

- As a user, I also want to be able to delete one of my comments.

- As a user, I'd like to be able to log out, once I've logged in!

### Extra User Stories

- As a user, I would like to be able edit a comment I have previously posted.

- As a user I want to be able to reply to a comment.

- As a user I would like to see a the comments for a specific post and any replies made to each comment.

## Instructions Day 2

Your task today is to get used to the flow of end-to-end TS and understand how it can help inform us of type errors throughout a whole application.
