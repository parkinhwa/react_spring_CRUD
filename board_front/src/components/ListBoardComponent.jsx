import React, { Component } from "react";
import BoardService from "../service/BoardService";
import { Link, BrowserRouter as Router, Route } from "react-router-dom";
import "../css/ListBoard.css";
import SearchComponent from "./SearchComponent";

class ListBoardComponent extends Component {
  // constructor(props) {
  //   super(props);
  //   // # 1.
  //   this.state = {
  //     boards: [],
  //   };
  //   this.createBoard = this.createBoard.bind(this);
  // }
  constructor(props) {
    super(props);
    // 수정 후 # 1.
    this.state = {
      p_num: 1,
      paging: {},
      boards: [],
    };

    this.createBoard = this.createBoard.bind(this);
  }
  // // # 2.
  // componentDidMount() {
  //   BoardService.getBoards().then((res) => {
  //     this.setState({ boards: res.data });
  //   });
  // }

  // 수정 후 # 2.
  componentDidMount() {
    BoardService.getBoards(this.state.p_num).then((res) => {
      this.setState({
        p_num: res.data.pagingData.currentPageNum,
        paging: res.data.pagingData,
        boards: res.data.list,
      });
    });
  }

  createBoard() {
    this.props.history.push("/write/_create");
  }

  readBoard(idx) {
    this.props.history.push(`/detail/${idx}`);
  }
  // # 3.
  listBoard(p_num) {
    console.log("pageNum : " + p_num);
    BoardService.getBoards(p_num).then((res) => {
      console.log(res.data);
      this.setState({
        p_num: res.data.pagingData.currentPageNum,
        paging: res.data.pagingData,
        boards: res.data.list,
      });
    });
  }
  // # 4.
  viewPaging() {
    const pageNums = [];

    for (
      let i = this.state.paging.pageNumStart;
      i <= this.state.paging.pageNumEnd;
      i++
    ) {
      pageNums.push(i);
    }

    return pageNums.map((page) => (
      <li className="page-item" key={page.toString()}>
        <a className="page-link" onClick={() => this.listBoard(page)}>
          {page}
        </a>
      </li>
    ));
  }
  // # 5.
  isPagingPrev() {
    if (this.state.paging.prev) {
      return (
        <li className="page-item">
          <a
            className="page-link"
            onClick={() => this.listBoard(this.state.paging.currentPageNum - 1)}
            tabindex="-1"
          >
            Previous
          </a>
        </li>
      );
    }
  }
  // # 6.
  isPagingNext() {
    if (this.state.paging.next) {
      return (
        <li className="page-item">
          <a
            className="page-link"
            onClick={() => this.listBoard(this.state.paging.currentPageNum + 1)}
            tabIndex="-1"
          >
            Next
          </a>
        </li>
      );
    }
  }
  // # 7.
  isMoveToFirstPage() {
    if (this.state.p_num != 1) {
      return (
        <li className="page-item">
          <a
            className="page-link"
            onClick={() => this.listBoard(1)}
            tabIndex="-1"
          >
            First Page
          </a>
        </li>
      );
    }
  }
  // # 8.
  isMoveToLastPage() {
    if (this.state.p_num != this.state.paging.pageNumCountTotal) {
      return (
        <li className="page-item">
          <a
            className="page-link"
            onClick={() => this.listBoard(this.state.paging.pageNumCountTotal)}
            tabIndex="-1"
          >
            LastPage({this.state.paging.pageNumCountTotal})
          </a>
        </li>
      );
    }
  }
  change_date(date) {
    var moment = require("moment");
    const public_date = moment(date).format("YYYY-MM-DD");
    return public_date;
  }
  render() {
    return (
      <div>
        <div>
          <SearchComponent />
        </div>
        <div class="board_table">
          <table className="table table-striped table-bordered" id="head_table">
            <thead>
              <tr>
                <th style={{ width: "10%" }}>글 번호</th>
                <th style={{ width: "40%" }}>제목 </th>
                <th style={{ width: "15%" }}>작성자 </th>
                <th style={{ width: "35%" }}>작성일 </th>
              </tr>
            </thead>
            <tbody>
              {this.state.boards.map((board) => (
                <tr key={board.idx}>
                  <td> {board.idx} </td>
                  <td>
                    <a onClick={() => this.readBoard(board.idx)}>
                      {board.title}
                    </a>
                  </td>
                  <td> {board.writer} </td>
                  <td>{this.change_date(board.date)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <button
              type="button"
              class="btn btn-danger"
              id="write_btn"
              onClick={this.createBoard}
            >
              <Link to="./write" class="write_txt">
                글쓰기
              </Link>
            </button>
          </div>
          <div className="row">
            {/* <PageListComponent /> */}
            <nav aria-label="Page navigation example">
              <ul className="pagination justify-content-center">
                {this.isMoveToFirstPage()}
                {this.isPagingPrev()}
                {this.viewPaging()}
                {this.isPagingNext()}
                {this.isMoveToLastPage()}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    );
  }
}

export default ListBoardComponent;
