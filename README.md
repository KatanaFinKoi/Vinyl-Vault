# Vinyl Vault

![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)


A comprehensive vinyl collection tracker designed to help users organize and showcase their record collections. Vinyl Vault provides detailed record information such as the artist, album, release date, and more. This application leverages modern technologies and APIs to deliver an intuitive and seamless experience.

## Usage
```
GIVEN Vinyl Vault app, for keeping a digital collection of vinyl a user owns
WHEN I load the app
THEN I am presented with the option to sign in using an email and password, or to create an account
WHEN I choose the create an account option
THEN I am able to enter an email and password to create an account
WHEN I sign in
THEN I am taken to the home page where I can choose to add an album, view my collection, or log out
WHEN I click on the add album button
THEN I am taken to a page with a search bar allowing me to type in an album name
WHEN I enter an album name
THEN an image of the album I searched shows up, with album details such as the album art, artist name and album title, year vinyl was released, and record label in addition to a web player allowing me to sample music from the album
WHEN I click the next button
THEN another vinyl release of the album is shown with the album art, artist name and album title, the year the vinyl was release, and the record label in addition to a web player allowing me to sample music from the album
WHEN I click on the previous button
THEN the previous results are shown on the screen again
WHEN I click the add album button
THEN a pop up appears on the screen saying the album has been added sucessfully and the album is added to my collection
WHEN I click the collection button
THEN I am taken to my collection, which will display the album art with the artist name, album name, and year released
WHEN I click on the album art
THEN I am taken to the album details page that shows the album art, artist name, album name, year released, labels for the record, and a web player that allows you to sample music from the album
WHEN I click the delete album button
THEN the album is removed from my collection
WHEN I click the logout button in the nav
THEN I am logged out of the app
```

## Features

- Add and manage your vinyl collection effortlessly.
- Display detailed record information including artist, album, release date, and more.
- Integrates with the **Discogs API** for up-to-date record details.
- Includes fun and unique daily quotes powered by the **Kanye.rest API**.
- Incorporates **Deezer API** for a built in music player to preview albums.
  
![vinylvault1](https://github.com/user-attachments/assets/7024f15d-c219-463f-b68b-41b742991d70)

![vinylvault2](https://github.com/user-attachments/assets/2085a2b6-cc3e-4d07-a336-47abf3c18935)

![vinylvault3](https://github.com/user-attachments/assets/6d03923a-944b-401a-ac4a-515f4b1a8243)

![vinylvault4](https://github.com/user-attachments/assets/0af61638-bd94-45ba-8c67-2fc57715b155)

![vinylvault5](https://github.com/user-attachments/assets/3727bdae-4502-4619-8dda-129cad06e325)

![vinylvault6](https://github.com/user-attachments/assets/d0c82ffe-6860-4e70-8231-2e85cb6970fd)



Vinyl Vault has been deployed using Render and is live at the following link: https://vinyl-vault-1.onrender.com



## Built With

Vinyl Vault is developed using a robust and modern tech stack:

- **Node.js**: Backend development and API handling.
- **JWT (JSON Web Tokens)**: User authentication and secure access.
- **PostgreSQL**: Relational database for storing user and collection data.
- **React**: Frontend framework for dynamic and responsive UI.
- **TypeScript**: Ensuring type safety and reducing runtime errors.
- **Discogs API**: Fetching comprehensive vinyl record information.
- **Kanye.rest API**: Adding a creative and fun twist with Kanye quotes.
- **Deezer API**: Allowing the user to preview their albums.

## Authors

This project was developed by the following team:

- Liam Rayback  
- Oscar Rendon  
- Andrew Soper  
- Fabricio Laboriel  

## Getting Started

### Prerequisites

- **Node.js** (v16 or later)  
- **PostgreSQL** (v14 or later)  


### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/KatanaFinKoi/vinyl-vault.git
   cd vinyl-vault
   npm install
   psql -U postgres
   /i schema.sql;
   npm run start:dev

## License
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

