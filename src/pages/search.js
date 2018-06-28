import React from 'react';

import UserIcon from '../assets/icons/user.svg';
import './search.css';
import { STATIC_RESOURCE, NOVEL_SEARCH } from '../values/api';

const NovelItem = ({data, onClick}) => (
  <li className="novel-item" onClick={onClick}>
    <img className="cover" src={`${STATIC_RESOURCE}${data.cover}`} alt=""/>
    <div className="novel-info">
      <p className="title">{data.title}</p>
      <section className="author">
        <img className="icon" src={UserIcon} alt=""/>
        <span>{data.author}</span>
      </section>
      <p className="des">{data.shortIntro}</p>
      <section className="status">
        <p className="latelyFollower">{data.latelyFollower} <span>人气</span></p>
        <p className="retentionRatio">{data.retentionRatio || 0}% <span>读者留存</span></p>
      </section>
    </div>
  </li>
);

const NovelList = ({novelList, handleResultClick}) => (
  <ul className="novel-list">
    {novelList.map(novel =>
      <NovelItem
        key={novel._id}
        data={novel}
        onClick={() => handleResultClick(novel._id)}
      />
    )}
  </ul>
);

export class SearchPage extends React.Component {

  state = {
    novelList: []
  }

  constructor(props) {
    super(props);

    if (sessionStorage.getItem('SEARCH_RESULT') !== null) {
      this.state = {
        novelList: JSON.parse(sessionStorage.getItem('SEARCH_RESULT'))
      };

      sessionStorage.removeItem('SEARCH_RESULT');
    } else {
      this.state = {
        novelList: []
      };
    }
    this.searchInput = React.createRef();
  }

  componentDidMount() {
    this.searchInput.current.focus();
  }

  componentWillUnmount() {
    if (this.props.history.action === 'PUSH') {
      sessionStorage.setItem('SEARCH_RESULT', JSON.stringify(this.state.novelList));
    }
  }

  searchNovel(keyword) {
    fetch(`${NOVEL_SEARCH}?query=${keyword}&start=0&limit=10`)
      .then(response => response.json())
      .then(response => {
        if (!response.ok) {
          throw new Error('接口出错');
        }

        this.setState({
          novelList: response.books.map(book => {
            return Object.assign({}, book, {
              shortIntro: book.shortIntro.length > 30 ? book.shortIntro.substring(0, 30) + ' ...' : book.shortIntro
            });
          })
        });
      })
      .catch(err => {
        console.log(err);
      });
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
            onKeyUp={e => {
              if (e.keyCode === 13 && e.currentTarget.value !== '') {
                this.searchNovel(e.currentTarget.value);
              }
            }}
          />
          <button className="cancel-btn" onClick={() => this.props.history.goBack()}>取消</button>
        </div>

        <NovelList
          novelList={this.state.novelList}
          handleResultClick={id => this.toNovelDetails(id)}
        />
      </div>
    );
  }

}