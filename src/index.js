
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// 首先我们需要导入一些组件……
import { Router, Route, Link, browserHistory, IndexRoute, Redirect } from 'react-router';

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
  constructor(props){
    super(props)

    let message = 'Message'

    this.state = {
      message : message
    }
  }

  componentDidMount(){
    // 来自于路径 `/inbox/messages/:id`
    const id = this.props.params.id;

    const baz = this.props.location.query.baz;

    this.setState({
      message: id + baz
    })
  }
  render(){
    return (
      <h3>Message: {this.state.message}</h3>
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

class Dashboard extends Component {
  render(){
    return (
      <div>Welcome to the App!</div>
    )
  }
}

class Invoice extends Component {
  constructor(props){
    super(props)
    this.state = {
      invoice: null
    }
  }

  componentDidMount(){
    // 上面的步骤2，在此进行初始化数据
    this.fetchInvoice()
  }

  componentDidUpdate(preProps){
    // 上面的步骤3，通过参数更新数据
    let oldId = preProps.params.invoiceId
    let newId = this.props.params.invoiceId
    if(newId !== oldId){
      this.fetchInvoice()
    }
  }

  componentWillUnmount(){
    // 上面的步骤4，在组件移除前忽略掉正在进行中的请求
    this.ignoreLastFetch = true
  }

  fetchInvoice(){
    let url = `/api/invoices/${this.props.params.invoiceId}`
    this.request = fetch(url, (err, data)=>{
      if(!this.ignoreLastFetch){
        this.setState({ invoice: data.invoice })
      }
    })
  }

  render(){
    return <InvoiceView invoice={this.state.invoice} />
  }
}

// 最后，我们用一些<Route> 来渲染<Router>。
// 这些就是路由提供的我们想要的东西。
// ReactDOM.render((
//   <Router history={browserHistory}>
//     <Route path="/" component={App}>
//       {/* 当Url为/ 时渲染Dashboard */}
//       <IndexRoute component={Dashboard}/>
//       <Route path="about" component={About} />
//       <Route path="inbox" component={Inbox}>
//         {/* 使用/messages/:id 替换 messages/:id */}
//         <Route path="/messages/:id" component={Message} />
//
//         {/* 跳转 messages/:id 到 /messages/:id */}
//         <Redirect from="messages/:id" to="/messages/:id"/>
//       </Route>
//     </Route>
//   </Router>
// ), document.getElementById('app')
// )

const routeConfig = [
  {
    path: '/',
    component: App,
    indexRoute: { component: Dashboard },
    childRoutes: [
      { path: 'about', component: About },
      { path: 'inbox',
        component: Inbox,
        childRoutes: [
          { path: 'messages/:id',
            onEnter: ({ params }, replace)=>replace(`/messages/${params.id}`)
          }
        ]
      },
      {
        component: Inbox,
        childRoutes: [
          { path: 'messages/:id', component: Message}
        ]
      }
    ]
  }
]

ReactDOM.render(
  <Router
    history={browserHistory}
    routes={routeConfig} />,
  document.getElementById('app')
)
