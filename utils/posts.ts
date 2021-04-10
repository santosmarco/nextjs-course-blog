import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { Post } from "../types";

const POSTS_DIR_PATH = path.join(process.cwd(), "db/posts");

export const getPostFiles = () => {
  const postFiles = fs.readdirSync(POSTS_DIR_PATH);
  return postFiles;
};

export const getPostData = (fileName: string): Post => {
  const filePath = path.join(POSTS_DIR_PATH, fileName);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const {
    data: { title, author, coverImg, excerpt, postedAt, featured },
    content,
  } = matter(fileContent);

  const post: Post = {
    slug: fileName.split(".")[0],
    title,
    author,
    coverImg,
    excerpt,
    postedAt,
    featured,
    content,
  };

  return post;
};

export const getAllPosts = (): Post[] => {
  const postFiles = getPostFiles();
  return postFiles.map(getPostData);
};

export const getPost = (slug: string) => {
  return getAllPosts().find((post) => post.slug === slug);
};

export const getFeaturedPosts = () => {
  return getAllPosts().filter((post) => post.featured);
};
