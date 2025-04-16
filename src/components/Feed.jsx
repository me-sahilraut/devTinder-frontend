import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserCard from "./common/UserCard";
import { addFeed } from "../utils/feedSlice";
import axios from "axios";

function Feed() {
  // const userData = useSelector((store) => store.user);
  const feed = useSelector((store) => store.feed);

  const dispatch = useDispatch();
  useEffect(() => {
    getFeed();
  }, []);
  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get("http://localhost:3000/feed", {
        withCredentials: true,
      });

      console.log("called");
      dispatch(addFeed(res?.data?.data));
    } catch (error) {
      console.log("Error :-", error);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);
  if (!feed) return;

  if (feed.length <= 0)
    return <h1 className="flex justify-center my-10">No new users founds!</h1>;

  return (
    feed && (
      <div className="flex justify-center my-10">
        <UserCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;
