import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Comment } from "./Comment";

export const Comments = ({ setModal }) => {
  const { postId } = useParams();

  const [comments, setComments] = useState([]);
  const [parentInput, setParentInput] = useState("");
  const [parentCommentId, setParentCommentId] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [notify, setNotify] = useState("");
  const [showNotify, setShowNotify] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchComments();
  }, []);
  useEffect(() => {
    if (parentInput) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [parentInput]);

  useEffect(() => {
    let timeoutId;
    if (notify) {
      setShowNotify(true);
      timeoutId = setTimeout(() => {
        setShowNotify(false);
        setNotify("");
      }, 1500);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [notify]);

  const parentComments = comments.filter((comment) => !comment.parentComment);

  const fetchComments = async () => {
    const res = await axios.get(`http://localhost:8000/comments/${postId}`, {
      headers: {
        Authorization: token,
      },
    });
    setComments(res.data);
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!token) {
      return setModal(true);
    }
    try {
      const res = await axios.post("http://localhost:8000/createComment", {
        body: parentInput,
        post: postId,
        parentCommentId: parentCommentId ? parentCommentId : null,
      }, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": token,
        },
      });
      setNotify(res.data.message);
      setParentInput("");
      fetchComments();
    } catch (error) {
      // Handle error
      console.log(error);
    }
  };

  return (
    <div className='md:w-[650px] md:mx-auto md:p-3 bg-white  '>
      {showNotify && (
        <div className='fixed inset-x-0 bottom-0 flex justify-center items-end mb-6 z-50 '>
          <div className='border-2 border-blue-500 py-2 px-5 bg-blue-50 text-lg  '>
            {notify}
          </div>
        </div>
      )}
      <form
        onSubmit={submitHandler}
        className='flex justify-center flex-col mb-3'
      >
        <textarea
          onChange={(e) => setParentInput(e.target.value)}
          className='border-2 border-gray-200 p-2'
          value={parentInput}
          cols='70'
          rows='5'
          placeholder='Comenta la publicación...'
        ></textarea>
        <button
          disabled={disabled}
          className={
            !disabled
              ? " bg-blue-600 text-white  rounded-lg mt-1 py-1 hover:opacity-90"
              : "cursor-not-allowed bg-gray-400 rounded-lg mt-1 py-1"
          }
        >
          Crear comentario
        </button>
      </form>
      <div>
        {parentComments.map((parentComment, index) => (
          <Comment
            setModal={setModal}
            parentComment={parentComment}
            comments={comments}
            key={index}
            fetchComments={fetchComments}
            postId={postId}
          />
        ))}
      </div>
    </div>
  );
};
