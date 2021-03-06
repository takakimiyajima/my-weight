π§οΈ  This app is still WIP π§οΈ

# About
![top_logo](https://user-images.githubusercontent.com/12868082/142035617-95388062-082e-4f6e-8c16-5f24f63bfa56.png)

This is a app you can check your weight daily.


# Why I created this app
I created this app to show my developing skill.  
I can write clean codes in Next.js and TypeScript with good architecture which makes the app sustainable.
 

<!-- TODO: ε―θ½γ§γγγ°UIγγΆγ€γ³γγ’γγΌγ«γγ -->

# Language, Libraries and Tools
- Next.js
- TypeScript
- styled-components
- Sass
- eslint, prettier
- react-hook-form (validation)
- husky
- microCMS
- Vercel

In order to work with architecture, I'm conscious of AtomicDesign and CleanArchitecture. They enables you to write clean and readable codes by separation of concerns.

I intend to write test codes using Jest but I wanted to put a priority on developing features so I haven't written test cases this time yet. Of course, I know that writing test first is better though.

# Architecture
<img width="718" alt="Architecture" src="https://user-images.githubusercontent.com/12868082/142047361-bace11d6-6065-4164-bf2b-02a26f16eeed.png">

## Data Layer
In data layer there are Repository, Entity and Hook. All of them has interface therefore it's easy to replace module and test. 

Repository is just responsible for getting data from API(microCMS in this case).  
For instance, `WeightRepository` connects to API to get weight-related data, and `UserRepository` connects to API to get user data.  
The role of the Entity is to make the front application independent of the values returned by microCMS.
It has a method for mapping JSON returned from the endpoint to the domain type.
If you need some data using each entities, you can use hooks and make data at presentation upper layer such as Pages.
## UI Layer
UI layer architecture is aware of AtomicDesign.
I'm using `next-useragent` to separate the SP and PC UI.

## Directory structure
| Directory       | Detail         |
| -----------     | ----------- |
| public          | Static file |
| src/components  | React components |
| src/constants   | Where to put the constants |
| src/entities    | See Data Layer above. |
| src/hooks       | custom hooks |
| src/libs        | Calling the library. Library repository written in Scratch. |
| src/pages       | Next.js Pages |
| src/repositories| External API calls. Wrap API client code generated in the api directory. |
| src/styles      | css |
| src/test        | test (WIP) |
| src/utils       | General purpose utility |

# CI and Deployment
Checking eslint is done with husky when it is committed.
Deployment is done automatically by Vercel.

# Upcoming Features
- Adjust style
- Notifications
- Cache data using SWR

# License
```
Copyright 2021 Takaki Miyajima
```