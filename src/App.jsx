import React, { useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import "./App.css"; // Importing the CSS file

function App() {
  const [scanning, setScanning] = useState(false);
  const [scannedResult, setScannedResult] = useState(null); // State to hold the scanned result

  const startScan = () => {
    setScanning(true);
    const scanner = new Html5QrcodeScanner("qr-reader", {
      fps: 10,
      qrbox: 250,
    });

    scanner.render(onScanSuccess, onScanError);
  };

  const onScanSuccess = (decodedText, decodedResult) => {
    setScannedResult(decodedText); // Store the scanned result
    setScanning(false); // Stop scanning

    // Parse the JSON from the decoded text
    let qrData;
    try {
      qrData = JSON.parse(decodedText);
    } catch (error) {
      console.error("Failed to parse QR code data", error);
      return;
    }

    // Create an AR.js scene dynamically
    const arContainer = document.createElement("div");
    arContainer.innerHTML = `
    <!DOCTYPE html>
    <html>
      <script src="https://aframe.io/releases/1.6.0/aframe.min.js"></script>
      <script src="https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar.js"></script>
      <body style="margin: 0px; overflow: hidden">
        <a-scene embedded arjs>
          <a-marker preset="${qrData.preset}">
            <a-entity
              position="${qrData.position}"
              scale="${qrData.scale}"
              gltf-model="${qrData["gltf-model"]}"
            ></a-entity>
          </a-marker>
          <a-entity camera></a-entity>
        </a-scene>
      </body>
    </html>
  `;

    // Clear previous content and append the new AR content
    document.querySelector("#qr-reader").innerHTML = ""; // Clear the scanner
    document.querySelector("#qr-reader").appendChild(arContainer);
  };

  const onScanError = (error) => {
    // Handle error if QR code not found
    console.error(error);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">Ancient Book Hunting Game</h1>
      </header>
      <main className="app-main">
        <button className="scan-button" onClick={startScan}>
          Scan QR
        </button>
        <div id="qr-reader" style={{ width: "100%", height: "300px" }}></div>

        {scannedResult && (
          <div className="scanned-result">
            <h2>Scanned QR Code Result:</h2>
            <p>{scannedResult}</p>
          </div>
        )}
      </main>
      <footer className="app-footer">
        <p>&copy; 2025 Ancient Book Hunters</p>
      </footer>
    </div>
  );
}

export default App;
