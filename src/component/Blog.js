import { useState, useEffect } from "react";
import "./popup.css";

export default function Blog(props) {
  const [postId, setPostId] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/comments")
      .then((response) => response.json())
      .then((data) => {
        const latestPostId = data[data.length - 1]?.id || 0;
        setPostId(latestPostId + 1);
      })
      .catch((error) => {
        console.error("Error fetching latest postId:", error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = {
      postId,
      name,
      email,
    };

    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/comments",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        }
      );

      if (response.ok) {
        console.log("Data posted successfully:", await response.json());
        setSubmitted(true);
        setName("");
        setEmail("");
        setTimeout(() => {
          props.setTrigger(false);
          setSubmitted(false);
        }, 2000);
      } else {
        console.error("Failed to post data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const Close = (e) => {
    e.preventDefault();
    props.setTrigger(false);
  };

  return props.trigger ? (
    <div className="container">
      <div className="overlapping">
        <a onClick={Close} href="#" className="close-button">
          X
        </a>
        {submitted ? (
          <h2 className="thank-you">Thank You!</h2>
        ) : (
          <>
            <h2 className="text-stone-300">Blog Post</h2>
            <div className="w-[500px] flex justify-center items-center">
              <div>
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    placeholder="PostId"
                    value={postId}
                    readOnly
                    className="textbox"
                  />
                  <input
                    className="textbox"
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <input
                    className="textbox"
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button type="submit">Submit</button>
                </form>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  ) : (
    ""
  );
}
