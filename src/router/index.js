import { createRouter, createWebHistory } from "vue-router";
import MainBody from "./../components/MainBody.vue";
import LoginApp from "./../components/LoginApp.vue";
import Books from "./../components/book/Books";
import Book from "./../components/book/Book";
import BooksAdmin from "./../components/book/BooksAdmin";
import BookEdit from "./../components/book/BookEdit";
import Users from "./../components/users/Users";
import UserEdit from "./../components/users/UserEdit";

const routes = [
  { path: "/", name: "Home", component: MainBody },
  { path: "/login", name: "Login", component: LoginApp },
  { path: "/books", name: "Books", component: Books },
  { path: "/books/:bookName", name: "Book", component: Book },
  { path: "admin/books", name: "BooksAdmin", component: BooksAdmin },
  { path: "admin/books/:bookId", name: "BookEdit", component: BookEdit },
  { path: "admin/users", name: "Users", component: Users },
  { path: "admin/users/:userId", name: "UserEdit", component: UserEdit },
];

const router = createRouter({ history: createWebHistory(), routes });

export default router;
