import "./Sidebar.css";
import { assets } from "../../assets/assets.js";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";

const Sidebar = () => {
  const [show, setShow] = useState(false);
  const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context);

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  };

  return (
    <div className="sidebar">
      <div className="top">
        <div
          className="menu"
          onClick={() => {
            setShow((prev) => !prev);
          }}
        >
          <img src={assets.menu_icon} alt=""></img>
          {show ? <p> Menu</p> : null}
        </div>

        <div className="new-chat" onClick={() => newChat()}>
          {/* <img src={assets.plus_icon} alt=""></img> */}
          <img
            src={assets.add_gif}
            style={{ borderRadius: "50%" }}
            alt=""
          ></img>
          {show ? <p>New Chat</p> : null}
        </div>
        {show ? (
          <div className="recent">
            <p className="recent-title">Recent</p>

            {prevPrompts.map((item, i) => {
              return (
                <div
                  key={i}
                  onClick={() => loadPrompt(item)}
                  className="recent-entry"
                >
                  <img src={assets.message_icon} alt="" />
                  <p>{item.slice(0, 18)}...</p>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Sidebar;
