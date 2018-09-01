import React from 'react';
import { connect } from 'react-redux';

import BackIcon from '../assets/icons/back-2.svg';
import MenuIcon from '../assets/icons/menu.svg';
import MoonIcon from '../assets/icons/moon.svg';
import SettingIcon from '../assets/icons/setting.svg';
import DownloadIcon from '../assets/icons/download.svg';
import './read.css';

import { loadNovelData, loadChapterContent } from '../actions/actions';

class _ReadPage extends React.Component {

  state = {
    showMenu: false,
    showChapterList: false,
    enableNext: true
  }

  componentDidMount() {
    const novelID = this.props.match.params.id;

    this.props.loadNovelData(novelID, 0);
  }

  pop() {
    this.props.history.goBack();
  }

  toggleChapterList() {
    this.setState(preState => {
      return {
        showChapterList: !preState.showChapterList
      };
    });
  }

  loadChapterContent(chapter) {
    this.props.loadChapterContent(chapter, this.props.chapters[chapter].link);
  }

  toggleMenu() {
    this.setState(preState => ({
      showMenu: !preState.showMenu
    }));
  }

  render() {
    return (
      <div className="read-page">
        <div className="nav-bar" style={{ display: this.state.showMenu ? 'flex' : 'none' }}>
          <div className="back-btn" onClick={() => this.pop()}>
            <img src={BackIcon} alt="" className="icon"/>
            <span className="title">圣墟</span>
          </div>
        </div>
        <div
          className="touch-layer"
          onClick={() => this.toggleMenu()}
        ></div>
        <p dangerouslySetInnerHTML={{ __html: '&nbsp;&nbsp;&nbsp;&nbsp;' + this.props.content }} />
        <button
          className="next-btn"
          disabled={!this.state.enableNext}
          onClick={() => {
            const chapter = this.props.currentChapterIndex + 1;

            if (chapter > this.props.chapters.length) {
              return;
            }

            this.loadChapterContent(chapter);
            
            window.scroll(0, 0);
          }}
        >下一章</button>

        <div className="bottom-menu" style={{ display: this.state.showMenu ? 'flex' : 'none' }}>
          <div
            className="menu-item"
            onClick={() => this.toggleChapterList()}
          >
            <img src={MenuIcon} alt="" className="icon"/>
            <span className="label">目录</span>
          </div>
          <div className="menu-item">
            <img src={MoonIcon} alt="" className="icon"/>
            <span className="label">夜间</span>
          </div>
          <div className="menu-item">
            <img src={SettingIcon} alt="" className="icon"/>
            <span className="label">设置</span>
          </div>
          <div className="menu-item">
            <img src={DownloadIcon} alt="" className="icon"/>
            <span className="label">缓存</span>
          </div>
        </div>
        
        <div
          className={`chapter-list-view ${this.state.showChapterList ? 'show' : ''}`}
        >
          <div
            className="chapter-list-contain"
          >
            <div className="chapter-list-contain-header bottom-border">
              <p className="title">圣墟</p>
              <section className="chapter-list-control">
                <span className="label">目录</span>
              </section>
            </div>
            <ul className="chapter-list">
              {this.props.chapters.map((item, index) =>
                <li
                  key={index}
                  className="chapter-list-item bottom-border"
                  onClick={() => {
                    this.loadChapterContent(index);
                    this.toggleChapterList();
                    this.toggleMenu();

                    window.scroll(0, 0);
                  }}
                >
                  <span>{`${index + 1}. ${item.title}`}</span>
                </li>
              )}
            </ul>
          </div>
          <div
            className="chapter-list-touch-layer"
            onClick={() => this.toggleChapterList()}
          ></div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    content: state.read.content,
    chapters: state.read.chapters,
    currentChapterIndex: state.read.currentChapterIndex
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadNovelData(novelID, chapterIndex) {
      dispatch(loadNovelData(novelID, chapterIndex));
    },

    loadChapterContent(chapterIndex, chapterLink) {
      dispatch(loadChapterContent(chapterIndex, chapterLink));
    }
  };
};

export const ReadPage = connect(mapStateToProps, mapDispatchToProps)(_ReadPage);