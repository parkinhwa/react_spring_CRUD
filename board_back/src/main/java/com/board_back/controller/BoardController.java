package com.board_back.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.board_back.model.Board;
import com.board_back.service.BoardService;

@CrossOrigin("*")
@RestController
@RequestMapping("/api")
public class BoardController {

    @Autowired
    private BoardService boardService;


     // get all board
//    @GetMapping("/board")
//    public List<Board> getAllBoards() {
//        return boardService.getAllBoard();
//    }
    @GetMapping("/board")
    public ResponseEntity<Map> getAllBoards(@RequestParam(value = "p_num", required=false) Integer p_num) {
        if (p_num == null || p_num <= 0) p_num = 1;

        return boardService.getPagingBoard(p_num);
    }
    //create board
    @PostMapping("/board")
    public Board createBoard(@RequestBody Board board) {
        return boardService.createBoard(board);
    }

    // get board
    @GetMapping("/board/{idx}")
    public ResponseEntity<Board> getBoardByNo(
            @PathVariable Integer idx) {

        return boardService.getBoard(idx);
    }

    // update board
    @PutMapping("/board/{idx}")
    public ResponseEntity<Board> updateBoardByNo(
            @PathVariable Integer idx, @RequestBody Board board){

        return boardService.updateBoard(idx, board);
    }

    // delete board
    @DeleteMapping("/board/{idx}")
    public ResponseEntity<Map<String, Boolean>> deleteBoardByNo(
            @PathVariable Integer idx) {
        return boardService.deleteBoard(idx);
    }
}
