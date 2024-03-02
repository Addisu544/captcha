import logo from "./logo.svg";
import "./App.css";

import React, { useEffect, useState } from "react";

function App() {
  const [captchaText, setCaptchaText] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaImage, setCaptchaImage] = useState("");

  useEffect(() => {
    renderCaptcha();
  }, []);

  // Generate random captcha string
  const generateCaptcha = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let captcha = "";
    for (let i = 0; i < 6; i++) {
      const randomChar = chars.charAt(Math.floor(Math.random() * chars.length));
      captcha += randomChar;
    }
    console.log(captcha);
    return captcha;
  };

  // Render captcha text with distortion using canvas
  const renderCaptcha = () => {
    const newCaptchaText = generateCaptcha();
    setCaptchaText(newCaptchaText);
    const canvas = document.getElementById("captchaCanvas");
    const ctx = canvas.getContext("2d");
    const captchaImageUrl = `https://dummyimage.com/150x50/000000/fff&text=${newCaptchaText}`;

    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = "24px Arial";
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;

    for (let i = 0; i < newCaptchaText.length; i++) {
      const angle = Math.random() * 0.9 - 0.7;
      const x = i * 25 + 10;
      const y = 35;

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);

      const distortion = Math.random() * 3 - 1;
      ctx.transform(1, distortion, 0, 1, 0, 0);

      ctx.strokeText(newCaptchaText[i], 0, 0);
      ctx.restore();
    }

    setCaptchaImage(captchaImageUrl);
  };

  // Refresh captcha
  const refreshCaptcha = () => {
    setCaptchaInput("");
    renderCaptcha();
  };

  // Verify captcha
  const verifyCaptcha = () => {
    if (captchaInput.toLowerCase() === captchaText.toLowerCase()) {
      alert("Captcha verification successful. Logging in...");
      // Perform login actions here
    } else {
      alert("Invalid captcha. Please try again.");
    }
  };

  return (
    <div>
      <h2>Login Form</h2>
      <label htmlFor="name">Name</label>
      <input type="text" id="name" name="name" required />
      <br />
      <br />

      <label className="captcha" htmlFor="captcha">
        Captcha
      </label>
      <div className="captcha">
        <canvas id="captchaCanvas" width="150" height="50"></canvas>
        <button onClick={refreshCaptcha} title="Refresh Captcha">
          &#8635;
        </button>
      </div>

      <input
        type="text"
        id="captchaInput"
        value={captchaInput}
        onChange={(e) => setCaptchaInput(e.target.value)}
        required
      />
      <br />
      <br />
      <button onClick={verifyCaptcha}>Login</button>
    </div>
  );
}

export default App;
