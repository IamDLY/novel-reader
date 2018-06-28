import React from 'react';

import SearchIcon from '../assets/icons/search.svg';
import CategoryIcon from '../assets/icons/fenlei.svg';
import './home.css';

const SearchBar = ({handleSearchInputClick}) => (
  <div className="search-bar">
    <div className="input-control" onClick={handleSearchInputClick}>
      <img src={SearchIcon} alt="" className="search-icon" />
      <span>我们的少年时代</span>
    </div>
    <div className="category-btn">
      <img src={CategoryIcon} alt="" className="search-icon"/>
      <span>分类</span>
    </div>
  </div>
);

export class HomePage extends React.Component {
  
  toSearchPage() {
    this.props.history.push('/search');
  }

  render() {
    return (
      <div className="page home-page">
        <SearchBar
          handleSearchInputClick={() => this.toSearchPage()}
        />
      </div>
    );
  }
}