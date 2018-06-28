import React from 'react';

import BackIcon from '../assets/icons/back-2.svg';
import MenuIcon from '../assets/icons/menu.svg';
import MoonIcon from '../assets/icons/moon.svg';
import SettingIcon from '../assets/icons/setting.svg';
import DownloadIcon from '../assets/icons/download.svg';
import './read.css';

import { NOVEL_SOURCE, NOVEL_CHAPTER } from '../values/api';

export class ReadPage extends React.Component {

  state = {
    content: '',
    chapters: [],
    currentChapter: 0,
    showMenu: false,
    showChapterList: false
  }

  componentDidMount() {
    const novelID = this.props.match.params.id;

    fetch(`${NOVEL_SOURCE}?view=summary&book=${novelID}`)
      .then(response => response.json())
      .then(response => {
        let sources = Array.from(response).filter(item => item.name !== '优质书源' && item.name !== '笔趣阁');
        console.log(sources);
        return fetch(`${NOVEL_SOURCE}/${sources[0]._id}?view=chapters`);
      })
      .then(response => response.json())
      .then(response => {
        this.setState({
          chapters: response.chapters
        });

        return fetch(`${NOVEL_CHAPTER}/${encodeURIComponent(response.chapters[this.state.currentChapter].link)}?k=2124b73d7e2e1945&t=1468223717`);
      })
      .then(response => response.json())
      .then(response => {
        if (response.ok) {
          this.setState({
            content: (response.chapter.body + '').replace(/\n/g, '<br/>&nbsp;&nbsp;&nbsp;&nbsp;')
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  pop() {
    this.props.history.goBack();
  }

  toggleChapterList() {
    this.setState(preState => {
      // const html = document.querySelector('html');
      // const body = document.querySelector('body');

      // if (!preState.showChapterList) {
      //   html.style.height = '100%';
      //   body.style.height = '100%';
      // } else {
      //   html.style.height = 'auto';
      //   body.style.height = 'auto';
      // }

      return {
        showChapterList: !preState.showChapterList
      };
    });
  }

  loadChapterContent(chapter) {
    return fetch(`${NOVEL_CHAPTER}/${encodeURIComponent(this.state.chapters[chapter].link)}?k=2124b73d7e2e1945&t=1468223717`)
      .then(response => response.json())
      .then(response => {
        if (response.ok) {
          window.scrollTo(0, 0);

          this.setState({
            currentChapter: chapter,
            content: (response.chapter.body + '').replace(/\n/g, '<br/>&nbsp;&nbsp;&nbsp;&nbsp;')
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
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
        <p dangerouslySetInnerHTML={{ __html: '&nbsp;&nbsp;&nbsp;&nbsp;' + this.state.content }} />
        <button
          onClick={() => {
            const chapter = this.state.currentChapter + 1;

            this.loadChapterContent(chapter);
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
        
        <div className="chapter-list-view" style={{ display: this.state.showChapterList ? 'flex' : 'none' }}>
          <div className="chapter-list-contain">
            <div className="chapter-list-contain-header bottom-border">
              <p className="title">圣墟</p>
              <section className="chapter-list-control">
                <span className="label">目录</span>
              </section>
            </div>
            <ul className="chapter-list">
              {this.state.chapters.map((item, index) =>
                <li
                  key={item.link}
                  className="chapter-list-item bottom-border"
                  onClick={() => {
                    this.loadChapterContent(index)
                      .then(() => {
                        this.toggleChapterList();
                        this.toggleMenu();
                      });
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