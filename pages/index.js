import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import { useState } from 'react';


const Home = () => {
  const [userInput, setUserInput] = useState('');
  const [apiOutput, setApiOutput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);

    console.log("Calling OpenAI...")
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput }),
    });

    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output.text)

    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  }
  const onUserChangedText = (event) => {
    //console.log(event.target.value);
    setUserInput(event.target.value);
  };

  return (
      <div className="root">
        <Head>
          <title>Chat GPT School</title>
        </Head>
        <div className="container">
          <div className="header">
            <div className="header-title">
              <h1>Hey👋, now put you Soical Study questions here</h1>
            </div>
            <div className="header-subtitle">
              <h2>Service created and maintained by Joseph Dang</h2>
            </div>
          </div>
          <div className="prompt-container">
              <textarea placeholder="The Gettysburg Address" className="prompt-box" value={userInput}
                        onChange={onUserChangedText}/>
          </div>





          <div>
            <a className={isGenerating ? 'generate-button loading' : 'generate-button'} onClick={callGenerateEndpoint}>
              <div className="generate">
                {isGenerating ? <span className="loader"></span> : <p>Generate</p>}
              </div>
            </a>
          </div>
        </div>


        {apiOutput && (
            <div className="output">
              <div className="output-header-container">
                <div className="output-header">
                  <h3>Answers</h3>
                </div>
              </div>
              <div className="output-content">
                <p>{apiOutput}</p>
              </div>
            </div>
        )}

        <div className="badge-container grow">
          <a
              href="https://refly.tk"
              target="_blank"
              rel="noreferrer"
          >
            <div className="badge">

              <p>Built With REFLY</p>
            </div>
          </a>
        </div>
      </div>
  );
};

export default Home;
