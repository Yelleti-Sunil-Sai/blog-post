import "./App.css";
import { useEffect, useState } from "react";

import Blog from "./component/Blog";

function App() {
  const [data, setData] = useState([]);
  const [buttonPopup, setButtonPopup] = useState(false);
  const url = "https://jsonplaceholder.typicode.com/comments";

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setData(json);
      });
  }, []);

  return (
    <div>
      <div className="flex bg-[#a68b8b]">
        <div className="w-[50%]"></div>
        <div className="flex justify-between items-center w-[50%] p-5 ">
          <h1>Contents</h1>
          <a
            className="mr-52 bg-slate-600 w-[60px] h-[40px] text-white flex items-center justify-center px-2 rounded-lg cursor-pointer no-underline"
            onClick={() => setButtonPopup(true)}
          >
            Blog
          </a>
        </div>
      </div>
      <div>
        <div className="mt-3 w-[100vw] h-[160px] rounded-xl flex flex-row flex-wrap justify-around ">
          {data.map((sunil) => (
            <div
              key={sunil.id}
              className="m-1 mb-5 w-[30%] h-[35rem] flex flex-col items-center bg-white rounded-[20px]"
            >
              <div className="bg-[#f7f4ef] w-[95%] h-[50%] flex justify-center items-center mt-[10px] rounded-t-[10px] border">
                <img
                  className="w-[200px] h-[200px] object-cover rounded-full"
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt=""
                />
              </div>
              <div className="mt-[10px] h-[50%] flex flex-col items-center roboto border-solid-1p">
                <div>
                  <p className="text-2xl font-extrabold opacity-75">
                    PostId: {sunil.id}
                  </p>
                </div>
                <div className="flex flex-wrap w-[20rem]">
                  <p>Name: {sunil.name}</p>
                </div>
                <div className="w-[20rem]">
                  <p>Email: {sunil.email}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Blog trigger={buttonPopup} setTrigger={setButtonPopup} />
    </div>
  );
}

export default App;
