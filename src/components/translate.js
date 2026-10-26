
import React, { useEffect } from "react";
import axios from "axios";

const API_KEY = "dict.1.1.20261026T153249Z.2084c047cc3fe9cd.969421bfa31d2e4e1dada50a256e240334d19899";

const doTranslation = async (input, languageCode, cancelToken) => {
  const y = "https://dictionary.yandex.net/api/v1/dicservice.json";

  const url = `${y}/lookup`;

  try {
    const { data } = await axios.post(
      url,
      null,
      {
        params: {
          key: API_KEY,
          lang: `ru-${languageCode}`,
          text: input
        },
        cancelToken: cancelToken.token
      }
    );

    if (!data.def || !data.def.length ||
      !data.def[0].tr || !data.def[0].tr.length) {
      return "Перевод не найден";
      }

      return data.def[0].tr[0].text;
  } catch (err) {
    if (axios.isCancel(err)) {
      throw err;
    }

    console.error(
      "Ошибка Yandex Dictionary API:",
      err.response?.status,
      err.response?.data || err.message
    );

    return "Не удалось перевести";
  }
};

export default function Translate({
  text,
  translated,
  onTranslated
}) {
  useEffect(() => {
    if (!text.trim()) {
      onTranslated("");
      return;
    }

    const cancelToken = axios.CancelToken.source();

    const timer = setTimeout(() => {
      doTranslation(text.trim(), "en", cancelToken)
      .then(onTranslated)
      .catch((err) => {
        if (!axios.isCancel(err)) {
          console.error("Ошибка перевода:", err);
        }
      });
    }, 400);

    return () => {
      clearTimeout(timer);
      cancelToken.cancel();
    };
  }, [text, onTranslated]);

  return <h1 className="title">{translated}</h1>;
}
