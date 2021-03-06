package com.board_back.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.board_back.exception.ResourceNotFoundException;
import com.board_back.util.PagingUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.board_back.model.Board;
import com.board_back.repository.BoardRepository;

@Service
public class BoardService {

    @Autowired
    private BoardRepository boardRepository;

    public int findAllCount() {
        return (int) boardRepository.count();
    }

    // get paging boards data
    public ResponseEntity<Map> getPagingBoard(Integer p_num) {
        Map result = null;

        PagingUtil pu = new PagingUtil(p_num, 5, 5); // ($1:표시할 현재 페이지, $2:한페이지에 표시할 글 수, $3:한 페이지에 표시할 페이지 버튼의 수 )
        List<Board> list = boardRepository.findFromTo(pu.getObjectStartNum(), pu.getObjectCountPerPage());
        pu.setObjectCountTotal(findAllCount());
        pu.setCalcForPaging();

        System.out.println("p_num : "+p_num);
        System.out.println(pu.toString());

        if (list == null || list.size() == 0) {
            return null;
        }

        result = new HashMap<>();
        result.put("pagingData", pu);
        result.put("list", list);

        return ResponseEntity.ok(result);
    }

    // get boards data
    public List<Board> getAllBoard() {
        return boardRepository.findAll();
    }
    public Board createBoard(Board board) {
        return boardRepository.save(board);
    }

    // get board one by id
    public ResponseEntity<Board> getBoard(Integer idx) {
        Board board = boardRepository.findById(idx)
                .orElseThrow(() -> new ResourceNotFoundException("Not exist Board Data by idx : ["+idx+"]"));
        return ResponseEntity.ok(board);
    }

    // update board
    public ResponseEntity<Board> updateBoard(
            Integer idx, Board updatedBoard) {
        Board board = boardRepository.findById(idx)
                .orElseThrow(() -> new ResourceNotFoundException("Not exist Board Data by no : ["+idx+"]"));
        board.setTitle(updatedBoard.getTitle());
        board.setWriter(updatedBoard.getWriter());
        board.setContent(updatedBoard.getContent());

        Board endUpdatedBoard = boardRepository.save(board);
        return ResponseEntity.ok(endUpdatedBoard);
    }

    // delete board
    public ResponseEntity<Map<String, Boolean>> deleteBoard(
            Integer idx) {
        Board board = boardRepository.findById(idx)
                .orElseThrow(() -> new ResourceNotFoundException("Not exist Board Data by no : ["+idx+"]"));

        boardRepository.delete(board);
        Map<String, Boolean> response = new HashMap<>();
        response.put("Deleted Board Data by id : ["+idx+"]", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
