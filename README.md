# Fapla App

## `About project`

This application is a To-Do list for families, where you can create your personal account via Google or your email.

## `Functionality`

- Registration via Google is done using Google OAuth 2.0, and registration via email is done through Supabase.
- Upon accessing your personal account page, you can create a family and add family members, specifying their roles in the family.
- With family members added, you can create tasks. Each task has its own level of difficulty and corresponding points. When a task is completed, the family member earns points (stars).
- All data is stored in a MongoDB database and will always be accessible.

## `Video about the application (English):`

https://youtu.be/E7aro8HNCWc

## `IMAGES`

<b>WEB</b>\
<img src="https://github.com/TigerTimofey/fapla-app/assets/119110538/f431e78a-a649-476e-8f7a-7a09425945a3" alt="1"  height="240">\
<b>TABLET</b>\
<img src="https://github.com/TigerTimofey/fapla-app/assets/119110538/fdebac93-7e6d-4725-83fb-98b27ca30c2a" alt="2" height="240">\
<b>PHONE</b>\
<img src="https://github.com/TigerTimofey/fapla-app/assets/119110538/8764de3e-4329-4303-8926-35db03e1da8c" alt="3"  height="240">\

## `Versions and used packages`

    "@mui/material": "^5.15.6",
    "@mui/styled-engine-sc": "^6.0.0-alpha.13",
    "@supabase/auth-ui-react": "^0.4.7",
    "@supabase/auth-ui-shared": "^0.1.8",
    "@supabase/supabase-js": "^2.39.3",
    "react": "^18.2.0",
    "react-beautiful-dnd": "^13.1.1",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.21.3",

## `Dependencies`

    "cors": "^2.8.5",
    "dotenv": "^16.4.4",
    "express": "^4.18.2",
    "mongoose": "^8.1.1"
