import React, { useEffect } from "react";
import "../App.css";
import NarBav from "../Comp_homepage/Navbar";
import "./EditChart.css";
import BarChart from "./ChartType/BarChart";
import { useState } from "react";
import LineGraph from "./ChartType/LineGraph";
import PieChart from "./ChartType/PieChart";
import Table from "./ChartType/Table";
import { DataManager } from "./DataManager";
import AdvancedOption from "./AdvancedOption";

const dataGet = {
  name: "User 1",
  categories: "a,b,d,f",
  values: "21,31,11,25"
}

const staticData = {
  max: 32,
  min: 11,
  median: 21,
  mean: 22.25,
  variance: 50.6875,
  standard_deviation: 7.12

}

const findingValue = [
  {
    category : "a",
    value: 21
  },
  {
    category : "b",
    value: 31
  },
  {
    category : "d",
    value: 11
  },
  {
    category : "f",
    value: 25
  },
]

const ascending = {
  categories: "d,a,f,b",
  values: "11,21,25,31"

}

const descending = {
  categories: "b,f,a,d",
  values: "31,25,21,11"

}

const highMed = {
  categories: "a,f,b",
  values: "21,25,31"
}

const lowMed ={
  categories: "d,a,f",
  values: "11,21,25"
}

function Chart() {
  const [showChart, setShowChart] = useState(true);

  const [inputValue, setInputValue] = useState(dataGet.values);
  const [inputCategory, setInputCategory] = useState(dataGet.categories);
  const [selectedOption, setSelectedOption] = useState("");
  const [inputName, setInputName] = useState(dataGet.name); // State to hold selected option
  const [selectedSortedOption, setselectedSortedOption] = useState("");

  const [intArr, setIntArr] = useState(dataGet.values.split(",").map(Number));
  const [labelsChart, setLabelsChart] = useState(dataGet.categories.split(","));

  const [buttonPressed, setButtonPressed] = useState(true);

  const [DataInput, setDataInput] = useState({
    Graph: "",
    Data: [],
    Category: "",
    Sort: "",
  });

  const [userData, setUserData] = useState({
    labels: labelsChart,
    datasets: [
      {
        label: "Data",
        data: intArr,
        backgroundColor: [
          "#FF6633",
          "#FFB399",
          "#FF33FF",
          "#FFFF99",
          "#00B3E6",
          "#E6B333",
          "#3366E6",
          "#999966",
          "#99FF99",
          "#B34D4D",
          "#80B300",
          "#809900",
          "#E6B3B3",
          "#6680B3",
          "#66991A",
        ],
        borderColor: "white",
        borderWidth: 4,
      },
    ],
  });

  const [errorText, seterrorText] = useState("");
  const [errorName, seterrorName] = useState("");
  const [errorSort, seterrorSort] = useState("");
  const [errorChart, seterrorChart] = useState("");
  const [errorCategory, seterrorCategory] = useState("");

  const portData = new DataManager();
  const data = {
    name: inputName,
    categories: inputCategory,
    values: inputValue,
  };

  // document.getElementsByClassName("btn--medium").style.display="none";

  useEffect(() => {
    console.log("int Arr", intArr)
    console.log("Lables:", labelsChart)
  }, [
    selectedOption,
    selectedSortedOption,
    inputValue,
    DataInput,
    userData,
    labelsChart,
    showChart,
    buttonPressed,
    intArr,
    inputCategory,
  ]);

  const renderChart = (key) => {
    switch (key) {
      case "Pie Chart":
        return <PieChart  chartData={userData} />;
      case "Line Graph":
        return <LineGraph chartData={userData} />;
      case "Bar Chart":
        return <BarChart chartData={userData} />;
      case "Table":
        return <Table chartData={userData} />;
      default:
        return <></>;
    }
  };

  const checkIntArray = (arr) => {
    const check = arr.find((element) => {
      return element == 0;
    });
    if (check == 0 || arr.includes(NaN)) return true;
    else {
      seterrorText("");
      return false;
    }
  };

  const checkStr = (str) => {
    if (str.includes("")) {
      return true;
    }
    str.some((element) => {
      if (element.includes(" ")) {
        return true;
      }
    });

    for (let i = 0; i < str.length - 1; i++) {
      for (let j = i + 1; j < str.length; j++) {
        if (str[i] == str[j]) {
          return true;
        }
      }
    }
    seterrorCategory("");
    return false;
  };
  const handleInputName = (event) => {
    setInputName(event.target.value);
    seterrorName("");

    setDataInput({
      Name: event.target.value,
      Data: intArr,
      Category: labelsChart,
    });
  };

  const handleChartChange = (event) => {
    setSelectedOption(event.target.value);
    seterrorChart("");

    setDataInput({
      Graph: event.target.value,
      Data: intArr,
      Category: labelsChart,
      Sort: selectedSortedOption,
    });
  };

  const handleInputCategory = (event) => {
    setInputCategory(event.target.value);
    seterrorCategory("");
    setLabelsChart(event.target.value.split(","));

    setDataInput({
      Graph: selectedOption,
      Data: intArr,
      Category: event.target.value.split(","),
      Sort: selectedSortedOption,
    });
  };

  const handleInputDataChange = (event) => {
    setInputValue(event.target.value);
    seterrorText("");
    setIntArr(event.target.value.split(",").map(Number));

    setDataInput({
      Graph: selectedOption,
      Data: event.target.value.split(",").map(Number),
      Category: labelsChart,
      Sort: selectedSortedOption,
    });
    // Update input value in state
  };

  //   document.getElementsByClassName("buttonToChart").style.display = "b";

  const handleSortChange = (event) => {
    setselectedSortedOption(event.target.value);
    seterrorSort("");
    setDataInput({
      Graph: selectedOption,
      Data: intArr,
      Category: labelsChart,
      Sort: event.target.value,
    });
    // Gọi hàm xử lý sắp xếp từ component cha
  };

  let onClick = () => {
    setShowChart(true);

    setButtonPressed(true);

    if (checkIntArray(intArr) || checkStr(labelsChart)) {
      setButtonPressed(false);
      setShowChart(false);
    }

    if (
      intArr.length > 2 &&
      labelsChart.length > 2 &&
      intArr.length == labelsChart.length &&
      buttonPressed
    ) {
      // portData.portData(data)
      setUserData({
        labels: labelsChart,
        datasets: [
          {
            label: "Data",
            data: intArr,
            backgroundColor: [
              "#FF6633",
              "#FFB399",
              "#FF33FF",
              "#FFFF99",
              "#00B3E6",
              "#E6B333",
              "#3366E6",
              "#999966",
              "#99FF99",
              "#B34D4D",
              "#80B300",
              "#809900",
              "#E6B3B3",
              "#6680B3",
              "#66991A",
            ],
            borderColor: "white",
            borderWidth: 4,
          },
        ],
      });

    } else {
      setShowChart(false);
      if (intArr.length <= 2) {
        seterrorText("Input must be at least 3 characters long");
      }
      if (selectedSortedOption.length === 0) {
        seterrorSort("Please choose an method to sort");
      }
      if (selectedOption.length === 0) {
        seterrorChart("Please choose a chart to present");
      }
      if (labelsChart.length < 2) {
        seterrorCategory("Please input labels for graph");
      }
      if (labelsChart.length != intArr.length) {
        seterrorCategory("Please input number of labels = number of data");
        seterrorText("Please input number of data = number of lables");
      }
      document.getElementsByClassName("custom-button").disabled = true;
    }
  };

  // useEffect(() => {
  //     console.log('Text; ', inputValue);
  // }, [selectedOption]);

  // let DataObj = convertData;

  return (
    <div>
      <div className="nav-header">
        <NarBav />
      </div>
      <div className="name-input-container">
          <h2 className="input-name">Input name of Chart:</h2>
          <form>
            <input
              type="text"
              className="input-field-name"
              value={inputName}
              onChange={handleInputName}
              placeholder="Input name here..."
              required
              minLength="1"
            />
          </form>
          {errorCategory && <p style={{ color: "red" }}>{errorName}</p>}
        </div>
      <div className="user-input">
        <div className="select-container">
          <h2 className="select-label">Choose one graph:</h2>
          <select
            className="select-dropdown"
            value={selectedOption}
            onChange={handleChartChange}
          >
            <option value="">Choose Graph</option>
            <option value="Pie Chart" className="select-option">
              Pie Chart
            </option>
            <option value="Line Graph" className="select-option">
              Line Graph
            </option>
            <option value="Bar Chart" className="select-option">
              Bar Chart
            </option>
            <option value="Table" className="select-option">
              Table
            </option>
          </select>
          {selectedOption && <p>You choose: {DataInput.Graph}</p>}
          {errorChart && <p style={{ color: "red" }}>{errorChart}</p>}
        </div>

        <div className="text-input-container">
          <h2 className="input-label">Input Data:</h2>
          <form>
            <input
              type="text"
              className="input-field"
              value={inputValue}
              onChange={handleInputDataChange}
              placeholder="Input here..."
              required
              minLength="3"
            />
          </form>

          {errorText && <p style={{ color: "red" }}>{errorText}</p>}
        </div>

        <div className="category-input-container">
          <h3 className="input-category">Input Category:</h3>
          <form>
            <input
              type="text"
              className="input-field-category"
              value={inputCategory}
              onChange={handleInputCategory}
              placeholder="Input category here..."
              required
              minLength="5"
            />
          </form>
          {errorCategory && <p style={{ color: "red" }}>{errorCategory}</p>}
        </div>

        <button className="custom-button" onClick={onClick}>
          Generate
        </button>
      </div>
      {showChart && (
        <div className="graph">{renderChart(selectedOption)}</div>
      )}
      <hr></hr>
      <AdvancedOption
       staticData={staticData} 
       findingValue={findingValue} 
       ascending={ascending}
       descending={descending}
       highMed={highMed}
       lowMed={lowMed}
       />
    </div>
  );
}

export default Chart;
