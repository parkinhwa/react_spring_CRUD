import React, { Component } from "react";
import BoardService from "../service/BoardService";
import "../css/detail.css";

class detailComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      idx: this.props.match.params.idx,
      board: {},
    };
    this.goToUpdate = this.goToUpdate.bind(this);
  }

  componentDidMount() {
    BoardService.getOneBoard(this.state.idx).then((res) => {
      this.setState({ board: res.data });
      console.log("get result => " + JSON.stringify(res.data));
    });
  }

  // returnDate(cTime) {
  //   return (
  //     <div className="row">
  //       <label>생성일 : {cTime} </label>
  //     </div>
  //   );
  // }

  goToList() {
    this.props.history.push("/board");
  }

  goToUpdate = (event) => {
    event.preventDefault();
    this.props.history.push(`/write/${this.state.idx}`);
  };

  deleteView = async function () {
    if (
      window.confirm(
        "정말로 글을 삭제하시겠습니까?\n삭제된 글은 복구 할 수 없습니다."
      )
    ) {
      BoardService.deleteBoard(this.state.idx).then((res) => {
        console.log("delete result => " + JSON.stringify(res));
        if (res.status === 200) {
          this.props.history.push("/board");
        } else {
          alert("글 삭제가 실패했습니다.");
        }
      });
    }
  };
  change_date(date) {
    var moment = require("moment");
    var public_date;
    if (moment(date).format("HH") < 12 || moment(date).format("HH") == 24) {
      public_date = moment(date).format("YYYY년 MM월 DD일 오전 hh:mm:ss");
    } else {
      public_date = moment(date).format("YYYY년 MM월 DD일 오후 hh:mm:ss");
    }
    return public_date;
  }
  render() {
    return (
      <div className="body">
        {/* <div className="card col-md-6 offset-md-3"> */}
        <h3 className="board_title"> {this.state.board.title} </h3>
        <div className="board_writer">
          <ul className="board_inter">
            <li className="board_inter_1">
              작성자 : {this.state.board.writer}
            </li>
            <li className="board_inter_2">
              {this.change_date(this.state.board.date)}
            </li>
          </ul>
        </div>
        <div>
          <textarea
            class="board_content"
            value={this.state.board.content}
            readOnly
          />
        </div>
        <button
          className="btn btn-primary"
          onClick={this.goToList.bind(this)}
          style={{ marginLeft: "10px" }}
        >
          목록으로 이동
        </button>
        <button
          className="btn btn-primary"
          onClick={this.goToUpdate}
          style={{ marginLeft: "10px" }}
        >
          수정
        </button>
        <button
          className="btn btn-primary"
          onClick={() => this.deleteView()}
          style={{ marginLeft: "10px" }}
        >
          삭제
        </button>
      </div>
    );
  }
}

export default detailComponent;
