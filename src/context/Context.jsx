import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showRes, setShowRes] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resData, setResData] = useState("");

  const delayPara = (index, nextWord) => {
    setTimeout(() => {
      setResData((prev) => prev + nextWord);
    }, 75 * index);
  };

  const newChat = () => {
    setLoading(false);
    setShowRes(false);
  };

  const onSent = async (prompt) => {
    setResData("");
    setLoading(true);
    setShowRes(true);

    let res;
    if (prompt !== undefined) {
      res = await run(prompt);
      setRecentPrompt(prompt);
    } else {
      setPrevPrompts((prev) => [...prev, input]);
      setRecentPrompt(input);
      res = await run(input);
    }

    let resArr = res.split("**");
    let newRes = "";
    for (let i = 0; i < resArr.length; i++) {
      if (i % 2 !== 0) {
        newRes += resArr[i];
      } else {
        newRes += "<b>" + resArr[i] + "</b>";
      }
    }
    let newRes2 = newRes.split("*").join("</br>");
    let newResArr = newRes2.split(" ");
    for (let i = 0; i < newResArr.length; i++) {
      const nextWord = newResArr[i];
      delayPara(i, nextWord + " ");
    }

    setLoading(false);
    setInput("");
  };

  const contextValue = {
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
    newChat,
  };
  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
