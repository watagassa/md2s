const testMd = `
# 猫の可愛さについて

## 猫の特徴

- ふわふわの毛並み
- つぶらな瞳
- 甘えん坊な性格
- しなやかな体の動き

## 猫が愛される理由

- 鳴き声が愛らしい（例: 「にゃー」）
- 自由気ままな性格が魅力的
- 癒し効果が科学的にも証明されている

## 猫の写真例

（ここに写真を挿入してください）

## 猫との暮らしのメリット

- 心の癒しになる
- ストレスの軽減
- 親密なコミュニケーション

# まとめ

猫は見た目の可愛さだけでなく、人の心を癒す特別な存在です。
`;

const testMarp = `
---
marp: true
theme: default
paginate: true
---

# 猫の可愛さについて

---

## 猫の特徴

- ふわふわの毛並み
- つぶらな瞳
- 甘えん坊な性格
- しなやかな体の動き

---

## 猫が愛される理由

- 鳴き声が愛らしい（例: 「にゃー」）
- 自由気ままな性格が魅力的
- 癒し効果が科学的にも証明されている

---

## 猫の写真例

（ここに写真を挿入してください）

---

## 猫との暮らしのメリット

- 心の癒しになる
- ストレスの軽減
- 親密なコミュニケーション

---

# まとめ

猫は見た目の可愛さだけでなく、人の心を癒す特別な存在です。
`;

export const testPostData = {
  id: 1,
  user_name: "usr_name",
  user_icon:
    "https://lh3.googleusercontent.com/a/ACg8ocKbLTbImuR5zomWyqMHS79Yk2T7-ypmnS1-hjF6MZX8Wtn1C6M=s96-c",
  md: testMd,
  marp: testMarp,
};

export const testPostData2 = [
  {
    "id": "1",
    "create_user_id": "387a4e2d-5b8d-4d-9035-ee95680b66b4",
    "user_name": "user1",
    "user_icon": "https://example.com/icon.jpg",
    "title": "title1",
    "main_MD": "本文のMarkdown",
    "slide_MD": "スライドのMarkdown",
    "created_at": "2021-01-01T00:00:00Z",
    "updated_at": "2021-01-01T00:00:00Z",
    "like_count": 10,
    "public": true,
    "qiita_article": true,
    "tags": [
      {
        "id": "1",
        "name": "tag1"
      },
      {
        "id": "2",
        "name": "tag2"
      }
    ]
  },
  {
    "id": "2",
    "create_user_id": "387a4e2d-5b8d-4d-9035-ee95680b66b4",
    "user_name": "user2",
    "user_icon": "https://example.com/icon.jpg",
    "title": "title2",
    "main_MD": "本文のMarkdown",
    "slide_MD": "スライドのMarkdown",
    "created_at": "2021-01-01T00:00:00Z",
    "updated_at": "2021-01-01T00:00:00Z",
    "like_count": 10,
    "public": true,
    "qiita_article": false,
    "tags": [
      {
        "id": "1",
        "name": "tag1"
      },
      {
        "id": "2",
        "name": "tag2"
      }
    ]
  },
  {
    "id": "3",
    "create_user_id": "387a4e2d-5b8d-4d-9035-ee95680b66b4",
    "user_name": "user2",
    "user_icon": "https://example.com/icon.jpg",
    "title": "title2",
    "main_MD": "本文のMarkdown",
    "slide_MD": "スライドのMarkdown",
    "created_at": "2021-01-01T00:00:00Z",
    "updated_at": "2021-01-01T00:00:00Z",
    "like_count": 10,
    "public": true,
    "qiita_article": false,
    "tags": [
      {
        "id": "1",
        "name": "tag1"
      },
      {
        "id": "2",
        "name": "tag2"
      }
    ]
  }
];

export const testUserData = {
  id: "387a4e2d-5b8d-4d6d-9035-ee95680b66b4",
  name: "user1",
  icon: "/usr_icon.png",
  google_id: "151916161991",
  total_posts_articles: 3,
  total_get_likes: 10,
};
