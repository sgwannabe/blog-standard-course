import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { Configuration, OpenAIApi } from "openai";
import clientPromise from "../../lib/mongodb";

const postContentResponse = await openai.createChatCompletion({
  model: "gpt-3.5-turbo",
  temperature: 0,
  messages: [
    {
      role: "system",
      content: "You are a blog post generator",
    },
    {
      role: "user",
      content: `Write a long and detailed SEO-friendly blog post about ${topic}, that targets the following comma-seperated keywords: ${keywords}
    The content should be formatted in SEO-friendly HTML,
    limited to the following HTML tags: p, h1, h2, h3, h4, h5, h6, strong, li, ol, ul, i`,
    },
  ],
});

const postContent = postContentResponse.data.choices[0]?.message?.content || "";

const titleResponse = await openai.createChatCompletion({
  model: "gpt-3.5-turbo",
  temperature: 0,
  messages: [
    {
      role: "system",
      content: "You are a blog post generator",
    },
    {
      role: "user",
      content: `Write a long and detailed SEO-friendly blog post about ${topic}, that targets the following comma-seperated keywords: ${keywords}
    The content should be formatted in SEO-friendly HTML,
    limited to the following HTML tags: p, h1, h2, h3, h4, h5, h6, strong, li, ol, ul, i`,
    },
    {
      role: "assistant",
      content: postContent,
    },
    {
      role: "user",
      content: "Generate appropriate title tag text for the above blog post",
    },
  ],
});

const metaDescriptionResponse = await openai.createChatCompletion({
  model: "gpt-3.5-turbo",
  temperature: 0,
  messages: [
    {
      role: "system",
      content: "You are a blog post generator",
    },
    {
      role: "user",
      content: `Write a long and detailed SEO-friendly blog post about ${topic}, that targets the following comma-seperated keywords: ${keywords}
    The content should be formatted in SEO-friendly HTML,
    limited to the following HTML tags: p, h1, h2, h3, h4, h5, h6, strong, li, ol, ul, i`,
    },
    {
      role: "assistant",
      content: postContent,
    },
    {
      role: "user",
      content:
        "Generate SEO-friendly meta description text for the above blog post",
    },
  ],
});

const title = titleResponse.data.choices[0]?.message?.content || "";
const metaDescription =
  metaDescriptionResponse.data.choices[0]?.message?.content || "";

console.log("Post Content : ", postContent);
console.log("Title : ", title);
console.log("Meta Description : ", metaDescription);
