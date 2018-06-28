import React from 'react';

import BackIcon from '../assets/icons/back.svg';
import PlusIcon from '../assets/icons/plus.svg';
import './novel.css';

import { NOVEL_DETAILS, STATIC_RESOURCE } from '../values/api';

const NavBar = ({handleBackBtn}) => (
  <div className="nav-bar">
    <div className="back-btn" onClick={handleBackBtn}>
      <img src={BackIcon} alt="" className="icon" />
      <span className="back-title">返回</span>
    </div>
  </div>
);

export class NovelPage extends React.Component {

  state = {
    novel: {}
  }

  componentDidMount() {
    fetch(`${NOVEL_DETAILS}/${this.props.match.params.id}`)
      .then(response => response.json())
      .then(response => {
        this.setState({
          novel: response
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  toReadPage() {
    this.props.history.push(`/read/${this.props.match.params.id}`);
  }

  render() {
    const novel = this.state.novel;

    return (
      <div className="novel-page">
        <NavBar
          handleBackBtn={() => this.props.history.goBack()}
        />
        <div className="novel-info-contain">
          {novel.cover && <img src={`${STATIC_RESOURCE}${novel.cover}`} alt="" className="novel-cover"/>}
          <div className="novel-info">
            <p className="novel-title">{novel.title}</p>
            <section className="info-line">
              <span className="score">{novel.rating && novel.rating.score.toFixed(1)}</span>
              <span className="count">{novel.rating && novel.rating.count}人评</span>
            </section>
            <section className="info-line">
              <span className="author">{novel.author}</span>
              <span className="novel-type">{novel.majorCate}</span>
            </section>
            <section className="info-line">
              <span>{novel.wordCount && Math.floor(novel.wordCount / 10000)}万字</span>
              <span>{novel.isSerial ? '连载中' : '完结'}</span>
            </section>
          </div>
        </div>

        <div className="novel-other-info">
          <div className="follow-info">
            <section className="info-item">
              <span>{novel.latelyFollower > 10000 ? (novel.latelyFollower / 10000).toFixed(1) + '万' : novel.latelyFollower}</span>
              <span>追书人气</span>
            </section>
            <section className="info-item">
              <span>{novel.retentionRatio}%</span>
              <span>读者留存</span>
            </section>
            <section className="info-item">
              <span>{novel.postCount}</span>
              <span>社区帖子</span>
            </section>
          </div>

          <div className="novel-des">
            <p className="label">简介</p>
            <p className="content" dangerouslySetInnerHTML={{ __html: (novel.longIntro + '').replace(/\r\n/g, '<br />')}}/>
          </div>
        </div>

        <div className="bottom-control">
          <button>
            <img src={PlusIcon} alt=""/>
            <span>追更新</span>
          </button>
          <button onClick={() => this.toReadPage()}>开始阅读</button>
        </div>
      </div>
    );
  }
}