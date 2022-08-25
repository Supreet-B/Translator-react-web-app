import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import axios from "axios";

export default function Translate() {
  const [inputText, setInputText] = useState("");
  const [resultText, setResultText] = useState("");
  const [languagesList, setLanguagesList] = useState([]);
  const [detectLanguageKey, setdetectedLanguageKey] = useState("");
  const [selectedLanguageKey, setLanguageKey] = useState("");
  const translateText = () => {
    let data = {
      q: inputText,
      source: detectLanguageKey,
      target: selectedLanguageKey,
    };
    axios
      .post(`https://libretranslate.de/translate`, data)
      .then((response) => {
        setResultText(response.data.translatedText);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const languageKey = (selectedLanguage) => {
    setLanguageKey(selectedLanguage.target.value);
  };

  useEffect(() => {
    const getLanguageSource = () => {
      axios
        .post(`https://libretranslate.de/detect`, {
          q: inputText,
        })
        .then((response) => {
          setdetectedLanguageKey(response.data[0].language);
        })
        .catch((error) => {
          console.log(error.message);
        });
    };

    getLanguageSource();
  }, [inputText]);

  useEffect(() => {
    axios
      .get(`https://libretranslate.de/languages`)
      .then((response) => {
        setLanguagesList(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  });

  return (
    <div>
      <div className="app-header">
        <h1 className="header">Translator</h1>
      </div>
      <div className="app-body">
        <Form>
          <Row>
            <Col>
              <Form.Control
                as="textarea"
                placeholder="Type text to translate"
                onChange={(e) => setInputText(e.target.value)}
                style={{ height: "200px", width: "450px", margin: "2px" }}
              />
            </Col>
            <Col>
              <Form.Control
                as="textarea"
                placeholder="translated text"
                value={resultText}
                style={{ height: "200px", width: "450px", margin: "2px" }}
                readOnly
              />
            </Col>
          </Row>
          <br></br>
          <Row>
            <Col></Col>
            <Col>
              <Form.Select
                aria-label="Default select example"
                onChange={languageKey}
              >
                <option>Please Select Language..</option>
                {languagesList.map((language, index) => {
                  return (
                    <option key={index} value={language.code}>
                      {language.name}
                    </option>
                  );
                })}
              </Form.Select>
            </Col>
            <Col></Col>
          </Row>
          <br></br>
          <Row>
            <Col>
              <Button variant="dark" onClick={translateText}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-translate"
                  viewBox="0 0 16 16"
                >
                  <path d="M4.545 6.714 4.11 8H3l1.862-5h1.284L8 8H6.833l-.435-1.286H4.545zm1.634-.736L5.5 3.956h-.049l-.679 2.022H6.18z" />
                  <path d="M0 2a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v3h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-3H2a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H2zm7.138 9.995c.193.301.402.583.63.846-.748.575-1.673 1.001-2.768 1.292.178.217.451.635.555.867 1.125-.359 2.08-.844 2.886-1.494.777.665 1.739 1.165 2.93 1.472.133-.254.414-.673.629-.89-1.125-.253-2.057-.694-2.82-1.284.681-.747 1.222-1.651 1.621-2.757H14V8h-3v1.047h.765c-.318.844-.74 1.546-1.272 2.13a6.066 6.066 0 0 1-.415-.492 1.988 1.988 0 0 1-.94.31z" />
                </svg>
                &nbsp;&nbsp;Click to translate
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
}
