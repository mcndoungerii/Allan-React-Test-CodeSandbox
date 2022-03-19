import React, { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./styles.css";
import { Input } from "antd";
import Details from "./Details";

const { Search } = Input;

export default function App() {
  const [data, setData] = useState([]);

  const nasaAPI = (val: string) => {
    fetch(`https://images-api.nasa.gov/search?q=${val}`)
      .then((resp) => resp.json())
      .then((json) => {
        setData(json.collection.items);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    nasaAPI("Orion");
  }, []);

  interface image {
    href: string;
    rel: string;
    render: string;
  }

  interface dataArray {
    center: string;
    title: string;
    nasa_id: string;
    media_type: string;
    date_created: string;
    description_508: string;
    secondary_creator: string;
    description: string;
  }

  interface imageInfo {
    href: string;
    data: dataArray[];
    links: image[];
  }

  return (
    <div className="App">
      <Search
        placeholder="Search for ...(e.g. Orion)"
        onSearch={nasaAPI}
        size="large"
        enterButton
      />
      <div className="content">
        {data && data.length > 0
          ? data.map((item: imageInfo, i: number) => {
              return (
                <div key={i}>
                  {item.hasOwnProperty("links") ? (
                    <Link to="/details">
                      <img src={item.links[0].href} alt={"All"} />
                    </Link>
                  ) : null}
                  <label>{item.data[0].title}</label>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
}

export function TestComp() {
  return (
    <>
      <App />
      <Routes>
        <Route index element={<App />} />
        <Route path="details" element={<Details />} />
      </Routes>
    </>
  );
}
