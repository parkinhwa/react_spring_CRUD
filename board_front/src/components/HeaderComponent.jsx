import React, { Component } from 'react';
import '../App.css';

class HeaderComponent extends Component {
    render() {
        return (
            <div>
              <div class="menu_bar">
                <ul class="menu">
                   <li><a href="#">Home</a></li>
                   <li><a href="#">About</a></li>
                   <li><a href="#">Board</a></li>
                   <li><a href="#">Reference</a></li>
                   <li><a href="#">Contact</a></li>
                </ul>
               </div>
               <nav>
                  <div className={"title"}>
                    <h1 className={"title_text"}>게시판</h1>
                  </div>
               </nav>
            </div>
        );
    }
}

export default HeaderComponent;