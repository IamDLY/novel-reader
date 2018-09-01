import React from 'react';
import { connect } from 'react-redux';
import dayjs from 'dayjs';

import SearchIcon from '../assets/icons/search.svg';
import CategoryIcon from '../assets/icons/fenlei.svg';
import './home.css';

import { STATIC_RESOURCE } from '../values/api';

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

  toReadPage(novelID) {
    this.props.history.push(`/read/${novelID}`);
  }

  render() {
    const {novelList} = this.props;

    return (
      <div className="page home-page">
        <SearchBar
          handleSearchInputClick={() => this.toSearchPage()}
        />

        <p className="module-title">书架</p>

        <ul className="native-novel-list">
          {novelList.map(novel => {
            const diffDay = dayjs().diff(dayjs(novel.updated), 'day');
            
            let diffTime = `${diffDay}天前`;

            if (diffDay === 0) {
              diffTime = `${dayjs().diff(dayjs(novel.updated), 'hour')}小时前`
            }

            return (
              <li key={novel._id} onClick={() => this.toReadPage(novel._id)} className="native-novel-item">
                <img className="cover" src={`${STATIC_RESOURCE}${novel.cover}`} alt=""/>
                <section className="novel-info bottom-border">
                  <p className="title">{novel.title}</p>
                  <span className="tip">{`${diffTime}:第${novel.chaptersCount}章 ${novel.lastChapter}`}</span>
                </section>
                {false && <span className="novel-update">更新</span>}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    novelList: state.novel.nativeList
  };
};

export const HomePage = connect(mapStateToProps)(_HomePage);