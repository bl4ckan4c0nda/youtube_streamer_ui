import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "./App.css";
const URL = "ws://5.9.194.94:3000";
const socket = io(URL, { transports: ["websocket"] });

function App() {
  const [price, setPrice] = useState(0);
  const [prevPrice, setPrevPrice] = useState(0);
  const [priceChangePercent, setPriceChangePercent] = useState(0);
  const [volumeQuote, setVolumeQuote] = useState(0);
  const [marketCap, setMarketCap] = useState(0);
  const [priceClass, setPriceClass] = useState("");
  const [priceChangePercentClass, setPriceChangePercentClass] = useState("");

  useEffect(() => {
    socket.on("getData", (data) => {
      setPrice(Number(data.price));
      setPriceChangePercent(Number(data.priceChangePercent));
      setVolumeQuote(Number(data.volumeQuote));
      setMarketCap(Number(data.marketCap));
      setPrevPrice(price);
    });
    setPriceClass(
      price === prevPrice ? "" : price > prevPrice ? "green" : "red"
    );
    setTimeout(() => {
      setPriceClass("");
    }, 1000);

    setPriceChangePercentClass(
      priceChangePercent === 0 ? "" : priceChangePercent > 0 ? "green" : "red"
    );
  }, [price, prevPrice, priceChangePercent]);

  function numberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <div className="App">
      <video autoPlay loop muted controls id="video">
        <source src="rain.mp4" type="video/mp4" />
      </video>

      <div className="card">
        <div className="row">
          {/* Right section */}
          <div className="col-5">
            <img className="btc_vector" src="btc_vector.png" alt="BTC" />
          </div>

          {/* Left section */}
          <div className="col-7 px-4">
            {/* Last price */}
            <div className={"last_price mb-3 " + priceClass}>
              <span className="symbol">$</span>
              <span className="price">
                {numberWithCommas(price.toFixed(2))}
              </span>
            </div>
            {/* 24H changes and crypto label  */}
            <div className="d-flex align-items-center justify-content-between lh-1">
              <span
                className="text-white fs-5"
                style={{ fontFamily: "IRANSans", fontWeight: 300 }}
              >
                قیمت لحظه ای بیتکوین
              </span>
              <span
                className={"price_24h_change " + priceChangePercentClass}
                dir="ltr"
              >
                <span className="fs-4">% </span>
                <span style={{ fontFamily: "Fira", fontSize: "1rem" }}>
                  {priceChangePercent === 0
                    ? ""
                    : priceChangePercent > 0
                    ? "+"
                    : "-"}
                </span>
                {Math.abs(priceChangePercent)}
              </span>
            </div>
            {/* Today Volume */}

            <div className="d-flex align-items-center justify-content-between lh-lg">
              <span
                className="text-white fs-6"
                style={{ fontFamily: "IRANSans", fontWeight: 300 }}
              >
                حجم معاملات امروز :
              </span>
              <div className="text-white">
                <span className="fs-4">
                  {numberWithCommas((volumeQuote / 1000000).toFixed(2))}
                </span>
                <span
                  className="fs-6 me-1"
                  style={{ fontFamily: "IRANSans", fontWeight: 300 }}
                >
                  میلیون دلار
                </span>
              </div>
            </div>
            {/* Market cap */}
            <div className="d-flex align-items-center justify-content-between lh-lg">
              <span
                className="text-white fs-6"
                style={{ fontFamily: "IRANSans", fontWeight: 300 }}
              >
                حجم کل بازار :
              </span>
              <div className="text-white">
                <span className="fs-4">
                  {numberWithCommas(marketCap.toFixed(2))}
                </span>
                <span
                  className="fs-6 me-1"
                  style={{ fontFamily: "IRANSans", fontWeight: 300 }}
                >
                  میلیون دلار
                </span>
              </div>
            </div>

            {/* CryptoWayNow */}
            <div className="d-flex align-items-center justify-content-between my-3 lh-lg cryptowaynow">
              <img src="logo.svg" width="100" alt="cwn" />
              <div className="d-flex flex-column align-items-center text-white">
                <span className="follow_us">ما را در تلگرام دنبال کنید</span>
                <span className="telegram">
                  <span style={{ fontFamily: "Arial", fontStyle: "normal" }}>
                    @
                  </span>
                  CryptoWayNow
                </span>
              </div>
            </div>

            {/* Powered By */}
            <div className="powered_by">
              <span>اطلاعات لحظه ای از صرافی </span>
              <span className="binance">بایننس</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
