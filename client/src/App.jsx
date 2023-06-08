import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useRef } from "react";

import HomePage from "./pages/HomePage/HomePage";
import AboutUs from './pages/AboutUs/AboutUs';
import LoginPage from './pages/LoginPage/LoginPage';
import SignupPage from "./pages/SignupPage/SignupPage";
import Contact from './pages/Contact/Contact';

import { CreatePost } from "./components/CreatePost";
import { MindCommunity } from "./pages/MindCommunity/MindCommunity";
import Header from './components/Header/Header';
import { Post } from "./components/Post";
import { Subcategory } from "./components/Subcategory";
import { RelatedPost } from "./components/RelatedPost";
import { SavedPosts } from "./components/SavedPosts";
import { SubmittedPosts } from "./components/SubmittedPosts";
import { CreateSubcategory } from "./components/CreateSubcategory";
import { SearchedPost } from "./components/SearchedPost";
import MindBlog from "./pages/MindBlog/MindBlog";
import DirectoryPage from "./pages/DirectoryPage/DirectoryPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import ValidationPage from './pages/ValidationPage/ValidationPage'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [modal, setModal] = useState(false);
  const [focusOne, setFocusOne] = useState(false);
  const [sort, setSort] = useState("");

  const refOne = useRef(null);

  const handleCloseSearch = (e) => {
    if (!refOne.current.contains(e.target)) {
      setFocusOne(false);
    } else {
      setFocusOne(true);
    }
  };

  return (
    <BrowserRouter>
      <Header
        focusOne={focusOne}
        refOne={refOne}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        modal={modal}
        setModal={setModal}
      />
      <Routes>
        <Route
          path='/community'
          element={
            <MindCommunity
              isLoggedIn={isLoggedIn}
              modal={modal}
              setModal={setModal}
              sort={sort}
              setSort={setSort}
            />
          }
        />

        <Route path="/login" element={
          <LoginPage
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
          />} />

        <Route path="/signup" element={
          <SignupPage
            focusOne={focusOne}
            refOne={refOne}
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            modal={modal}
            setModal={setModal}
          />
        } />

        <Route path="/" element={<HomePage />} />
        <Route path="/us" element={<AboutUs />} />
        <Route path="/blog" element={<MindBlog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/directory" element={<DirectoryPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/signup/otp" element={<ValidationPage />} />

        <Route path='/createPost' element={<CreatePost />} />
        <Route path='/createSubcategory' element={<CreateSubcategory />} />
        <Route
          path='/savedPosts'
          element={<SavedPosts setModal={setModal} isLoggedIn={isLoggedIn} />}
        />
        <Route
          path='/submittedPosts'
          element={
            <SubmittedPosts setModal={setModal} isLoggedIn={isLoggedIn} />
          }
        />
        <Route
          path='/:subcategory'
          element={
            <Subcategory setModal={setModal} isLoggedIn={isLoggedIn} />
          }
        />
        <Route
          path='/posts/:sortType'
          element={
            <MindCommunity
              isLoggedIn={isLoggedIn}
              modal={modal}
              setModal={setModal}
              sort={sort}
              setSort={setSort}
            />
          }
        />

        <Route
          path='/:subcategory/:postId'
          element={
            <RelatedPost setModal={setModal} isLoggedIn={isLoggedIn} />
          }
        />
        <Route
          path='/search/:query'
          element={
            <SearchedPost setModal={setModal} isLoggedIn={isLoggedIn} />
          }
        />
        <Route
          path='/sort'
          element={
            <SearchedPost setModal={setModal} isLoggedIn={isLoggedIn} />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
