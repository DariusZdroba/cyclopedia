import React, { useEffect, useRef, useState } from "react";
import InstructorFunc from "./InstructorFunc";
import { getRandomUser } from "../Utility/api";

const CyclopediaFuncPage = () => {
  const [state, setState] = useState(() => {
    return {
      instructor: undefined,
      studentList: [],
      studentCount: 0,
      hideInstructor: false,
    };
  });
  const [inputName, setInputName] = useState(() => "");
  const [inputFeedback, setInputFeedback] = useState(() => "");
  const totalRender = useRef(1);
  useEffect(() => {
    console.log("Render " + totalRender.current);
    totalRender.current = totalRender.current + 1;
  });
  useEffect(() => {
    console.log("This will be run on every reder");
    const getUser = async () => {
      const response = await getRandomUser();
      setState((prevState) => {
        return {
          ...prevState,
          instructor: {
            name: response.data.first_name + " " + response.data.last_name,
            email: response.data.email,
            phone: response.data.phone_number,
          },
        };
      });
    };
    if (!state.hideInstructor) getUser();
  }, [state.hideInstructor]);
  useEffect(() => {
    const getUser = async () => {
      const response = await getRandomUser();
      setState((prevState) => {
        return {
          ...prevState,
          studentList: [
            ...prevState.studentList,
            { name: response.data.first_name + " " + response.data.last_name },
          ],
        };
      });
    };
    if (state.studentList.length < state.studentCount) {
      getUser();
    } else if (state.studentList.length > state.studentCount) {
      setState((prevState) => {
        return { ...prevState, studentList: [] };
      });
    }
  }, [state.studentCount]);
  /* constructor(props) {
    super(props);
    this.state = JSON.parse(localStorage.getItem("cylcopediaState")) || {
      instructor: undefined,
      studentList: [],
      studentCount: 0,
      hideInstructor: false,
      inputName: "",
      inputFeedback: "",
    };
  } */

  /*  componentDidMount = async () => {
    //console.log("Component Did Mount");
    if (JSON.parse(localStorage.getItem("cylcopediaState"))) {
      // this.setState(JSON.parse(localStorage.getItem("cylcopediaState")));
    } else {
      const response = await getRandomUser();
      //console.log(response);
      this.setState((prevState) => {
        return {
          instructor: {
            name: response.data.first_name + " " + response.data.last_name,
            email: response.data.email,
            phone: response.data.phone_number,
          },
        };
      });
    }
  };

  componentDidUpdate = async (previousProps, previousState) => {
    //console.log("Component Did Update");
    localStorage.setItem("cylcopediaState", JSON.stringify(this.state));
    //console.log("Old State - " + previousState.studentCount);
    //console.log("New State - " + this.state.studentCount);
    if (previousState.studentCount < this.state.studentCount) {
      const response = await getRandomUser();
      this.setState((prevState) => {
        return {
          studentList: [
            ...prevState.studentList,
            {
              name: response.data.first_name + " " + response.data.last_name,
            },
          ],
        };
      });
    } else if (previousState.studentCount > this.state.studentCount) {
      this.setState((prevState) => {
        return {
          studentList: [],
        };
      });
    }
  };

  componentWillUnmount() {
    // console.log("Component Will UnMount");
  }
  
  */
  const handleAddStudent = () => {
    setState((prevState) => {
      return {
        ...prevState,
        studentCount: prevState.studentCount + 1,
      };
    });
  };
  const handleRemoveAllStudent = () => {
    setState((prevState) => {
      return {
        ...prevState,
        studentCount: 0,
      };
    });
  };

  const handletoggleInstructor = () => {
    setState((prevState) => {
      return {
        ...prevState,
        hideInstructor: !prevState.hideInstructor,
      };
    });
  };

  //console.log("Render Component");
  return (
    <div>
      <div className="p-3">
        <span className="h4 text-success">Instructor &nbsp;</span>
        <i
          className={` bi ${
            state.hideInstructor ? "bi-toggle-off" : "bi-toggle-on"
          } btn btn-success btn-sm`}
          onClick={handletoggleInstructor}
        ></i>
        {!state.hideInstructor && state.instructor ? (
          <InstructorFunc instructor={state.instructor} />
        ) : null}
      </div>

      <div className="p-3">
        <span className="h4 text-success">Feedback</span>
        <br />
        <input
          type="text"
          value={state.inputName}
          placeholder="Name.."
          onChange={(e) => {
            setInputName(e.target.value);
          }}
        ></input>{" "}
        Value : {inputName}
        <br />
        <textarea
          value={inputFeedback}
          onChange={(e) => {
            setInputFeedback(e.target.value);
          }}
          placeholder="Feedback..."
        ></textarea>
        Value : {inputFeedback}
      </div>
      <div className="p-3">
        <span className="h4 text-success">Students</span> <br />
        <div>Student Count : {state.studentCount}</div>
        <button className="btn btn-success btn-sm" onClick={handleAddStudent}>
          Add Student
        </button>
        &nbsp;
        <button
          className="btn btn-danger btn-sm"
          onClick={handleRemoveAllStudent}
        >
          Remove All Students
        </button>
        {state.studentList.map((student, index) => {
          return (
            <div className="text-white" key={index}>
              - {student.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CyclopediaFuncPage;
