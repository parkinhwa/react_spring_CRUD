package com.board_back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.board_back.model.Board;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BoardRepository extends JpaRepository<Board, Integer> {
    public final static String SELECT_BOARD_LIST_PAGED = ""
            + "SELECT "
            + "*"
//            + "idx,"
//            + "title,"
//            + "content,"
//            + "writer,"
//            + "date"
            //+ "FROM board"
            + " FROM board WHERE 0 <= idx "
            + "ORDER BY idx DESC LIMIT ?1, ?2";

    @Query(value = SELECT_BOARD_LIST_PAGED, nativeQuery = true)
    List<Board> findFromTo(
            final Integer objectStartNum,
            final Integer objectEndNum);
}
