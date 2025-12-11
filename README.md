# 📖 My own danish-japanese wordbook🇩🇰🇯🇵
A simple Danish vocabulary learning app for japanese speaker.
Users can sign up, log in, add words, edit them, delete them, and search.

⚠️ NOTE: 
The deployed version on Netlify is temporarily unavailable
due to Netlify’s free-tier credit limit.

The app will be back online on January 3rd.

## 📝 Features
- User authentication with Supabase
- Add / edit / delete words
- Sort words (oldest / latest / alphabetical / random)
- Search by danish words
- Stores data per user (RLS enabled)
- Quick access to DDO(Den Danske Ordbog)
- On-screen special character input (å, æ, ø)
- Responsive(PC/iPad/iPhone)

## 👀 Sneak peak

- After login, you will have your own wordbook!

![Home](images/home.png)

- One-tap access to Japanese meanings
- Open the DDO page with the book icon
- Words can be easily edited or deleted as needed

![Home2](images/home2.png)

- Add/edit form with special character input (æ, ø, å)

![Add-form](images/add-form.png)


## 💻 Tech Stack
<p>
  <img src="https://skillicons.dev/icons?i=html,css,scss,js,react,supabase,netlify," />
</p>


## 🗂️ Project structure
```
- src/
 ├── components/
 │    ├── AddButton.js
 │    ├── Card.js
 │    ├── Cards.js
 │    ├── LogoutButton.js
 │    ├── Search.js
 │    └── WordForm.js
 ├── hooks/
 │    ├── useWord.js
 ├── pages/
 │    ├── Auth.js
 │    └── Home.js
 ├── styles/
 │    ├── base
 │    │    ├── _global.scss
 │    ├── components
 │    │    ├── _button.scss
 │    │    ├── _card.scss
 │    │    ├── _form.scss
 │    ├── layout
 │    │    ├── _header.scss
 │    │    ├── _modal.scss
 │    ├── pages
 │    │    ├── _home.scss
 │    │    ├── _login.scss
 │    └── variables.scss
 └── utils/
      └── generateTimestamp.js
```


## 🔗 Deployment
This app is deployed on Netlify:  
https://min-ordbog.netlify.app/


## 💡 Upcoming features
- Allow users to archive learned words instead of deleting them
- Enable switching the card’s base language between Danish and Japanese
