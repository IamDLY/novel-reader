import React from 'react';
import { connect } from 'react-redux';

import UserIcon from '../assets/icons/user.svg';
import './search.css';

import { STATIC_RESOURCE } from '../values/api';
import { changeKeyword, searchNovel, cleanSearch } from '../actions/actions';

const NovelItem = ({novel, onClick}) => (
  <li className="novel-item" onClick={onClick}>
    <img className="cover" src={`${STATIC_RESOURCE}${novel.cover}`} alt=""/>
    <div className="novel-info">
      <p className="title">{novel.title}</p>
      <section className="author">
        <img className="icon" src={UserIcon} alt=""/>
        <span>{novel.author}</span>
      </section>
      <p className="des">{novel.shortIntro}</p>
      <section className="status">
        <p className="latelyFollower">{novel.latelyFollower} <span>人气</span></p>
        <p className="retentionRatio">{novel.retentionRatio || 0}% <span>读者留存</span></p>
      </section>
    </div>
  </li>
);

const NovelList = ({novelList, handleResultClick}) => (
  <ul className="novel-list">
    {novelList.map(novel =>
      <NovelItem
        key={novel._id}
        novel={novel}
        onClick={() => handleResultClick(novel._id)}
      />
    )}
  </ul>
);

class _SearchPage extends React.Component {

  constructor(props) {
    super(props);

    this.searchInput = React.createRef();
  }

  componentDidMount() {
    if (this.props.history.action === 'PUSH') {
      this.searchInput.current.focus();
    }
  }

  componentWillUnmount() {
    if (this.props.history.action === 'POP') {
      this.props.cleanSearch();
    }
  }

  toNovelDetails(id) {
    this.props.history.push(`/novel/${id}`);
  }

  render() {
    return (
      <div className="page search-page">
        <div className="search-bar">
          <input
            type="search"
            ref={this.searchInput}
            placeholder="书名、作者、分类"
            className="search-input"
            value={this.props.keyword}
            onChange={e => this.props.changeKeyword(e.currentTarget.value)}
            onKeyUp={e => {
              if (e.keyCode === 13 && this.props.keyword !== '') {
                this.props.searchNovel(this.props.keyword);
              }
            }}
          />
          <button className="cancel-btn" onClick={() => this.props.history.goBack()}>取消</button>
        </div>

        <NovelList
          novelList={this.props.novelList}
          handleResultClick={id => this.toNovelDetails(id)}
        />
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    keyword: state.search.keyword,
    novelList: state.search.novelList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeKeyword(keyword) {
      dispatch(changeKeyword(keyword));
    },

    searchNovel(keyword) {
      dispatch(searchNovel(keyword));
    },

    cleanSearch() {
      dispatch(cleanSearch());
    }
  };
};

export const SearchPage = connect(mapStateToProps, mapDispatchToProps)(_SearchPage);