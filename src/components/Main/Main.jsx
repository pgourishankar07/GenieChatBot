import { useContext } from "react";
import { assets } from "../../assets/assets";
import "./Main.css";
import { Context } from "../../context/Context";

const Main = () => {
  const {
    prevPrompts,
    setPrevPrompts,
    onSent,
    recentPrompt,
    setRecentPrompt,
    input,
    setInput,
    showRes,
    loading,
    resData,
  } = useContext(Context);

  return (
    <div className="main">
      <div className="nav">
        <p>Genie ChatBot</p>
        <img src={assets.user_icon} alt="" />
      </div>
      <div className="main-container">
        {!showRes ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, Human.</span>
              </p>
              <p>How can I help You ?</p>
            </div>
            <div className="cards">
              <div
                className="card"
                onClick={() => {
                  setInput(
                    "Suggest me Beautiful places to visit before leaving this world"
                  );
                }}
              >
                <p>
                  Suggest me Beautiful places to visit before leaving this
                  world...
                </p>
                <img src={assets.compass_icon} alt="" />
              </div>
              <div
                className="card"
                onClick={() => {
                  setInput("Best StartUp Ideas for Teenagers");
                }}
              >
                <p>Best StartUp Ideas for Teenagers...</p>
                <img src={assets.bulb_icon} alt="" />
              </div>
              <div
                className="card"
                onClick={() => {
                  setInput(
                    "Brainstrom team bonding activities for our work retreat"
                  );
                }}
              >
                <p>
                  Brainstrom team bonding activities for our work retreat...
                </p>
                <img src={assets.message_icon} alt="" />
              </div>
              <div
                className="card"
                onClick={() => {
                  setInput("Top Recent Tech News");
                }}
              >
                <p>Top Recent Tech News...</p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resData }}></p>
              )}
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Ask Genie Anything..."
            />
            <div className="icon">
              {input ? (
                <img onClick={() => onSent()} src={assets.send_icon} alt="" />
              ) : null}
            </div>
          </div>

          <p className="bottom-info">
            Genie may display inaccurate info, including about people, so dont
            depend on this and use it for fun purpose.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
