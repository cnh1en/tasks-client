import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "antd";
import moment from "moment";
import "./weather.css";

const Weather = () => {
  const [dataWeather, setData] = useState();
  useEffect(() => {
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/onecall?lat=21.0245&lon=105.8412&exclude=hourly,alerts,minutely&appid=7fbb5faa61538d69ed573e1b2b3f3185&units=metric"
      )
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const columns = [
    {
      title: "Date",
      dataIndex: "dt",
      key: "time",
      render: (text) => <span>{moment.unix(text).format("dddd, MMM DD")}</span>,
    },
    {
      title: "Temperature",
      dataIndex: "temp",
      key: "temp",
      render: (text) => (
        <span>
          {Math.floor(text.max)} / {Math.floor(text.min)}°C
        </span>
      ),
    },
    {
      title: "Weather",
      dataIndex: "weather",
      key: "icon",
      responsive: ["sm"],
      render: (text) => (
        <img src={`http://openweathermap.org/img/wn/${text[0].icon}.png`} />
      ),
    },
    {
      title: "Description",
      dataIndex: "weather",
      key: "desc",
      responsive: ["md"],
      render: (text) => <span>{text[0].description}</span>,
    },
  ];
  return (
    <div>
      <Table
        dataSource={dataWeather ? dataWeather.daily : []}
        columns={columns}
        size="small"
        pagination={false}
      />
    </div>
  );
};

export default Weather;
