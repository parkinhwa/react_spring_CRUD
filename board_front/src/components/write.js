import "../css/write.css";
import "../css/bootstrap.min.css";
import React, { Component } from "react";
import BoardService from "../service/BoardService";

class Write extends Component {
  constructor(props) {
    super(props);

    this.state = {
      idx: this.props.match.params.idx,
      title: "",
      writer: "",
      contents: "",
    };

    this.changeTitleHandler = this.changeTitleHandler.bind(this);
    this.changeWriterHandler = this.changeWriterHandler.bind(this);
    this.changeContentsHandler = this.changeContentsHandler.bind(this);
    this.createBoard = this.createBoard.bind(this);
  }

  changeTitleHandler = (event) => {
    this.setState({ title: event.target.value });
  };

  changeWriterHandler = (event) => {
    this.setState({ writer: event.target.value });
  };

  changeContentsHandler = (event) => {
    this.setState({ content: event.target.value });
  };

  createBoard = (event) => {
    event.preventDefault();
    let board = {
      title: this.state.title,
      writer: this.state.writer,
      content: this.state.content,
    };
    console.log("board => " + JSON.stringify(board));
    if (this.state.idx === "_create") {
      BoardService.createBoard(board).then((res) => {
        this.props.history.push("/board");
      });
    } else {
      BoardService.updateBoard(this.state.idx, board).then((_res) => {
        this.props.history.push("/board");
      });
    }
  };

  cancel() {
    this.props.history.push("/board");
  }

  getTitle() {
    if (this.state.idx === "_create") {
      return <h3 className="text-center">새글을 작성해주세요</h3>;
    } else {
      return <h3 className="text-center">{this.state.idx}글을 수정합니다.</h3>;
    }
  }

  componentDidMount() {
    if (this.state.idx === "_create") {
      return;
    } else {
      BoardService.getOneBoard(this.state.idx).then((res) => {
        let board = res.data;
        console.log("board => " + JSON.stringify(board));

        this.setState({
          title: board.title,
          content: board.content,
          writer: board.writer,
        });
      });
    }
  }

  render() {
    return (
      <div class="Write">
        <h2 class="wr_title">게시글 작성</h2>
        <from method="POST">
          <div class="mb-3">
            <label for="title">제목</label>
            <input
              type="text"
              class="form-control"
              name="title"
              id="title"
              placeholder="제목을 입력해 주세요"
              value={this.state.title}
              onChange={this.changeTitleHandler}
            ></input>
          </div>
          <div class="mb-3">
            <label for="name">작성자</label>
            <input
              type="text"
              class="form-control"
              name="name"
              id="name"
              placeholder="이름을 입력해 주세요"
              value={this.state.writer}
              onChange={this.changeWriterHandler}
            ></input>
          </div>
          <div class="mb-3">
            <label for="content">내용</label>
            <textarea
              class="form-control"
              name="content"
              id="content"
              placeholder="내용을 입력해 주세요"
              value={this.state.content}
              onChange={this.changeContentsHandler}
            ></textarea>
          </div>
          <button
            type="button"
            class="btn btn-sm btn-danger"
            id="btnList"
            onClick={this.cancel.bind(this)}
          >
            취소
          </button>
          <button
            type="submit"
            class="btn btn-sm btn-danger"
            id="btnSave"
            onClick={this.createBoard}
          >
            저장
          </button>
        </from>
      </div>
    );
  }
}

export default Write;
