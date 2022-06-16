import React from "react";
import Score from "../components/pages/Dashboard/Score";
import Notification from "../components/pages/Dashboard/Notification";
import Guide from "../components/pages/Guide";
import Select from "../components/pages/Dashboard/Select";
import Analytics from "../components/pages/Analytics";
import Login from "../components/UserManagement/Login";
import Register from "../components/UserManagement/Register";
import { shallow, mount } from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { Router } from "react-router-dom";

Enzyme.configure({ adapter: new Adapter() });
const mockStore = configureMockStore();
const store = mockStore({});

describe("test dashboard features", () => {
  it("has select bar with two device options and a submit button", () => {
    const wrapper = mount(
      <Provider store={store}>
        <Select />
      </Provider>
    );

    expect(wrapper.find("Button")).toHaveLength(1);
    expect(wrapper.find("select")).toHaveLength(1);
  });
});
