import React from 'react';
import { connect } from 'react-redux';

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

class _HomePage extends React.Component {

  toSearchPage() {
    this.props.history.push('/search');
  }

  render() {
    return (
      <div className="page home-page">
        <SearchBar
          handleSearchInputClick={() => this.toSearchPage()}
        />

        <p className="module-title">书架</p>

        <ul className="native-novel-list">
          <li className="native-novel-item">
            <img className="cover" src="http://statics.zhuishushenqi.com/agent/http%3A%2F%2Fimg.1391.com%2Fapi%2Fv1%2Fbookcenter%2Fcover%2F1%2F2126166%2F2126166_c1002339e5664d7bb1a536e2608fa599.jpg%2F" alt=""/>
            <section className="novel-info bottom-border">
              <p className="title">圣墟</p>
              <span className="tip">10小时前:第1140章 追杀</span>
            </section>
            <span className="novel-update">更新</span>
          </li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export const HomePage = connect(mapStateToProps)(_HomePage);