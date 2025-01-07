import React, { useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import "./App.css"; // Importing the CSS file
import ArScene from "./components/arScene";

function App() {
  const [scanning, setScanning] = useState(false);
  const [scannedResult, setScannedResult] = useState(null); // State to hold the scanned result
  const [qrData, setQrData] = useState(null); // State to hold the parsed QR data

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
      setQrData(qrData); // Store the parsed QR data
      alert(qrData);
    } catch (error) {
      console.error("Failed to parse QR code data", error);
    }
  };

  const onScanError = (error) => {
    // Handle error if QR code not found
    console.error(error);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">Ancient Book Hunting Game1</h1>
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

        {qrData && (
          <div className="qr-data">
            <h2>QR Data:</h2>
            <p>{JSON.stringify(qrData, null, 2)}</p>
            <ArScene qrData={qrData} />
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
