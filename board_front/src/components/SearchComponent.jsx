import React, { Component } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import "../App.css";

class SearchComponent extends Component {
  render() {
    return (
      <div>
        <table className={"board"}>
          <td>
            <select
              style={{ width: `100px`, height: `30px` }}
              name={"name"}
              value="title"
              onChange={this.handleChange}
            >
              <option>제목</option>
              <option>작성자</option>
            </select>
          </td>
          <td>
            <input type={"text"}></input>
          </td>
          <td>
            <button class="search_btn">
              <AiOutlineSearch />
            </button>
          </td>
        </table>
      </div>
    );
  }
}
export default SearchComponent;
