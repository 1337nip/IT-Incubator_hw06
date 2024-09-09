import { postsType } from "../src/features/posts/models/postType"

export const fillUsers = [
  {
    "id": "1",
    "login": "Einstein",
    "passwordHash": "$2b$10$g5tZHQxi.jgEBU8H8vifauTxt9QXLVstdt6nTB3A7wbLtJffkGKvy",
    "email": "nodice@mail.com",
    "createdAt": "2024-09-08T18:24:21.794Z"
  },
  {
   
    "id": "2",
    "login": "Bohr",
    "passwordHash": "$2b$10$XassO/NxpSdl//PGy8Nd/.xjht0CDIs948SfObmA5qE0OL.8Bk5te",
    "email": "newphysics@test.com",
    "createdAt": "2024-09-08T18:25:44.946Z"
  }
  ]  

export const fillPosts:postsType[] = [
  {
    "id": "1",
    "title": "The Future of AI",
    "shortDescription": "Exploring upcoming trends in artificial intelligence.",
    "content": "Article",
    "blogId": "3",
    "blogName": "TechBuzz",
    "createdAt": "2024-01-15T10:20:00.000Z"
  },
  {
    "id": "2",
    "title": "Budget-Friendly Travel",
    "shortDescription": "How to travel without breaking the bank.",
    "content": "Hint",
    "blogId": "2",
    "blogName": "Travel Tales",
    "createdAt": "2023-12-05T08:35:00.000Z"
  }
]