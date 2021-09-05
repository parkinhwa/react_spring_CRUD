import axios from "axios";

const BOARD_API_BASE_URL = "http://localhost:8080/api/board";

class BoardService {
  getBoards(p_num) {
    return axios.get(BOARD_API_BASE_URL + "?p_num=" + p_num);
  }

  // getBoards(p_num) {
  //   return axios.get(BOARD_API_BASE_URL);
  // }

  createBoard(board) {
    return axios.post(BOARD_API_BASE_URL, board);
  }

  getOneBoard(idx) {
    return axios.get(BOARD_API_BASE_URL + "/" + idx);
  }

  updateBoard(idx, board) {
    return axios.put(BOARD_API_BASE_URL + "/" + idx, board);
  }

  deleteBoard(idx) {
    return axios.delete(BOARD_API_BASE_URL + "/" + idx);
  }
}

export default new BoardService();
