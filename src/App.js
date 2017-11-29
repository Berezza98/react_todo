import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './components/header';
import Footer from './components/footer';
import SelectButton from './components/selectButton';
import Search from './components/search';
import Task from './components/task';
import Modal from './components/modal';

class App extends Component {

  constructor(props){
    super();
    this.props = props;
    this.state = {
      todos : [],
      modalOpen : false,
      editingTask : null
    };
    this.url = "http://localhost:8080/todos/";

    this.changeStatus = this.changeStatus.bind(this);
    this.deleteTast = this.deleteTast.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.createNewTask = this.createNewTask.bind(this);
    this.changeTask = this.changeTask.bind(this);
    this.changeEditMode = this.changeEditMode.bind(this);
  }

  async getAllTasks(){
    let data = await fetch(this.url);
    let todos = await data.json();
    return todos;
  }

  async componentDidMount(){
    let todos = await this.getAllTasks();
    this.setState({todos});
    console.log(todos);
  }

  changeTask(obj){
    let id = this.state.editingTask._id;
    let todos = this.state.todos.map(todo => {
      if(todo._id === id){
        todo.title = obj.title;
        todo.status = obj.status;
        return todo;
      }else{
        return todo;
      }
    });
    console.log(todos); //NEED TO ADD LOGIC FOR SERVER
    this.setState({
      todos
    }, () => {
      this.toggleModal();
    });
  }

  changeEditMode(id){
    let editingTask = this.state.todos.filter(task => task._id === id)[0];
    this.setState({
      editingTask
    });
    this.toggleModal();
  }

  toggleModal(){
    this.setState({
      modalOpen : !this.state.modalOpen
    }, () => {
      if(this.state.modalOpen === false){
        this.setState({
          editingTask : null
        });
      }
    });
  }

  async createNewTask(status, title){
    let newTask = {
        status,
        title
    };
    console.log(newTask);
    await fetch(this.url, {
        method : "POST",
        body : JSON.stringify(newTask),
        headers : {
            "Content-Type" : "application/json"
        }
    });
    let todos = await this.getAllTasks();
    this.setState({
      todos
    });
  }

  async changeStatus(id){
    let mainTodo = this.state.todos.filter(todo => todo._id === id)[0];
    mainTodo.status = (mainTodo.status === "done") ? "not done" : "done";
    await fetch(this.url, {
      method : "PUT",
      body : JSON.stringify(mainTodo),
      headers : {
        "Content-Type" : "application/json"
      }
    });
    let todos = this.state.todos.map((todo, index) => {
      if(todo._id === id){
        return mainTodo;
      }else{
        return todo;
      }
    });
    
    this.setState({todos});
  }

  countOfDoneTodos(){
    let doneTodos = this.state.todos.filter(todo => todo.status === "done");
    return doneTodos.length;
  }

  countOfNotDoneTodos(){
    let notDoneTodos = this.state.todos.filter(todo => todo.status === "not done");
    return notDoneTodos.length;
  }

  async deleteTast(id){
    await fetch(this.url+id, {
      method : "DELETE"
    });
    let todos = this.state.todos.filter(todo => todo._id !== id);
    this.setState({
      todos
    });
  }

  render() {
    return (
      <main>
        <Header appName="Органайзер"/>
        <header>
          <div className="top_buttons">
            <SelectButton name={`Усі ${this.state.todos.length}`} active={true} />
            <SelectButton name={`Виконані ${this.countOfDoneTodos()}`} />
            <SelectButton name={`В процесі ${this.state.todos.length - (this.countOfDoneTodos() + this.countOfNotDoneTodos())}`} />
            <SelectButton name={`Не виконані ${this.countOfNotDoneTodos()}`} />
          </div>
          <Search placeholder="Пошук" />
        </header>
        <section>
          {this.state.todos.map(todo => {
            return <Task changeEditMode={this.changeEditMode} changeStatus={this.changeStatus} deleteTask={this.deleteTast} status={todo.status} title={todo.title} key={todo._id} id={todo._id} />
          })}
        </section>
        {this.state.modalOpen ? <Modal editTask={this.changeTask} isEditing={this.state.editingTask} createNewTask={this.createNewTask} closeModal={this.toggleModal}/> : ""}
        <Footer openModal={this.toggleModal}/>
      </main>
    );
  }
}

App.propTypes = {
  appName : PropTypes.string
};

App.defaultProps = {
  appName : "Default App Name"
}

export default App;
