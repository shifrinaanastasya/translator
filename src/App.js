
import React, { useState } from "react";
import "./styles.css";
import Field from "./components/field";
import Translate from "./components/translate";

export default function App() {
  const [text, setText] = useState("");
  const [translated, setTranslated] = useState("");

  return (
    <div className="container">
    <Field
    label="Введите текст на русском"
    value={text}
    onChange={setText}
    />
    <Translate
    text={text}
    translated={translated}
    onTranslated={setTranslated}
    />
    </div>
  );
}
