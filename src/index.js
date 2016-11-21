
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// 首先我们需要导入一些组件……
import { Router, Route, Link, browserHistory } from 'react-router';

// 然后我们从应用中删除一堆代码和
// 增加一些<Link> 元素……
class App extends Component {
  render() {
    return (
      <div>
        <h1>App</h1>
        <ul>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/inbox">Inbox</Link></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
}

// 新建一个组件让其在Inbox 内部渲染
class Message extends Component {
  render(){
    return (
      <h3>Message</h3>
    )
  }
}

class About extends Component {
  render(){
    return (
      <h3>About</h3>
    )
  }
}

class Inbox extends Component {
  render(){
    return (
      <div>
        <h2>Inbox</h2>
        {this.props.children || "Welcome to your Inbox"}
      </div>
    )
  }
}

// 最后，我们用一些<Route> 来渲染<Router>。
// 这些就是路由提供的我们想要的东西。
ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="about" component={About} />
      <Route path="inbox" component={Inbox}>
        {/* 添加一个路由，嵌套进我们想要嵌套的UI 里 */}
        <Route path="messages/:id" component={Message} />
      </Route>
    </Route>
  </Router>
), document.getElementById('app')
)
